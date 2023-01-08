import React, { FC } from 'react';
import { Iconfirmation } from '../../types/confimationTypes';

const PaymentForm: FC<Iconfirmation> = ({ handleSubmitRequest }) => {
  return (
    <div className='section-center'>
      <p className='text-2xl my-4 md:hidden'>Payment</p>
      <form className='space-y-3 flex flex-col'>
        <input type='number' name='cc' placeholder='Card Number' />

        <input type='text' name='expiration' placeholder='Expiration' />
        <input type='number' name='ccv' placeholder='CCV' />
        <button
          onClick={handleSubmitRequest}
          type='button'
          className='flex justify-center p-4 text-white rounded-xl bg-black md:w-fit md:mx-auto'>
          Request to book
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
