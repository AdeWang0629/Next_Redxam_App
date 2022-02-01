import ContactForm from '@components/contact/ContactForm';
import Navbar from '@components/general/Navbar';
import { NextPage } from 'next';
import Image from 'next/image';
import wgmgWhiteLogo from '@public/images/contact/white-logo-wgmg.jpeg';

const Contact: NextPage = () => {
  return (
    <>
      <Navbar title="Contact" />
      <div className="flex flex-col items-center min-h-screen pt-16">
        <ContactForm />
        <Image
          src={wgmgWhiteLogo || ''}
          alt="WGMG White Logo IMG"
          width="600px"
          height="600px"
        />
      </div>
    </>
  );
};

export default Contact;
