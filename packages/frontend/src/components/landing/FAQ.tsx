import type { NextPage } from 'next';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import QuestionsImage from '@public/images/questions-img.png';

const FAQ: NextPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(-1);
  const { locale } = useRouter();

  const { t } = useTranslation('faq');

  let questions = [
    {
      title: t('first-question-title'),
      body: t('first-question-body'),
    },
    {
      title: t('second-question-title'),
      body: t('second-question-body'),
    },
    {
      title: t('third-question-title'),
      body: t('third-question-body'),
    },
    {
      title: t('fourth-question-title'),
      body: t('fourth-question-body'),
    },
    {
      title: t('fifth-question-title'),
      body: t('fifth-question-body'),
    },
  ];

  return (
    <section className='flex flex-col-reverse md:flex-row mt-24 mb-48'>
      <div className='max-w-4xl mx-auto flex flex-col p-4 md:p-0'>
        <h4 className='mb-7 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]'>
          {t('subtitle')}
        </h4>
        <h2 className='w-full md:w-[600px] self-start text-left text-[2.8125rem] leading-normal text-lighter-black dark:text-gray-200 font-secondary font-bold mb-36'>
          {t('first-title')}
          <br /> {t('second-title')}
        </h2>
        <div className='flex flex-col'>
          {questions.map((question, idx) => (
            <div
              className='flex flex-col w-full md:w-[63.75rem] py-8 px-8 md:px-16 bg-[#F6F6FA] rounded-[30px] mb-8 transition-all duration-500'
              key={'question' + idx}
            >
              <div
                className='flex flex-row justify-between items-center cursor-pointer transition-all duration-500'
                onClick={() =>
                  setActiveQuestion((prev) => (prev === idx ? -1 : idx))
                }
              >
                <span className='text-2xl md:text-4xl leading-10 w-auto font-primary font-medium text-black text-opacity-50 tracking-[-0.04em]'>
                  {question.title}
                </span>
                <FontAwesomeIcon
                  className={`text-4xl text-black text-opacity-50 ml-1 ${
                    activeQuestion === idx
                      ? 'animate-flip transform rotate-180'
                      : ''
                  }`}
                  icon={faAngleDown}
                />
              </div>
              <p
                className={`leading-[1.8] font-primary text-black text-opacity-80 pt-7 ${
                  activeQuestion === idx ? 'animate-fade-in-down' : 'hidden'
                }`}
              >
                {question.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        className='self-end'
        style={locale == 'ar' ? { transform: 'scaleX(-1)' } : {}}
      >
        <Image src={QuestionsImage} alt='' placeholder='blur' />
      </div>
    </section>
  );
};

export default FAQ;
