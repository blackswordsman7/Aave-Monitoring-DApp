from flask import Flask, request           # import flask
from web3 import Web3, HTTPProvider
import json
import requests
import psycopg2
from dotenv import load_dotenv
import logging
import os
import time
import datetime
from flask_cors import CORS
from web3 import Web3, HTTPProvider

load_dotenv()

app = Flask(__name__)             # create an app instance
CORS(app, support_credentials=True) # Get around Cors from frontend

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")


w3 = Web3(Web3.HTTPProvider(kovan.infura.io/v3/3a0f86c115cc40ee8a2355ea58a6f3430))

with open("LendingPool.json") as f:
    info_json = json.load(f)
abi = info_json

with open("AToken.json") as a:
    info_json2 = json.load(a)
abi_atoken = info_json2

lending_pool = w3.eth.contract(address='0xB36017F5aafDE1a9462959f0e53866433D373404', abi=abi)


@app.route('/')
def hello():
    return "Welcome to the AAVE monitoring APP API"
    

@app.route('/count/')
def count():
    data = {}
    reserve = requests.get("https://dlp-api-dev.testing.aave.com/data/reserves").json()
    connection = psycopg2.connect(user = DB_USER,
                                  password = DB_PASS,
                                  host= DB_HOST,
                                  database = DB_NAME)
    cursor = connection.cursor()
    for i in reserve:    
        cursor.execute(" select count(*) from users WHERE reserve = %s", [i['address']])
        data[i['name']] = int(cursor.fetchone()[0])
    return json.dumps(data)

@app.route('/health/')
def health():
    connection = psycopg2.connect(user = DB_USER,
                                  password = DB_PASS,
                                  host= DB_HOST,
                                  database = DB_NAME)

    calc_time = int(( datetime.datetime.fromtimestamp(time.time()) - datetime.timedelta(days=7) ).timestamp())
    
    cursor = connection.cursor()
    sql="select * from history where timestamp > %s"
    cursor.execute(sql, [calc_time])
    history = cursor.fetchall()
    if request.args.get("user") is None:
        cursor.execute("SELECT * FROM health ORDER BY healthFactor DESC")
        row_headers=[x[0] for x in cursor.description] 
        row_headers.append("Roles")
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            roles=[]
            dlist=list(result)
            if  ((int(result[2]))/10**18) > 50:
                roles.append('Whale')
            if int(result[6])/10**18 < 1.5:
                roles.append('Risky')
            count = len([ x for x in history if x[0] == result[0]])
            if int(count) > 10:
                roles.append('Active')
            dlist.append(roles)
            result=tuple(dlist)
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)
    elif request.args.get("user") != None:
        cursor.execute(" select * from health WHERE address = %s ORDER BY healthFactor DESC", [request.args.get("user")])
        row_headers=[x[0] for x in cursor.description]
        row_headers.append("Roles") 
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            roles=[]
            dlist=list(result)
            if  ((int(result[2]))/10**18) > 50:
                roles.append('Whale')
            if int(result[6])/10**18 < 1.5:
                roles.append('Risky')
            count = len([ x for x in history if x[0] == result[0]])
            if int(count) > 10:
                roles.append('Active')
            dlist.append(roles)
            result=tuple(dlist)
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)

@app.route("/reserves/")
def reserve():
    reserve = requests.get("https://dlp-api-dev.testing.aave.com/data/reserves").json()
    address_user = request.args.get("user")
    ljson=[]
    for i in reserve:
        ddict={}
        data = lending_pool.functions.getUserReserveData(i['address'], address_user).call()
        ddict['reserve']=i['symbol']
        ddict['currentATokenBalance'] = data[0]
        ddict['currentUnderlyingBalance'] = data[1]
        ddict['currentBorrowBalance'] = data[2]
        ddict['principalBorrowBalance'] = data[3]
        ddict['borrowRateMode']= data[4]
        ddict['borrowRate']=data[5]
        ddict['liquidityRate']=data[6]
        ddict['originationFee']=data[7]
        ddict['variableBorrowIndex']=data[8]
        ddict['lastUpdateTimestamp']=data[9]
        ljson.append(ddict)
    return json.dumps(ljson)

@app.route("/stats/reserves/")
def reserve_stats():
    reserve = requests.get("https://dlp-api-dev.testing.aave.com/data/reserves").json()
    json_data=[]
    for i in reserve:
        rdict={}
        count = len(requests.get("https://blockscout.com/eth/kovan/api?module=account&action=txlist&address=" + i['address']).json()['result'])
        rdict['name']=i['symbol']
        rdict['Transaction_count'] = count
        json_data.append(rdict)
    return json.dumps(json_data)

@app.route("/stats/atokens/")
def atokens_stats():
    reserve = requests.get("https://dlp-api-dev.testing.aave.com/data/reserves").json()
    price = requests.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').json()['ethereum']['usd']
    json_data=[]
    for i in reserve:
        atoken = w3.eth.contract(address=i['aTokenAddress'], abi=abi_atoken)
        adict={}
        count = len(requests.get("https://blockscout.com/eth/kovan/api?module=account&action=txlist&address=" + i['aTokenAddress']).json()['result'])
        adict['name']=i['symbol']
        adict['exchangeRate'] = atoken.functions.getExchangeRate().call() / 10**27
        adict['totalSupply'] = atoken.functions.totalSupply().call() / 10**18
        adict['Transaction_count'] = count      #Comment this part if you don't need it 
        adict['priceinUSD'] = price * ( float(i['priceInEth']) * adict['exchangeRate']/100 )
        json_data.append(adict)
    return json.dumps(json_data)


@app.route("/history/")                   # at the end point /
def history():
    connection = psycopg2.connect(user = DB_USER,
                                  password = DB_PASS,
                                  host= DB_HOST,
                                  database = DB_NAME)
    cursor = connection.cursor()
    
    if request.args.get("event") is None:
        cursor.execute(" select * from history ORDER BY timestamp DESC")
        row_headers=[x[0] for x in cursor.description] 
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)
    elif request.args.get("event") != None:
        cursor.execute(" select * from history WHERE event_name = %s ORDER BY timestamp DESC", [request.args.get("event")])
        row_headers=[x[0] for x in cursor.description] 
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)


    
    return json.dumps(json_data)        
if __name__ == "__main__":        # on running python app.py
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    app.run()                    # run the flask app
