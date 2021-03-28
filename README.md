# Bookings DApp

There are 2 steps to running this locally:

First, you'll need docker and docker-compose installed.

## Step 1

Start ganache, deploy the contracts, start mongodb, start the backend server and, start the frontend server.

```
git clone https://github.com/Dylan-Kerler/bookings-dapp
cd bookings-dapp
docker-compose up
```

This will take about 60 seconds to start up. 

Website is served at: http://localhost:3000

Server is at: http://localhost:8080

Ganache is at: http://localhost:8545

## Step 2

Add the ganache network to your Metamask:

This can be done by clicking on "Custom RPC" at the bottom of the networks dropdown.

RPC URL: `127.0.0.1:8545`

Chain ID: `1337`

Import this private key into Metamask:

```
d81780450e195fc89a88f3221b1a9410f1904fbe224b35818010b07eada8ddb3
```

In Metamask, go into the "Advanced" section and reset the account.
This will reset the nonce on the account back to 0;
Resetting is required each time the server is started again or transactions will fail.


## Debugging

If transactions are failing then open the console. All of the logs are in there so it should indicate what the issue is.