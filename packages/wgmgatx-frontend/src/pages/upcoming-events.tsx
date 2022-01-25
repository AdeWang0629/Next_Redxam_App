import Navbar from "@components/general/Navbar";
import { NextPage } from "next";

const UpcomingEvents: NextPage = () => {
  return (
    <>
      <Navbar title="Upcoming Events" />
      <div className="flex justify-center min-h-screen pt-40"></div>
    </>
  );
};

export default UpcomingEvents;
