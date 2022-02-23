import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import {
  BiHomeAlt,
  BiMapAlt,
  BiPhotoAlbum,
  BiGroup,
  BiMessageRoundedDetail
} from 'react-icons/bi';

import wgmgLogo from '@public/logo-wgmg.png';

// @ts-ignore
const MobileMenu = ({ handleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { name: 'Home', path: '/#', icon: BiHomeAlt },
    { name: 'About', path: '/#about', icon: BiMapAlt },
    { name: 'Gallery', path: '/#gallery', icon: BiPhotoAlbum },
    { name: 'Artists', path: '/#artists', icon: BiGroup },
    { name: 'Contact', path: '/#contact', icon: BiMessageRoundedDetail }
  ];
  const [hoverStatus, setHoverStatus] = useState({
    Gallery: false,
    Artists: false
  });

  return (
    <>
      <div className="w-[100%] items-center justify-center md:hidden flex">
        <nav className="flex flex-col items-center fixed">
          <div className="mb-8 rounded-full mt-[6vh]">
            <Image
              src={wgmgLogo}
              alt="WGMG Logo"
              width="100%"
              height="100%"
              className="rounded-full"
            />
          </div>
          <ul>
            {routes.map(route => (
              <li key={route.name} className="text-center">
                <Link href={route.path}>
                  <div
                    onClick={handleMenu}
                    className="group flex flex-col items-center justify-center w-screen py-5 hover:bg-[#1e1e1e] transition-colors duration-[100ms]"
                  >
                    <route.icon
                      className="ease-in-out duration-150 cursor-pointer group-hover:fill-white"
                      size={'30px'}
                      color={'#817F8A'}
                    />
                    <span className="font-bold mt-1 text-[#817F8A] group-hover:text-white">
                      {' '}
                      {route.name}{' '}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
