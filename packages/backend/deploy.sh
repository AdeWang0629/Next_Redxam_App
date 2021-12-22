#!/bin/bash
git pull
npm install
npm run build
cp .env dist/.env
pm2 delete all
NODE_ENV="development" SERVICE="server" PORT=80 pm2 start dist/index.js --name server
NODE_ENV="development" SERVICE="vaults" PORT=3001 pm2 start dist/index.js --name vaults
NODE_ENV="development" SERVICE="wallets" PORT=3002 pm2 start dist/index.js --name wallets
NODE_ENV="development" SERVICE="balance" PORT=3003 pm2 start dist/index.js --name balance
NODE_ENV="development" SERVICE="portfolio" PORT=3004 pm2 start dist/index.js --name portfolio
NODE_ENV="development" SERVICE="binance" PORT=3005 pm2 start dist/index.js --name binance
NODE_ENV="development" SERVICE="webhooks" PORT=3006 pm2 start dist/index.js --name webhooks
pm2 save
# EOF