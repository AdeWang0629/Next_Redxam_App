import type { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import Newsletter from '@components/landing/Newsletter';

import MouseIcon from '@public/icons/white-mouse.svg';
import InvestImage1 from '@public/images/about/invest-img1.svg';
import InvestImage2 from '@public/images/about/invest-img2.svg';
import InvestImage3 from '@public/images/about/invest-img3.svg';

import InvestorsImage1 from '@public/images/about/investors1.svg';
import InvestorsImage2 from '@public/images/about/investors2.svg';
import InvestorsImage3 from '@public/images/about/investors3.svg';
import InvestorsImage4 from '@public/images/about/investors4.svg';
import InvestorsImage5 from '@public/images/about/investors5.svg';
import InvestorsImage6 from '@public/images/about/investors6.svg';
import InvestorsImage7 from '@public/images/about/investors7.svg';
import InvestorsImage8 from '@public/images/about/investors8.svg';
import InvestorsImage9 from '@public/images/about/investors9.svg';
import InvestorsImage10 from '@public/images/about/investors10.svg';

import MaxProfileImage from '@public/images/about/max.jpg';
import PruselaProfileImage from '@public/images/about/prusela.jpg';
import AlexProfileImage from '@public/images/about/alex.jpg';
import JhosephProfileImage from '@public/images/about/jhoseph.jpg';

import WorkWithUsImage1 from '@public/images/about/workwithus1.png';
import WorkWithUsImage2 from '@public/images/about/workwithus2.png';
import Switcher from '@components/global/Switcher';
import { GetStaticProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['newsletter'])),
    },
  };
};

