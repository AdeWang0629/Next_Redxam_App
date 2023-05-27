import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { setCookies } from 'cookies-next';
import { useEffect } from 'react';

const Login: NextPage = () => {
  const router = useRouter();
  setCookies('token', null);
  useEffect(() => {
    router.push(window.location.origin);
  }, [router]);

  return <>Logging out..</>;
};

export default Login;
