import Image from 'next/image';
import React, { FC } from 'react';
import { ISingleRideTypes } from '../../types/RidesTypes';
import { formatter } from '../../utils/format';

const RidesWebView: FC<ISingleRideTypes> = ({
  singleRide,
  setIsOpenGallery,
}) => {
  const { id, name, description, image_url, price } = singleRide;

  return (
    <div className='my-8'>
      <div className='hidden md:block section-center'>
        <div>
          <div className='columns-3'>
            {image_url.slice(0, 3).map((data, index: number) => {
              return (
                <div
                  // className='hidden md:block relative  h-[30rem] mb-4'
                  key={index}>
                  <Image
                    src={data.url}
                    alt={name}
                    width={250}
                    height={250}
                    layout='responsive'
                    priority
                    className='rounded-md cursor-pointer'
                    onClick={() => setIsOpenGallery(true)}
                  />
                </div>
              );
            })}
          </div>
          <div className='my-6 flex justify-center'>
            <button
              className='font-semibold seconday-bg p-3 drop-shadow-4xl rounded-lg'
              onClick={() => setIsOpenGallery(true)}>
              Show all photos
            </button>
          </div>
          <p className='font-semibold text-xl'>{name}</p>
          <p className='mt-5 font-bold primary-clr text-2xl'>
            {formatter(price)}
          </p>
          <hr className='border border-gray-200 my-8' />
          <p className='font-semibold text-xl'>Description</p>
          <p className='mt-4 text-[#aaa]'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RidesWebView;
