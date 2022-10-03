import Image from 'next/image';
import hero from '../public/magazine.jpg';

function Ski({ Component, pageProps }) {
  return (
    <div>
      <Image src={hero} alt="magzine" layout="fill" objectFit="contain" />
    </div>
  );
}

export default Ski;
