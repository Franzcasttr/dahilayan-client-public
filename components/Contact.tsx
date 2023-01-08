import Image from 'next/image';
import React from 'react';
import contact from '../assets/images/contact.png';

const Contact = () => {
  return (
    <div className='my-10'>
      <p className='text-center font-semibold text-3xl'>
        Have a <span className='primary-clr'>question?</span>
      </p>
      <p className='text-gray-500 mt-4 text-lg text-center'>
        Fill the form below to get started.
      </p>
      <div className=' md:flex md:justify-between gap-8 mt-10'>
        <div className='mb-10 w-[272px] h-[272px] mx-auto mt-5 md:w-[800px] '>
          <Image src={contact} alt='Contact Image' />
        </div>
        <div className='secondary-bg border border-[#71DAD4] p-8 rounded-2xl w-full'>
          <p className='text-center text-4xl font-bold mb-4 text-[#14DAB6]'>
            Contact Us
          </p>
          <div>
            <form className='flex flex-col gap-3'>
              <label htmlFor='name' className='capitalize'>
                Enter your name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                required
                className='outline-none bg-[#eff6ff] border border-[#71DAD4] rounded-2xl pl-2 h-12'
              />
              <label htmlFor='mail' className='capitalize'>
                Enter your email
              </label>
              <input
                type='email'
                name='mail'
                id='mail'
                required
                className='outline-none bg-[#eff6ff] border border-[#71DAD4] rounded-2xl pl-2 h-12'
              />
              <label htmlFor='message' className='capitalize'>
                enter your message
              </label>
              <textarea
                name='message'
                id='message'
                className='outline-none bg-[#eff6ff] border border-[#71DAD4] rounded-2xl pl-2 h-24'
              />
              <button className='p-4 my-4 mx-auto rounded-xl bg-[#14DAB6] text-white cursor-pointer'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
