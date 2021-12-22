import { connect, connection, ConnectionOptions } from 'mongoose';

const { NODE_ENV, MONGODB_URL, MONGODB_URL_PROD } = process.env;

const MONGO_URI = NODE_ENV === 'production' ? MONGODB_URL_PROD : MONGODB_URL;
const MONGO_OPTS: ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

connect(MONGO_URI, MONGO_OPTS);

connection.on('connecting', () => console.debug('[mongodb] connecting'));
connection.on('connected', () => console.debug('[mongodb] connected'));
connection.on('disconnecting', () => console.debug('[mongodb] disconnecting'));
connection.on('close', () => console.debug('[mongodb] close'));

export * from './model/contribution.model';
export * from './model/manualUser.model';
export * from './model/referrer.model';
export * from './model/totalPrice.model';
export * from './model/user.model';
export * from './model/wallet.model';
export * from './model/vault.model';
export * from './model/deposits.model';
export * from './model/admin.model';
export * from './model/changeRequest.model';
export * from './enums';
