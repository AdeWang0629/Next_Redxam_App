import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Head from "next/head";

const Navbar = ({ title }: { title?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const routes = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Artists", path: "/artists" },
    { name: "Shop", path: "/shop" },
    { name: "Press", path: "/press" },
    { name: "Upcoming Events", path: "/upcoming-events" },
    { name: "Submissions", path: "/submissions" },
  ];

  return (
    <>
      <Head>
        <title>WGMGATX{title ? ` | ${title}` : ""}</title>
      </Head>
      <div className="relative flex justify-center items-center">
        <Logo />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute z-[9999] bg-grayscale-300 p-3 right-[10%] -translate-y-full rounded-full md:hidden"
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <nav
          className={`absolute z-[9990] bg-[#000] md:flex top-1/2 md:top-3/4 p-5 justify-center ${
            isOpen ? "flex" : "hidden"
          } items-center border-y-2 border-y-[#24221D] w-full`}
        >
          <ul className="flex justify-center items-center gap-14 md:gap-16 flex-col md:flex-row">
            {routes.map((route, index) => (
              <li key={index}>
                <Link href={route.path}>
                  <a className="text-grayscale-400 font-medium transition-colors hover:text-grayscale-500">{route.name}</a>
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
