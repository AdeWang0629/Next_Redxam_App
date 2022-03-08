import Members from '@components/about/Members';
import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import Image from 'next/image';
import wgmgAboutImg from '@public/images/about/about-wgmg.jpeg';
import wgmgHotelsImg from '@public/images/about/hotels-wgmg.jpeg';
import wgmgEventImg from '@public/images/about/event-wgmg.jpeg';

const About: NextPage = () => {
  return (
    <>
      {/* <Navbar title="About" /> */}
      <div className="flex flex-col items-center pt-14 p-10 md:p-10">
        <h1 className="text-6xl font-bold text-center md:text-left mt-16">
          About WGMGART
        </h1>
        <div className="md:flex items-center">
          <p className="max-w-lg text-sm px-3 my-10 opacity-80 text-grayscale-400 text-justify">
            WGMGART is an Agency to protect artists And to be given
            opportunities to have their work curated at other venues around the
            world. We offer a secure way to sell your work, help with creating
            merch, access to prints and connecting with other artists to learn
            new skills. We are working on launching a blockchain and will have
            animators to make your art animation dreams come true.
          </p>
        </div>
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
            My name is Samantha Anne & I am CoFounder of WGMG. I’ve lived in
            Austin for over 23 years and have roots in New England. WGMG was
            created between two likeminded individuals with different
            educational backgrounds and purpose of community. I am a self taught
            artist with inherent artistic knowledge passed down from
            generations. I dabble in several mediums & have an infinite desire
            to learn more. I am best known for my acrylic, resin work, technical
            skills and leadership. I believe in the power of positivity and
            cherishing those that see in color. Art is my aesthetic.
          </p>
        </div>
        <div className="md:flex mt-6 md:mt-0">
          <Image
            src={wgmgHotelsImg}
            width="400"
            height="400px"
            alt={'WGMG About IMG'}
          />
          <Image
            src={wgmgEventImg}
            width="400"
            height="400px"
            alt={'WGMG About IMG'}
          />
        </div>
      </div>
    </>
  );
};

export default About;