const About: NextPage = () => {
  const teamMembers = [
    { name: 'Max Awad', picture: MaxProfileImage, role: 'CEO, Co-Founder' },
    {
      name: 'Prusela Bhowmick',
      picture: PruselaProfileImage,
      role: 'Marketing',
    },
    {
      name: 'Alejandro Gonzalez',
      picture: AlexProfileImage,
      role: 'Engineering',
    },
    {
      name: 'Jhoseph Guerrero',
      picture: JhosephProfileImage,
      role: 'Engineering',
    },
  ];

  return (
    <>
      <section
        className='bg-no-repeat bg-cover min-h-screen'
        style={{ backgroundImage: 'url(/images/about/hero-bg.png)' }}
      >
        <Navbar transparentBackground title='About Us' />
        <Switcher activePage='about' />
        <div className='flex flex-col items-center justify-center max-w-7xl mx-auto h-full px-4 md:px-0 mt-8'>
          <h1 className='text-5xl md:text-7xl tracking-[-0.05em] font-secondary mb-10 font-bold text-white mt-20 text-center md:w-3/5'>
            We are creating the Future of Crypto Investment.
          </h1>

          <p className='text-white font-primary text-[1.0625rem] max-w-[43.0625rem] mb-[1.875rem] text-center text-opacity-80'>
            We build smart algorithm strategies to maximize your ROI. Our
            simplicity, yet stylish and safe platform allows you to invest
            whether you are an individual or an institution, we help you buy,
            sell and store your cryptocurrency
          </p>
          <Link href='/about#investingWay' shallow scroll>
            <Image src={MouseIcon} alt='Scroll Down' />
          </Link>
        </div>
      </section>
      <section className='max-w-7xl mx-auto pt-32 px-4 md:px-0'>
        <div>
          <h2 className='text-center text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black dark:text-gray-200 mb-[6.25rem]'>
            We are changing the Way of Investing
          </h2>
          <div className='md:flex items-center justify-center mb-12 text-center md:text-left'>
            <Image src={InvestImage1} alt='' />
            <div className='md:ml-14 md:w-1/3 mt-4 md:mt-0'>
              <h3 className='mb-3 text-2xl md:text-4xl md:leading-10 font-secondary font-medium tracking-[-0.04em] text-black dark:text-white text-opacity-80'>
                Changing the way people invest
              </h3>
              <p className='leading-[1.8] font-primary text-black dark:text-white text-opacity-80 text-[1.0625rem]'>
                We’re redefining what it means to learn about finance—and that
                means education resources that are built for today
              </p>
            </div>
          </div>
          <div className='flex flex-col-reverse md:flex-row items-center justify-center mb-12 text-center md:text-left'>
            <div className='md:mr-14 md:w-1/3 mt-4 md:mt-0'>
              <h3 className='mb-3 text-2xl md:text-4xl md:leading-10 font-secondary font-medium tracking-[-0.04em] text-black dark:text-white text-opacity-80'>
                We are building teams around the world bit by bit.
              </h3>
              <p className='leading-[1.8] font-primary text-black dark:text-white text-opacity-80 text-[1.0625rem]'>
                Our mission is to create an ecosystem where we are not dependent
                on location or timezone. We are located in mutiple nations
                across the world to offer you the best support at our hands. We
                are currently working out of Texas, New York, Dubai, Madrid, and
                Lausanne.
              </p>
            </div>
            <Image src={InvestImage2} alt='' />
          </div>
          <div className='md:flex items-center justify-center text-center md:text-left'>
            <Image src={InvestImage3} alt='' />
            <div className='md:ml-14 md:w-1/3 mt-4 md:mt-0'>
              <h3 className='mb-3 text-2xl md:text-4xl md:leading-10 font-secondary font-medium tracking-[-0.04em] text-black dark:text-white text-opacity-80'>
                Let’s do the work while you rest.
              </h3>
              <p className='leading-[1.8] font-primary text-black dark:text-white text-opacity-80 text-[1.0625rem]'>
                Our algorithms calculate the best interest rated while you
                sleep. We know the market are always open and so are we!. You
                can reach us at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='py-12 max-w-7xl mx-auto px-4 md:px-0'>
        <h2 className='text-center text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black dark:text-gray-200 mb-[6.25rem]'>
          Trusted by the worlds best investors
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-y-20 '>
          <Image src={InvestorsImage1} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage2} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage3} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage4} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage5} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage6} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage7} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage8} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage9} alt='' className='my-0 mx-auto' />
          <Image src={InvestorsImage10} alt='' className='my-0 mx-auto' />
        </div>
      </section>

      <section className='flex flex-col max-w-7xl mx-auto items-center mt-16'>
        <h2 className='text-left text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black dark:text-gray-200 mb-[6.25rem]'>
          Our Team
        </h2>
        <div className='md:grid grid-cols-4 gap-y-14 gap-x-14'>
          {teamMembers.map((member) => (
            <TeamMember
              key={member.name.toLowerCase().split(' ').join('_')}
              picture={member.picture}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </section>

      <section className='md:flex justify-between max-w-7xl mx-auto my-56 md:pr-16 px-4 md:px-0'>
        <div className='md:w-2/5 md:mr-14 text-center md:text-left mb-16 md:mb-0'>
          <h2 className='mb-9 text-center md:text-left text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black dark:text-gray-200 self-start font-secondary'>
            Interested in working with US?
          </h2>
          <p className='mb-10 md:w-4/5 text-black dark:text-white font-primary text-[1.0625rem] max-w-[43.0625rem] text-center md:text-left md:leading-[1.8] text-opacity-80'>
            As a team of passionate entrepreneurs, we built Pipe around our core
            mission to create a new way to scale without debt or dilution, so
            companies can grow on their terms.
          </p>
          <Link href='/careers'>
            <a className='bg-buttons-green py-5 px-16 rounded-full font-secondary font-medium'>
              View Job openings
            </a>
          </Link>
        </div>
        <div className='flex flex-col md:flex-row items-center md:items-start relative'>
          <div className='mx-auto md:mx-0 w-full h-full flex flex-col items-center'>
            <Image
              src={WorkWithUsImage2}
              alt=''
              placeholder='blur'
              width='300px'
              height='400px'
              className='w-full h-full'
            />
          </div>
          <div className='mx-auto md:mx-0 md:mb-0 right-64 -bottom-8 md:absolute w-full h-full flex items-center md:items-end flex-col md:flex-row mt-2 md:mt-0'>
            <Image
              src={WorkWithUsImage1}
              alt=''
              placeholder='blur'
              width='300px'
              height='270px'
            />
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

interface TeamMemberProps {
  picture: StaticImageData;
  name: string;
  role: string;
}

const TeamMember: NextPage<TeamMemberProps> = ({ picture, name, role }) => {
  return (
    <div className='mb-16 md:mb-0 font-secondary font-medium'>
      <Image
        width='232px'
        height='214px'
        className='rounded-2xl'
        src={picture}
        alt={name}
        objectPosition='center'
        objectFit='cover'
        placeholder='blur'
      />
      <h5 className='my-1 text-2xl text-black dark:text-white'>{name}</h5>
      <p className='dark:text-white'>{role}</p>
    </div>
  );
};

export default About;
