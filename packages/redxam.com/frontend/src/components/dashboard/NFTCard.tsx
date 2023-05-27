import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import nftpic from '@public/images/nfts/losmuertos.png';
import CardWithImage from './CardWithImage';

interface NFTCardProps {}

const NFTCard: NextPage<NFTCardProps> = () => {
  const router = useRouter();
  return (
    <CardWithImage
      cardImage={nftpic}
      cardText={"NFT's are coming to redxam soon"}
      buttonText="Learn more"
      buttonAction={() => {
        router.push(
          'https://redxam.medium.com/redxams-nft-gallery-dd8eeb056616'
        );
      }}
    />
  );
};

export default NFTCard;
