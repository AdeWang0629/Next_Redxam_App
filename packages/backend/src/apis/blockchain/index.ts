import axiosModule from 'axios';

const { BLOCKCHAIN_URL, BLOCKCHAIN_KEY } = process.env;

const axios = axiosModule.create({
  baseURL: BLOCKCHAIN_URL,
  auth: {
    username: 'x',
    password: BLOCKCHAIN_KEY,
  },
});

const getTx = async (txHash: String) => {
  try {
    const tx = (await axios.get(`/tx/${txHash}`)).data;
    return { status: 200, tx };
  } catch (error) {
    return { status: 404, tx: null };
  }
};

const getTxByAddress = async (address: String) => {
  let addressTxs = [];
  let areMoreThanHundred = false;
  let lastTxId = 0;

  try {
    do {
      const txs = (
        await axios.get(
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
    return { status: 404, txs: null };
  }
};

const getAddressUtxo = async (address: String) => {
  const utxo = (await axios.get(`/coinbyaddr/${address}`)).data;
  return utxo;
};

const getAddressBalance = async (address: String) => {
  const utxo = (await axios.get(`/coinbyaddr/${address}`)).data;
  let balance = 0;
  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  utxo.forEach(({ value }) => (balance += value));
  return balance;
};

const isNodeOn = async () => {
  const ping = (await axios.post('/', JSON.stringify({ method: 'ping' }))).status;
  return ping === 200;
};

export default {
  getTx,
  getTxByAddress,
  isNodeOn,
  getAddressUtxo,
  getAddressBalance,
};
