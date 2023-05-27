import { PolygonToken } from './polygon-erc20-token';
import { DAI_CONTRACT, DAI_DECIMALS } from './consts';

import ABI from './polygon-abis/dai-polygon-mainnet.abi.json';
import { Fiats } from './token';

export class DAIMainnetToken extends PolygonToken {
  readonly name;
  readonly symbol;
  readonly network;
  readonly contract;
  readonly decimals;
  readonly abi;

  constructor() {
    super();
    this.name = 'Dai Stablecoin';
    this.symbol = 'DAI';
    this.network = 'POLYGON_DAI';
    this.contract = DAI_CONTRACT;
    this.decimals = DAI_DECIMALS;
    this.abi = ABI;
  }

  async tokenToFiat(wey: number, fiat: Fiats): Promise<number> {
    return wey / 10 ** 18;
  }
}
