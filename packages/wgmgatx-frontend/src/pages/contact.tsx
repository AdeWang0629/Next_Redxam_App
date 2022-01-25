import ContactForm from "@components/contact/ContactForm";
import Navbar from "@components/general/Navbar";
import { NextPage } from "next";

const Contact: NextPage = () => {
  return (
    <>
      <Navbar title="Contact" />
      <div className="flex justify-center min-h-screen pt-40">
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
