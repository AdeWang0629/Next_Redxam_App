import Image from 'next/image';
import Masonry from 'react-masonry-css';

const Artists = (artists) => {
  // console.log(gallery);
  const Columns = {
    default: 3,
    1440: 3,
    1000: 2,
    700: 1,
  };
  console.log(artists);

  return (
    <div className="bg-[#171717] p-8 rounded-[18px]">
      <div className="flex justify-between items-center mb-4 mx-10">
        <h2 className="text-3xl pt-6 font-bold ml-[3%]">Artists</h2>
        <div className="mr-[3%] pt-6">
          <label className="mr-4 font-light text-sm">Order by:</label>
          <select className="rounded-[10px] bg-[#fce100] font-semibold text-sm px-[40px] py-[5px] text-[#000]">
            <option value="lowerPrice">Lower Price</option>
          </select>
        </div>
      </div>
      <div className="mx-10">
        {/* <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 pb-6"> */}
        <Masonry
          breakpointCols={Columns}
          className="flex max-w-[100%] w-auto"
          columnClassName="px-[25px] bg-clip-padding"
        >
          {artists.artists.map((item, index) => {
            return (
              <div
                className="relative flex justify-center py-[25px] w-full"
                key={item.id}
                // onClick={() => createCheckOutSession(item)}
              >
                <img className="rounded-[18px]" src={item.image} alt="" />
                {/* <div className='absolute bg-[#1e1e1e] inset-x-0 bottom-[25px] h-[40%] rounded-b-[18px]'>
                    asdasd
                   </div> */}
              </div>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default Artists;
