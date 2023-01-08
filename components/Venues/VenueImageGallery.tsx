import Image from 'next/image';
import React, { FC } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdArrowBackIosNew } from 'react-icons/md';
import { IRidesgalleryTypes } from '../../types/galleryTypes';

const VenueImageGallery: FC<IRidesgalleryTypes> = ({
  roomImg,
  setOpenPicture,
  setIsOpenGallery,
  image_url,
  handleSingleImage,
  name,
  openPicture,
}) => {
  return (
    <>
      {openPicture && (
        <div className='w-full h-full pt-8 mx-auto bg-black fixed z-[99999] top-0 bottom-0'>
          <button
            className='flex items-center space-x-2 text-white section-center pb-8 cursor-pointer'
            onClick={() => setOpenPicture(false)}>
            <CgClose className='text-xl' />
            <p>Close</p>
          </button>
          <div className='relative w-full h-[20rem] mt-20 md:h-[30rem] md:w-[40rem] section-center'>
            <Image
              src={roomImg}
              alt={name}
              layout='fill'
              className='rounded-md cursor-pointer'
            />
          </div>
        </div>
      )}
      <div className=' fixed top-0 bottom-0 seconday-bg w-full h-full overflow-y-scroll scrollbar-hide'>
        <div className='mt-8'>
          <div
            className=' section-center'
            onClick={() => setIsOpenGallery(false)}>
            <MdArrowBackIosNew className='text-2xl cursor-pointer mb-8' />
          </div>
          <div
            className={`${
              image_url.length > 3
                ? 'columns-3 lg:columns-4 w-[25rem] md:w-[45rem] mx-auto section-center'
                : 'columns-2  w-[25rem] md:w-[45rem] mx-auto section-center'
            }`}>
            {image_url.map((data, index: number) => {
              return (
                <div key={index} className='mb-4'>
                  <img
                    // class='mb-4'
                    src={data.url}
                    alt={name}
                    className='rounded-md cursor-pointer'
                    onClick={() => handleSingleImage(data.url)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueImageGallery;
