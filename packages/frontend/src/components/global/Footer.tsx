import type { NextComponentType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

import RedxamLogo from '@public/images/redxam-logo.svg';

const Footer: NextComponentType = () => {
  const { t } = useTranslation('footer');
  return (
    <footer className="pt-16 bg-footer-bg px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center mb-4">
            <Image src={RedxamLogo} alt="redxam" width="50" height="43.75" />
            <h2 className="font-secondary font-medium text-4xl leading-[-0.04em] text-black ml-5">
              {t('redxam')}
            </h2>
          </div>
          <span className="font-primary text-black text-opacity-50 leading-[1.8]">
            {t('copyright')}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-0 mt-8 md:mt-0 flex-1">
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              {t('links')}
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="/about">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    {t('about')}
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/#faq">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    {t('faq')}
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/careers">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    {t('careers')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              {t('privacy')}
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="/static/media/terms_of_service.pdf">
                  <a
                    className="font-medium font-primary text-lg leading-[-0.03em] text-black underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('terms')}
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
                    {t('policy')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-secondary font-medium tracking-[0.3em] uppercase text-[#828282] mb-10">
              {t('contact')}
            </h4>
            <ul className="list-none">
              <li className="mb-4">
                <Link href="mailto:hello@redxam.com?body=Write%20us%20about%20anything%20but%20specially%20redxam%20%F0%9F%98%81!%0A%0AWe%20are%20here%20to%20help!">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    {t('email')}
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="tel:1-973-626-4505">
                  <a className="font-medium font-primary text-lg leading-[-0.03em] text-black underline">
                    {t('phone-number')}
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
        <span className="text-center font-primary text-black text-opacity-50 pt-4">
          {t('disclaimer')}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center lg:px-64">
        <span className="text-center font-primary text-black text-opacity-50">
          {t('redxam-dubai')}
        </span>
        <span className="text-center font-primary text-black text-opacity-50">
          {t('redxam-us')}
        </span>
        <span className="text-center font-primary text-black text-opacity-50 py-4"></span>
      </div>
    </footer>
  );
};

export default Footer;
