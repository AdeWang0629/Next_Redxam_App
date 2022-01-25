import ArtistList from "@components/artists/ArtistList";
import Navbar from "@components/general/Navbar";
import { NextPage } from "next";

const Artists: NextPage = () => {
  return (
    <>
      <Navbar title="Artists" />
      <ArtistList />
    </>
  );
};

export default Artists;
