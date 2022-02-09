import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Imgs
import wgmgLogo from '@public/wgmg-logo.jpeg';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faMap,
  faImage,
  faUserFriends,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ title }: { title?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'About', path: '/about', icon: faMap },
    { name: 'Gallery', path: '/gallery', icon: faImage },
    { name: 'Artists', path: '/artists', icon: faUserFriends },
    { name: 'Contact', path: '/contact', icon: faEnvelope },
  ];

  return (
    <>
      <Head>
        <title>WGMGATX{title ? ` | ${title}` : ''}</title>
      </Head>
      <div className="bg-[#171717] h-screen w-[12%]	pt-8">
        <nav className="flex flex-col justify-center items-center">
          <div className="mb-8 rounded-full">
            <Image
              src={wgmgLogo}
              alt="WGMG Logo"
              width="120px"
              height="120px"
              className="rounded-full"
            />
          </div>
          <ul>
            {routes.map((route) => (
              <li key={route.name} className="mb-8">
                <FontAwesomeIcon icon={route.icon} size={'xl' as SizeProp} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
