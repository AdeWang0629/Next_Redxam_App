/* eslint-disable @typescript-eslint/lines-between-class-members */
import { User } from '@/database';
import { Token, Wallet } from './token';
import { USDTMainnetToken } from './usdt-polygon-mainnet.token';

export class USDTTestnetToken extends USDTMainnetToken implements Token {
  readonly symbol;
  readonly isTestNet;
  readonly txFee;
  readonly threshold;
  readonly redxamAddress;
  readonly network;

  constructor() {
    super();
    this.isTestNet = true;
    this.symbol = 'USDT';
    this.network = 'TEST_USDT_POLYGON';
  }
}
