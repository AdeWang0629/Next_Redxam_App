import type { NextPage } from 'next';
import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';

const Home: NextPage = () => {
  return (
    <div className="flex h-screen bg-[#1d1d1d]">
      <Navbar title="Homepage" />
      <div className="w-full h-screen pt-8 px-16">
        <TopBar />
        <Hero />
      </div>
    </div>
  );
};

export default Home;
