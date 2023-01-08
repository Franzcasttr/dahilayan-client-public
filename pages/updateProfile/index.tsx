import { getAuth } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoArrowBackSharp } from 'react-icons/io5';
import ImageLoading from '../../components/ImageLoading';
import ReviewModal from '../../components/Reviews/ReviewModal';

import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { showUserReview } from '../../features/reviews/reviewSlice';
import { updateUserImage } from '../../features/user/userSlice';

const UpdateProfilePage = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { push, pathname } = useRouter();
  const [selectImage, setSelectImage] = useState<File | undefined>();
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);
  const { user: userState, loading } = useAppSelector((state) => state.user);
  const { error, errorMsg, userReviews } = useAppSelector(
    (state) => state.review
  );

  const dispatch = useAppDispatch();

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    setSelectImage(fileList[0]);
    const form = new FormData();
    // console.log(fileList[0]);
    if (fileList !== null) {
      for (const file of fileList) {
        form.append('profile', file);
      }
      dispatch(updateUserImage(form));
    }
  };

  useEffect(() => {
    if (!user) {
      push(`/loginuser?callbackUrl=${pathname}`);
    } else {
      dispatch(showUserReview());
    }
  }, []);
  return (
    <>
      <AnimatePresence>
        {isOpenReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='modal-backdrop'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='review-content scrollbar-hide'>
              <motion.div
                initial={{ opacity: 0, y: -1000 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}>
                <div className='flex justify-end text-4xl mb-3 cursor-pointer'>
                  <AiFillCloseCircle
                    onClick={() => setIsOpenReview(false)}
                    className='text-black'
                  />
                </div>
                <ReviewModal reviews={userReviews} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
        <div className='py-4 flex justify-between items-center section-center'>
          <IoArrowBackSharp
            className='text-3xl font-semibold cursor-pointer'
            onClick={() => push('/profile')}
          />
          <p className='text-xl'>Update Profile</p>
          <div></div>
        </div>
      </div>
      <p className='text-2xl text-center font-semibold my-12'>My Profile</p>
      <div className='section-center'>
        {loading ? (
          <ImageLoading />
        ) : (
          <div className='cursor-pointer w-fit h-fit mx-auto'>
            {selectImage !== undefined ? (
              <div className='relative w-[186px] h-[186px]'>
                <Image
                  src={URL.createObjectURL(selectImage)}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-full'
                />
              </div>
            ) : (
              <div className='relative w-[186px] h-[186px]'>
                {userState.image !== undefined && (
                  <Image
                    src={userState.image}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
                  />
                )}
              </div>
            )}
          </div>
        )}
        <div className='w-fit mx-auto'>
          <button className='underline font-semibold mt-4 cursor-pointer flex justify-center'>
            <label htmlFor='profile'>
              Update Photo
              <input
                type='file'
                accept='image/*'
                name='profile'
                id='profile'
                onChange={handleImage}
                className='hidden'
              />
            </label>
          </button>
        </div>
        <hr className='border border-gray-300 my-12' />
        {userReviews.length >= 1 ? (
          <div>
            <div className='flex gap-3 overflow-x-auto scrollbar-hide md:flex-col md:gap-12'>
              {userReviews.map((review, index) => {
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
                        <p className='text-sm'>
                          {moment(createdAt).format('LL')}
                        </p>
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
                onClick={() => setIsOpenReview(true)}
                className=' p-4 border border-[#aaa] rounded-xl my-8 hover:border-blue-400 hover:border-2 '>
                View all my reviews
              </button>
            </div>
          </div>
        ) : (
          <div className='text-center font-semibold'>
            <p>You have no reviews</p>
            <div className='mt-4 p-4 text-white bg-black w-fit h-fit mx-auto rounded-md'>
              <Link href='/rooms'>
                <a>Browse rooms</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfilePage;
