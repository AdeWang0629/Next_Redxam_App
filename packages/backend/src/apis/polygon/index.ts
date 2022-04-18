import axios from 'axios';
import { MaticTx } from './types';

const { POLYGONSCAN_KEY, POLYGON_MAIN, POLYGON_TESTNET } = process.env;
const testContract = '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1';

const getWalletTxs = async (
  address: string,
  contractP: string,
  isTestNet: boolean = false
): Promise<MaticTx[]> => {
  const baseUrl = isTestNet ? POLYGON_TESTNET : POLYGON_MAIN;
  const contract = isTestNet ? testContract : contractP;

  const res = await axios.get(
    `${baseUrl}/api?module=account&action=tokentx&contractaddress=${contract}&address=${address}&page=1&offset=10&sort=desc&apikey=${POLYGONSCAN_KEY}`
  );
  if (res.data.status) {
    return res.data.result as MaticTx[];
  } else {
    throw new Error(res.data.result);
  }
};

const getWalletBalance = async (
  address: string,
  contractP: string,
  isTestNet: boolean = false
): Promise<number> => {
  const baseUrl = isTestNet ? POLYGON_TESTNET : POLYGON_MAIN;
  const contract = isTestNet ? testContract : contractP;
  const decimals = isTestNet ? 18 : 6;

  const res = await axios.get(
    `${baseUrl}/api?module=account&action=tokenbalance&contractaddress=${contract}&address=${address}&tag=latest&apikey=${POLYGONSCAN_KEY}`
  );

  if (res.data.status) {
    return res.data.result / Math.pow(10, decimals);
  } else {
    throw new Error(res.data.result);
  }
};

export default {
  getWalletTxs,
  getWalletBalance
};
