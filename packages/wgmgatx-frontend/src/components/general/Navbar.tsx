import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Imgs
import wgmgLogo from '@public/logo-wgmg.png';

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
      <div className="bg-[#181818] w-[12%] flex justify-center">
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
