/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Image from 'next/image';
import logo from '@public/logo.svg';
import Footer from '@components/global/Footer';

const Home: NextPage = () => (
  <section>
    <div className="min-h-screen px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
      <div className="flex flex-col w-full mb-12 text-left lg:text-center">
        <Image src={logo} />
        <h2 className="text-5xl max-w-xl mx-auto mt-8 text-left lg:text-center font-spooky animate-pulse">
          Whoa, you&apos;re in the wrong place.
        </h2>
        <p className=" max-w-xl mx-auto mt-8 text-left lg:text-center">
          Did you try searching? Try one of the links below.
        </p>
      </div>
    </div>
    <Footer />
  </section>
);

export default Home;
