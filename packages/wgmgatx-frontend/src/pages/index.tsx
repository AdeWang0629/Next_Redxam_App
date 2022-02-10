import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';
import Gallery from '@components/gallery/Gallery';
import Artists from '@components/artists/Artists';
// import { data } from './artists';
import data from '@components/artists/ArtistList';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { google } from 'googleapis';

export async function getStaticProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:H`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '186f-DiIytE8vh2HPsVIBCY9ABJCoIkbDs2f5CDN2WGo',
    range,
  });

  let gallery: {
    id: String;
    name: String;
    artistId: String;
    artist: String;
    description: String;
    price: String;
    size: String;
    image: String;
  }[] = [];

  response?.data?.values?.map((picture) => {
    if (picture[0] !== null && picture !== null) {
      gallery[picture[0]] = {
        id: picture[0],
        name: picture[1],
        artistId: picture[2],
        artist: picture[3],
        description: picture[4],
        size: picture[5],
        price: picture[6],
        image: picture[7],
      };
    }
  });

  return {
    props: {
      gallery,
      artists: data,
    },
  };
}

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
    <div className="flex bg-[#1e1e1e]">
      <Navbar title="Homepage" />
      <div className="w-full mx-[5%] h-full mt-[4vh]">
        <div className='pb-[4vh]'>
          <TopBar />
        </div>
        {/* <div className='pb-[6vh]'>
          <Hero />
        </div> */}
        <div className='pb-[6vh]'>
          <Gallery gallery={props.gallery} />
        </div>
        {/* <div className='pb-[6vh]'>
          <Artists artists={props.artists} />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
