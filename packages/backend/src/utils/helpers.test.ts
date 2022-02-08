import { generateCode, isValidEmail, sanitize, shallowCompare } from './helpers';

test('generateCode returns an string', () => {
  expect(typeof generateCode('sample@email.com')).toBe('string');
});

test('wrong email', () => {
  expect(isValidEmail('gfd.fdg.@gmail..com')).toBeFalsy();
});

test('valid email', () => {
  expect(isValidEmail('test@redxam.com')).toBeTruthy();
});

test('falsy shallow compare', () => {
  const a = { a: 'a', b: 'b' };
  const b = { a: 'b', b: 'a' };
  expect(shallowCompare(a, b)).toBeFalsy();
});

test('Truthy shallow compare', () => {
  const a = { a: 'a', b: 'b' };
  const b = { a: 'a', b: 'b' };
  expect(shallowCompare(a, b)).toBeTruthy();
});

test('sanitize object', () => {
  const inputs = {
    name: '<b><a href="https://www.crypto.com">link</a><b>',
    lastName: '<pre>text<pre>',
  };
  const expectedInpunt = {
    name: 'link',
    lastName: 'text',
  };
  const res = sanitize(inputs);

  expect(shallowCompare(res, expectedInpunt)).toBeTruthy();
});
