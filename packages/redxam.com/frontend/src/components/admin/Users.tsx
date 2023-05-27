import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import api from '@utils/api';
import { CSVLink } from 'react-csv';

const headers = [
  { label: 'ID', key: '_id' },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Email', key: 'email' },
  { label: 'status', key: 'accountStatus' },
  { label: 'Referral', key: 'referralId' }
];

export default function Users() {
  const [users, setUsers] = useState<
    | []
    | [
        {
          created_at: number;
          _id: string;
          firstName: string;
          lastName: string;
          accountStatus: string;
          referralId: string;
          email: string;
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

  return users.length ? (
    <div>
      <CSVLink
        data={users}
        headers={headers}
        filename="users.csv"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-[20px]"
      >
        <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Export to CSV</span>
      </CSVLink>
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
            .sort((a, b) =>
              Number(
                new Date(b.created_at).getTime() <
                  new Date(a.created_at).getTime()
              )
            )
            .map(user => (
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
    </div>
  ) : (
    <h1 className="text-2xl mx-32">Loading..</h1>
  );
}
