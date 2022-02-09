import Image from 'next/image';
import unsplash from '@public/unsplash.png';

const Gallery = ({ gallery }) => {
  console.log(gallery);
  return (
    <div className="bg-[#171717] p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <div>
          <label className="mr-4">Order by</label>
          <select className="rounded-2xl bg-[#fce100]">
            <option value="lowerPrice">Lower Price</option>
          </select>
        </div>
      </div>
      <div>
        <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 pb-6">
          {gallery.gallery.map((item, index) => {
            return (
              <div
                className="m-4 flex justify-center"
                key={index}
                onClick={() => createCheckOutSession(item)}
              >
                <div className="flex flex-col cursor-pointer">
                  <img src={item.image} alt="" />
                  {/* <Image
                    src={item.image as string}
                    width="100%"
                    height="100%"
                    className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                    alt={item.name as string}
                  /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
