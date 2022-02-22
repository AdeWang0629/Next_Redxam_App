import React, {useState} from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faBehance,
  faTwitter,
  faFacebook,
  faSearchengin,
} from '@fortawesome/free-brands-svg-icons';
import { BiSearch, BiUndo, BiGridAlt, BiHive } from 'react-icons/bi';

const TopBar = () => {

  const [menu, setMenu] = useState(true);
  const [hidden, setHidden] = useState(true);
  // const container = document.getElementById('menu')?.style.opacity;

  const handleMenu = () => {
      hidden ? setTimeout(() => {
        setHidden(!hidden);
      }, 0)
      :
      setTimeout(() => {
        setHidden(!hidden);
      }, 350)
    setMenu(!menu);
      // menu ? setTimeout(() => {
      //   setHidden(!hidden);
      // }, 0):
    // setTimeout(() => {
    //   setHidden(!hidden);
    // }, 0);

  }
  console.log('menu:'+menu);
  console.log('hidden:'+hidden);
  return (
    <div id='#' className="flex items-center">
      <div className="flex bg-[#171717] rounded-[18px] pl-[8px] h-[50px] w-[330px] sm:w-100px">
        <BiSearch color="#817F8A" size="50px" className="py-4 mx-[0px]" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none h-[50px] w-[120px] bg-transparent ml-0 placeholder-[#817F8A]"
        />
      </div>
      <ul className="ml-1 md:ml-3 flex">
        <li className="w-[45px] h-[45px] flex justify-center items-center rounded-full cursor-pointer md:hidden x-50">
          <a className='md:hidden' onClick={() => handleMenu()}>
            <BiGridAlt className='hover:fill-white ease-in-out duration-150 ' color="#817F8A" size='25px'/>
            {/* <FontAwesomeIcon className='hover:text-white ease-in-out duration-150' icon={faInstagram} color="#817F8A" size="xl" /> */}
          </a>
        </li>
        <li className="w-[45px] h-[45px] flex justify-center items-center mr-4 bg-[#171717] rounded-full cursor-pointer hidden md:flex">
          <Link href="#">
            <FontAwesomeIcon className='hover:text-white ease-in-out duration-150 text-[24px]' icon={faInstagram} color="#817F8A" />
          </Link>
        </li>
        {/* <li className="w-[35px] h-[35px] flex justify-center items-center mr-4 bg-white rounded-full cursor-pointer">
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
        </li> */}
      </ul>
      {
        <div className={`${hidden ? 'hidden' : 'flex'} ${menu ? 'opacity-0' : 'opacity-100'} fixed z-20 h-full w-full m-auto inset-x-0 inset-y-0 p-4 bg-[#171717] rounded-sm transition-opacity ease-in-out duration-[350ms]`}>
          <a className='absolute left-[30px] top-[45px]' onClick={() => handleMenu()}>
            <BiUndo className='hover:fill-white ease-in-out duration-150' color="#817F8A" size='25px'/>
          </a>
          <MobileMenu handleMenu={handleMenu}/>
        </div>
        // <div className='relative fixed bg-white t-0 h-[100vh] w-[]'>

        // </div> 
      }
    </div>
  );
};

export default TopBar;
