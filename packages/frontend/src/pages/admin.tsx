import { useState, useContext } from "react";
import StaffLogin from "@components/admin/StaffLogin";
import Overview from "@components/admin/Overview";
import Users from "@components/admin/Users";
import Emails from "@components/admin/Emails";
import CreateUser from "@components/admin/CreateUser";
import { AdminContext } from "@providers/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faColumns,
  faUsers,
  faEnvelope,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

export const Admin = () => {
  const { user, loading, noUser } = useContext(AdminContext);
  const [activeSection, setActiveSection] = useState("overview");

  if (loading) return <span>loading</span>;

  return noUser || !user ? (
    <StaffLogin />
  ) : (
    <div className="flex flex-row min-h-screen">
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(356.99deg, #8EE616 -77.71%, #3EB402 66.18%)",
        }}
        className="py-4 min-h-screen text-white"
      >
        <div className="px-6 mt-4 mb-8 text-2xl">Redxam</div>
        <ul className="flex flex-col">
          {[
            { name: "Overview", icon: faColumns },
            { name: "Users", icon: faUsers },
            { name: "Emails", icon: faEnvelope },
            { divider: true },
            { name: "Settings", icon: faCogs },
          ].map((section) => {
            let id = section.name
              ? section.name.split(" ").join("_").toLowerCase()
              : `divider_${Math.floor(Math.random() * 1000)}`;

            return section?.divider ? (
              <hr
                className="bg-white opacity-50"
                key={`divider_${Math.random()}`}
              />
            ) : (
              <li
                key={id}
                className={`py-4 px-6 cursor-pointer flex items-center ${
                  activeSection === id
                    ? "bg-white bg-opacity-10 border-l-2 border-white"
                    : "opacity-70"
                }`}
                onClick={() => setActiveSection(id)}
              >
                {section?.icon && <FontAwesomeIcon icon={section.icon} />}
                <span className="ml-2">{section.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ flex: 7 }} className="px-6 py-8">
        <div className="flex items-center">
          <div className="flex-1 ml-4">
            <h1 className="text-2xl">
              {activeSection[0].toUpperCase() +
                activeSection.replace(/\_/gm, " ").slice(1)}
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <div className="flex-1 flex justify-end pr-4 border-r border-black border-opacity-30 ">
              <FontAwesomeIcon icon={faSearch} />
              <FontAwesomeIcon icon={faBell} className="ml-2" />
            </div>
            <div className="flex items-center px-4">
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end py-4 mx-4">
          <button
            onClick={() => setActiveSection("create_user")}
            style={{
              border: "1px solid rgb(62,180,2)",
              color: "rgba(62,180,2,1)",
            }}
            className="py-3 px-6 rounded-xl transition-opacity duration-300 hover:opacity-70"
          >
            Create user
          </button>
          <button
            style={{
              border: "1px solid rgb(62,180,2)",
              backgroundColor: "rgba(62,180,2,1)",
            }}
            className="py-3 px-6 rounded-xl transition-opacity duration-300 hover:opacity-70 text-white ml-4"
          >
            New deposit
          </button>
        </div>
        {activeSection === "overview" ? (
          <Overview />
        ) : activeSection === "users" ? (
          <Users />
        ) : activeSection === "create_user" ? (
          <CreateUser setActiveSection={setActiveSection} />
        ) : activeSection === "emails" ? (
          <Emails />
        ) : null}
      </div>
    </div>
  );
};

export default Admin;