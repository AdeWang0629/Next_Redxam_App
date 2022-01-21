import WAValidator from 'trezor-address-validator';
import { ECPair, payments, networks } from 'bitcoinjs-lib';
import blockchain from '@/apis/blockchain';
import { Token, Wallet } from './token';

export class BitcoinBitcoinMainnetToken implements Token {
  readonly name = 'Bitcoin';
  readonly symbol = 'BTC';
  readonly network = 'Bitcoin';
  readonly isTestNet;
  constructor() {
    this.isTestNet = false;
  }
  createWallet(): Wallet {
    const network = networks['bitcoin'];
    const keyPair = ECPair.makeRandom({ network });
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network });
    const wif = keyPair.toWIF();
    return { address, wif, txsCount: 0 };
  }
  validateAddress(address: string): boolean {
    return WAValidator.validate(address, this.symbol);
  }
  sendToAddress(address: string, amount: number): boolean {
    return true;
  }
  async getBalance(address: string): Promise<number> {
    const balance = await blockchain.getAddressBalance(address);
    return balance;
  }
  // Methods not defined in the interface should be private
  private someBitcoinMethod(): void {
    // ...
  }
}
