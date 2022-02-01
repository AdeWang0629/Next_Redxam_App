const getAuthorizationToken = (authorizationHeader: string) => {
  const authorization = authorizationHeader?.split(' ');
  if (!authorization) {
    console.debug('No authorization header!');
    return { message: 'no authorization header', success: false };
  }

  const [tokenType, token] = authorization;
  if (tokenType !== 'Bearer') {
    console.debug('Invalid token type!');
    return { message: 'invalid token type', success: false };
  }

  if (!token) {
    console.debug('No token passed!');
    return { message: 'no token passed', success: false };
  }

  return { token, success: true };
};

export default getAuthorizationToken;
