import { PolygonToken } from './polygon-erc20-token';

export class USDTTestnetToken extends PolygonToken {
  readonly name;
  readonly symbol;
  readonly network;
  readonly isTestNet;
  readonly contract;

  constructor() {
    super();
    this.name = 'ERC20 TEST';
    this.symbol = 'ERC20TEST';
    this.network = 'TEST_USDT_POLYGON';
    this.isTestNet = true;
    this.contract = '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1';
  }
}
