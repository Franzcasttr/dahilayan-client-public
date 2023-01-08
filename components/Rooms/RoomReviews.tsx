import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { roomReviews } from '../../assets/roomData';
import { IReviewTypes } from '../../types/RoomTypes';

const RoomReviews: React.FC<IReviewTypes> = ({ reviews, setIsOpenReview }) => {
  return (
    <>
      <div className='section-center pb-4'>
        <p className='font-semibold text-xl mb-8'>Reviews</p>
        <div className='flex gap-3 overflow-x-auto scrollbar-hide md:flex-col md:gap-12'>
          {reviews.slice(0, 5).map((review, index) => {
            const { comment, createdAt, Rate, user } = review;
            const { name, image } = user;
            return (
              <div
                key={index}
                className=' p-4 border border-[#aaa] rounded-xl shrink-0 w-[17rem] h-[20rem] md:border-none md:w-[50rem] md:h-fit md:p-0'>
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
                <div className=' hidden md:block mt-4 border border-gray-200'></div>
              </div>
            );
          })}
        </div>
        <div className='flex justify-center'>
          <button
            className=' p-4 border border-[#aaa] rounded-xl mt-8 '
            onClick={() => setIsOpenReview(true)}>
            Show all reviews
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomReviews;
