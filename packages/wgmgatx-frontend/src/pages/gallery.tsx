import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import ItemList from '@components/home/ItemList';
import artData from '@art-data';

const Gallery: NextPage = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  console.log(publishableKey);
  const stripePromise = loadStripe(publishableKey as string);
  console.log(stripePromise);

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

  const artDataLenght = artData.arts.length;

  return (
    <>
      <Navbar title="Gallery" />
      <div
        className="pt-10 cursor-pointer"
        onClick={() => createCheckOutSession()}
      >
        <p>gallery 1</p>
      </div>
      <ItemList
        arts={artData.arts}
        bgColor="black"
        from={0}
        to={artDataLenght}
        title="Gallery"
      />
    </>
  );
};

export default Gallery;
