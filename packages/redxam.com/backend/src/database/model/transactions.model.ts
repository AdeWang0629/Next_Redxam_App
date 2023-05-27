import { Document, model, Model } from 'mongoose';
import { findOneOrCreate } from '../functions/findOneOrCreate';
import { TransactionSchema } from '../schema/transactions.schema';

export interface Transactions {
  userId: string;
  hash: string;
  address: string;
  type: string;
  amount: number;
  index: number;
  currency: string;
  timestamp: number;
  processedByRedxam: Boolean;
  status: string;
  bankName: string;
  bankIcon: string;
  bankType: string;
  network?: string;
  direction: string;
}
export interface TransactionsProps extends Document, Transactions {
  created_at?: Date;
  updated_at?: Date;
}

export interface TransactionsModel extends Model<TransactionsProps> {
  findOneOrCreate: findOneOrCreate<TransactionsProps, TransactionsModel>;
}

export const Transactions = model<TransactionsProps, TransactionsModel>(
  'Transactions',
  TransactionSchema
);
