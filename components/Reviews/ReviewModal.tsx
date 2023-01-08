import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { IReviewModalOptionsType } from '../../types/RoomTypes';

const ReviewModal: React.FC<IReviewModalOptionsType> = ({ reviews }) => {
  return (
    <div className='overflow-y-auto'>
      {reviews.map((review, index) => {
        const { comment, createdAt, Rate, user } = review;
        const { name, image } = user;
        return (
          <div key={index} className='p-4'>
            <div className='flex gap-3 items-center'>
              <div className='relative rounded-full'>
                <Image
                  src={image}
                  alt={name}
                  layout='fixed'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              </div>
              <div>
                <p className='font-semibold'>{name}</p>
                <p className='text-sm'>{moment(createdAt).format('LL')}</p>
              </div>
            </div>
            <p className='mt-4'>{comment}</p>
            <div className='mt-4 border border-gray-200'></div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewModal;
