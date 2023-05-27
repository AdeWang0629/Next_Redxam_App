import { sign } from 'jsonwebtoken';
import { Request } from 'jest-express/lib/request';
import { User } from '@/database';
import { addDiscord } from './addDiscord.resolver';

const { TEST_USER_ID, TOKEN_SECURITY_KEY } = process.env;

describe('Add discord user id to database user to interact with discord bot', () => {
  const userId = TEST_USER_ID || '613690d4081c88521d9bf8eb';
  test('discordId updates successfully', async () => {
    const token = sign({ userId, type: 'verified' }, TOKEN_SECURITY_KEY);
    const req: any = new Request();
    req.headers.authorization = `Bearer ${token}`;
    console.log(token);
    const user = await User.findOne({ _id: userId });
    const lastDiscordId = user.discordId;

    const testId = 'test discord id';
    const res = await addDiscord({ arg: testId }, req);

    const testUser = await User.findOne({ _id: userId }, { discordId: 1 });

    expect(res.message).toMatch('discord added successfully');
    expect(res.success).toBeTruthy();
    expect(testUser.discordId).toMatch(testId);

    user.updateOne({ $set: { discordId: lastDiscordId } });
  });
});
