import { NextPage } from 'next';
import Image from 'next/image';
import { google } from 'googleapis';
import Navbar from '@components/general/Navbar';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';

let data = {};

async function getStaticProps() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `Sheet1!A:E`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: '1IAkfsKQ0CpMJoV0vNJONAykNLDPvQNXN8pN_BQyLvi0',
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
  data = artists;
  
  return {
    props: {
      artists,
    },
  };
}

interface Props {
  artists: {
    id: String;
    name: String;
    description: String;
    social: String;
    image: String;
  }[];
}



export default {
  data
}
