import { useState, useRef } from 'react';
import InputWrapper from './InputWrapper';
import emailjs, { init } from '@emailjs/browser';

const ContactForm = () => {
  const [form, setForm] = useState({
    fname: 'diego',
    lname: 'vielma',
    email: 'diego13vielma@gmail.com',
    phone: '01253761523',
    msg: 'TESTING 1',
    
  });
  init("user_Zb6bgIsD9JympDy0Ot25C");
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default refresh by the browser
    emailjs.sendForm(`gmail`, `template_5fs7fas`, form, `user_Zb6bgIsD9JympDy0Ot25C`)
    .then((result) => {
    alert("Message Sent, We will get back to you shortly", result.text);
    },
    (error) => {
    alert("An error occurred, Please try again", error.text);
    });
    };


  return (
    <div className="bg-[#171717] p-8 rounded-[18px] w-full">
      <div className="flex items-center flex-col mb-10 w-full">
        <h2 className="text-4xl pt-6 font-bold">Contact Us</h2>
        <form ref={form} className="flex items-center flex-col pt-10 gap-7 w-full md:w-[50%] 2xl:w-[38%]">
          <input name='fname' className='w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:placeholder:text-white' placeholder='First Name' type='text'/>

          <input name='lname' className='w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:text-white focus:placeholder:text-white' placeholder='Last Name' type='text'/>

          <input name='email' className='w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:text-white focus:placeholder:text-white' placeholder='Email' type='email'/>

          <input name='phone' className='w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:text-white focus:placeholder:text-white' placeholder='Phone Number' type='text'/>

          <input name='msg' className='w-full pl-6 p-3 rounded-[12px] bg-[#1e1e1e] focus:ring-2 focus:ring-white focus:bg-[#1e1e1e] focus:text-white focus:placeholder:text-white' placeholder='Type your message' type='text'/>

          <button onClick={e => handleSubmit(e)} className="w-full text-center font-bold rounded-[12px] py-3 bg-[#fff] text-[#1e1e1e] hover:ring-2 hover:ring-white hover:bg-[#1e1e1e] hover:text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;


