## Backend for the AAVE Monnitoring DAPP

This is the backend to get the data from the AAVE protocol and display them as an API. It consists of 2 main parts, the `data.py` which listens to events and inserts/updates them in the DB and the `app.py` which is the API exposed to the public.

Currently the API is hosted at: https://aavemonitor.herokuapp.com/

The endpoints possible are listed below:

`/history/` - This gives you all the events that have fired up in the contract, if you want to get only one event use the `event` parameter such as: `https://aavemonitor.herokuapp.com/history/?event=Deposit`

`/reserves/` - Gives you all the data from the Reserves such as `currentATokenBalance`

`/health/` - Gives back the health of all users in the protocol, you can use a `user` parameter if you just want to query the data of that user

`/count/` - Gives back the count of active users for each reserve

`/stats/reserves/` - Gives back the reserves transaction count

`/stats/atokens/` - Gives back `exchangeRate`, `totalSupply`, `transaction_count`, `princeinUSD` from the aTokens


## Installation

To get started you should have python3 installed.

Clone this repo and go to this folder: 

```
git clone https://github.com/thesachinmittal/Aave-Monitoring-DApp.git
cd Aave-Monitoring-DApp
cd backend 
```

For `ubuntu`, you need to have the libsystemd installed, otherwise when installing python modules it will throw you error:

`sudo apt install libsystemd-dev`

Create a python3 environment variable and activate it.

Install Python modules:

`pip3 install -r requirements.txt`

Change the name of `.env.example` to `.env` and insert the required informations

```
DB_USER=juicy_user
DB_PASS=Nicey_pas
DB_HOST=stronghost.com
DB_NAME=fast_name
INFURA_KEY=543...
CONTRACT_ADDRESS=0x.... you know it
```

In order for the API to work you need to first start inserting the events in the DB, for doing so you need to run `data.py` in background: 

`nohup python3 data.py`

And finally run `python3 app.py`, you now should be able to test the API at `http://localhost:5000/`.

Enjoy!
