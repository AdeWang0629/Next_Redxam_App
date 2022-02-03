import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { google } from 'googleapis';
import ItemList from '@components/home/ItemList';

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:G`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GALLERY_SHEET_ID,
    range,
  });

  let gallery: {
    id: String;
    name: String;
    artist: String;
    description: String;
    price: String;
    size: String;
    image: String;
  }[] = [];

  response?.data?.values?.map((picture) => {
    console.log(picture);
    if (picture[0] !== null) {
      gallery[picture[0]] = {
        id: picture[0],
        name: picture[1],
        artist: picture[2],
        description: picture[3],
        price: picture[4],
        size: picture[5],
        image: picture[6],
      };
    }
  });

  return {
    props: {
      gallery,
    },
  };
}

const Gallery: NextPage = ({ gallery }) => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey as string);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    console.log(stripe);
    const checkoutSession = await axios.post('/api/stripe', {
      item: {
        name: 'Gallery',
        price: 120,
        description: 'desc',
      },
    });
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <Navbar title="Gallery" />
      <div
        className="pt-10 cursor-pointer"
        onClick={() => createCheckOutSession()}
      >
        <p>gallery 1</p>
      </div>
      {/* <ItemList
        arts={artData.arts}
        bgColor="black"
        from={0}
        to={artDataLenght}
        title="Gallery"
      /> */}
    </>
  );
};

export default Gallery;
