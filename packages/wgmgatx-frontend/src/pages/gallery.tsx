import Navbar from "@components/general/Navbar";
import { NextPage } from "next";

const Gallery: NextPage = () => {
  return (
    <>
      <Navbar title="Gallery" />
      <div className="flex justify-center min-h-screen pt-40"></div>
    </>
  );
};

export default Gallery;
