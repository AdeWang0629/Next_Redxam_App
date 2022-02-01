import Image from "next/image";
import unsplash from "../../../public/unsplash.png";

const Hero = () => {
  return (
    <section className="p-0">
      <div className="h-[60vh] w-full bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1608501821300-4f99e58bba77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]">
        <div className="h-full grid content-center text-center mx-[10%]">
          <div className="font-futura_black text-5xl font-bold uppercase" id="meta-word">
            Mission
          </div>
          <div className="text-md md:text-lg text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum quia ullam, alias molestias nemo maxime officiis autem quo eos
            tempora nam accusantium nesciunt adipisci aperiam, quae sunt, laboriosam culpa.
          </div>
        </div>
      </div>  
    </section>
  );
};

export default Hero;
