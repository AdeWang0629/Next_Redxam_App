import Image from 'next/image';
import unsplash from '../../../public/unsplash.png';

const Hero = () => {
  return (
    <section className="p-0">
      <div className="h-[60vh] w-full bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1608501821300-4f99e58bba77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]">
        <div className="h-full grid content-center text-center mx-[10%]">
          <div
            className="font-futura_black text-5xl font-bold uppercase"
            id="meta-word"
          >
            Mission
          </div>
          <div className="text-md md:text-lg text-center">
            My name is Samantha Anne & I am CoFounder of WGMG. I’ve lived in
            Austin for over 23 years and have roots in New England. WGMG was
            created between two likeminded individuals with different
            educational backgrounds and purpose of community. I am a self taught
            artist with inherent artistic knowledge passed down from
            generations. I dabble in several mediums & have an infinite desire
            to learn more. I am best known for my acrylic, resin work, technical
            skills and leadership. I believe in the power of positivity and
            cherishing those that see in color. Art is my aesthetic.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
