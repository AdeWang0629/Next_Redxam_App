import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

export default function Users() {
  const [users, setUsers] = useState<[] | [{
    created_at: number;
    _id: string;
    firstName: string;
    lastName: string;
    accountStatus: string;
    referralId: string;
    email: string;
  }]>([]);

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

  return users.length ? (
    <table className="w-full border-separate">
      <thead>
        <tr>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 p-4 text-left border border-black dark:border-white border-opacity-20 rounded-tl-xl">
            Name:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 p-4 text-left border border-black dark:border-white border-opacity-20">
            Last name:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 p-4 text-left border border-black dark:border-white border-opacity-20">
            Status:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 p-4 text-left border border-black dark:border-white border-opacity-20">
            Referral:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 p-4 text-left border border-black dark:border-white border-opacity-20 rounded-tr-xl">
            Email:
          </th>
        </tr>
      </thead>
      <tbody>
        {users
          .sort(
            (a, b) =>
              Number(
                new Date(b.created_at).getTime() <
                new Date(a.created_at).getTime()
              )
          )
          .map((user) => (
            <tr key={user._id}>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 p-4 text-left border border-black dark:border-white border-opacity-20">
                {!user.firstName ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  user.firstName
                )}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 p-4 text-left border border-black dark:border-white border-opacity-20">
                {!user.lastName ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  user.lastName
                )}
              </td>
              <td
                className="bg-black dark:bg-gray-300 bg-opacity-5 p-4 text-left border border-black dark:border-white border-opacity-20"
                style={{
                  color: user.accountStatus === 'accepted' ? 'green' : 'red'
                }}
              >
                {user.accountStatus || (
                <span className="underline font-bold">
                  N/A (need to be migrated)
                </span>
                )}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 p-4 text-left border border-black dark:border-white border-opacity-20">
                {user.referralId || (
                <span className="underline font-bold">No code used</span>
                )}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 p-4 text-left border border-black dark:border-white border-opacity-20">
                {user.email}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  ) : (
    <h1 className="text-2xl mx-32">Loading..</h1>
  );
}
