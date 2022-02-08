interface Tx {
  hash: string;
  witnessHash: string;
  fee: number;
  rate: number;
  mtime: number;
  height: number;
  block: string | -1;
  time: number;
  index: number;
  version: number;
  inputs: {
    prevout: {
      hash: string;
      index: number;
    };
    script: string;
    witness: string;
    sequence: number;
    coin: {
      version: number;
      height: number;
      value: number;
      script: string;
      address: string;
      coinbase: boolean;
    };
  }[];
  outputs: {
    value: number;
    script: string;
    address: string;
  }[];
  locktime: number;
  hex: string;
  confirmations: number;
}
