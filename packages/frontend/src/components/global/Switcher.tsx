import type { NextPage } from 'next';
import Link from 'next/link';

interface SwitcherProps {
  activePage?: 'about' | 'careers' | 'blog';
}

const Switcher: NextPage<SwitcherProps> = ({ activePage = '' }) => (
  <div className="flex justify-center mb-0 mx-auto about-content pt-[8rem]">
    <div className="bg-[#FCFCFC] rounded-3xl">
      <Link href="/about">
        <a
          className={`font-primary rounded-3xl text-base p-2 text-lighter-black mb-0 w-28 inline-block text-center ${
            activePage === 'about' ? 'bg-buttons-green' : ''
          }`}
        >
          About Us
        </a>
      </Link>
      <Link href="/careers">
        <a
          className={`font-primary rounded-3xl text-base p-2 text-lighter-black mb-0 w-28 inline-block text-center ${
            activePage === 'careers' ? 'bg-buttons-green' : ''
          }`}
        >
          Careers
        </a>
      </Link>
      <Link href="/blog">
        <a
          className={`font-primary rounded-3xl text-base p-2 text-lighter-black mb-0 w-28 inline-block text-center ${
            activePage === 'blog' ? 'bg-buttons-green' : ''
          }`}
        >
          Blog
        </a>
      </Link>
    </div>
  </div>
);

export default Switcher;
