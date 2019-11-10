## Backend for the AAVE Monnitoring DAPP

This is the backend to get the data from the AAVE protocol and display them as an API.

To get started you should have python3 installed.

Clone this repo and go to this folder: 

```
git clone https://github.com/thesachinmittal/Aave-Monitoring-DApp.git
cd Aaave-Monitoring-Dapp
cd backend 
```

Install Python modules:
`pip3 install -r requirements.txt`

Change the name of `.env.example` to `.env` and insert the required informations

Run `data.py` in background: `nohup python3 data.py`

And finally run `python3 app.py`, you now should be able to test the API.

Enjoy 
