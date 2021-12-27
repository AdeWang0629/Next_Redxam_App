#!/usr/bin/env bash
# Deploy backend

# ENVIRONMENT can be development, staging or production
ENVIRONMENT=$1

# install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"


# install lts node version
nvm install --lts
npm i -g yarn
npm i -g pm2 

# Clone repo
git clone https://user:token@github.com/redxam/redxamapp.git
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
git remote set-url origin https://user:token@github.com/redxam/redxamapp.git
cd packages/backend

// installing packages
yarn install

npm run build
cp .env dist/.env
pm2 delete all
NODE_ENV="$ENVIRONMENT" SERVICE="server" PORT=3000 pm2 start dist/index.js --name server
NODE_ENV="$ENVIRONMENT" SERVICE="vaults" PORT=3001 pm2 start dist/index.js --name vaults
NODE_ENV="$ENVIRONMENT" SERVICE="wallets" PORT=3002 pm2 start dist/index.js --name wallets
NODE_ENV="$ENVIRONMENT" SERVICE="balance" PORT=3003 pm2 start dist/index.js --name balance
NODE_ENV="$ENVIRONMENT" SERVICE="portfolio" PORT=3004 pm2 start dist/index.js --name portfolio
NODE_ENV="$ENVIRONMENT" SERVICE="binance" PORT=3005 pm2 start dist/index.js --name binance
NODE_ENV="$ENVIRONMENT" SERVICE="webhooks" PORT=3006 pm2 start dist/index.js --name webhooks
pm2 save
