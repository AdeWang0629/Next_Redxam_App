import Image from 'next/image';

const Gallery = ({ gallery }) => {
  return (
    <div className="bg-[#171717] p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gallery</h2>
        <div>
          <label className="mr-4">Order by</label>
          <select>
            <option value="lowerPrice">Lower Price</option>
          </select>
        </div>
      </div>
      <div>
        <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 mx-[10%] pb-6">
          {gallery.gallery.map((item, index) => {
            return (
              <div
                className="m-4 flex justify-center"
                key={index}
                onClick={() => createCheckOutSession(item)}
              >
                <div className="flex flex-col cursor-pointer">
                  <Image
                    src={item.image as string}
                    width="200px"
                    height="200px"
                    className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                    alt={item.name as string}
                  />
                  <p className="mt-3">{item.name}</p>
                  <p className="my-3">{item.description}</p>
                  <p className="mb-3">{item.price}</p>
                  <p>{item.size}</p>
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
