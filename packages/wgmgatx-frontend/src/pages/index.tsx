import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';
import Gallery from '@components/gallery/Gallery';
import Artists from '@components/artists/Artists';
import ContactForm from '@components/contact/ContactForm';
// import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { google } from 'googleapis';

export async function getStaticProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const rangeGallery = `Sheet1!A:H`;
  const responseGallery = await sheets.spreadsheets.values.get({
    spreadsheetId: '186f-DiIytE8vh2HPsVIBCY9ABJCoIkbDs2f5CDN2WGo',
    range: rangeGallery,
  });

  const rangeArtist = `Sheet1!A:E`;
  const responseArtist = await sheets.spreadsheets.values.get({
    spreadsheetId: '1IAkfsKQ0CpMJoV0vNJONAykNLDPvQNXN8pN_BQyLvi0',
    range: rangeArtist,
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

  let artists: {
    id: String;
    name: String;
    description: String;
    social: String;
    image: String;
  }[] = [];

  responseGallery?.data?.values?.map((picture) => {
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

  responseArtist?.data?.values?.map((artist) => {
    if (artist[0] !== null) {
      artists[artist[0]] = {
        id: artist[0],
        name: artist[1],
        description: artist[2],
        social: artist[3],
        image: artist[4],
      };
    }
  });

  return {
    props: {
      gallery,
      artists,
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
  console.log(props);
  return (
    <>
      <div className='flex bg-[#1e1e1e]'>
      </div>
      <div className="flex bg-[#1e1e1e] md:px-4">
        <Navbar title="Homepage" />
        <div className="w-full md:mx-[5%] h-full mt-[4vh]">
          <div className="pb-[4vh] mx-4 md:mx-0">
            <TopBar />
          </div>
          <div className="pb-[6vh]">
            <Hero />
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            <Gallery gallery={props.gallery} />
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            <Artists artists={props.artists} />
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            <ContactForm />
          </div>
        </div>
      </div>
      </>
  );
};

export default Home;
