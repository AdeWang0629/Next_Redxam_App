import { JWT } from '@/config/jwt';
import { Transactions, TransactionTypes } from '@/database';
import { Request } from 'express';

const getUserTransactions = async (userId: string) => {
  return Transactions.find({ userId });
};

const getData = async (userId: string) => {
  const userTransactions = getUserTransactions(userId);
  return Promise.all([userTransactions]);
};

export const userTransactions = async (_: void, req: Request) => {
  console.debug('[Resolve] transactions called');
  const payload = await new JWT().authorize(req.headers.authorization);
  console.log(payload);

  if (!payload || payload.type !== 'verified') {
    return null;
  }

  try {
    const data = await getData(payload.userId);

    const [userTransactionsData] = data;
    return [...userTransactionsData];
  } catch {
    return null;
  }
};
