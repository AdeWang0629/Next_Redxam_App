import getAuthorizationToken from './getAuthorizationToken';

describe('test getAuthorizationHeader function helper', () => {
  test('no authorization header', () => {
    const res = getAuthorizationToken(null);
    expect(res.message).toMatch('no authorization header');
    expect(res.success).toBeFalsy();
  });
  test('invalid token type', () => {
    const res = getAuthorizationToken('badtype badtoken');
    expect(res.message).toMatch('invalid token type');
    expect(res.success).toBeFalsy();
  });
  test('no token passed', () => {
    const res = getAuthorizationToken('Bearer');
    expect(res.message).toMatch('no token passed');
    expect(res.success).toBeFalsy();
  });
});
