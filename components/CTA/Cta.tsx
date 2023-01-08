import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import imagecta1 from '../../assets/images/imagecta1.png';

const Cta = () => {
  const { push } = useRouter();
  return (
    <>
      <div className='my-8 md:flex md:justify-between'>
        <div className='my-8 md:w-[30rem]'>
          <div className='text-center font-semibold text-4xl space-y-4 md:text-left'>
            <p>Let&apos;s make your</p>
            <p>
              <span className='primary-clr'>dream</span> vacation
            </p>
          </div>
          <p className='text-center secondary-clr text-sm my-8 md:text-left'>
            Get thrilled with Zipzone’s 840m scream inducing ride! Bond with
            families and friends amidst Dahilayan’s cool and foggy weather.{' '}
          </p>
          <div className='text-center md:text-left'>
            <button
              className=' p-4 primary-bg text-white rounded-md cursor-pointer'
              onClick={() => push('/rooms')}>
              Get Started
            </button>
          </div>
        </div>
        <div className='relative text-center'>
          <Image src={imagecta1} alt='Image CTA' />
        </div>
      </div>
    </>
  );
};

export default Cta;
