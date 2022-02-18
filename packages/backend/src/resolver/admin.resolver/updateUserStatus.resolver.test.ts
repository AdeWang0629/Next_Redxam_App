import { updateUserStatus } from './updateUserStatus.resolver';
import { Request } from 'jest-express/lib/request';
import { User, Admin } from '@/database';
const { TEST_USER_ID } = process.env;

describe('user status resolver tests', () => {
  const userId = TEST_USER_ID || '613690d4081c88521d9bf8eb';

  test('wrong admin token', async () => {
    const req: any = new Request();
    req.headers.authorization = 'Bearer Wrongtoken';
    const res = await updateUserStatus(
      { arg: { email: 'test@redxam.com', status: 'invited' } },
      req
    );
    expect(res.message).toMatch('jwt malformed');
    expect(res.success).toBeFalsy();
  });

  test('email not in waitlist', async () => {
    const { token } = await Admin.findOne();
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;

    const res = await updateUserStatus(
      { arg: { email: 'nonexisted@redxam.com', status: 'invited' } },
      req
    );
    expect(res.message).toMatch('email is not in the waitlist');
    expect(res.success).toBeFalsy();
  });

  test('user is already invited', async () => {
    const { token } = await Admin.findOne();
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;

    const user = await User.findOne({ _id: userId });
    const userLastStatus = user.accountStatus;
    await user.updateOne({ $set: { accountStatus: 'invited' } });

    const res = await updateUserStatus(
      { arg: { email: user.email, status: 'invited' } },
      req
    );
    expect(res.message).toMatch('user is already invited');
    expect(res.success).toBeFalsy();
    await user.updateOne({ $set: { accountStatus: userLastStatus } });
  });

  test('user status updates sucessfully', async () => {
    const { token } = await Admin.findOne();
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;

    const user = await User.findOne({ _id: userId });
    const userLastStatus = user.accountStatus;
    await user.updateOne({ $set: { accountStatus: 'pending' } });

    const res = await updateUserStatus(
      { arg: { email: user.email, status: 'invited' } },
      req
    );
    expect(res.message).toMatch('user status updated succesfully');
    expect(res.success).toBeTruthy();
    await user.updateOne({ $set: { accountStatus: userLastStatus } });
  });
});
