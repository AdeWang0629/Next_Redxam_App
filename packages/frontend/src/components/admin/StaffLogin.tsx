import type { NextPage } from 'next';
import { useState, useContext, BaseSyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '@utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { AdminContext } from '@providers/Admin';
import { setCookies } from 'cookies-next';

import logo from '@public/logo.svg';

const StaffLogin: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser, setNoUser } = useContext(AdminContext);

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!email) return alert('Email is required!');
    if (!password) return alert('Password is required!');

    setError('');
    setLoading(true);

    try {
      const { data } = await api.adminLogin(email, password);

      setCookies('admin_token', data.data.adminLogin.token);

      api
        .getAdminDetails(data.data.adminLogin.token)
        .then(({ data: data2 }) => {
          setUser(data2.data.admin);
          setNoUser(false);
        });
    } catch (error2) {
      console.error(error2);
      setError('Invalid Email or Password');
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <>
      <div className="flex items-center justify-center h-44">
        <Image src={logo} />
      </div>
      <div className="border border-gray-300 rounded-2xl max-w-2xl mx-auto flex flex-col py-8 px-8 dark:text-white">
        <h1 className="text-3xl text-center mt-2">Admin Login</h1>
        {error && (
          <span
            style={{
              backgroundColor: 'rgba(255,0,0,0.2)',
              borderLeft: '2px solid red'
            }}
            className="mt-12 flex items-center justify-between text-lg text-black dark:text-white py-4 px-6 rounded-lg"
          >
            <span>{error}</span>
            <button
              className="border border-red-900 rounded-full p-1 flex items-center justify-center cursor-pointer w-8 h-8"
              onClick={() => setError('')}
            >
              <FontAwesomeIcon icon={faTimes} className="text-red-900" />
            </button>
          </span>
        )}
        <form className="mt-12 px-8 flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email or username"
            className="px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight dark:text-black"
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight dark:text-black mt-4"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex px-3 mt-8">
            <div className="flex-1 flex items-center">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <label htmlFor="rememberme" className="mb-0 ml-1">
                Remember me
              </label>
            </div>
            <div className="flex-1 flex justify-end">
              <Link href="/">
                <a style={{ color: 'rgba(62,180,2,1)' }}>Reset password</a>
              </Link>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className={`text-white rounded-full px-12 py-3 mt-32 self-center transition-opacity duration-300 hover:opacity-70 cursor-pointer ${
              loading ? 'opacity-30 pointer-events-none' : ''
            }`}
            style={{ backgroundColor: 'rgba(62,180,2,1)' }}
          />
        </form>
      </div>
      <ul className="flex flex-row justify-around max-w-lg mx-auto mt-32 opacity-50 font-extralight dark:text-white">
        <li>
          <Link href="/">
            <a>Privacy</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Terms and Conditions</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Contact us</a>
          </Link>
        </li>
      </ul>
      <div className="absolute bottom-0 right-0" style={{ zIndex: -1 }}>
        <svg
          width="948"
          height="929"
          viewBox="0 0 948 929"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f)">
            <ellipse
              cx="777.5"
              cy="766.5"
              rx="377.5"
              ry="366.5"
              fill="#54AE70"
              fillOpacity="0.2"
            />
          </g>
          <defs>
            <filter
              id="filter0_f"
              x="0"
              y="0"
              width="1555"
              height="1533"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default StaffLogin;
