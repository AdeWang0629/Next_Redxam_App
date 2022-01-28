import { sign } from 'jsonwebtoken';
import { Request } from 'jest-express/lib/request';
import { User } from '@/database';
import { emailValidation, emailValidateToken } from './emailValidation.resolver';
import { NewUser } from '../types';

const { TEST_USER_ID, TOKEN_SECURITY_KEY } = process.env;

describe('Email validation when user try to sign up', () => {
  const userId = TEST_USER_ID || '613690d4081c88521d9bf8eb';
  test('existing user does not get validation email', async () => {
    const req: any = new Request();
    req.headers.origin = 'http://localhost:3000';
    const { email } = await User.findOne({ _id: userId });
    const arg: NewUser = { email };
    const res = await emailValidation({ arg }, req);
    expect(res.message).toMatch('Successfully registered!');
    expect(res.success).toBeTruthy();
  });
  test('sent verification email to non existing user', async () => {
    const req: any = new Request();
    req.headers.origin = 'http://localhost:3000';
    const arg: NewUser = { email: 'test@redxam.com' };
    const res = await emailValidation({ arg }, req);
    expect(res.message).toMatch('verification email sent succesfully');
    expect(res.success).toBeTruthy();
  });
});

describe('email validate token from email', () => {
  test('token expired', async () => {
    const expiredToken =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob3NlcGhAcmVkeGFtLmNvbSIsImlhdCI6MTY0MzQwODI1NiwiZXhwIjoxNjQzNDA4Mzc2fQ.E8W50yijqcsykmzwqXpoQvg7S6RXrtLBtSoBiL2UqDM';
    const req: any = new Request();
    req.headers.origin = 'http://localhost:3000';
    req.headers.authorization = expiredToken;
    const res = await emailValidateToken(null, req);
    expect(res.message).toMatch('jwt expired');
    expect(res.success).toBeFalsy();
  });

  test('token validation', async () => {
    const verificationToken = sign({ email: 'test@redxam.com' }, TOKEN_SECURITY_KEY, {
      expiresIn: '1h',
    });
    const req: any = new Request();
    req.headers.origin = 'http://localhost:3000';
    req.headers.authorization = `Bearer ${verificationToken}`;
    const res = await emailValidateToken(null, req);
    expect(res.message).toMatch('Successfully registered!');
    expect(res.success).toBeTruthy();
    User.deleteOne({ email: 'test@redxam.com' });
  });
});
