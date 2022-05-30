import 'dotenv/config';
import '@/database';

import { connection } from 'mongoose';
import { User, Transactions } from '@/database';

connection.on('connected', handleAccountChange);
connection.on('error', exit);

async function handleAccountChange() {
  try {
    await User.updateMany({}, { $set: { balanceRecords: [], balance: 0 } });
    // await Transactions.deleteMany({});
  } catch (err) {
    console.error('[ERROR] : ', err);
  } finally {
    console.log('[INFO]: done');
    return exit();
  }
}

function exit() {
  console.log('[INFO] : Exiting..');
  return process.exit();
}
