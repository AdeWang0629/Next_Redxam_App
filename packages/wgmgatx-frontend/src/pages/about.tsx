import Members from '@components/about/Members';
import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import Image from 'next/image';
import wgmgAboutImg from '@public/images/about/about-wgmg.jpeg';
import wgmgFlyer from '@public/images/about/flyerWGWG.jpg';

const About: NextPage = () => {
  return (
    <>
      {/* <Navbar title="About" /> */}
      <div className="flex flex-col items-center pt-14 p-10 md:p-10">
        <h1 className="text-6xl font-bold text-center md:text-left">
          Learn About Founder
        </h1>
        <div className="md:flex items-center">
          <Image
            src={wgmgAboutImg}
            width="400"
            height="400px"
            alt={'WGMG About IMG'}
          />
          <p className="max-w-lg text-sm px-3 opacity-80 text-grayscale-400 text-justify">
            WGMG Founder Samantha Anne is a native Austinite of 23 years. She is
            a self taught artist with the inherent artistic knowhow passed down
            from generations. She dabbles in many mediums which gave her the
            idea to create WGMG. Which led her to inspire and connect with
            others in her community.
          </p>
        </div>
        <div className="md:flex mt-6 md:mt-0">
          <Image src={wgmgFlyer} alt="WGMG Flyer IMG" />
        </div>
      </div>
    </>
  );
};

export default About;
