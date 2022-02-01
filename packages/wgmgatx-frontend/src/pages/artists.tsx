import { NextPage } from 'next';
import Image from 'next/image';
import Navbar from '@components/general/Navbar';
import ArtistList from '@components/artists/ArtistList';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';
import ItemList from '@components/home/ItemList';
import artistData from '@artist-data';

const Artists: NextPage = () => {
  const artDataLenght = artistData.artists.length;
  return (
    <>
      <Navbar title="Artists" />
      <ItemList
          arts={artistData.artists}
          bgColor="black"
          from={0}
          to={artDataLenght}
          title="Artists"
          info={false}
        />
      <div className="flex justify-center py-14">
        
      </div>
      {/* <ArtistList /> */}
    </>
  );
};

export default Artists;
