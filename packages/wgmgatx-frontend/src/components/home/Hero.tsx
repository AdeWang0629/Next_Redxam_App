import Image from "next/image";
import unsplash from "../../../public/unsplash.png";

const Hero = () => {
  return (
    <section>
      <div className="h-screen w-full bg-[url('https://mundofreestyle.com/wp-content/uploads/2020/06/papo-scaled.jpeg')]">
      </div>  
      {/* <div className="relative w-[100%] z-0">
        <div className="h-[50%]">
          <Image src={unsplash} alt="frame" className="opacity-50" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-10/12 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
          <div className="font-futura_black text-5xl font-bold uppercase" id="meta-word">
            Mission
          </div>
          <div className="text-md md:text-lg text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum quia ullam, alias molestias nemo maxime officiis autem quo eos
            tempora nam accusantium nesciunt adipisci aperiam, quae sunt, laboriosam culpa.
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
