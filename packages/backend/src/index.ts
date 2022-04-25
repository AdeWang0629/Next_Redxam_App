import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connection } from 'mongoose';
import { config as appConfig } from './appConfig';
import { binanceBalanceWatcher } from './service/getTotalBalance';
import tokenWatcher from '@/tokens/listTokens';
import { vaultWatcher } from './service/vaultService';
import { balanceWatcher } from './service/balanceService';
import { requestWatcher } from './service/changeRequestService';

const { PORT = '3000', SERVICE, NODE_ENV } = process.env;

const app = express();
appConfig(app);

switch (SERVICE) {
  case 'vaults':
    vaultWatcher.start();
    break;
  case 'binance':
    binanceBalanceWatcher.start();
    break;
  case 'balance':
    balanceWatcher.start();
    break;
  case 'portfolio':
    requestWatcher.start();
    break;
  case 'wallets':
    tokenWatcher();
    break;
}

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      NODE_ENV === 'production'
        ? 'https://www.redxam.com'
        : 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const connectedByEmail = {};

io.on('connection', socket => {
  socket.on('onLogin', email => {
    connectedByEmail[email] = socket.id;
  });

  socket.on('onVerified', ({ email, token }) => {
    socket.to(connectedByEmail[email]).emit('userVerified', token);
    delete connectedByEmail[email];
  });
});

server.listen(PORT, () => {
  console.info(`Server now live on http://localhost:${PORT}/api/v1`);
});

// Start watchers once database is live
connection.on('connected', () => {
  console.info('[mongodb] connected established. starting watchers...');
  // updateAllContributions();
  console.info('[mongodb] Watching....');
});

// Stop watchers when connection to database is lost
connection.on('disconnected', () => {
  console.warn('[mongodb] connection lost. stopping watchers...');
  switch (SERVICE) {
    case 'vaults':
      vaultWatcher.stop();
      break;
    case 'binance':
      binanceBalanceWatcher.stop();
      break;
    // case 'wallets':
    //   walletWatcher.stop();
    //   break;
    case 'balance':
      balanceWatcher.stop();
      break;
    case 'portfolio':
      requestWatcher.stop();
      break;
  }
});
