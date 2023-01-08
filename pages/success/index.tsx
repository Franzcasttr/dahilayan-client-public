import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { SlMagnifier } from 'react-icons/sl';

import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { fetchUserBookingsByPayment } from '../../features/booking/bookingSlice';

const SuccessPage = () => {
  const { push, query, isReady } = useRouter();
  const dispatch = useAppDispatch();
  const { userPaymentIntent, error } = useAppSelector((state) => state.booking);
  const handleClick = () => {
    push('/');
  };

  const PaymentIntentQuery = query.payment_intent as string;
  // console.log(PaymentIntentQuery);
  const {
    id,
    check_in,
    check_out,
    number_of_guest,
    number_of_nights,
    roomBy,
    userBy,
  } = userPaymentIntent;
  const { name } = roomBy;
  const { name: UserName, email } = userBy;

  useEffect(() => {
    if (isReady && PaymentIntentQuery !== undefined) {
      dispatch(fetchUserBookingsByPayment(PaymentIntentQuery));
    }
  }, [isReady]);
  if (PaymentIntentQuery === undefined || error) {
    return (
      <div className='section-center '>
        <div className='mt-24 '>
          <div className='flex justify-center'>
            <SlMagnifier className='text-9xl mb-4' />
          </div>

          <p className='text-center text-2xl'>Oops! Nothing to see here</p>
          <div className='mt-8 text-center'>
            <Link href='/'>
              <a className='p-4 bg-black text-white text-center rounded-xl'>
                Back to home
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='section-center'>
      <div className='my-12'>
        <div className='p-4 primary-bg rounded-xl text-white'>
          <div className='flex space-x-3 items-center mb-3'>
            <BsFillPatchCheckFill className='text-4xl' />
            <p className='text-4xl font-semibold capitalize'>thank you!</p>
          </div>
          <p className='text-sm md:text-base'>
            Thank you for choosing Dahilayan adventure park and hotel. Please
            check your email regarding booking status within 24 hours.
          </p>
        </div>
      </div>
      <p className='capitalize font-semibold text-2xl mb-8'>
        Your booking details
      </p>
      <div className='flex flex-col gap-8 md:grid md:grid-cols-3'>
        <div>
          <p className='font-semibold'>Name</p>
          <p>{UserName}</p>
        </div>
        <div>
          <p className='font-semibold uppercase'>check-in</p>
          <p>{check_in}</p>
        </div>
        <div>
          <p className='font-semibold uppercase'>check-out</p>
          <p>{check_out}</p>
        </div>
        <div>
          <p className='font-semibold'>Your Reservation</p>
          <p>
            {number_of_nights} nigths at {name}
          </p>
        </div>
        <div>
          <p className='font-semibold'>Email</p>
          <p>{email}</p>
        </div>
        <div>
          <p className='font-semibold'>Booking Number</p>
          <p>{id}</p>
        </div>
        <div>
          <p className='font-semibold'>Guest</p>
          <p>{number_of_guest} guest</p>
        </div>
      </div>
      <div className='my-8 flex justify-center'>
        <button
          className='capitalize p-3 primary-bg text-white font-semibold rounded-md cursor-pointer'
          onClick={handleClick}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
