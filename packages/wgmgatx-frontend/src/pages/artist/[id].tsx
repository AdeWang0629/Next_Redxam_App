import Navbar from '@components/general/Navbar';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { google } from 'googleapis';

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:H`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GALLERY_SHEET_ID,
    range
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

  console.log(response.data.values);
  response?.data?.values?.map(picture => {
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

  return {
    props: {
      gallery
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
}

const Gallery = (props: Props) => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey as string);

  const createCheckOutSession = async (item: {
    id: String;
    name: String;
    artist: String;
    description: String;
    price: String;
    size: String;
    image: String;
  }) => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/stripe', {
      item: {
        name: item.name,
        price: parseFloat(item.price as string),
        description: item.description,
        image: item.image
      }
    });
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <Navbar title="Gallery" />
      <div>
        <h1 className="md:text-6xl text-4xl font-bold pt-14 mb-16 text-center">
          Gallery
        </h1>
        <div>
          <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2 col-span-3 mx-[10%] pb-6">
            {props.gallery.map((item, index) => {
              return (
                <div
                  className="m-4"
                  key={index}
                  onClick={() => createCheckOutSession(item)}
                >
                  <Image
                    src={item.image as string}
                    width="100%"
                    height="100%"
                    className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                    alt={item.name as string}
                    onClick={() => console.log(item.price)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
