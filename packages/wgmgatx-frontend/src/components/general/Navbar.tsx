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
    { name: 'Home', path: '/', icon: BiHomeAlt },
    { name: 'About', path: '/about', icon: BiMapAlt },
    { name: 'Gallery', path: '/gallery', icon: BiPhotoAlbum },
    { name: 'Artists', path: '/artists', icon: BiGroup },
    { name: 'Contact', path: '/contact', icon: BiMessageRoundedDetail },
  ];

  return (
    <>
      <Head>
        <title>WGMGATX{title ? ` | ${title}` : ''}</title>
      </Head>
      <div className="bg-[#181818] w-[12%] justify-center hidden md:flex">
        <nav className="flex flex-col items-center fixed">
          <div className="mb-8 rounded-full mt-[6vh]">
            <Image
              src={wgmgLogo}
              alt="WGMG Logo"
              width="92%"
              height="92%"
              className="rounded-full"
            />
          </div>
          <ul>
            {routes.map((route) => (
              <li key={route.name} className="mb-8 text-center">
                <route.icon size={'30px'} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
