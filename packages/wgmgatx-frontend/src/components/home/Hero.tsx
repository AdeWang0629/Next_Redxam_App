import Image from 'next/image';
import unsplash from '@public/unsplash.png';

const Hero = () => {
  return (
    <section className="mt-8">
      <Image
        src={unsplash}
        alt="WGMG Hero Image"
        height="700px"
        className="rounded-2xl"
      />
    </section>
  );
};

export default Hero;
