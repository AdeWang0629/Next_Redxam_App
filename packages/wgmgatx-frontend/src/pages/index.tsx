import type { NextPage } from 'next';
import Hero from '@components/home/Hero';
import ArtworkCarousel from '@components/home/ArtworkCarousel';
import Navbar from '@components/general/Navbar';
import mockData from '@mock-data';
import UpcomingEvents from '@components/home/UpcomingEvents';
import ContactForm from '@components/contact/ContactForm';

const Home: NextPage = () => {
  return (
    <>
      <Navbar title="Homepage" />
      <Hero />
      <div className="py-16">
        <ContactForm />
      </div>
    </>
  );
};

export default Home;
