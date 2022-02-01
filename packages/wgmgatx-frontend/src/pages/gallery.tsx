import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import ItemList from '@components/home/ItemList';
import artData from '@art-data';

const Gallery: NextPage = () => {
  const artDataLenght = artData.arts.length;

  return (
    <>
      <Navbar title="Gallery" />
      <div className="flex justify-center min-h-screen pt-40">
        <ItemList
          arts={artData.arts}
          bgColor="bg-zinc-900"
          from={0}
          to={artDataLenght}
          title="Artists"
        />
      </div>
    </>
  );
};

export default Gallery;
