import { getAuth } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoArrowBackSharp } from 'react-icons/io5';
import TitleHeader from '../../components/Header/Title';
import Loading from '../../components/Loading';
import Reviews from '../../components/Reviews/Reviews';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { fetchUserBookingsById } from '../../features/booking/bookingSlice';

const MyBookingPage = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { push, pathname } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [roomId, setRoomsId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [userId, setUserId] = useState<string | unknown>('');
  const { userBookings, loading } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserBookingsById());
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      push(`/loginuser?callbackUrl=${pathname}`);
    } else if (user) {
      setUserId(user.uid);
    }
  }, []);

  const handleReview = (id: string, bookingsId: string) => {
    setIsOpen(true);
    setRoomsId(id);
    setBookingId(bookingsId);
  };

  if (userBookings.length === 0) {
    return (
      <>
        <TitleHeader titlePage='My Booking' />
        <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
          <div className='py-4 flex justify-between items-center section-center'>
            <IoArrowBackSharp
              className='text-3xl font-semibold cursor-pointer'
              onClick={() => push('/profile')}
            />
            <p className='text-xl'>Recent Booking</p>
            <div></div>
          </div>
        </div>
        <div className='section-center'>
          <p className='text-center mt-36'>You have no recent booking</p>
          <div className='flex justify-center mt-8'>
            <button
              className='p-4 bg-black text-white rounded-lg cursor-pointer'
              onClick={() => push('/rooms')}>
              Continue
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TitleHeader titlePage='My Booking' />
      <div>
        <div className='border-b border-gray-300  seconday-bg sticky top-0 z-50 font-semibold md:hidden'>
          <div className='py-4 flex justify-between items-center section-center'>
            <IoArrowBackSharp
              className='text-3xl font-semibold cursor-pointer'
              onClick={() => push('/profile')}
            />
            <p className='text-xl'>Recent Booking</p>
            <div></div>
          </div>
        </div>
        <div className='section-center'>
          <p className='my-8 font-semibold text-center text-2xl hidden md:block'>
            My Recent Booking
          </p>
          <div className=''>
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='modal-backdrop'
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='room-content scrollbar-hide'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <div className='flex justify-end text-4xl mb-8 cursor-pointer'>
                        <AiFillCloseCircle
                          onClick={() => setIsOpen(false)}
                          className='text-red-400'
                        />
                      </div>
                      <Reviews
                        setIsOpen={setIsOpen}
                        roomId={roomId}
                        userId={userId}
                        bookingId={bookingId}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className='section-center '>
            {loading ? (
              <Loading />
            ) : (
              <div className='my-12 flex flex-col gap-8'>
                {userBookings &&
                  userBookings.map((data, index) => {
                    const {
                      id,
                      check_in,
                      check_out,
                      number_of_nights,
                      status,
                      roomBy,
                      createdAt,
                      toRate,
                    } = data;
                    const {
                      id: roomId,
                      bathrooms,
                      bedrooms,
                      beds,
                      name,
                      number_of_guests,
                      image_url,
                    } = roomBy;

                    return (
                      <div
                        key={index}
                        className='seconday-bg drop-shadow-4xl p-8 rounded-xl  md:flex md:justify-between md:gap-8'>
                        <div className=' md:flex md:gap-8'>
                          {image_url.map((data, index: number) => {
                            return (
                              <div key={index}>
                                <div className='relative w-full h-[12rem] mb-3 md:w-40 md:h-28'>
                                  <Image
                                    src={data.url[0].url}
                                    alt={name}
                                    layout='fill'
                                    priority
                                    className='rounded-xl'
                                  />
                                </div>
                              </div>
                            );
                          })}

                          <div className='space-y-3'>
                            <p className='text-xl'>{name}</p>
                            <p className='text-sm text-[#aaa]'>
                              {number_of_guests} guest - {bedrooms} bedrooms -{' '}
                              {beds} beds - {bathrooms} bathrooms
                            </p>
                            <div className='space-y-2 '>
                              <p className='capitalize'>Date booked</p>
                              <p className='text-sm text-[#ccc]'>
                                {moment(createdAt).format('YYYY-MM-DD')}
                              </p>
                            </div>
                            <div className='uppercase text-sm flex gap-8 '>
                              <div className='space-y-3'>
                                <p>Check-in</p>
                                <p className='text-[#aaa]'>{check_in}</p>
                              </div>
                              <div className='space-y-3'>
                                <p>Check-out</p>
                                <p className='text-[#aaa]'>{check_out}</p>
                              </div>
                            </div>
                            <p>Number of nights</p>
                            <p className='text-[#aaa]'>{number_of_nights}</p>
                          </div>
                        </div>
                        <div>
                          <div className='space-y-3'>
                            <p>Status</p>
                            <div className='p-2 seconday-bg drop-shadow-4xl w-fit rounded-md'>
                              {(status === 'Pending' && (
                                <p className='text-[#FF9F40]'>{status}</p>
                              )) ||
                                (status === 'Booked' && (
                                  <p className='text-[#60CBB8]'>{status}</p>
                                )) ||
                                (status === 'Completed' && (
                                  <p className='text-[#60CBB8]'>{status}</p>
                                )) ||
                                (status === 'Cancelled' && (
                                  <p className='text-[#FF6B6B]'>{status}</p>
                                )) ||
                                (status === 'Check_In' && (
                                  <p className='text-[#7CBDFA]'>{status}</p>
                                )) ||
                                (status === 'Check_Out' && (
                                  <p className='text-[#FC8484]'>{status}</p>
                                ))}
                            </div>
                          </div>
                          {status === 'Completed' && toRate === 'rate' && (
                            <div className='p-2 seconday-bg drop-shadow-4xl w-fit rounded-md mt-8 cursor-pointer'>
                              <button onClick={() => handleReview(roomId, id)}>
                                Write a review
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookingPage;
