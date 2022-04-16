import type { NextPage } from 'next';
import Image from 'next/image';
import Card from './Card';

interface CardWithImageProps {
  cardImage: StaticImageData;
  cardText: string;
  buttonText: string;
  buttonAction: Function;
}

const CardWithImage: NextPage<CardWithImageProps> = ({
  cardImage,
  cardText,
  buttonText,
  buttonAction
}) => (
  <Card width="md:w-[440px]" height="h-[fit-content] mt-6 md:mt-0">
    <div className="w-full bg-white flex flex-col justify-center items-center rounded-[25px] py-16 px-8 shadow-card">
      <Image
        src={cardImage}
        alt={cardText}
        width="324px"
        height="175px"
        objectFit="cover"
        className="rounded-full"
      />
      <p className="mt-6 mb-16 text-center text-sm w-full md:w-[23.3125rem]">
        {cardText}
      </p>
      <button
        className="bg-card-button text-white py-4 px-16 rounded-full font-secondary font-medium"
        style={{
          boxShadow:
            '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)'
        }}
        onClick={() => buttonAction()}
      >
        {buttonText}
      </button>
    </div>
  </Card>
);

export default CardWithImage;
