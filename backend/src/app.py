from flask import Flask, request           # import flask
from web3 import Web3, HTTPProvider
import json

app = Flask(__name__)             # create an app instance

INFURA = "https://kovan.infura.io/v3/3e4576344b5e477fa73aa3a3875e3078"

web3 = Web3(Web3.WebsocketProvider("wss://kovan.infura.io/ws"))

with open("LendingPool.json") as f:
    info_json = json.load(f)
abi = info_json

lending_pool = web3.eth.contract(address='0xB36017F5aafDE1a9462959f0e53866433D373404', abi=abi)

@app.route("/history/")                   # at the end point /
def history():
    data = {}
    dlist = []
    blist = []
    rlist = []
    json_data = {}
    reserve = request.args.get('reserve')
    event_filter = lending_pool.events.Deposit.createFilter(fromBlock= 0, toBlock= 'latest', argument_filters={'_reserve':reserve})
    #myfilter = lending_pool.eventFilter('Deposit', {'fromBlock': 0,'toBlock': 'latest'});
    filteri = event_filter.get_all_entries()
    print(filteri)
    for index, events in enumerate(filteri):
        #print(events)
        args = events['args']
        for x in args:
            data[x] = events['args'].get(x)
        dlist.append(data)
    event_filter = lending_pool.events.Borrow.createFilter(fromBlock= 0, toBlock= 'latest', argument_filters={'_reserve':reserve})
    filteri = event_filter.get_all_entries()
    print(filteri)
    for index, events in enumerate(filteri):
        args = events['args']
        for x in args:
            data[x] = events['args'].get(x)
        blist.append(data)

    event_filter = lending_pool.events.Repay.createFilter(fromBlock= 0, toBlock= 'latest', argument_filters={'_reserve':reserve})
    filteri = event_filter.get_all_entries()
    for index, events in enumerate(filteri):
        #print(events)
        args = events['args']
        for x in args:
            data[x] = events['args'].get(x)
        rlist.append(data)

    json_data = {"deposits": dlist, "borrows": blist, "repaid": rlist }
    return json.dumps(json_data)


    
    return json.dumps(json_data)        # which returns "hello world"
if __name__ == "__main__":        # on running python app.py
     app.run(host= '0.0.0.0', debug=True)                    # run the flask app
