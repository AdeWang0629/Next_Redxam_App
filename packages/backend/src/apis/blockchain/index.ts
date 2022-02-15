import axiosModule from 'axios';
import { Tx, UnspentInfo, Network } from './types';

const {
  BLOCKCHAIN_URL,
  BLOCKCHAIN_KEY,
  BLOCKCHAIN_TESTNET_URL,
  BLOCKCHAIN_TESTNET_KEY,
} = process.env;

const axiosMainet = axiosModule.create({
  baseURL: BLOCKCHAIN_URL,
  auth: {
    username: 'x',
    password: BLOCKCHAIN_KEY,
  },
});

const axiosTestnet = axiosModule.create({
  baseURL: BLOCKCHAIN_TESTNET_URL,
  auth: {
    username: 'x',
    password: BLOCKCHAIN_TESTNET_KEY,
  },
});

const network = (isTestNet:Network) => isTestNet ? axiosTestnet : axiosMainet;

const getTx = async (txHash: string, isTestNet:Network = false): Promise<{ status: number; tx: Tx | null }> => {
  try {
    const tx: Tx = (await network(isTestNet).get(`/tx/${txHash}`)).data;
    return { status: 200, tx };
  } catch (error) {
    return { status: 404, tx: null };
  }
};

const getTxByAddress = async (
  address: String,
  isTestNet:Network = false,
): Promise<{ status: number; txs: Tx[] | null; error?: string }> => {
  let addressTxs = [];
  let areMoreThanHundred = false;
  let lastTxId = 0;

  try {
    do {
      const txs = (
        await network(isTestNet).get(
          `/tx/address/${address}${areMoreThanHundred ? `?after=${lastTxId}` : ''} `,
        )
      ).data;
      if (txs.length < 1) break;
      addressTxs = addressTxs.concat(txs);
      areMoreThanHundred = txs.length > 99;
      lastTxId = txs[txs.length - 1].hash;
    } while (areMoreThanHundred);
    return { status: 200, txs: addressTxs };
  } catch (error) {
    return { status: 404, txs: null, error };
  }
};

const getAddressUtxo = async (address: string, isTestNet:Network = false): Promise<UnspentInfo[]> =>
  (await network(isTestNet).get(`/coinbyaddr/${address}`)).data;

const getAddressBalance = async (address: String, isTestNet:Network = false): Promise<number> => {
  const utxo = (await network(isTestNet).get(`/coinbyaddr/${address}`)).data;
  let balance = 0;
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  utxo.forEach(({ value }) => balance += value);
  return balance;
};

const broadcastTx = async (txHash:string, isTestNet:Network = false) =>
  network(isTestNet).post('/', { method: 'sendrawtransaction', params: [txHash] });

const isNodeOn = async (isTestNet:Network = false) => (await network(isTestNet).post('/', { method: 'ping' })).status === 200;

export default {
  broadcastTx,
  getTx,
  getTxByAddress,
  isNodeOn,
  getAddressUtxo,
  getAddressBalance,
};
