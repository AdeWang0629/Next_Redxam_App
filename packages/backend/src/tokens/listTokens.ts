import { Token } from './token';
import btcmainent, { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';

const tokens: Token[] = [new BitcoinBitcoinMainnetToken()];
const btc = new BitcoinBitcoinMainnetToken();

const table = tokens.map(token => ({
  Name: token.name,
  Symbol: token.symbol,
  Network: token.network,
  Testnet: token.isTestNet,
}));

console.table(table);
