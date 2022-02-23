import { ChangeEvent, useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { getCookie } from 'cookies-next';
import api from '@utils/api';
import { Users } from '@utils/types';

const Scripts: NextPage = () => {
  const [script, setScript] = useState('');
  const [email, setEmail] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [users, setUsers] = useState<[] | Users[]>([]);
  const [status, setStatus] = useState<'invited' | 'accepted'>('invited');

  console.log(email);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getAllUsers(
          getCookie('admin_token') as string,
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

      case 'updateWallets':
        api.updateWalletsScript(getCookie('admin_token') as String);
        break;

      case 'updateUserStatus':
        (async () => {
          await api
            .updateUserStatusScript(
              getCookie('admin_token') as String,
              email,
              status,
            )
            .then((res) => {
              alert(res.data.data.updateUserStatus.message);
            })
            .catch((err) => alert(err));
        })();
        break;

      case 'inviteUser':
        (async () => {
          await api
            .inviteUser(
              getCookie('admin_token') as String,
              email,
            )
            .then((res) => {
              alert(res.data.data.inviteUser.message);
            })
            .catch((err) => alert(err));
        })();
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
    <div className="flex flex-col mt-4">
      <div className="flex flex-wrap justify-around items-center">
        <select
          name="emailTemplate"
          id="emailTemplate"
          className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
          placeholder="Select Script"
          onChange={(e) => handleOnChange(e)}
        >
          <option disabled selected>
            Scripts
          </option>
          <option value="updateReferral">Update Referral Code</option>
          <option value="updateWallets">
            Update Wallets Strategy Pattern
          </option>
          <option value="updateUserStatus">Update User Status</option>
          <option value="inviteUser">Invite User</option>
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
      <>
        <select
          name="emailTemplate"
          id="emailTemplate"
          className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2 mt-6"
          placeholder="Select Script"
          onChange={(e) => setEmail(e.target.value)}
        >
          <option disabled selected>
            Select an email
          </option>
          {users
            .filter(
              (user) =>
                user.accountStatus === 'pending' ||
                    user.accountStatus === 'invited',
            )
            .map((user) => (
              <option value={user.email} key={user._id}>
                {user.accountStatus}
                {' '}
                -
                {' '}
                {user.email}
              </option>
            ))}
        </select>
        <select
          name="status"
          id="status"
          className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2 mt-6"
          placeholder="Select Status"
          onChange={(e) =>
            setStatus(e.target.value as 'invited' | 'accepted')
              }
        >
          <option value="invited">Invited</option>
          <option value="accepted">Accepted</option>
        </select>
      </>
      )}

      {script === 'inviteUser' && (
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        className="mt-6 flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      )}
    </div>
  );
};

export default Scripts;
