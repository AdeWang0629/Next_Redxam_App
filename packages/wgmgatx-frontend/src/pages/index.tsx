import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';
import Gallery from '@components/gallery/Gallery';
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
}

const Home = (gallery: Props) => {
  return (
    <div className="flex bg-[#1d1d1d]">
      <Navbar title="Homepage" />
      <div className="w-full h-full pt-8 px-16">
        <TopBar />
        <Hero />
        <Gallery gallery={gallery} />
      </div>
    </div>
  );
};

export default Home;
