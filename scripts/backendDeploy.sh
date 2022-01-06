#!/usr/bin/env bash
# Deploy backend

# ENVIRONMENT can be development, staging or production
ENVIRONMENT=$1

npm i -g pm2
npm i -g yarn

cd redxamapp
if [ "$ENVIRONMENT" = "development" ]; then
    git checkout develop
    echo "Strings are equal."
elif [ "$ENVIRONMENT" = "staging" ]; then
    git checkout staging
else
    git checkout main
fi
git pull

# installing packages
cd packages/backend
yarn install

pm2 delete all
pm2 start .pm2/balance.sh
pm2 start .pm2/binance.sh
pm2 start .pm2/portfolio.sh
pm2 start .pm2/server.sh
pm2 start .pm2/vaults.sh
pm2 start .pm2/wallets.sh
pm2 start .pm2/webhooks.sh
pm2 save
