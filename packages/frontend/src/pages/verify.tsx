/**
 * Copyright (c) 2021 redxam LLC
 * oncall: dev+murtaja
 * @format
 *
 *  Page and logic for /verify website that forwards to
 *  /home accepted users
 *  /invite invited users
 *  /login bad login
 */

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '@providers/User';
import api from 'src/utils/api';
import Loader from '@components/global/Loader';
import { io } from 'socket.io-client';

const Verify: NextPage = () => {
  const { setUser, setLoading, setNoUser, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.token || !router.query.email) return;

    setLoading(true);
    api
      .verify(router.query.token as string)
      .then(async ({ data }) => {
        if (data.data.verifyToken.success) {
          const { token } = data.data.verifyToken;
          const { email } = router.query;
          const socket = io('http://localhost:5005');
          socket.emit('onVerified', { token, email });
        } else {
          alert(data.data.verifyToken.message);
          router.push('/login');
        }
      })
      .catch(() => {
        alert('Network Error. Please try again later.');
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query?.token, router, setLoading, setNoUser, setUser]);

  if (loading) return <Loader height="h-screen" />;
  return <h1>You can now close this screen</h1>;
};

export default Verify;
