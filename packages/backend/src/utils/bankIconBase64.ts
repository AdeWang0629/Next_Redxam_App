import fs from 'fs';
import path from 'path';

const bankIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'bankIcon.png'),
  'base64'
);
const boaIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'boa200.png'),
  'base64'
);
const tdbankIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'tdbank200.png'),
  'base64'
);
const chaseIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'chase200.png'),
  'base64'
);
const wellsIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'wf200.png'),
  'base64'
);
const usBankIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'usbank200.png'),
  'base64'
);
const capitalOneIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'capone200.png'),
  'base64'
);
const amexIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'amex200.jpg'),
  'base64'
);
const svbIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'svb200.png'),
  'base64'
);
const bbvaIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'bbva200.png'),
  'base64'
);
const FirstRepublicIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'fr200.png'),
  'base64'
);
const mercuryIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'mercury200.png'),
  'base64'
);
const brexIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'brex200.png'),
  'base64'
);
const pncIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'pnc200.png'),
  'base64'
);
const creditOneIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'creditone200.png'),
  'base64'
);
const usaaIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'usaa200.png'),
  'base64'
);
const AngelListIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'angel200.png'),
  'base64'
);
const citiIconAsBase64 = fs.readFileSync(
  path.join(__dirname, 'bankIcons', 'citi200.png'),
  'base64'
);

export default function getBase64Icon(bank: string) {
  switch (bank) {
    case 'TD Bank':
      return tdbankIconAsBase64;

    case 'Bank of America':
      return boaIconAsBase64;

    case 'Chase':
      return chaseIconAsBase64;

    case 'Wells Fargo':
      return wellsIconAsBase64;

    case 'US Bank':
      return usBankIconAsBase64;

    case 'CapitalOne':
      return capitalOneIconAsBase64;

    case 'American Express':
      return amexIconAsBase64;

    case 'Silicon Valley Bank':
      return svbIconAsBase64;

    case 'BBVA':
      return bbvaIconAsBase64;

    case 'First Republic':
      return FirstRepublicIconAsBase64;

    case 'Mercury':
      return mercuryIconAsBase64;

    case 'Brex':
      return brexIconAsBase64;

    case 'PNC':
      return pncIconAsBase64;

    case 'CreditOne':
      return creditOneIconAsBase64;

    case 'USAA':
      return usaaIconAsBase64;

    case 'AngelList':
      return AngelListIconAsBase64;

    case 'Citibank':
      return citiIconAsBase64;

    default:
      return bankIconAsBase64;
  }
}
