import React from 'react';
import Link from 'next/link';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faBehance,
  faTwitter,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

const TopBar = () => {
  return (
    <div className="flex pl-20 ">
      <input
        type="text"
        placeholder="Search"
        className="bg-[#171717] rounded-xl pl-10"
      />
      <ul className="ml-10 flex">
        <li className="w-[35px] h-[35px] flex justify-center items-center mr-4 bg-white rounded-full cursor-pointer">
          <Link href="#" passHref>
            <FontAwesomeIcon icon={faInstagram} color="#202020" size="lg" />
          </Link>
        </li>
        <li className="w-[35px] h-[35px] flex justify-center items-center mr-4 bg-white rounded-full cursor-pointer">
          <Link href="#" passHref>
            <FontAwesomeIcon icon={faBehance} color="#202020" size="lg" />
          </Link>
        </li>
        <li className="w-[35px] h-[35px] flex justify-center items-center mr-4 bg-white rounded-full cursor-pointer">
          <Link href="#" passHref>
            <FontAwesomeIcon icon={faTwitter} color="#202020" size="lg" />
          </Link>
        </li>
        <li className="w-[35px] h-[35px] flex justify-center items-center mr-4 bg-white rounded-full cursor-pointer">
          <Link href="#" passHref>
            <FontAwesomeIcon icon={faFacebook} color="#202020" size="lg" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
