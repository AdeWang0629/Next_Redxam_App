import { ECPair, TransactionBuilder } from 'bitcoinjs-lib';
import { Hashstring } from 'blockchair-api';
import { NETWORK } from './consts';
import { Tx } from './types';
const { TX_FEE } = require('../../service/wallets/consts');

interface TxData {
  senderWIF: Hashstring;
  receiverAddress: Hashstring;
}
/**
 * Creates Raw Tx with all funds in wallets
 */
export const createRawTx = (txData: TxData, prevTxs: Tx[]): Tx => {
  const { senderWIF, receiverAddress } = txData;

  var txb = new TransactionBuilder(NETWORK);

  let inputBalance = 0;
  prevTxs.forEach(({ txHash, txIndex, value }) => {
    txb.addInput(txHash, txIndex);
    inputBalance += value;
  });

  // output is our Binance wallet
  txb.addOutput(receiverAddress, inputBalance - TX_FEE);

  // sign with sender WIF (private key in WIF format)
  let wif = senderWIF;
  let keyPairSpend = ECPair.fromWIF(wif, NETWORK);

  prevTxs.forEach((tx, idx) => {
    txb.sign(idx, keyPairSpend);
  });

  //   print tx hex
  let txHex = txb.build().toHex();

  return { txHash: txHex };

  // const tx = new TransactionBuilder(NETWORK);
  // const sender = ECPair.fromWIF(senderWIF, NETWORK);
  // const index = txIndex + 1;

  // tx.addInput(txHash, index);
  // tx.addOutput(receiverAddress, amount);
  // tx.sign(0, sender);

  // const hash = tx.build().toHex();

  // return { txHash: hash, txIndex: index };
};
