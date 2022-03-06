import Image from 'next/image';
import heroWGMG from '@public/wgmg_header.png';
import heroWGMG2 from '@public/wgmg_hero2.png';
import heroMobile from '@public/mobile_wgmg.jpg';
// import heroMobile from '../../../public/mobile_wgmg.jpg';

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
    <div className="grid md:grid-cols-2 bg-[#171717] h-[40vh] md:px-[5%] md:h-[50vh] md:h-[45vh] w-full image-container md:rounded-[18px] overflow-visible">
      <div className=' md:flex flex-col items-center justify-center w-[100%] px-5 md:pr-5 p-0'>
        <h1 className='text-xl md:text-2xl xl:text-3xl 2xl:text-5xl font-black md:text-right p-0'>
          The Best Place to get your Physical and Digital Assets
        </h1>
        <h4 className='text-md md:text-right mt-5 p-0'>
          <i>We want to provide you a good oportunity to get art easy and secure</i>
        </h4>
      </div>
      <div className='absolute top-0 w-full'>
        <div className='relative w-full h-full flex md:hidden'>
          <Image
              src={heroMobile}
              alt="WGMG Hero Image"
              layout="fill"
              className="object-cover"
              />
              
        </div>
        {/* <div className='relative w-full h-full hidden md:flex' >
          <Image
            src={heroWGMG}
            alt="WGMG Hero Image"
            layout="fill"
            className="image ml-0"
            />
        </div> */}
        <div className='relative w-full h-full hidden md:flex' >
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
