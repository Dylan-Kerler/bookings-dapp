# Bookings DApp

There are 3 steps to running this locally:

First, you'll need docker and docker-compose installed.

## Step 1

Start ganache, deploy the contracts, start mongodb, start the backend server and, start the frontend server.

```
git clone https://github.com/Dylan-Kerler/bookings-dapp
cd bookings-dapp
docker-compose pull
docker-compose up
```

This will take about 5 minutes to install and 60 seconds to start up (lots of dependencies for blockchain projects...).

Website is served at: http://localhost:3000 (make sure to follow "Step 2" before testing this out)

Server is at: http://localhost:8080

Ganache is at: http://localhost:8545

## Step 2

Add the ganache network to your Metamask:

This can be done by clicking on "Custom RPC" at the bottom of the networks dropdown.

RPC URL: `127.0.0.1:8545`

Chain ID: `1337`

## Step 3

Import this private key into Metamask:

```
d81780450e195fc89a88f3221b1a9410f1904fbe224b35818010b07eada8ddb3
```

This will give you a balance of 1000 Ether to test with.

In metamask, switch to the account that you just imported and switch to the ganache network that you just added.

In Metamask, go into the "Settings" -> "Advanced" section and reset the account.
This will reset the nonce on the account back to 0;
**Resetting is required each time the server is started again or transactions WILL fail.**

Go to http://localhost:3000 and "Connect Wallet"


## Debugging

If transactions are failing then open the console. All of the logs are in there so it should indicate what the issue is.

If you get a "Failed to fetch" error on the website then restart `docker-compose up`.

## Screenshots

![Screenshot from 2021-03-28 14-51-53](https://user-images.githubusercontent.com/37438950/112754698-2c5c8900-8fd5-11eb-9e7d-c44297e8d6ac.png)

![Screenshot from 2021-03-28 14-52-24](https://user-images.githubusercontent.com/37438950/112754740-5910a080-8fd5-11eb-91d8-1828a386e592.png)

![Screenshot from 2021-03-28 14-52-59](https://user-images.githubusercontent.com/37438950/112754741-59a93700-8fd5-11eb-93e5-7fb1e08679a5.png)

