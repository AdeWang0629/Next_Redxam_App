import { NextPage } from 'next';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import api from '@utils/api';
import { useRouter } from 'next/router';
import { UserContext } from '@providers/User';
import { validateEmail } from '@utils/helpers';
import Logo from '@public/logo.svg';

const Login: NextPage = () => {
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, showError] = useState('');

  function submitEmail() {
    setSubmitLoading(true);
    if (validateEmail(email)) {
      api
        .login(email)
        .then(res => {
          if (res.data.data.updateToken.success) {
            setSubmitted(true);
          } else {
            showError('Email not found!');
            setSubmitted(false);
          }
        })
        .catch(() => setSubmitted(false));
    } else {
      showError('Enter a valid email!');
    }
    setSubmitLoading(false);
  }
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (
      !loading &&
      !noUser &&
      user?.accountStatus &&
      user?.accountStatus !== 'invited'
    ) {
      router.push('/');
    }
  }, [user?.accountStatus, noUser, loading, router]);

  if (loading) return <span>loading</span>;

  let buttonText;

  if (!submitted) {
    buttonText = 'Log in';
  } else if (submitted == true) {
    buttonText = 'Check your email';
  } else {
    buttonText = 'Logging in';
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex items-center">
        <Image src={Logo} width="68px" height="59px" />
        <span className="font-primary font-bold text-5xl text-buttons-green ml-7">
          redxam
        </span>
      </section>

      <section className="flex flex-col mt-16">
        <h1 className="font-secondary font-bold text-lighter-black text-6xl">
          Enter your email
        </h1>
        <p className="font-primary text-center text-lighter-black mt-3">
          We will send you an email which will validate your request!
        </p>
      </section>

      <section className="flex flex-col items-center mt-12 w-full max-w-xs">
        <input
          type="text"
          placeholder="example@redxam.com"
          className="px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
          onChange={e => setEmail(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && submitEmail()}
          disabled={submitted}
        />
        {error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </span>
        )}
        <button
          className="bg-buttons-green rounded-[30px] text-black w-2/3 mt-6 py-4 px-16 transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={submitEmail}
          disabled={submitLoading || submitted}
        >
          {buttonText}
        </button>
      </section>
    </main>
  );
};

export default Login;
