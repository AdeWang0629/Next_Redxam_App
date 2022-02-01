import type { NextPage } from 'next';
import Hero from '@components/home/Hero';
import ArtworkCarousel from '@components/home/ArtworkCarousel';
import Navbar from '@components/general/Navbar';
import mockData from '@mock-data';
import artData from '@art-data';
import UpcomingEvents from '@components/home/UpcomingEvents';
import ItemList from '@components/home/ItemList';

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

      />
      <ItemList 
        arts={artData.arts} 
        bgColor="bg-zinc-900" 
        from={8} 
        to={11} 
        title='Artists' 
        // goTo='/artists'
      />

      {/* <Hero />
      <ArtworkCarousel artworks={mockData.artworks} />
      <UpcomingEvents /> */}
    </>
  );
};

export default Home;
