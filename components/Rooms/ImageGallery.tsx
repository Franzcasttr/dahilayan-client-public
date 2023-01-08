import Image from 'next/image';
import React, { FC } from 'react';
import { CgClose } from 'react-icons/cg';
import { MdArrowBackIosNew } from 'react-icons/md';
import { galleryTypes } from '../../types/galleryTypes';

const ImageGallery: FC<galleryTypes> = ({
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
          {image_url.map((data, index: number) => {
            return (
              <div
                key={index}
                className={`${
                  data.url.length > 3
                    ? 'columns-2 lg:columns-3 w-[25rem] md:w-[45rem] mx-auto section-center'
                    : 'columns-2  w-[25rem] md:w-[45rem] mx-auto section-center'
                }`}>
                {data.url.map((img, index: number) => {
                  return (
                    <div className='mb-4' key={index}>
                      <img
                        // class='mb-4'
                        src={img.url}
                        alt={name}
                        className='rounded-md cursor-pointer'
                        onClick={() => handleSingleImage(img.url)}
                      />
                      {/* <Image
                            src={img.url}
                            alt={name}
                            width={500}
                            height={500}
                            layout='responsive'
                            priority
                            objectFit='contain'
                            className='rounded-md cursor-pointer'
                            onClick={() => handleSingleImage(img.url)}
                          /> */}
                      {/* <img
  
          src='https://source.unsplash.com/random/1'
        /> */}
                      {/* <Image
          src={img.url}
          alt={name}
          width={250}
          height={250}
          layout='responsive'
          className='rounded-md cursor-pointer'
        /> */}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
