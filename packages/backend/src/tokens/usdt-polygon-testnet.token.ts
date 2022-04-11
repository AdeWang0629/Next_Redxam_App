/* eslint-disable @typescript-eslint/lines-between-class-members */
import { User } from '@/database';
import { Token, Wallet } from './token';
import { MATICMainnetToken } from './usdt-polygon-mainnet.token';

export class MATICTestnetToken extends MATICMainnetToken implements Token {
  readonly symbol;

  readonly isTestNet;

  readonly txFee;

  readonly threshold;

  readonly redxamAddress;

  constructor() {
    super();
    this.isTestNet = true;
    this.symbol = 'TEST_MATIC';
  }
}
