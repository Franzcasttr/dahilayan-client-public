import Image from 'next/image';
import React, { useState } from 'react';

// interface image_source {
//   src: string;
//   name: string;
//   roomImageById: string;
//   url: string[];
// }

// function RoomLoader({ src }: image_source) {
//   const relativeSrc = (src: string) => src.split('/').pop();

//   return `https:/images.unsplash.com/${relativeSrc(src)}`;
// }

const RoomImage = ({ images }: any) => {
  //   type IMG = image_source;

  return (
    <>
      {images.map((data: any, index: any) => {
        return (
          <div key={index}>
            <Image
              src={data.url[0].url}
              alt={data.name}
              layout='fill'
              className='rounded-3xl'
            />
          </div>
        );
      })}
    </>
  );
};

export default RoomImage;
