import { NextPage } from 'next';
import Image from 'next/image';
import { google } from 'googleapis';
import Navbar from '@components/general/Navbar';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';
import ItemList from '@components/home/ItemList';

export async function getServerSideProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:E`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.ARTIST_SHEET_ID,
    range,
  });

  let artists: {
    id: String;
    name: String;
    description: String;
    social: String;
    image: String;
  }[] = [];

  response?.data?.values?.map((artist) => {
    if (artist[0] !== null) {
      artists[artist[0]] = {
        id: artist[0],
        name: artist[1],
        description: artist[2],
        social: artist[3],
        image: artist[4],
      };
    }
  });

  return {
    props: {
      artists,
    },
  };
}

const Artists: NextPage = ({ artists }) => {
  return (
    <>
      <Navbar title="Artists" />
      {/* <form action="/api/stripe" method="POST">
        <p>Please enter an amount </p>
        <input
          type="number"
          placeholder="Enter amount"
          name="amount"
          className="text-black"
        />

        <button style={{ textAlign: 'center' }}>
          <h2>Pay</h2>
        </button>
      </form> */}

      <ItemList
        artists={artists}
        bgColor="black"
        from={0}
        to={artists.length}
        title="Artists"
        info={false}
      />
    </>
  );
};

export default Artists;
