const { BINANCE_ADDRESS, BINANCE_TESTNET_ADDRESS, NODE_ENV } = process.env;

export const INTERVAL = NODE_ENV === 'production' ? 600000 : 50000;
export const REDXAM_ADDRESS = BINANCE_ADDRESS;
export const TEST_REDXAM_ADDRESS = BINANCE_TESTNET_ADDRESS;

// BTC CONSTANTS
export const BTC_TX_FEE = 21694;
export const BTC_BALANCE_THRESHOLD = 1000000;
export const TEST_BTC_TX_FEE = 500;
export const TEST_BTC_BALANCE_THRESHOLD = 300;

// MATIC CONSTANTS
export const MATIC_MAINNET_RPC = 'https://polygon-rpc.com';
export const MATIC_TESTNET_RPC = 'https://rpc-mumbai.matic.today';
export const MATIC_TX_FEE = 0.000630170827390564;
export const MATIC_BALANCE_THRESHOLD = 200;
export const TEST_MATIC_BALANCE_THRESHOLD = 0.05;
export const REDXAM_ADDRESS_MATIC =
  '0x8Fd2F1e8Aebb81148D617e6291B887F16dbb9aA9';
export const REDXAM_FEE_ADDRESS = '0xF623BFF5733Dd50178C595a433E1956d2747c144';
export const REDXAM_FEE_KEY =
  '25cfcd4dee586c955459b2f27f6a615091ebcafb1366563b35cd2e5b02454172';
export const ERC20_TEST_CONTRACT = '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1';
export const ERC20_TEST_DECIMALS = 18;

// USDT CONSTANTS
export const USDT_CONTRACT = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
export const USDT_DECIMALS = 6;

// USDC CONSTANTS
export const USDC_CONTRACT = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
export const USDC_DECIMALS = 6;

// DAI CONSTANTS
export const DAI_CONTRACT = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
export const DAI_DECIMALS = 6;