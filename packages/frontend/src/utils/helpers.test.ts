import { getMonthName, validateEmail } from './helpers'

test('getMonthName returns "January" for month number 1', () => {
    expect(getMonthName(1)).toBe('January');
});

test('validateEmail returns false for an invalid email', () => {
  expect(validateEmail('sample@email')).toBe(false);
});
