import { useState } from 'react';
import type { NextPage } from 'next';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

const Scripts: NextPage = () => {
  const [script, setScript] = useState('');

  const handleSubmit = () => {
    switch (script) {
      case 'updateReferral':
        api.updateReferralScript(getCookie('admin_token') as String);
        break;

      case 'updateWallets':
        api.updateWalletsScript(getCookie('admin_token') as String);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="flex flex-wrap justify-around items-center">
          <select
            name="emailTemplate"
            id="emailTemplate"
            className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
            placeholder="Select Script"
            onChange={(e) => setScript(e.target.value)}
          >
            <option disabled selected value="">
              Scripts
            </option>
            <option value="updateReferral">Update Referral Code</option>
            <option value="updateWallets">
              Update Wallets Strategy Pattern
            </option>
          </select>
          <input
            type="submit"
            value="Run"
            className="text-white rounded-full px-12 py-3 self-center transition-opacity duration-300 hover:opacity-70"
            style={{ backgroundColor: 'rgba(62,180,2,1)' }}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </>
  );
};

export default Scripts;
