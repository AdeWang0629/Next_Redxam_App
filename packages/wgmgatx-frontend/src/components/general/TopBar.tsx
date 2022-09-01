/* eslint-disable @next/next/link-passhref */
import React, { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { BiSearch, BiUndo, BiGridAlt, BiHive } from 'react-icons/bi';

const TopBar = () => {
  const [menu, setMenu] = useState(true);
  const [hidden, setHidden] = useState(true);
  // const container = document.getElementById('menu')?.style.opacity;

  const handleMenu = () => {
    hidden
      ? setTimeout(() => {
          setHidden(!hidden);
        }, 0)
      : setTimeout(() => {
          setHidden(!hidden);
        }, 350);
    setMenu(!menu);
  };
  return (
    <div id="#" className="flex items-center">
      <div className="hidden flex bg-[#171717] rounded-[18px] pl-[8px] h-[50px] w-[330px] sm:w-100px">
        <BiSearch color="#817F8A" size="50px" className="py-4 mx-[0px]" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none h-[50px] w-[120px] bg-transparent ml-0 placeholder-[#817F8A]"
        />
      </div>
      <ul className="ml-1 md:ml-3 flex">
        <li className="w-[45px] h-[45px] flex justify-center items-center rounded-full cursor-pointer md:hidden x-50">
          <a className="md:hidden" onClick={() => handleMenu()}>
            <BiGridAlt
              className="hover:fill-white ease-in-out duration-150 "
              color="#817F8A"
              size="25px"
            />
          </a>
        </li>
        <li className="w-[45px] h-[45px] flex justify-center items-center mr-4 bg-[#171717] rounded-full cursor-pointer hidden md:flex">
          <Link href="#">
            <FontAwesomeIcon
              className="hover:text-white ease-in-out duration-150 text-[24px]"
              icon={faInstagram}
              color="#817F8A"
            />
          </Link>
        </li>
        <li className="w-[45px] h-[45px] flex justify-center items-center mr-4 bg-[#171717] rounded-full cursor-pointer hidden md:flex">
          <Link href="#">
            <FontAwesomeIcon
              className="hover:text-white ease-in-out duration-150 text-[24px]"
              icon={faTwitter}
              color="#817F8A"
            />
          </Link>
        </li>
      </ul>
      {
        <div
          className={`${hidden ? 'hidden' : 'flex'} ${
            menu ? 'opacity-0' : 'opacity-100'
          } fixed z-20 h-full w-full m-auto inset-x-0 inset-y-0 p-4 bg-[#171717] rounded-sm transition-opacity ease-in-out duration-[350ms]`}
        >
          <a
            className="absolute left-[30px] top-[45px]"
            onClick={() => handleMenu()}
          >
            <BiUndo
              className="hover:fill-white ease-in-out duration-150"
              color="#817F8A"
              size="25px"
            />
          </a>
          <MobileMenu handleMenu={handleMenu} />
        </div>
        // <div className='relative fixed bg-white t-0 h-[100vh] w-[]'>

        // </div>
      }
    </div>
  );
};

export default TopBar;
