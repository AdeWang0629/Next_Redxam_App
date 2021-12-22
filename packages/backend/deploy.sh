#!/bin/bash
git pull
npm install
npm run build
cp .env dist/.env
pm2 delete all
NODE_ENV="production" SERVICE="server" PORT=80 pm2 start dist/index.js --name server
NODE_ENV="production" SERVICE="vaults" PORT=3001 pm2 start dist/index.js --name vaults
NODE_ENV="production" SERVICE="wallets" PORT=3002 pm2 start dist/index.js --name wallets
NODE_ENV="production" SERVICE="balance" PORT=3003 pm2 start dist/index.js --name balance
NODE_ENV="production" SERVICE="portfolio" PORT=3004 pm2 start dist/index.js --name portfolio
NODE_ENV="production" SERVICE="binance" PORT=3005 pm2 start dist/index.js --name binance
NODE_ENV="production" SERVICE="webhooks" PORT=3006 pm2 start dist/index.js --name webhooks
pm2 save
# EOF