import { mailUser } from './updateUserDeposits';
const { TEST_USER_ID } = process.env;
describe('User recieves an email when a txs is pending and confirmed', () => {
  const userId = TEST_USER_ID || '613690d4081c88521d9bf8eb';

  test('it sends an email when there is a new pending tx', async () => {
    const status = 'pending';
    const txDeposit = null;
    const value = 3000;
    const res = await mailUser(status, txDeposit, value, userId);
    expect(res.status).toEqual(202);
    expect(res.message).toMatch('pending tx email sent');
  });

  test('it sends an email when the tx is confirmed after being pending', async () => {
    const status = 'completed';
    const txDeposit = { status: 'pending' };
    const value = 3000;
    const res = await mailUser(status, txDeposit, value, userId);
    expect(res.status).toEqual(202);
    expect(res.message).toMatch('confirmed tx email sent');
  });

  test('it sends an email when the tx is confirmed but was not registered as pending', async () => {
    const status = 'completed';
    const txDeposit = null;
    const value = 3000;
    const res = await mailUser(status, txDeposit, value, userId);
    expect(res.status).toEqual(202);
    expect(res.message).toMatch('confirmed tx email sent');
  });
});
