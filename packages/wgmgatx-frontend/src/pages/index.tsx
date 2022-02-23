import Navbar from '@components/general/Navbar';
import TopBar from '@components/general/TopBar';
import Hero from '@components/home/Hero';
import Gallery from '@components/gallery/Gallery';
import ArtistList from '@components/artists/ArtistList';
// import ContactForm from '@components/contact/ContactForm.jsx';
import ContactUs from '@components/contact/ContactUs';
// import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { google } from 'googleapis';

export async function getStaticProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const rangeGallery = `Sheet1!A:H`;
  const responseGallery = await sheets.spreadsheets.values.get({
    spreadsheetId: '186f-DiIytE8vh2HPsVIBCY9ABJCoIkbDs2f5CDN2WGo',
    range: rangeGallery
  });

  const rangeArtist = `Sheet1!A:E`;
  const responseArtist = await sheets.spreadsheets.values.get({
    spreadsheetId: '1IAkfsKQ0CpMJoV0vNJONAykNLDPvQNXN8pN_BQyLvi0',
    range: rangeArtist
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

  responseGallery?.data?.values?.map(picture => {
    if (picture[0] !== null && picture !== null) {
      gallery[picture[0]] = {
        id: picture[0],
        name: picture[1],
        artistId: picture[2],
        artist: picture[3],
        description: picture[4],
        size: picture[5],
        price: picture[6],
        image: picture[7]
      };
    }
  });

  responseArtist?.data?.values?.map(artist => {
    if (artist[0] !== null) {
      artists[artist[0]] = {
        id: artist[0],
        name: artist[1],
        description: artist[2],
        social: artist[3],
        image: artist[4]
      };
    }
  });

  return {
    props: {
      gallery,
      artists
    }
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
    <>
      <div className="flex bg-[#1e1e1e]"></div>
      <div className="flex bg-[#1e1e1e] md:px-4">
        <Navbar title="Homepage" />
        <div className="w-full md:mx-[5%] h-full mt-[4vh]">
          <div className="pb-[4vh] mx-4 md:mx-0">
            <TopBar />
          </div>
          <div className="md:pb-[6vh]">
            <Hero />
            <div
              className="flex flex-col items-center my-14 p-10 md:p-10"
              id="about"
            >
              <h1 className=" text-4xl md:text-6xl font-bold text-center md:mx-16">
                About WGMGART
              </h1>
              <div className="flex flex-col items-center">
                <p className=" text-md px-3 my-10 opacity-80 text-grayscale-400 text-justify">
                  WGMGART is an Agency to protect artists And to be given
                  opportunities to have their work curated at other venues
                  around the world. We offer a secure way to sell your work,
                  help with creating merch, access to prints and connecting with
                  other artists to learn new skills. We are working on launching
                  a blockchain and will have animators to make your art
                  animation dreams come true.
                </p>
                <a
                  href="about"
                  className=" w-full md:w-1/2 text-center font-bold rounded-[12px] py-3 bg-[#fff] text-[#1e1e1e] hover:ring-2 hover:ring-white hover:bg-[#1e1e1e] hover:text-white capitalizep"
                >
                  Read more about us
                </a>
              </div>
            </div>
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            <Gallery gallery={props.gallery} />
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0">
            <ArtistList artists={props.artists} />
          </div>
          <div className="pb-[6vh] mx-4 md:mx-0" id="contact">
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
