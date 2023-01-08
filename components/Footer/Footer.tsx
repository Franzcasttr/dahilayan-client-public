import Link from 'next/link';
import React from 'react';
import { BsFillHeartFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='bg-black text-white'>
      <div className='section-center pt-8'>
        <div className='md:flex md:justify-between'>
          <div>
            <div className=' font-semibold text-2xl mb-4'>
              <p>Dahilayan</p>
            </div>
            <p>Brgy. Dahilayan, Manolo Fortich Bukidnon, Philippines</p>
            <div className='my-4'>
              <p>Tel:</p>
              <p>0917-622-3204</p>
            </div>
            <div className='my-4'>
              <p>Email:</p>
              <p>contactdahilyan@gmail.com</p>
            </div>
          </div>
          <hr className='border border-gray-700 my-8 md:hidden' />
          <div>
            <p className='text-2xl mb-2 mt-6'>About Us</p>
            <div className='cursor-pointer my-3'>
              <Link href='/about'>
                <a>About</a>
              </Link>
            </div>
            <p className='my-3'>Services</p>
            <p className='my-3'>Terms and condition</p>
          </div>
          <hr className='border border-gray-700 my-8 md:hidden' />
          <div>
            <p className='text-2xl mb-2 mt-6'>Follow Us</p>
            <div className=' my-3 flex flex-col gap-3'>
              <Link href='https://web.facebook.com'>
                <a className='cursor-pointer'>Facebook</a>
              </Link>
              <Link href='https://twitter.com'>
                <a className='cursor-pointer'>Twitter</a>
              </Link>
              <Link href='https://instagram.com'>
                <a className='cursor-pointer'>Instagram</a>
              </Link>
            </div>
          </div>
        </div>
        <hr className='border border-gray-700 my-8' />
        <div className='text-sm mt-8 pb-2 text-center'>
          <p>Made and craft by Francis Castro 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
