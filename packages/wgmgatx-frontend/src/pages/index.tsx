import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';
import Gallery from '@components/gallery/Gallery';
import ArtistList from '@components/artists/ArtistList';
import ContactUs from '@components/contact/ContactUs';
import axios from 'axios';
import { google } from 'googleapis';

interface Props {
  gallery: {
    id: String;
    name: String;
    artistId: String;
    artist: String;
    description: String;
    price: String;
    size: String;
    image: String;
  }[];
  artists: {
    id: String;
    name: String;
    description: String;
    social: String;
    image: String;
  }[];
}

const Home = (props: Props) => {
  return (
    <>
      <div className="flex bg-[#1e1e1e]"></div>
      <div className="flex bg-[#1e1e1e] md:px-4">
        <Navbar title="Homepage" />
        <div className="w-full md:mx-[5%] h-full mt-[4vh]">
          <div className="pb-[4vh] mx-4 md:mx-0">
            <TopBar />
          </div>
          <div className="md:pb-[6vh]">
            {/* <Hero /> */}
            <div
              className="flex flex-col items-center my-14 p-10 md:p-10"
              id="about"
            >
              <h1 className=" text-4xl md:text-6xl font-bold text-center md:mx-16">
                About Terra Aggregate
              </h1>
              <div className="flex flex-col items-center">
                <p className=" text-md px-3 my-10 opacity-80 text-grayscale-400 text-justify">
                  Terra Aggrerate is an agency focus on proving the best cement
                  quality in the state of Texas. With materials sourced from
                  environment-aware quarries, Terra Aggregates is your single
                  provider for high grade materials.
                </p>
                <a className=" w-full md:w-1/2 text-center font-bold rounded-[12px] py-3 bg-[#fff] text-[#1e1e1e] hover:ring-2 hover:ring-white hover:bg-[#1e1e1e] hover:text-white capitalizep">
                  Read more about us
                </a>
              </div>
            </div>
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            {/* <Gallery gallery={props.gallery} /> */}
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            {/* <ArtistList artists={props.artists} /> */}
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0" id="contact">
            {/* <ContactUs /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
