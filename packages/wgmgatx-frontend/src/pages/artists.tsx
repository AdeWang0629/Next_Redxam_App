import { NextPage } from 'next';
import Image from 'next/image';
import { google } from 'googleapis';
import Navbar from '@components/general/Navbar';
import ArtistList from '@components/artists/ArtistList';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';
import ItemList from '@components/home/ItemList';
import artistData from '@artist-data';

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:C`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  console.log(response.data.values);

  const artists = response.data.values;

  return {
    props: {
      artists,
    },
  };
}

const Artists: NextPage = ({ artists }) => {
  console.log(artists);
  const artDataLenght = artistData.artists.length;
  return (
    <>
      <Navbar title="Artists" />
      {artists.map((artist) => (
        <>
          <h1>Name: {artist[0]}</h1>
          <h1>Description: {artist[1]}</h1>
          <h1>Social: {artist[2]}</h1>
        </>
      ))}
      <ItemList
        arts={artistData.artists}
        bgColor="black"
        from={0}
        to={artDataLenght}
        title="Artists"
        info={false}
      />
      <div className="flex justify-center py-14"></div>
    </>
  );
};

export default Artists;
