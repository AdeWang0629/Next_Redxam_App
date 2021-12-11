import Blockchair, { Hashstring } from 'blockchair-api';
import { Tx } from './types';

export const broadcastTx = (txHash: Hashstring) => {
  return Blockchair.broadcastTx(txHash);
};
