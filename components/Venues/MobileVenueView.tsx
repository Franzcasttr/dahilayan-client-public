import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ISingleVenue } from '../../types/VenueTypes';
import { formatter } from '../../utils/format';

const MobileVenueView: React.FC<ISingleVenue> = ({
  singleVenue,
  setIsOpenGallery,
}) => {
  const { push } = useRouter();
  const { id, name, image_url, services, description } = singleVenue;
  return (
    <>
      <div className='md:hidden'>
        <div className='relative'>
          <div className='section-center'>
            <div
              className='p-3 rounded-full bg-white absolute mt-3 z-50'
              onClick={() => push('/venues')}>
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
          <p className='text-sm'>{services}</p>
          <hr className='border border-gray-200 my-8' />
          <p className='font-semibold text-xl'>Description</p>
          <p className='mt-4 text-[#aaa]'>{description}</p>
        </div>
      </div>
      <div className='md:hidden flex justify-between items-center pfixed bg-[#EFF6FF] section-center'>
        <div></div>
        <button
          //   onClick={() => {
          //     handleClick(id);
          //   }}
          className='p-4 bg-[#E72381] text-white rounded-md'>
          Inquire Now
        </button>
      </div>
    </>
  );
};

export default MobileVenueView;
