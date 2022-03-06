import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { validateEmail } from 'src/utils/helpers';

import { useTranslation } from 'next-i18next';
import api from '@utils/api';

interface ContactFormProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}

interface Error {
  firstName: string;
  lastName: string;
  emailAddress: string;
  question: string;
}

interface ContactInformation {
  firstName: string;
  lastName: string;
  emailAddress: string;
  question: string;
}

const ContactFormModel: NextPage<ContactFormProps> = ({
  isOpened,
  setOpened
}) => {
  const { t } = useTranslation('contact');

  const [contactInformation, setContactInformation] =
    useState<ContactInformation>({
      firstName: '',
      lastName: '',
      emailAddress: '',
      question: ''
    });

  const [errors, setErrors] = useState<Error>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    question: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [isSubmitted, setSubmitted] = useState(false);
  const [isFormSubmitting, setLoading] = useState(false);

  const outsideContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpened) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';
  }, [isOpened]);

  function handleOutsideClick(event: any) {
    if (outsideContainerRef.current === event.target) {
      setOpened(false);
      document.body.style.overflow = 'auto';
    }
  }

  const isStringEmpty = (value: any) => !value || value.length === 0;

  const validateField = (fieldName: keyof typeof Error, value: string) => {
    const isValueEmpty = isStringEmpty(value);

    let errorMessage = '';

    if (isValueEmpty) {
      switch (fieldName) {
        case 'firstName' as keyof typeof Error:
          errorMessage = t('empty-first-name');
          break;
        case 'lastName' as keyof typeof Error:
          errorMessage = t('empty-last-name');
          break;
        case 'emailAddress' as keyof typeof Error:
          errorMessage = t('empty-email');
          break;
        default:
          errorMessage = t('empty-question');
      }
    }

    if (fieldName === ('emailAddress' as keyof typeof Error) && !isValueEmpty) {
      const isEmailValid = validateEmail(value);

      if (!isEmailValid) {
        errorMessage = t('invalid-email');
      }
    }

    setErrors(prevError => ({ ...prevError, [fieldName]: errorMessage }));
  };

  const onInputChange = (e: any) => {
    const contactFiled = e.target.id;
    const { value } = e.target;

    setContactInformation(prevContactInformation => ({
      ...prevContactInformation,
      [contactFiled]: value
    }));

    validateField(contactFiled, value);
  };

  const validateAllFields = () => {
    Object.entries(contactInformation).forEach(([key, value]) => {
      const errorKey = key as keyof typeof Error;

      validateField(errorKey, value);
    });
  };

  const checkIsFormValid = () => {
    const isEmpty = Object.values(contactInformation).some(value =>
      isStringEmpty(value)
    );

    const isValid = Object.values(errors).every(value => isStringEmpty(value));

    setIsFormValid(!isEmpty && isValid);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    validateAllFields();

    setLoading(true);

    if (isFormValid) {
      api
        .contactform(contactInformation)
        .then(() => {
          // handle success
          setIsEmailSent(true);
        })
        .catch(() => {
          // handle err
          setIsEmailSent(false);
        })
        .finally(() => {
          setSubmitted(true);

          setLoading(false);
        });
    }
  };

  useEffect(checkIsFormValid, [errors, contactInformation]);

  const submittedResult = (
    <>
      <div className="bg-buttons-green w-full py-3 absolute top-0 rounded-t-[30px] transition-transform duration-500" />
      <p>{t('success-message')}</p>
    </>
  );

  const form = (
    <>
      <div className="bg-buttons-green w-full py-3 absolute top-0 rounded-t-[30px] transition-transform duration-500" />
      <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
        {t('contact-title')}
      </h3>
      <p className="w-full mb-5 text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
        {t('contact-sub-title')}
      </p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row mt-5">
          <div
            className={`md:mr-2 input-wrapper ${
              !isStringEmpty(errors.firstName) ? 'invalid' : ''
            }`}
          >
            <input
              type="text"
              className="font-secondary"
              id="firstName"
              onChange={onInputChange}
              value={contactInformation.firstName}
              onBlur={onInputChange}
            />
            <label className="font-primary" htmlFor="firstName">
              {t('first-name')}
            </label>
            {!isStringEmpty(errors.firstName) && (
              <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.5] text-md font-primary text-center font-bold">
                {errors.firstName}
              </p>
            )}
          </div>
          <div
            className={`md:ml-2 mt-5 md:mt-0 input-wrapper ${
              !isStringEmpty(errors.lastName) ? 'invalid' : ''
            }`}
          >
            <input
              type="text"
              className="font-secondary"
              id="lastName"
              onChange={onInputChange}
              value={contactInformation.lastName}
              onBlur={onInputChange}
            />
            <label className="font-primary" htmlFor="lastName">
              {t('last-name')}
            </label>
            {!isStringEmpty(errors.lastName) && (
              <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.5] text-md font-primary text-center font-bold">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div
          className={`mt-5 input-wrapper w-full ${
            !isStringEmpty(errors.emailAddress) ? 'invalid' : ''
          }`}
        >
          <input
            type="text"
            className="font-secondary w-full"
            id="emailAddress"
            onChange={onInputChange}
            value={contactInformation.emailAddress}
            onBlur={onInputChange}
          />
          <label className="font-primary" htmlFor="email">
            {t('email')}
          </label>
          {!isStringEmpty(errors.emailAddress) && (
            <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.5] text-md font-primary text-center font-bold">
              {errors.emailAddress}
            </p>
          )}
        </div>
        <div
          className={`mt-5 input-wrapper w-full ${
            !isStringEmpty(errors.question) ? 'invalid' : ''
          }`}
        >
          <textarea
            className="w-full"
            rows={5}
            id="question"
            onChange={onInputChange}
            onBlur={onInputChange}
          />
          <label className="font-primary" htmlFor="question">
            {t('question')}
          </label>
          {!isStringEmpty(errors.question) && (
            <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.5] text-md font-primary text-center font-bold">
              {errors.question}
            </p>
          )}
        </div>
        <button
          className="text-lighter-black font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-buttons-green rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
          id="contact-us-button"
          disabled={!isFormValid || isFormSubmitting}
        >
          {t('button-text')}
        </button>
        {isSubmitted && !isEmailSent ? (
          <p className="w-full text-[#ae2727] text-opacity-80 leading-[1.5] text-md font-primary text-center font-bold">
            {t('error-message')}
          </p>
        ) : null}
      </form>
    </>
  );

  return (
    <div
      className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
      ref={outsideContainerRef}
      onClick={handleOutsideClick}
      role="dialog"
    >
      <div className="flex flex-col items-center bg-white rounded-[30px] w-3/4 lg:w-1/2 xl:w-2/5 2xl:w-1/3  px-6 py-16 relative overflow-hidden">
        {isSubmitted && isEmailSent ? submittedResult : form}
      </div>
    </div>
  );
};
export default ContactFormModel;
