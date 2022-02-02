import { useState } from 'react';
import InputWrapper from './InputWrapper';
import TextInput from './TextInput';

const ContactForm = () => {
  const [contactReason, setContactReason] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  return (
    <div className="flex flex-col items-center mb-10">
      <h1 className="text-5xl font-bold">Contact Us</h1>
      <form action="" className="flex flex-col items-center pt-10 gap-7">
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
      </form>
    </div>
  );
};

export default ContactForm;
