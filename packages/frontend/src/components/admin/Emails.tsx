import type { NextPage } from "next";

const Emails: NextPage = () => {
  return (
    <>
      <div className="flex flex-col mt-4">
        <div className="flex flex-wrap justify-around items-center">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
          />
          <select
            name="emailTemplate"
            id="emailTemplate"
            className="flex-1 px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
            placeholder="Email Template"
          >
            <option disabled selected value="">
              Email Template
            </option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </select>
          <input
            type="submit"
            value="Send"
            className="text-white rounded-full px-12 py-3 self-center transition-opacity duration-300 hover:opacity-70"
            style={{ backgroundColor: "rgba(62,180,2,1)" }}
          />
        </div>
      </div>
    </>
  );
};

export default Emails;
