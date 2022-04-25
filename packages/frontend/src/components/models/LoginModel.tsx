/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { UserContext } from '@providers/User';
import { useTranslation } from 'next-i18next';
import { io } from 'socket.io-client';
import api from 'src/utils/api';
import { validateEmail } from 'src/utils/helpers';
import { setCookies, getCookie } from 'cookies-next';
import SignupModel from './SignupModel';

const socket = io(
  (typeof window !== 'undefined' &&
  getCookie('environment') &&
  getCookie('environment') === 'development'
    ? process.env.NEXT_PUBLIC_DEV_BASE_URL
    : process.env.NEXT_PUBLIC_PROD_BASE_URL) as string
);

interface LoginModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
}

const LoginModel: NextPage<LoginModelProps> = ({ isOpened, setOpened }) => {
  const router = useRouter();
  const { setUser, setNoUser } = useContext(UserContext);
  const { t } = useTranslation('login');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [signupOpened, setSignupOpened] = useState(false);
  const outsideContainerRef = useRef(null);

  useEffect(() => {
    socket.on('userVerified', token => {
      setCookies('token', token);
      api.getUserData().then(({ data: userData }) => {
        setUser(userData.data.user[0]);
        setNoUser(false);
        document.body.style.overflow = 'auto';
        if (userData.data.user[0].accountStatus === 'invited') {
          router.push('/invite');
        } else {
          router.push('/home');
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [router, setNoUser, setUser]);

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

  function handleSubmit(event: any) {
    event.preventDefault();

    if (!email) return alert(t('enter-email-error'));
    if (!validateEmail(email)) return alert(t('valid-email-error'));
    setLoading(true);

    api
      .login(email)
      .then(res => {
        // start socket
        socket.emit('onLogin', email);
        setResponse(res.data.data.updateToken.success);
      })
      .catch(() => {
        alert(t('error-ocurred'));
      })
      .finally(() => {
        setSubmitted(true);
        setLoading(false);
      });
    return null;
  }

  return (
    <>
      <div className="bg-black bg-opacity-75 absolute top-0 left-0 h-[200%] w-full z-50">
        <div
          className="flex flex-col justify-center items-center h-screen"
          ref={outsideContainerRef}
          onClick={handleOutsideClick}
          role="dialog"
        >
          <div className="flex flex-col items-center bg-white rounded-[30px] w-[90%] md:w-1/2 xl:w-2/5 2xl:w-1/4 px-6 py-12">
            {!submitted ? (
              <>
                <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                  {t('login-title')}
                </h3>
                <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                  {t('login-desc')}
                </p>
                <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                  <div className="mt-5 input-wrapper w-full">
                    <input
                      type="email"
                      className="font-secondary w-full"
                      onChange={e => setEmail(e.target.value.toLowerCase())}
                      value={email}
                      required
                      id="email"
                    />
                    <label className="font-primary" htmlFor="email">
                      {t('email-placeholder')}
                    </label>
                  </div>
                  <button
                    className="text-white font-primary font-medium text-lg leading-[20px] tracking-[-0.02em] bg-[#27AE60] rounded-[30px] mt-8 py-4 px-8 outline-none cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {t('login-button')}
                  </button>
                </form>
              </>
            ) : response ? (
              <div className="flex flex-col">
                <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                  {t('sent')}
                </h3>
                <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                  {t('sent-desc')}
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <h3 className="mb-2.5 text-4xl text-black text-opacity-80 text-center">
                  {t('innactive')}
                </h3>
                <p className="w-full mb-5text-black text-opacity-80 leading-[1.8] text-lg font-primary text-center">
                  {t('innactive-desc')}
                </p>
                <div className="flex flex-col justify-center items-center">
                  <button
                    className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-[25px] md:mt-0"
                    onClick={() => setSignupOpened(true)}
                  >
                    {t('join-waitlist')}
                  </button>
                  <a href="mailto:hello@redxam.com">
                    <button className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-2">
                      {t('email-us')}
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {signupOpened && (
        <SignupModel isOpened={signupOpened} setOpened={setSignupOpened} />
      )}
    </>
  );
};

export default LoginModel;
