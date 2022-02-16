import Image from 'next/image';
import heroWGMG from '@public/wgmg_header.png';
import heroWGMG2 from '@public/wgmg_hero2.png';

const Hero = () => {
  return (
    // <div className="bg-[#171717] h-[40vh] relative">
    //   <div className="h-[40vh] flex justify-between items-center">
    //     <div>
    //       <h1 className="text-left text-5xl">
    //         Best place <br /> to get your Physic <br /> and Digital Assets
    //       </h1>
    //       <h2>
    //         We want to give you a good oportunity to get art easy and secure
    //       </h2>
    //     </div>
    //     <Image src={heroWGMG} alt="WGMG Hero Image" />
    //   </div>
    // </div>
    <div className="grid grid-cols-2 bg-[#171717] px-[5%] h-[30vh] md:h-[45vh] w-full image-container rounded-[18px] overflow-visible">
      <div className='flex flex-col items-center justify-center w-[100%] pr-5'>
        <h1 className='text-2xl xl:text-3xl 2xl:text-5xl font-black text-right'>
          The Best Place to get your Physic and Digital Assets
        </h1>
        <h4 className='text-md text-right mt-5'>
          <i>We want to provide you a good oportunity to get art easy and secure</i>
        </h4>
      </div>
      <div className='w-full h-full overflow-visible content-left'>
        <div className='relative w-full h-full' >
          <Image
            src={heroWGMG}
            alt="WGMG Hero Image"
            layout="fill"
            className="image ml-0"
            />
        </div>
      </div>
      {/* <div className='flex bg-[#fff] text-center max-w-full' >
        <Image
          src={heroWGMG}
          alt="WGMG Hero Image"
          layout="fill"
          className="image"
        />
      </div> */}
      {/* <div className='absolute w-full' >
        <Image
          src={heroWGMG}
          alt="WGMG Hero Image"
          layout="fill"
          className="image"
        />
      </div> */}
    </div>
  );
};

export default Hero;
