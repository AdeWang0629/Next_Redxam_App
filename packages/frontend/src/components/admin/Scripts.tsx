import { ChangeEvent, useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

const Scripts: NextPage = () => {
  const [script, setScript] = useState('');
  const [email, setEmail] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [users, setUsers] = useState<
    | []
    | [
        {
          accountStatus: string;
          email: string;
          firstName: string;
          lastName: string;
          _id: string;
        }
      ]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getAllUsers(
          getCookie('admin_token') as string
        );
        setUsers(data.data.users);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = () => {
    switch (script) {
      case 'updateReferral':
        api.updateReferralScript(getCookie('admin_token') as String);
        break;

      case 'updateUserStatus':
        api.updateUserStatusScript(getCookie('admin_token') as String, email);
        break;

      default:
        break;
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setScript(e.target.value);
    setSubmitDisabled(false);
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
            onChange={e => handleOnChange(e)}
          >
            <option disabled selected value="">
              Scripts
            </option>
            <option value="updateReferral">Update Referral Code</option>
            <option value="updateUserStatus">Update User Status</option>
          </select>
          <input
            type="submit"
            value="Run"
            className="text-white rounded-full px-12 py-3 self-center transition-opacity duration-300 hover:opacity-70 disabled:opacity-50"
            style={{ backgroundColor: 'rgba(62,180,2,1)' }}
            onClick={() => handleSubmit()}
            disabled={submitDisabled}
          />
        </div>
        {script === 'updateUserStatus' && (
          <select
            name="emailTemplate"
            id="emailTemplate"
            className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2 mt-6"
            placeholder="Select Script"
            onChange={e => setEmail(e.target.value)}
          >
            <option disabled selected value="">
              Select an email
            </option>
            {users.map(user => (
              <option value={user.email} key={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default Scripts;
