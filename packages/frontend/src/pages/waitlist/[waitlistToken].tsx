import type { NextPage } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '@utils/api';
import Card from '@components/dashboard/Card';
import Logo from '@public/logo.svg';
import AnimatedLogo from '@public/images/dashboard/footer-logo2.gif';

const WaitlistToken: NextPage = () => {
  const router = useRouter();
  const [waitlistLevel, setWaitlistLevel] = useState<{
    message: String;
    success: Boolean;
    level: String;
    referralCode: String;
  }>({
    message: '',
    success: true,
    level: '',
    referralCode: '',
  });
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState('');
  const { waitlistToken } = router.query;

  useEffect(async() => {
    setBaseUrl(window.location.origin);
    if (waitlistToken) {
      const { data } = await api.getWaitlistLevel(waitlistToken as String);
      setWaitlistLevel(data.data.waitlistLevel);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [waitlistToken, baseUrl]);

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
          {waitlistLevel.success ? (
            <>
              <div className="flex items-center mb-6">
                <Image
                  src={Logo}
                  alt="redxam logo"
                  width="46px"
                  height="42px"
                />
                <h2 className="ml-4 font-medium text-3xl">redxam</h2>
              </div>

              <h3 className="font-secondary text-lg text-center">
                Your position in the waitlist is <br />
              </h3>
              <p className="font-bold text-3xl my-2 text-[#38B000]">
                {waitlistLevel.level}
              </p>
              <h3 className="font-secondary text-lg text-center">
                Invite your friends to get higher on the waitlist by sharing
                this link. <br />
              </h3>
              <p className="font-bold text-md mt-4 text-center text-[#38B000]">
                {`${baseUrl}?referral=${waitlistLevel.referralCode}`}
              </p>
            </>
          ) : (
            <h3>An error occurred</h3>
          )}
        </Card>
      )}
    </div>
  );
};

export default WaitlistToken;
