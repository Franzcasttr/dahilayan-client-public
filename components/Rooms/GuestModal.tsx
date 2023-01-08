import React, { FC } from 'react';
import { FiMinus } from 'react-icons/fi';
import { GrFormAdd } from 'react-icons/gr';
import { RoomModalTypes } from '../../types/RoomTypes';

const GuestModal: FC<RoomModalTypes> = ({
  adult,
  setAdult,
  childs,
  setChildren,
  infant,
  setInfant,
  setOpenGuestModal,
  handleSave,
}) => {
  return (
    <div className='space-y-8 p-6 w-[80vw] md:w-[16rem]'>
      <div className='flex justify-between items-center'>
        <p className='font-medium'>Adults</p>
        <div className='grid grid-cols-3 items-center gap-2'>
          <button
            disabled={adult === 1}
            onClick={() => setAdult(adult && adult - 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <FiMinus
              className={adult === 0 ? 'text-2xl text-gray-300' : 'text-2xl'}
            />
          </button>
          <p className='text-center'>{adult}</p>
          {/* {adult > 1 ? (
            <p className='text-center'>{adult}</p>
          ) : (
            <p className='text-center'>{adultQuery}</p>
          )} */}

          <button
            onClick={() => setAdult(adult && adult + 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <GrFormAdd className='text-2xl' />
          </button>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-medium'>Children</p>
          <p className='text-sm'>Ages 2-12</p>
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <button
            disabled={childs === 0}
            onClick={() => setChildren(childs - 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <FiMinus
              className={childs === 0 ? 'text-2xl text-gray-300' : 'text-2xl'}
            />
          </button>
          <p className='text-center'>{childs}</p>
          <button
            onClick={() => setChildren(childs + 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <GrFormAdd className='text-2xl' />
          </button>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-medium'>Infants</p>
          <p className='text-sm'>Under 2</p>
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <button
            disabled={infant === 0}
            onClick={() => setInfant(infant - 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <FiMinus
              className={infant === 0 ? 'text-2xl text-gray-300' : 'text-2xl'}
            />
          </button>
          <p className='text-center'>{infant}</p>
          <button
            onClick={() => setInfant(infant + 1)}
            className='p-1 border border-gray-400 rounded-full'>
            <GrFormAdd className='text-2xl' />
          </button>
        </div>
      </div>
      <hr className='border border-gray-200 my-8' />
      <div className='flex justify-center'>
        <button
          className='p-3 px-8 bg-black text-white rounded-lg'
          onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default GuestModal;
