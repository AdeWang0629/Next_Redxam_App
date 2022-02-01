import type { NextPage } from "next";
import Hero from "@components/home/Hero";
import ArtworkCarousel from "@components/home/ArtworkCarousel";
import Navbar from "@components/general/Navbar";
import mockData from "@mock-data";
import artData from "@art-data";
import UpcomingEvents from "@components/home/UpcomingEvents";
import ArtGallery from "@components/home/ArtGallery";

const Home: NextPage = () => {
  return (
    <>
      <Navbar title="Homepage" />

      <ArtGallery arts={artData.arts} bgColor="bg-black" />
      
      {/* <Hero />
      <ArtworkCarousel artworks={mockData.artworks} />
      <UpcomingEvents /> */}
    </>
  );
};

export default Home;
