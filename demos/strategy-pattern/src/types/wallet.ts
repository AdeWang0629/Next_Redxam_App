import { Token } from "../tokens/token";
import { Transaction } from "./transaction";

export abstract class Wallet {
  readonly abstract userId: string;
  readonly abstract token: Token;
  readonly abstract address: string;
  readonly abstract transactions: Transaction[];

  getTransactionsFromBlockchain(): Transaction[] {
    // this.token.getTransactions();
    return [];
  }
  getTransactionsFromDB(): Transaction[] {
    // this.db.get({...});
    return [];
  }
}
