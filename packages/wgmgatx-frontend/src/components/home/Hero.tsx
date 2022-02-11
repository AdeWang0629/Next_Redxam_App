import Image from 'next/image';
import heroWGMG from '@public/wgmg_hero.png';
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
    <div className="bg-[#171717] h-[30vh] md:h-[45vh] relative w-full image-container rounded-[18px]">
      <Image
        src={heroWGMG2}
        alt="WGMG Hero Image"
        layout="fill"
        className="image"
      />
    </div>
  );
};

export default Hero;
