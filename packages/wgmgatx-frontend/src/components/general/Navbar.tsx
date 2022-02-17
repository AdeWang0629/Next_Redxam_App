import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import {
  BiHomeAlt,
  BiMapAlt,
  BiLandscape,
  BiPhotoAlbum,
  BiGroup,
  BiMessageRoundedDetail,
} from 'react-icons/bi';
// Home = BiHomeAlt
// About = BiMapAlt
// Gallery = BiLandscape or BiPhotoAlbum
// Artists = BiGroup
// Contact = BiMessageRoundedDetail

// Imgs
import wgmgLogo from '@public/logo-wgmg.png';

const Navbar = ({ title }: { title?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { name: 'Home', path: '/#', icon: BiHomeAlt },
    { name: 'About', path: '/about', icon: BiMapAlt },
    { name: 'Gallery', path: '/#gallery', icon: BiPhotoAlbum },
    { name: 'Artists', path: '/#artists', icon: BiGroup },
    { name: 'Contact', path: '/contact', icon: BiMessageRoundedDetail },
  ];
  const [hoverStatus, setHoverStatus] = useState({
    Gallery: false,
    Artists: false
  });



  return (
    <>
      <Head>
        <title>WGMGATX{title ? ` | ${title}` : ''}</title>
      </Head>
      <div className="bg-[#181818] w-[12%] 2xl:w-[8%] justify-center hidden md:flex -ml-4">
        <nav className="flex flex-col items-center fixed">
          <div className="mb-8 rounded-full mt-[6vh]">
            <Image
              src={wgmgLogo}
              alt="WGMG Logo"
              width="70%"
              height="70%"
              className="rounded-full"
            />
          </div>
          <ul>
            {routes.map((route) => (

              <li key={route.name} className="mb-8 text-center">

                <Link href={route.path}>
                  <route.icon className='hover:fill-white ease-in-out duration-150 cursor-pointer' size={'30px'} color={'#817F8A'} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
