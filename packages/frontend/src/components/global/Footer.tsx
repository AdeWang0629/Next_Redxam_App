import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import RedxamLogo from "@public/images/redxam-logo.svg";

const Footer: NextComponentType = () => {
  return (
    <footer className="pt-16 bg-footer-bg px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center mb-4">
            <Image src={RedxamLogo} alt="redxam" width="50" height="43.75" />
            <h2 className="font-secondary font-medium text-4xl leading-[-0.04em] text-black ml-5">
              redxam
            </h2>
          </div>
          <span className="font-primary text-black text-opacity-50 leading-[1.8]">
            &copy; 2021 redxam, Inc.
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-0 mt-8 md:mt-0 flex-1">
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              links
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="/about">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    About
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/#faq">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    FAQ
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/careers">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    Careers
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              privacy
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="/static/media/terms_of_service.pdf">
                  <a
                    className="font-medium font-primary text-lg leading-[-0.03em] text-black underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/static/media/privacy_policy.txt">
                  <a
                    className="font-medium font-primary text-lg leading-[-0.03em] text-black underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              reach out
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="mailto:hello@redxam.com?body=Write%20us%20about%20anything%20but%20specially%20redxam%20%F0%9F%98%81!%0A%0AWe%20are%20here%20to%20help!">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    hello@redxam.com
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="tel:1-973-626-4505">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    +1 973 626 4505
                  </a>
                </Link>
              </li>
            </ul>
            <div className="flex">
              <a
                href="https://linkedin.com/company/redxam"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://facebook.com/redxamenglish"
                target="_blank"
                rel="noreferrer"
                className="mx-6"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://twitter.com/redxamapp"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-[9.625rem]">
        <span className="text-center font-primary text-black text-opacity-50 py-4">
          All product and company names are trademarks or registered trademarks
          of their respective holders.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
