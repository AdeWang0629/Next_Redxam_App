# **How To Run Backend**

Backend has multiple services that need to be run in order for the app to work propperly

## **Server Service**

Server is the service that provides all the info to the user and grants all the general functionability of the app. **This must run everytime**

```
cd .\packages\backend\
$env:SERVICE="server"
$env:PORT="5005" || Any port available will work
NPX tsnd -r tsconfig-paths/register src
```

## **Plaid Service**

Plaid is the service that provides accounts and banks functionabilty for deposits and withdrawl. **This must be ran if going to deposits screens and using plaid functionability**

```
cd .\packages\backend\
$env:SERVICE="plaid"
$env:PORT="505" || Any port available will work
NPX tsnd -r tsconfig-paths/register src
```

## **Wallets Service**

Wallets is the service that provides wallets and crypto functionabilty for deposits and withdrawl. **This must be ran if a cryto deposit has been done in order to get it into the user account**

```
cd .\packages\backend\
$env:SERVICE="wallets"
$env:PORT="504" || Any port available will work
NPX tsnd -r tsconfig-paths/register src
```
