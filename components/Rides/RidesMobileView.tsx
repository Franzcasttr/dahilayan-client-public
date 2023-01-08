import { addDays } from 'date-fns';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import React, { FC, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Pagination } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import { formatter } from '../../utils/format';
import { ISingleRideTypes } from '../../types/RidesTypes';

const RidesMobileView: FC<ISingleRideTypes> = ({
  singleRide,
  setIsOpenGallery,
}) => {
  const { push, query } = useRouter();

  const { id, name, description, image_url, price } = singleRide;

  return (
    <>
      <div className='md:hidden'>
        <div className='relative'>
          <div className='section-center'>
            <div
              className='p-3 rounded-full bg-white absolute mt-3 z-50'
              onClick={() => push('/rides')}>
              <MdArrowBackIosNew className='text-lg cursor-pointer' />
            </div>
          </div>
          <div className='mb-4'>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}>
              {image_url.map((data: { url: string }, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    <div className='relative w-full h-[20rem] md:hidden cursor-pointer'>
                      <Image
                        src={data.url}
                        alt={name}
                        layout='fill'
                        priority
                        onClick={() => setIsOpenGallery(true)}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className='section-center my-8'>
          <p className='font-semibold text-xl'>{name}</p>
          <p className='mt-5 font-bold primary-clr text-2xl'>
            {formatter(price)}
          </p>
          <hr className='border border-gray-200 my-8' />
          <p className='font-semibold text-xl'>Description</p>
          <p className='mt-4 text-[#aaa]'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default RidesMobileView;
