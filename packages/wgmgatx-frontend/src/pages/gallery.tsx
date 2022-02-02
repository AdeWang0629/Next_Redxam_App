import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import ItemList from '@components/home/ItemList';
import artData from '@art-data';

const Gallery: NextPage = () => {
  const artDataLenght = artData.arts.length;

  return (
    <>
      <Navbar title="Gallery" />
        <ItemList
          arts={artData.arts}
          bgColor="black"
          from={0}
          to={artDataLenght}
          title="Gallery"
        />
    </>
  );
};

export default Gallery;
