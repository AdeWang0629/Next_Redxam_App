import { NextPage } from 'next';
import Image from 'next/image';
import Navbar from '@components/general/Navbar';
import ArtistList from '@components/artists/ArtistList';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';
import ItemList from '@components/home/ItemList';
import artData from '@art-data';

const Artists: NextPage = () => {
  const artDataLenght = artData.arts.length;
  return (
    <>
      <Navbar title="Artists" />
      <div className="flex justify-center py-20">
        <ItemList
          arts={artData.arts}
          bgColor="bg-zinc-900"
          from={0}
          to={artDataLenght}
          title="Gallery"
        />
      </div>
      {/* <ArtistList /> */}
    </>
  );
};

export default Artists;
