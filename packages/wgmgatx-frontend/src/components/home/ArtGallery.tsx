import Image from 'next/image';
import unsplash from '@public/unsplash.png';
import { Artwork } from '@types';
import artData from '@art-data';
import { CgArrowLongRight } from 'react-icons/cg';
import Link from 'next/link';

interface Props {
  arts: Artwork[];
  bgColor: string;
}

const ArtGallery = (props: Props) => {
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
    const btn = document.getElementById('btn');
    // @ts-ignore
    btn.style.transform = 'scale(1.2)';
  };
  const btnZoomOut = () => {
    const btn = document.getElementById('btn');
    // @ts-ignore
    btn.style.transform = 'scale(1)';
  };

  return (
    <div className={props.bgColor}>
      <h1 className="text-2xl font-bold mt-16 mb-10 ml-[10%]">Gallery</h1>
      <div>
        <div className="relative grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2 col-span-3 mx-[10%] pb-6">
          {props.arts.slice(5, 8).map((art, index) => {
            return (
              <div className="m-4" key={index}>
                <Image
                  src={art.image}
                  className="mb-0 transition duration-200 ease-in-out saturate-[80%] hover:saturate-[100%] rounded-[15px] z-40"
                  onMouseOver={() => showingArtInfo(art.id)}
                  onMouseOut={() => showingArtInfo(art.id)}
                  alt={art.title}
                />
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
              </div>
            );
          })}

          <div
            id="btn"
            className="absolute bottom-0 right-12 transition duration-150 ease-in-out"
            onMouseOver={() => btnZoomIn()}
            onMouseOut={() => btnZoomOut()}
          >
            <Link href="/gallery">
              <div className="flex items-center">
                See more &nbsp; &nbsp;
                <CgArrowLongRight fontSize="40px" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtGallery;
