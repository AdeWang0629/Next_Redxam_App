import { JWT } from '@/config/jwt';
import { User } from '@/database';
import { Request } from 'express';

export const addDiscord = async ({ arg }, req: Request) => {
  console.debug('[Resolve] discord called');
  const payload = await new JWT().authorize(req.headers.authorization);

  if (!payload || payload.type !== 'verified') {
    return { success: false, message: 'wrong token' };
  }

  try {
    const user = await User.findOne({ _id: payload.userId });
    if (!user) {
      return { success: false, message: 'user not found' };
    }
    await user.updateOne({ $set: { discordId: arg } });
    return { success: true, message: 'discord added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
