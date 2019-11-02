from flask import Flask, request           # import flask
from web3 import Web3, HTTPProvider
import json
import requests
import psycopg2
from dotenv import load_dotenv
import logging
import os
import time

load_dotenv()

app = Flask(__name__)             # create an app instance

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")


@app.route('/')
def hello():
    return "Welcome to the AAVE monitoring APP API"
    

@app.route('/count/')
def count():
    #address = request.args.get('reserve')
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
    
    cursor = connection.cursor()
    if request.args.get("user") is None:
        cursor.execute("SELECT * FROM health ORDER BY healthFactor DESC")
        row_headers=[x[0] for x in cursor.description] 
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)
    elif request.args.get("user") != None:
        cursor.execute(" select * from health WHERE address = %s ORDER BY healthFactor DESC", [request.args.get("user")])
        row_headers=[x[0] for x in cursor.description] 
        rv = cursor.fetchall()
        json_data=[]
        for result in rv:
            json_data.append(dict(zip(row_headers,result)))
        return json.dumps(json_data, indent=4, sort_keys=True)


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
