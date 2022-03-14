import type { NextPage } from 'next';

const DubaiExpo: NextPage = () => (
  <section
    className="bg-no-repeat bg-cover min-h-screen"
    style={{ backgroundImage: 'url(/images/dubaiexpo/dubaiexpo-bg.png)' }}
  >
    <div
      className="bg-no-repeat bg-cover min-h-screen"
      style={{
        background:
          'linear-gradient(180deg, #111C4A 14%, rgba(18, 30, 82, 0) 161.35%)'
      }}
    >
      <div
        className="bg-no-repeat bg-cover min-h-screen"
        style={{ backgroundImage: 'url(/images/dubaiexpo/dots-bg.png)' }}
      >
        <div className="flex flex-col items-center justify-center mx-auto h-screen text-white pt-28 ">
          <div
            className="w-full h-full max-h-[600px] max-w-[600px] rounded-full mb-[49px] bg-no-repeat bg-cover flex justify-center items-center"
            style={{
              backgroundImage: 'url(/images/dubaiexpo/hero-circle.svg)'
            }}
          >
            <h1 className="uppercase text-4xl tracking-[-0.05em] font-secondary font-bold text-center">
              we are going <br />
              <span className="md:text-8xl">
                crypto <br /> expo
              </span>
              <br />
              dubai 2022
            </h1>
          </div>
          <h2 className="font-bold text-4xl">16 - 17 March 2022</h2>
          <h3 className="mt-[10px] mb-[30px] text-xl">
            Festival Arena - Dubai Festival City
          </h3>
          <button
            type="button"
            className="capitalize rounded-full font-medium text-xl text-[#88E120] border border-[#88E120] py-3 px-10"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default DubaiExpo;
