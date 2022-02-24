import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import api from 'src/utils/api';
import { validateEmail } from 'src/utils/helpers';
import { useRouter } from 'next/router';

import NewsletterImage from '@public/images/newsletter-img.png';

const Newsletter: NextPage = () => {
  const { t } = useTranslation('newsletter');
  const { locale } = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function submitEmail() {
    if (validateEmail(email)) {
      api
        .createWaitlist(email)
        .then((res) => {
          if (res.data.data.createWaitlist.success) {
            setSubmitted(true);
          } else {
            setSubmitted(false);
          }
        })
        .catch(() => setSubmitted(false));
    }
  }

  return (
    <section className="flex flex-col-reverse md:flex-row mt-24 mb-48">
      <div
        className="self-center"
        style={locale === 'ar' ? { transform: 'scaleX(-1)' } : {}}
      >
        <Image src={NewsletterImage} alt="" placeholder="blur" />
      </div>
      <div className="max-w-4xl self-center md:self-end md:mb-48 flex flex-col items-center flex-1 p-4 md:p-0">
        <h2 className="text-black dark:text-white font-bold text-[2.8125rem] tracking-[-0.03em] font-secondary">
          {t('title-top')}
          {' '}
          <br />
          {t('title-bot')}
        </h2>
        {!submitted ? (
          <>
            <input
              type="email"
              placeholder={t('email-placeholder')}
              className="w-full md:w-[35.1875rem] mt-12 mb-8 bg-white border border-black border-opacity-10 rounded-[30px] pl-[2.625rem] h-[3.75rem] font-primary text-lg tracking-[-0.02em] text-black outline-none"
              style={{ boxShadow: '0px 10px 50px rgb(7 45 1 / 10%)' }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="text-white font-primary font-bold text-lg leading-[22px] tracking-[-0.02em] bg-[#27AE60] rounded-[30px] py-5 px-8 outline-none cursor-pointer"
              onClick={submitEmail}
            >
              {t('submit-button')}
            </button>
          </>
        ) : (
          <h3 className="text-[2.125rem] leading-10 tracking-[-0.04em] mt-2 font-secondary font-medium text-black text-opacity-80">
            {t('submited-message')}
          </h3>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
