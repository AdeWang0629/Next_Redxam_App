import { updateReferral } from './updateReferral.resolver';
import { Request } from 'jest-express/lib/request';
import { User, Admin } from '@/database';
const { TEST_USER_ID } = process.env;

describe('test referralScript resolver', () => {
  const userId = TEST_USER_ID || '613690d4081c88521d9bf8eb';
  test('test update user with no referralCode', async () => {
    const user = await User.findOne({ _id: userId });
    await user.updateOne({ $unset: { waitlistToken: '', referralCode: '' } });

    const { token } = await Admin.findOne();
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;
    const res = await updateReferral(null, req);

    const updatedUser = res.updatedUsers.find(
      updated => updated.userId.toString() === userId,
    );
    expect(updatedUser).not.toBeUndefined();
    expect(res.success).toBeTruthy();
  });

  test('should not update any user', async () => {
    const { token } = await Admin.findOne();
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;

    const user = await User.find({ referralCode: null });
    if (user.length > 0) {
      await updateReferral(null, req);
    }
    const res = await updateReferral(null, req);

    expect(res.updatedUsers).toHaveLength(0);
    expect(res.amount).toBe(0);
    expect(res.success).toBeTruthy();
  });
});
