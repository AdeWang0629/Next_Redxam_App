import Image from 'next/image';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const Gallery = (gallery: { gallery: any[] }) => {
  const publishableKey =
    'pk_test_51IVEgYEPejRluWxLZTE44JGekNDtvmcS236uxdaqri1KEL8lBvzFhALv0WZP6hqmhjEdoWU42FkTL4AtrmhW2XTz00NtjDSgfi';
  const stripePromise = loadStripe(publishableKey as string);

  const createCheckOutSession = async (item: {
    id: String;
    name: String;
    artistId: String;
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

  const Columns = {
    default: 3,
    1440: 3,
    1000: 2,
    700: 1
  };
  return (
    <div id="gallery" className="bg-[#171717] p-8 rounded-[18px]">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4 md:mx-10">
        <h2 className="text-4xl pt-6 font-bold lg:ml-[3%]">Gallery</h2>
        {/* <div className="lg:mr-[3%] pt-6 flex justify-center flex-col items-center md:block">
          <label className="mr-4 font-light text-sm pb-3 md:pb-0">Order by:</label>
          <select className="rounded-[10px] bg-[#fff] font-semibold text-sm px-[40px] py-[5px] text-[#000]">
            <option value="lowerPrice">Lower Price</option>
          </select>
        </div> */}
      </div>
      <div className="lg:mx-5 mx-0">
        {/* <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 pb-6"> */}
        <Masonry
          breakpointCols={Columns}
          className="flex max-w-[100%] w-auto"
          columnClassName="sm:mx-5 bg-clip-padding"
        >
          {gallery.gallery.slice(0, 9).map((item, index) => {
            return (
              <div key={item.id}>
                <div className="relative flex justify-center pt-[25px] w-full">
                  <img className="rounded-t-[18px]" src={item.image} alt="" />
                </div>
                <div className="bg-[#1e1e1e] rounded-b-[18px]">
                  <div className="p-8">
                    <h2 className="font-bold text-[16px] lg:text-[18px] text-left">
                      {' '}
                      {item.name}{' '}
                    </h2>
                    <h2 className="font-semibold text-xs text-[#817F8A] py-1 mt-2">
                      {' '}
                      {item.artist}{' '}
                    </h2>
                    <h2 className="font-semibold text-xs text-[#817F8A] py-1">
                      {' '}
                      {item.description}{' '}
                    </h2>
                    <h2 className="font-semibold text-xs text-[#817F8A] py-1">
                      {' '}
                      {item.size}{' '}
                    </h2>
                    <div className="flex justify-between items-center pt-2">
                      <h2 className="font-bold text-sm text-left text-[16px] lg:text-[]">
                        {' '}
                        {item.price.length >= 6
                          ? null
                          : '$' +
                            item.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      </h2>
                      <a
                        className="bg-white font-bold text-[#1e1e1e] text-[12px] px-6 py-2 rounded-[12px] hover:ring-2 hover:ring-white hover:bg-[#1e1e1e] hover:text-white cursor-pointer"
                        onClick={() => createCheckOutSession(item)}
                      >
                        Buy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default Gallery;
