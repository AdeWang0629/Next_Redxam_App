import axios from 'axios';
import Web3 from 'web3';
import { User } from '@/database';
import { promisify } from './utils';
import beefyCeloDaiUsdContract from './contractAPI';

const redxamAddress = '0xEfAe44925c9D7550429AF8B54897A919cE46217B';
const ownContract = '0x635Dc716B223e89783D6a95045d3939fCb445AB4';

const handleDaiUsd = async () => {
  const decimals: number = <number>(
    await promisify(cb => beefyCeloDaiUsdContract.methods.decimals().call(cb))
  );
  const derivative: number = <number>(
    await promisify(cb =>
      beefyCeloDaiUsdContract.methods.balanceOf(ownContract).call(cb)
    )
  );
  const tokenPrice: number = <number>(
    await promisify(cb =>
      beefyCeloDaiUsdContract.methods.getPricePerFullShare().call(cb)
    )
  );

  const lpPrice = await axios
    .get('https://api.beefy.finance/lps')
    .then(res => res.data['sushi-celo-cusd-dai']);

  const interestRate = await axios
    .get('https://api.beefy.finance/apy')
    .then(res => res.data['sushi-celo-cusd-daiv2']);

  const parsedDerivative = derivative / Math.pow(10, decimals);
  const parsedTokenPrice = tokenPrice / Math.pow(10, decimals);
  const tokenBalance = parsedDerivative * parsedTokenPrice;
  const balance = lpPrice * tokenBalance;
  const parsedInterestRate = interestRate * 100;

  return {
    prevBalance: balance,
    amount: 0,
    balance,
    interestRate: parsedInterestRate,
    token: 'Moo Sushi cUSD-DAI',
    tokenBalance
  };
};
