import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { API } from '../../client/config';
import { useAppDispatch } from '../../features/app/hook';

const Reviews = ({
  setIsOpen,
  roomId,
  userId,
  bookingId,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomId: string;
  userId: unknown;
  bookingId: string;
}) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const submitReview = async () => {
    setIsOpen(false);

    const payload = {
      comment,
      roomById: roomId,
      userId,
      Rate: rating,
      bookingId,
    };
    try {
      const res = await API.post('reviews/create-review', payload);
      if (res.status === 200) {
        push('/mybooking');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='space-y-8'>
      <div>
        <p className='text-2xl text-center'>Write a review</p>
        <p className='font-semibold'>Rate</p>
        {[...Array(5)].map((stars, index) => {
          index += 1;
          return (
            <button
              type='button'
              key={index}
              className={
                index <= (rating || hover)
                  ? 'text-red-400 text-3xl mr-4'
                  : 'text-3xl  mr-4'
              }
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}>
              <span className='star'>
                <FaStar />
              </span>
              {/* <span className='star'>&#9733;</span> */}
            </button>
          );
        })}
      </div>
      <div>
        <p className='font-semibold mb-2'>Your Review</p>
        <form>
          <textarea
            maxLength={100}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name='review'
            placeholder='Share your experience and help others make better choices!'
            className='outline-none seconday-bg border w-[70vw] md:w-[60vw]  border-gray-300 rounded-lg pl-2 h-44 resize-none'></textarea>
        </form>
        <div className='flex justify-center'>
          <button
            onClick={submitReview}
            type='submit'
            className='p-3 bg-black text-white mt-4 rounded-md cursor-pointer'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
