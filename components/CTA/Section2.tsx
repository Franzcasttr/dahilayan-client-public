import Image from 'next/image';
import React from 'react';
import { section2Data } from '../../assets/section2Data';

const Section2 = () => {
  return (
    <div className='mb-8'>
      <p className='text-3xl text-center font-semibold mb-4'>
        What do you <span className='primary-clr'>expect </span>
      </p>
      <div className='flex flex-col gap-10 my-14 md:grid md:grid-cols-3'>
        {section2Data.map((data) => {
          const { id, name, image, description } = data;
          return (
            <div
              key={id}
              className='p-4 flex flex-col gap-3 text-center drop-shadow-4xl bg-[#EFF6FF] rounded-xl'>
              <div className='relative w-[150px] h-[136px] mx-auto'>
                <Image src={image} alt={name} />
              </div>
              <p className='primary-clr text-xl font-semibold'>{name}</p>
              <p className='secondary-clr'>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section2;
