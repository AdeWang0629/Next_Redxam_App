import type { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@utils/api';
import Card from '@components/dashboard/Card';
import Logo from '@public/logo.svg';
import AnimatedLogo from '@public/images/dashboard/footer-logo2.gif';

const Token: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = router.query;

  useEffect(() => {
    (async () => {
      if (token) {
        const res = await api.validateEmailToken(token as string);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        if (!res?.data.data.emailValidateToken.success) setError(true);
      }
    })();
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {loading ? (
        <Image
          src={AnimatedLogo}
          width={'50px'}
          height={'45,5px'}
          alt="redxam Animated Logo"
        />
      ) : (
        <Card
          width="w-[350px]"
          height="h-[300px]"
          otherClasses="flex flex-col items-center justify-center bg-white p-2"
        >
          {!error ? (
            <div className="flex flex-col items-center mb-6">
              <Image src={Logo} alt="redxam logo" width="46px" height="42px" />
              <h2 className="ml-4 font-medium text-3xl mt-5 mb-2">
                Welcome to redxam!
              </h2>
              <h3>Your email verification has been completed</h3>
            </div>
          ) : (
            <h3>An error occurred</h3>
          )}
        </Card>
      )}
    </div>
  );
};

export default Token;
