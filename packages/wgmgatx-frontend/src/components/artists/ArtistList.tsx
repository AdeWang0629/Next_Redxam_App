import Image from 'next/image';
import Masonry from 'react-masonry-css';

const ArtistList = (artists: { artists: any[] }, all?: boolean) => {
  // console.log(gallery);
  const Columns = {
    default: 3,
    1440: 3,
    1000: 2,
    700: 1
  };
  // let to = 0;
  // if (all) to = artists.artists.length;
  // else to = 9;

  return (
    <div id="artists" className="bg-[#171717] p-8 rounded-[18px]">
      <div className="flex justify-center md:justify-start mb-4 md:mx-10">
        <h2 className="text-4xl pt-6 font-bold ml-[3%]">Artists</h2>
      </div>
      <div className="lg:mx-5 mx-0">
        {/* <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 pb-6"> */}
        <Masonry
          breakpointCols={Columns}
          className="flex max-w-[100%] w-auto"
          columnClassName="sm:mx-5 bg-clip-padding"
        >
          {artists.artists
            .slice(0, artists.artists.length)
            .map((item, index) => {
              return (
                <div
                  className="relative flex justify-center pt-[25px] w-full"
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

export default ArtistList;
