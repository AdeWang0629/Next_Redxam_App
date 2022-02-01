import Image from 'next/image';
import unsplash from '@public/unsplash.png';
import { Artwork } from '@types';
import artData from '@art-data';
import { CgArrowLongRight } from 'react-icons/cg';
import Link from 'next/link';

interface Props {
  title: string;
  arts: Artwork[];
  bgColor?: string;
  from: number;
  to: number;
  goTo?: string;
  complete?: boolean;
  info?: boolean;
  // active?: boolean;
}

const ItemList = (props: Props) => {
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
          {props.arts.slice(props.from, props.to).map((art, index) => {
            return (
              <div className="m-4" key={index}>
                <Image
                  src={art.image}
                  className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40 cursor-pointer"
                  onMouseOver={() => props.info ? showingArtInfo(art.id) : null}
                  onMouseOut={() => props.info ? showingArtInfo(art.id) : null}
                  alt={art.title}
                  onClick={() => console.log(art.id)}
                />
                { props.info ?
                  <div
                  id={art.id}
                  className="bg-[#41414959] text-left p-8 w-4/5 rounded-[15px] mx-auto transition duration-150 ease-in-out z-30 translate-y-[-150px]"
                  >
                    <span className="font-bold text-lg">{art.title}</span>
                    <br />
                    <span className="text-base">{art.description}</span>
                    <br />
                    <span className="text-base">{'$ ' + art.price}</span>
                  </div>
                  : null
                }
              </div>
            );
          })}

          <div
            id={props.title}
            className="absolute bottom-0 pb-10 right-12 transition duration-150 ease-in-out cursor-pointer"
            onMouseOver={() => btnZoomIn()}
            onMouseOut={() => btnZoomOut()}
            
          >
            {props.goTo ? <Link href={props.goTo}>
              <div className="flex items-center">
                See more &nbsp; &nbsp;
                <CgArrowLongRight fontSize="40px" />
              </div>
            </Link> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
