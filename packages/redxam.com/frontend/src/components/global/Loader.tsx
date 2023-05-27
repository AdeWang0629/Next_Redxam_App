import Image from 'next/image';
import AnimatedLogo from '@public/images/dashboard/footer-logo2.gif';

interface LoaderProps {
  height: string;
}

const Loader = ({ height }: LoaderProps) => (
  <div className={`flex flex-col justify-center items-center ${height}`}>
    <Image
      src={AnimatedLogo}
      width="50px"
      height="45,5px"
      alt="redxam Animated Logo"
    />
  </div>
);

export default Loader;
