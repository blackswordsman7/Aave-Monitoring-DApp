import requests
from web3 import Web3, HTTPProvider
from dotenv import load_dotenv
import os
import json
import time
import psycopg2

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
INFURA  = os.getenv("INFURA_KEY")
POOL_CONTRACT = os.getenv("CONTRACT_ADDRESS")

db = connection = psycopg2.connect(user = DB_USER,
                                  password = DB_PASS,
                                  host= DB_HOST,
                                  database = DB_NAME) 

# Get a cursor object
cursor = db.cursor()

#Delete all records from tables before inserting the data
cursor.execute("DROP TABLE IF EXISTS users")
cursor.execute("DROP TABLE IF EXISTS history")
cursor.execute("DROP TABLE IF EXISTS health")

db.commit()

#Create tables
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users(address TEXT, reserve TEXT, timestamp INTEGER, blocknumber integer, PRIMARY KEY(address, reserve))
''')
cursor.execute(''' CREATE TABLE IF NOT EXISTS history(address TEXT, timestamp INTEGER, event_name TEXT,
                   reserve TEXT, amount TEXT, target TEXT, txHash TEXT, PRIMARY KEY(address, timestamp))''')

cursor.execute(''' CREATE TABLE IF NOT EXISTS health(address TEXT PRIMARY KEY, totLiquidityETH TEXT, 
                    totalCollateral TEXT, totalBorrowsETH TEXT, currentLiquidationThreshold TEXT, ltv TEXT, healthFactor TEXT)''')


db.commit()

#Set WebSocketProvider in order to fetch events and increase timeout to prevent errors
web3 = Web3(Web3.WebsocketProvider("wss://kovan.infura.io/ws", websocket_timeout=1000, websocket_kwargs={'timeout': 600}))
#Set INFURA as the HTTP provider in order to access contract functions
w3 = Web3(Web3.HTTPProvider(INFURA))

#Take the ABI of the main contract to be queried
with open("LendingPool.json") as f:
    info_json = json.load(f)
abi = info_json

#Instantiate 2 contract objects, one for the event and other one to query contract functions
lending_pool_event = web3.eth.contract(address=POOL_CONTRACT, abi=abi)
lending_pool = w3.eth.contract(address=POOL_CONTRACT, abi=abi)

#Use the REST API provided by the AAVE team in order to get reserves data
data = requests.get("https://dlp-api-dev.testing.aave.com/data/reserves").json()

blockNumber = 0

def get_data():
    for i in data:
        reserve = i['address']
        event_filter = lending_pool_event.events.Deposit.createFilter(fromBlock=14310756, toBlock='latest',\
                       argument_filters={'_reserve': reserve}).get_all_entries()
        for events in event_filter:
            check_user = lending_pool.functions.getUserReserveData(reserve ,events['args'].get("_user")).call()
            if check_user[0] == 0 and check_user[1] == 0 and check_user[2] == 0: 
                continue
            else:
                sql = ''' INSERT INTO users(address,reserve, timestamp, blocknumber)
                          VALUES(%s,%s,%s,%s) '''
                cursor.execute('''SELECT COUNT(*) FROM health where address = %s ''', [events['args'].get("_user")])
                user_exist = int(cursor.fetchone()[0])
                if user_exist == 0:
                    health_user = lending_pool.functions.getUserAccountData(events['args'].get("_user")).call()
                    sql_health = '''INSERT INTO health(address,totLiquidityETH, totalCollateral, totalBorrowsETH, 
                                    currentLiquidationThreshold, ltv, healthFactor)
                          VALUES(%s,%s,%s,%s,%s,%s,%s) '''
                    values_health = (events['args'].get("_user"), health_user[0], health_user[1], health_user[2], health_user[4],\
                                    health_user[5], health_user[6])
                    cursor.execute(sql_health, values_health)
                users = (events['args'].get("_user"), reserve, events['args'].get("timestamp"),events['blockNumber'])
                cursor.execute('''SELECT COUNT(*) FROM users WHERE address = %s and reserve = %s''',[events['args'].get("_user"), reserve])
                if int(cursor.fetchone()[0]) == 0:
                    cursor.execute(sql, users)
    db.commit()

def update_users():
    for i in data:
        reserve = i['address']
        event_filter = lending_pool_event.events.Deposit.createFilter(fromBlock=int(blockNumber), toBlock= 'latest',\
                       argument_filters={'_reserve': reserve}).get_all_entries()
        for events in event_filter:
            cursor.execute("SELECT COUNT(*) FROM users WHERE reserve = %s AND address = %s",\
                            [reserve, events['args'].get("_user")])
            if cursor.fetchone()[0] != 0:
                continue
            check_user = lending_pool.functions.getUserReserveData(reserve ,events['args'].get("_user")).call()
            if check_user[0] == 0 and check_user[1] == 0 and check_user[2] == 0:
                continue
            else:
                sql = ''' INSERT INTO users(address,reserve, timestamp, blocknumber)
                          VALUES(%s,%s,%s,%s) '''
                users = (events['args'].get("_user"), reserve, events['args'].get("timestamp"),events['blockNumber'])
                cursor.execute(sql, users)



def insert_db(event_name, eventsef):
    for events in eventsef:
        args = events['args']
        sql = ''' INSERT INTO history(event_name,timestamp,reserve, address, amount, target, txHash)
              VALUES(%s,%s,%s,%s,%s,%s,%s) '''
        history = (event_name, int(events['args'].get("timestamp")), events['args'].get("_reserve"),\
                    events['args'].get("_user") if events['args'].get("_user") is not None \
                        else "0x0000000000000000000000000000000000000000", int(events['args'].get("_amount")) \
                        if events['args'].get("_amount") is not None else "",\
                            events['args'].get("_target") if event_name == "FlashLoan" else "", events['transactionHash'].hex())
        cursor.execute(sql, history)

def get_history():
    for res in data:
        event_deposit =  lending_pool_event.events.Deposit.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Deposit", event_deposit.get_all_entries())
        event_redeem = lending_pool_event.events.RedeemUnderlying.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Redeem",  event_redeem.get_all_entries())
        event_borrow = lending_pool_event.events.Borrow.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Borrow", event_borrow.get_all_entries())
        event_repay = lending_pool_event.events.Repay.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Repay", event_repay.get_all_entries())
        event_liquidation = lending_pool_event.events.LiquidationCall.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Liquidation", event_liquidation.get_all_entries())
        event_swap = lending_pool_event.events.Swap.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("Swap", event_swap.get_all_entries())
        event_flash = lending_pool_event.events.FlashLoan.createFilter(fromBlock=14310756, toBlock='latest', argument_filters={'_reserve': res['address']})
        insert_db("FlashLoan", event_flash.get_all_entries())
    db.commit()

def update_db(event_name, eventsef, reserve):
    for event in eventsef:
        cursor.execute('''select COUNT(*) from history where reserve = %s AND event_name = %s AND timestamp = %s AND address = %s''', [reserve, event_name, int(event['args'].get("timestamp")), event['args'].get("_user")])
        data = cursor.fetchone()[0]
        if int(data) == 0:    
            sql = ''' INSERT INTO history(event_name,timestamp,reserve, address, amount, target, txHash)
              VALUES(%s,%s,%s,%s,%s,%s,%s) '''
            history = (event_name, int(event['args'].get("timestamp")), event['args'].get("_reserve"),event['args'].get("_user"), \
                int(event['args'].get("_amount")) if event['args'].get("_amount") is not None else "",\
                     event['args'].get("_target") if event_name == "FlashLoan" else "", event['transactionHash'].hex())
            
            try:
                cursor.execute(sql, history)
            except Exception as exc:
                print(exc)
                print(history)
                print(sql)
    
def update_history():
    for res in data:
        event_deposit =  lending_pool_event.events.Deposit.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Deposit", event_deposit.get_all_entries(), res['address'])
        event_redeem = lending_pool_event.events.RedeemUnderlying.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Redeem",  event_redeem.get_all_entries(), res['address'])
        event_borrow = lending_pool_event.events.Borrow.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Borrow", event_borrow.get_all_entries(), res['address'])
        event_repay = lending_pool_event.events.Repay.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Repay", event_repay.get_all_entries(), res['address'])
        event_liquidation = lending_pool_event.events.LiquidationCall.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Liquidation", event_liquidation.get_all_entries(), res['address'])
        event_swap = lending_pool_event.events.Swap.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("Swap", event_swap.get_all_entries(), res['address'])
        event_flash = lending_pool_event.events.FlashLoan.createFilter(fromBlock=blockNumber, toBlock='latest', argument_filters={'_reserve': res['address']})
        update_db("FlashLoan", event_flash.get_all_entries(), res['address'])

def update_health():
    cursor.execute("SELECT * FROM health")
    for i in cursor.fetchall():
        health_user = lending_pool.functions.getUserAccountData(i[0]).call()
        sql = """ UPDATE health
                SET totLiquidityETH = %s , totalCollateral = %s , totalBorrowsETH = %s , currentLiquidationThreshold = %s ,
                    ltv = %s , healthFactor = %s WHERE address = %s"""
        health_values = (health_user[0], health_user[1], health_user[2], health_user[4], health_user[5], health_user[6], i[0])
        cursor.execute(sql, health_values)
    db.commit()
    

def main():
    global blockNumber
    blockNumber = ( web3.eth.getBlock('latest').number - 10 )
    get_data()
    get_history()
    while True:
        print("IN UPDATE")
        update_users()
        update_history()
        update_health()
        blockNumber = ( web3.eth.getBlock('latest').number - 10 )
        db.commit()
        time.sleep(3)

if __name__ == '__main__':
    main()



