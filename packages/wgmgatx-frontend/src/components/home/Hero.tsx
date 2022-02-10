import Image from 'next/image';
import unsplash from '@public/unsplash.png';

const Hero = () => {
  return (
    <div>
      <Image
        src={unsplash}
        alt="WGMG Hero Image"
        height="700px"
        className="rounded-[18px]"
      />
    </div>
  );
};

export default Hero;
