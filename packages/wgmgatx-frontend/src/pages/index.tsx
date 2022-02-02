import type { NextPage } from 'next';
import Hero from '@components/home/Hero';
import ArtworkCarousel from '@components/home/ArtworkCarousel';
import Navbar from '@components/general/Navbar';
import mockData from '@mock-data';
import artData from '@art-data';
import UpcomingEvents from '@components/home/UpcomingEvents';
import ItemList from '@components/home/ItemList';
import ContactForm from '@components/contact/ContactForm';



const Home: NextPage = () => {
  return (
    <>
      <Navbar title="Homepage" />
      <Hero />
      <ItemList 
        arts={artData.arts} 
        bgColor="bg-black" 
        from={2} 
        to={5} 
        title='Gallery' 
        goTo='/gallery'
        info

      />
      <ItemList 
        arts={artData.arts} 
        bgColor="bg-zinc-900" 
        from={8} 
        to={11} 
        title='Artists' 
        goTo='/artists'
      />
      <div className='py-16'>
        <ContactForm />
      </div>

      {/* <ArtworkCarousel artworks={mockData.artworks} /> */}
      {/* <UpcomingEvents /> */}
    </>
  );
};

export default Home;
