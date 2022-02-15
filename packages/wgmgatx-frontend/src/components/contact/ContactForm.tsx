import { useState } from 'react';
import InputWrapper from './InputWrapper';
import TextInput from './TextInput';

const ContactForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  return (
    <div className="bg-[#171717] p-8 rounded-[18px]">
      <div className="flex items-center flex-col mb-10">
        <h2 className="text-4xl pt-6 font-bold">Contact Us</h2>
        <form action="" className="flex items-center flex-col pt-10 gap-7">
          <InputWrapper
            value={firstName}
            setValue={setFirstName}
            id="firstName"
            label="First Name"
          />
          <InputWrapper
            value={lastName}
            setValue={setLastName}
            id="lastName"
            label="Last Name"
          />
          <InputWrapper
            value={email}
            setValue={setEmail}
            id="email"
            label="Email"
          />
          <InputWrapper
            value={phone}
            setValue={setPhone}
            id="phone"
            label="Phone"
          />
          <InputWrapper
            value={message}
            setValue={setMessage}
            id="message"
            label="Message"
          />
          <button className="w-full rounded-[18px] py-3 bg-[#fff] text-[#1e1e1e] hover:bg-[#1e1e1e] hover:text-[#fff]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
