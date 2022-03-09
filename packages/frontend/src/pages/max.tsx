import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MaxProfileImage from '@public/images/about/team/max.jpg';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'newsletter',
        'navbar',
        'footer',
        'waitlist',
        'login'
      ]))
    }
  };
};

function Max() {
  return (
    <>
      <Navbar title="Your Personal Crypto Investment Assistant" />
      <section className="max-w-3xl lg:max-w-4xl xl:max-w-7xl px-16 md:px-0 mx-auto flex flex-col items-center mt-40 mb-72">
        <h1 className="text-5xl md:text-7xl leading-tight mb-10 text-center font-bold text-lighter-black dark:text-gray-200 capitalize">
          Meet our Co-Founder
        </h1>

        <Image
          width="232px"
          height="214px"
          className="rounded-2xl"
          src={MaxProfileImage}
          objectPosition="center"
          objectFit="cover"
          placeholder="blur"
        />
        <h5 className="my-1 text-2xl text-black dark:text-white">Max Awad</h5>
        <p className="dark:text-white">CEO, Co-Founder</p>
        <p className="dark:text-white">
          Max is an Google, Apple, Meta Engineer from the United States
        </p>
        <br />
        <Link href="mailto:max@redxam.com" passHref>
          <button
            className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] mb-10 bg-buttons-green"
            id="join-waiting"
          >
            Email Max
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default Max;
