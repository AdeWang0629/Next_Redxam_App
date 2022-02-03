import Image from 'next/image';
import unsplash from '@public/unsplash.png';
import { Artwork } from '@types';
import artData from '@art-data';
import { CgArrowLongRight } from 'react-icons/cg';
import Link from 'next/link';

interface Props {
  title: string;
  artists: {
    id: String;
    name: String;
    description: String;
    social: String;
    image: String;
  }[];
  bgColor?: string;
  from: number;
  to: number;
  goTo?: string;
  complete?: boolean;
  info?: boolean;
  // active?: boolean;
}

const ItemList = (props: Props) => {
  console.log(props);
  const showingArtInfo = (id: string) => {
    const infoDiv = document.getElementById(id);
    if (infoDiv?.style.transform == 'translateY(0px)') {
      infoDiv.style.transform = 'translateY(-150px)';
    } else {
      // @ts-ignore
      infoDiv.style.transform = 'translateY(0px)';
    }
  };
  const btnZoomIn = () => {
    const btn = document.getElementById(props.title);
    // @ts-ignore
    btn.style.transform = 'scale(1.2)';
  };
  const btnZoomOut = () => {
    const btn = document.getElementById(props.title);
    // @ts-ignore
    btn.style.transform = 'scale(1)';
  };

  return (
    <div className={props.bgColor}>
      <h1 className="md:text-6xl text-4xl font-bold pt-14 mb-16 text-center">
        {props.title}
      </h1>
      <div>
        <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2 col-span-3 mx-[10%] pb-6">
          {props.artists.slice(props.from, props.to).map((item, index) => {
            return (
              <div className="m-4" key={index}>
                <Image
                  src={item.image}
                  width="100%"
                  height="100%"
                  className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                  onMouseOver={() =>
                    props.info ? showingArtInfo(item.id) : null
                  }
                  onMouseOut={() =>
                    props.info ? showingArtInfo(item.id) : null
                  }
                  alt={item.title}
                  onClick={() => console.log(item.id)}
                />
                {props.info ? (
                  <div
                    id={item.id}
                    className="bg-[#41414959] text-left p-8 w-4/5 rounded-[15px] mx-auto transition duration-150 ease-in-out z-30 translate-y-[-150px]"
                  >
                    <span className="font-bold text-lg">{item.title}</span>
                    <br />
                    <span className="text-base">{item.description}</span>
                    <br />
                    <span className="text-base">{'$ ' + item.price}</span>
                  </div>
                ) : null}
              </div>
            );
          })}

          <div
            id={props.title}
            className="absolute bottom-0 pb-10 right-12 transition duration-150 ease-in-out cursor-pointer"
            onMouseOver={() => btnZoomIn()}
            onMouseOut={() => btnZoomOut()}
          >
            {props.goTo ? (
              <Link href={props.goTo}>
                <div className="flex items-center">
                  See more &nbsp; &nbsp;
                  <CgArrowLongRight fontSize="40px" />
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
