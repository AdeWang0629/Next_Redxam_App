import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [submit, setSubmit] = useState(false);
  const form = useRef();

  // @ts-ignore
  const sendEmail = e => {
    e.preventDefault();
    setSubmit(true);

    // @ts-ignore
    emailjs
      .sendForm(
        'service_7x1n6jd',
        'template_5fs7fas',
        form.current,
        'user_Zb6bgIsD9JympDy0Ot25C'
      )
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
  };

  return (
    // @ts-ignore
    <div className="bg-[#171717] p-8 rounded-[18px] w-full">
      <div className="flex items-center flex-col mb-10 w-full">
        <h2 className="text-4xl pt-6 font-bold">Contact Us</h2>

        {/* @ts-ignore */}
        {submit ? (
          <h3 className="text-2xl pt-6 font-bold">
            We’re so excited about your interest in WGMG’s Art community and
            someone on the team will get back to you soon.
          </h3>
        ) : (
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex items-center flex-col pt-10 gap-7 w-full md:w-[50%] 2xl:w-[38%]"
          >
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              className="w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white"
            />

            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              className="w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white"
            />

            <textarea
              name="msg"
              placeholder="Message"
              className="w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white"
            />
            <input
              type="submit"
              value="Send"
              className="w-full text-center font-bold rounded-[12px] py-3 bg-[#fff] text-[#1e1e1e] hover:ring-2 hover:ring-white hover:bg-[#1e1e1e] hover:text-white"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
