import crypto from 'crypto';
import striptags from 'striptags';

export function generateCode(email: string) {
  let code = crypto.createHash('md5').update(email).digest('hex').slice(0, 6);
  let replacements = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
  };

  return code
    .split('')
    .map(char => (replacements[char] ? replacements[char] : char))
    .join('')
    .toUpperCase();
}

export const isValidEmail = (email: string): boolean =>
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email,
  );

export const sanitize = <T>(inputs: T): T => {
  let sanitizedInpunts: T = {} as T;
  Object.keys(inputs).forEach(key => {
    sanitizedInpunts[key] = striptags(inputs[key].toString());
  });
  return sanitizedInpunts;
};

export const shallowCompare = <T>(obj1: T, obj2: T): boolean =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
