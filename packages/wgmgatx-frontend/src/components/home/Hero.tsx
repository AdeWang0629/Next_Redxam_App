import Image from 'next/image';
import heroWGMG from '@public/wgmg_header.png';
import heroWGMG2 from '@public/wgmg_hero2.png';
import heroMobile from '@public/mobile_wgmg.jpg';
// import heroMobile from '../../../public/mobile_wgmg.jpg';

const Hero = () => {
  return (
    <>
      <div className="bg-[#171717] rounded-[18px] z-0">
        <div className="h-[35vh]">
          <div className="relative w-full h-full md:grid md:grid-cols-2">
            <div className="z-10 absolute md:static h-full flex flex-col items-start md:items-end justify-center p-10 md:p-5">
              <h1
                className="text-2xl md:text-2xl xl:text-3xl 2xl:text-5xl font-black md:text-right"
                style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 1)' }}
              >
                The Best Place to get your Physical and Digital Assets
              </h1>
              <h4
                className="z-50 text-md 2xl:text-2xl text-left md:text-right mt-5"
                style={{ textShadow: '1px 1px 6px rgba(0, 0, 0, 1)' }}
              >
                <i>
                  We want to provide you a good oportunity to get art easy and
                  secure
                </i>
              </h4>
            </div>
            <div className="z-0 md:hidden">
              <Image
                src={heroMobile}
                alt="WGMG Hero Image"
                layout="fill"
                className="object-cover z-0"
              />
            </div>
            <div className="flex">
              <div className="relative w-full h-full hidden md:flex image-container">
                <Image
                  src={heroWGMG}
                  alt="WGMG Hero Image"
                  layout="fill"
                  className="image ml-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
