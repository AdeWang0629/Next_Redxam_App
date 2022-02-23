/* eslint-disable no-nested-ternary */
import type { NextPage } from 'next';
import { useState, BaseSyntheticEvent, Dispatch, SetStateAction } from 'react';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

interface CreateUserProps {
  setActiveSection: Dispatch<SetStateAction<string>>;
}

const CreateUser: NextPage<CreateUserProps> = ({ setActiveSection }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthPlace: '',
    title: '',
    address: '',
    nearestLandmark: '',
    state: '',
    marriedStatus: '',
    occupation: '',
    identityIDType: '',
    identityIDNumber: '',
    issuance: '',
    issuancePlace: '',
    issuanceStatus: '',
    issuanceDate: '',
    expiringDate: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const requiredFields = ['firstName', 'lastName', 'email'];

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const emptyFields: string[] = [];

    Object.keys(userData).forEach((key) => {
      if (userData[key as keyof typeof userData] === '') {
        emptyFields.push(key);
      }
    });

    if (emptyFields.some((field) => requiredFields.includes(field))) {
      return setError(
        `${emptyFields
          .filter((field) => requiredFields.includes(field))
          .join(', ')} field(s) are required!`,
      );
    }

    setError('');
    setLoading(true);

    const query = `mutation { createUser(arg: {
      ${Object.keys(userData)
    .filter((key) => userData[key as keyof typeof userData])
    .map(
      (key, idx) =>
        `${key}: "${userData[key as keyof typeof userData]}"${
          idx ===
            Object.keys(userData)
              .filter((key2) => userData[key2 as keyof typeof userData])
              .length - 1
            ? ''
            : ', '
        }`,
    )
    .join('\n')}
     }) { success, message } }`;

    api.axios
      .post(`${api.baseURL}/api/v1?query=${query}`, null, {
        headers: {
          authorization: `Bearer ${getCookie('admin_token')}`,
        },
      })
      .then(({ data }) => {
        if (data.data.createUser.success) {
          setActiveSection('users');
        } else {
          setError(data.data.createUser.message);
        }
      })
      .catch(() => setError('An error occurred!'))
      .finally(() => setLoading(false));

    return null;
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-row border-b mb-8">
        <button
          className="flex flex-col items-center justify-center h-16 w-8 p-4 flex-1 transition-all duration-300 rounded-t font-secondary font-medium hover:bg-gray-100 disabled:bg-gray-200 dark:text-white dark:hover:text-black dark:disabled:text-black"
          disabled={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >
          Personal Information
        </button>
        <button
          className="flex flex-col items-center justify-center h-16 w-8 p-4 flex-1 transition-all duration-300 rounded-t font-secondary font-medium hover:bg-gray-100 disabled:bg-gray-200 dark:text-white dark:hover:text-black dark:disabled:text-black"
          disabled={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          Other identities
        </button>
        <button
          className="flex flex-col items-center justify-center h-16 w-8 p-4 flex-1 transition-all duration-300 rounded-t font-secondary font-medium hover:bg-gray-100 disabled:bg-gray-200 dark:text-white dark:hover:text-black dark:disabled:text-black"
          disabled={activeTab === 2}
          onClick={() => setActiveTab(2)}
        >
          Tax information
        </button>
        <button
          className="flex flex-col items-center justify-center h-16 w-8 p-4 flex-1 transition-all duration-300 rounded-t font-secondary font-medium hover:bg-gray-100 disabled:bg-gray-200 dark:text-white dark:hover:text-black dark:disabled:text-black"
          disabled={activeTab === 3}
          onClick={() => setActiveTab(3)}
        >
          Documents
        </button>
      </div>

      {activeTab === 0 ? (
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col md:flex-row">
            <img
              src="https://i.pravatar.cc/48"
              alt="John Doe"
              width="48"
              height="48"
              className="rounded-full ml-4"
            />
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
                }
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
                }
            />
          </div>
          <hr className="my-4" />
          <div className="flex-1 flex flex-col md:flex-row">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
                }
            />
            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="Phone number"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
                }
            />
            <input
              type="text"
              name="placeofbirth"
              id="placeofbirth"
              placeholder="Place of birth"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.birthPlace}
              onChange={(e) =>
                setUserData({ ...userData, birthPlace: e.target.value })
                }
            />
            <select
              name="title"
              id="title"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              placeholder="Title"
              defaultValue={userData.title}
              onChange={(e) =>
                setUserData({ ...userData, title: e.target.value })
                }
            >
              <option hidden selected>
                Title
              </option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col md:flex-row mt-4 ">
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Residential Address (Street)"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
                }
            />
            <input
              type="text"
              name="landmark"
              id="landmark"
              placeholder="Nearest landmark"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.nearestLandmark}
              onChange={(e) =>
                setUserData({ ...userData, nearestLandmark: e.target.value })
                }
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row mt-4 ">
            <select
              name="state"
              id="state"
              placeholder="State"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.state}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
                }
            >
              <option hidden selected>
                State
              </option>
              <option value="California">California</option>
              <option value="New York">New York</option>
            </select>
            <select
              name="married"
              id="married"
              placeholder="Married status"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.marriedStatus}
              onChange={(e) =>
                setUserData({ ...userData, marriedStatus: e.target.value })
                }
            >
              <option hidden selected>
                Married status
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              type="text"
              name="occupation"
              id="occupation"
              placeholder="Occupation"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.occupation}
              onChange={(e) =>
                setUserData({ ...userData, occupation: e.target.value })
                }
            />
          </div>
        </div>
      ) : activeTab === 1 ? (
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col md:flex-row">
            <select
              name="typeofid"
              id="typeofid"
              placeholder="Type of ID"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.identityIDType}
              onChange={(e) =>
                setUserData({ ...userData, identityIDType: e.target.value })
                }
            >
              <option hidden selected>
                Type of ID
              </option>
              <option value="passport">Passport</option>
            </select>
            <input
              type="number"
              name="idnumber"
              id="idnumber"
              placeholder="ID number"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.identityIDNumber}
              onChange={(e) =>
                setUserData({ ...userData, identityIDNumber: e.target.value })
                }
            />
          </div>
          <div className="flex-1 flex flex-col md:flex-row mt-4">
            <select
              name="issuance"
              id="issuance"
              placeholder="Issuance"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.issuance}
              onChange={(e) =>
                setUserData({ ...userData, issuance: e.target.value })
                }
            >
              <option hidden selected>
                Issuance
              </option>
              <option value="abc">abc</option>
            </select>
            <input
              type="text"
              name="placeofissuance"
              id="placeofissuance"
              placeholder="Place of issuance"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.issuancePlace}
              onChange={(e) =>
                setUserData({ ...userData, issuancePlace: e.target.value })
                }
            />
            <select
              name="status"
              id="status"
              placeholder="Status"
              className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
              defaultValue={userData.issuanceStatus}
              onChange={(e) =>
                setUserData({ ...userData, issuanceStatus: e.target.value })
                }
            >
              <option hidden selected>
                Status
              </option>
              <option value="valid">Valid</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col md:flex-row mt-4">
            <div className="flex flex-col flex-1 mx-2">
              <label
                htmlFor="issuingdate"
                className="mx-6 text-sm opacity-70 -mb-2.5 bg-white w-[fit-content]"
              >
                Issuing Date
              </label>
              <input
                type="date"
                name="issuingdate"
                id="issuingdate"
                placeholder="Issuing Date"
                className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight"
                defaultValue={userData.issuanceDate}
                onChange={(e) =>
                  setUserData({ ...userData, issuanceDate: e.target.value })
                  }
              />
            </div>
            <div className="flex flex-col flex-1 mx-2">
              <label
                htmlFor="expiringdate"
                className="mx-6 text-sm opacity-70 -mb-2.5 bg-white w-[fit-content]"
              >
                Expiring Date
              </label>
              <input
                type="date"
                name="expiringdate"
                id="expiringdate"
                placeholder="Expiring Date"
                className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight"
                defaultValue={userData.expiringDate}
                onChange={(e) =>
                  setUserData({ ...userData, expiringDate: e.target.value })
                  }
              />
            </div>
          </div>
        </div>
      ) : activeTab === 2 ? (
        <div className="flex flex-col">Item Three</div>
      ) : activeTab === 3 ? (
        <div className="flex flex-col">Item Four</div>
      ) : null}
      <div className="flex flex-col items-center mt-16">
        <input
          type="submit"
          value="Submit"
          className="text-white cursor-pointer rounded-full px-12 py-3 self-center transition-opacity duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
          disabled={loading}
          style={{ backgroundColor: 'rgba(62,180,2,1)' }}
        />
        {error ? (
          <span className="font-semibold text-center mt-1 text-red-600">
            {error}
          </span>
        ) : null}
      </div>
    </form>
  );
};

export default CreateUser;
