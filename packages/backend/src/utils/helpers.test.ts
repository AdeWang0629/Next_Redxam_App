import { generateCode, isValidEmail } from './helpers';

test('generateCode returns an string', () => {
  expect(typeof generateCode('sample@email.com')).toBe('string');
});

test('wrong email', () => {
  expect(isValidEmail('gfd.fdg.@gmail..com')).toBeFalsy();
});
test('valid email', () => {
  expect(isValidEmail('test@redxam.com')).toBeTruthy();
});
