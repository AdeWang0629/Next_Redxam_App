import { PolygonToken } from './polygon-erc20-token';
import { USDT_CONTRACT, USDT_DECIMALS } from './consts';

import ABI from './polygon-abis/usdt-polygon-mainnet.abi.json';

export class USDTMainnetToken extends PolygonToken {
  readonly name;
  readonly symbol;
  readonly network;
  readonly contract;
  readonly decimals;
  readonly abi;

  constructor() {
    super();
    this.name = 'USD Tether';
    this.symbol = 'USDT';
    this.network = 'POLYGON_USDT';
    this.contract = USDT_CONTRACT;
    this.decimals = USDT_DECIMALS;
    this.abi = ABI;
  }
}
