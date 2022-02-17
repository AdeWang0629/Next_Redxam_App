import { NextPage } from 'next';
import Image from 'next/image';
import { google } from 'googleapis';
import Navbar from '@components/general/Navbar';
import wgmgArtistsImg from '@public/images/artists/artists-wgmg.jpeg';

let data = {};

export async function getStaticProps() {
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

const Artists = (props: Props) => {
  return (
    <div>
      <Navbar title="Artists" />
      <h1 className="md:text-6xl text-4xl font-bold pt-14 text-center mb-16">
        Artists
      </h1>
      <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 col-span-3 mx-[10%] pb-6">
        {props.artists.map((item, index) => {
          return (
            <div className="m-4 flex justify-center" key={index}>
              <div className="">
                <Image
                  src={item.image as string}
                  width="400px"
                  height="280px"
                  className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                  alt={item.name as string}
                />
                <p className="mt-3">{item.name}</p>
                {/* <p className="mt-3">{item.description}</p> */}
                <p className="mt-3">
                  {item.social === '@' ? null : item.social}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artists;
