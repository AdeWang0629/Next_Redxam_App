import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCookie, setCookies } from 'cookies-next';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';

const EnvironmentsSwitcher: NextPage = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState(
    typeof window !== 'undefined'
      ? (getCookie('environment') as string) || 'production'
      : 'production'
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setCookies('environment', currentEnvironment);
  }, [currentEnvironment]);

  return (
    <div
      className={`${
        hidden ? 'hidden' : 'flex'
      } flex-col fixed top-4 right-4 py-4 px-6 min-w-[20rem] shadow rounded-xl bg-gray-300 z-50`}
    >
      <div className="flex items-center justify-between">
        <span className="font-secondary font-medium text-lg">Environment:</span>
        <button
          className="flex items-center justify-center"
          onClick={() => setHidden(true)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className="flex flex-row items-center mt-2">
        <input
          type="radio"
          name="env"
          value="production"
          id="production"
          checked={currentEnvironment === 'production'}
          onChange={(e) => setCurrentEnvironment(e.target.value)}
        />
        <label htmlFor="production" className="font-primary ml-1">
          Production
        </label>
      </div>
      <div className="flex flex-row items-center">
        <input
          type="radio"
          name="env"
          value="development"
          id="development"
          checked={currentEnvironment === 'development'}
          onChange={(e) => setCurrentEnvironment(e.target.value)}
        />
        <label htmlFor="development" className="font-primary ml-1">
          Development
        </label>
      </div>
      <span className="mt-2 font-primary">
        <span className="font-medium">Display size:</span>
        {' '}
        {typeof window !== 'undefined' ? window.screen.width : 0}
        x
        {typeof window !== 'undefined' ? window.screen.height : 0}
      </span>
    </div>
  );
};

export default EnvironmentsSwitcher;
