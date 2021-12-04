import { useEffect, useState } from "react";
import api from "@utils/api";

export default function Users() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getAllUsers(
          sessionStorage.getItem("admin_token") as string
        );
        setUsers(data.data.users);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return users.length ? (
    <>
      <table className="w-full border-separate">
        <thead>
          <tr>
            <th className="bg-black bg-opacity-10 p-4 text-left border border-black border-opacity-20 rounded-tl-xl">
              Name:
            </th>
            <th className="bg-black bg-opacity-10 p-4 text-left border border-black border-opacity-20">
              Last name:
            </th>
            <th className="bg-black bg-opacity-10 p-4 text-left border border-black border-opacity-20">
              Status:
            </th>
            <th className="bg-black bg-opacity-10 p-4 text-left border border-black border-opacity-20 rounded-tr-xl">
              Email:
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort(
              // @ts-ignore
              (a, b) =>
                // @ts-ignore
                new Date(b.created_at).getTime <
                // @ts-ignore
                new Date(a.created_at).getTime()
            )
            .map((user) => (
              // @ts-ignore
              <tr key={user._id}>
                <td className="bg-black bg-opacity-5 p-4 text-left border border-black border-opacity-20">
                  {/* @ts-ignore */}
                  {!user.firstName ? (
                    <span className="underline font-bold">N/A</span>
                  ) : (
                    /* @ts-ignore */
                    user.firstName
                  )}
                </td>
                <td className="bg-black bg-opacity-5 p-4 text-left border border-black border-opacity-20">
                  {/* @ts-ignore */}
                  {!user.lastName ? (
                    <span className="underline font-bold">N/A</span>
                  ) : (
                    /* @ts-ignore */
                    user.lastName
                  )}
                </td>
                <td
                  className="bg-black bg-opacity-5 p-4 text-left border border-black border-opacity-20"
                  style={{
                    // @ts-ignore
                    color: user.accountStatus === "accepted" ? "green" : "red",
                  }}
                >
                  {/* @ts-ignore */}
                  {user.accountStatus || (
                    <span className="underline font-bold">N/A</span>
                  )}
                </td>
                <td className="bg-black bg-opacity-5 p-4 text-left border border-black border-opacity-20">
                  {/* @ts-ignore */}
                  {user.email}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  ) : (
    <h1 className="text-2xl mx-32">Loading..</h1>
  );
}
