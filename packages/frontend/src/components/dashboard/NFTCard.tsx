import type { NextPage } from 'next';
import Image from 'next/image';
import CardWithImage from './CardWithImage';
import picture from '@public/images/dashboard/leafs-bg.svg';
import nftpic from '@public/images/nfts/losmuertos.png';
import { useRouter } from 'next/router';

interface NFTCardProps {}

const NFTCard: NextPage<NFTCardProps> = ({}) => {
  const router = useRouter();
  return (
    <CardWithImage
      cardImage={nftpic}
      cardText={"NFT's are coming to redxam soon"}
      buttonText={'Learn more'}
      buttonAction={() => {
        router.push(
          'https://redxam.medium.com/redxams-nft-gallery-dd8eeb056616'
        );
      }}
    />
  );
};

export default NFTCard;
