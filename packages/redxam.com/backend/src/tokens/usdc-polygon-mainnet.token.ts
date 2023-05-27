import { PolygonToken } from './polygon-erc20-token';
import { USDC_CONTRACT, USDC_DECIMALS } from './consts';

import ABI from './polygon-abis/usdc-polygon-mainnet.abi.json';

export class USDCMainnetToken extends PolygonToken {
  readonly name;
  readonly symbol;
  readonly network;
  readonly contract;
  readonly decimals;
  readonly abi;

  constructor() {
    super();
    this.name = 'USD Coin';
    this.symbol = 'USDC';
    this.network = 'POLYGON_USDC';
    this.contract = USDC_CONTRACT;
    this.decimals = USDC_DECIMALS;
    this.abi = ABI;
  }
}
