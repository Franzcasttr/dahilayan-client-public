import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import DatePicker from 'react-datepicker';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { BiBed } from 'react-icons/bi';
import { ViewTypes } from '../../types/RoomTypes';
import { useRouter } from 'next/router';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { addDays, subDays } from 'date-fns';
import { contentVariant, maintContentVariant } from '../../utils/animate';
import GuestModal from './GuestModal';
import { formatter } from '../../utils/format';
import { useAppDispatch } from '../../features/app/hook';
import {
  addToFavorites,
  removeToFavorites,
} from '../../features/favorite/favoriteSlice';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const MobileView: FC<ViewTypes> = ({
  handleBackClick,
  setFavorites,
  favorites,
  setIsOpenGallery,
  singleRoom,
  user,
  roomId,
}) => {
  const { push, pathname, query, isReady } = useRouter();
  const dispatch = useAppDispatch();

  // let startss: Date | undefined = undefined;
  // const events: any = [];
  const events = [
    {
      start: '2022-12-11',
      end: '2022-12-16',
    },
    {
      start: '2022-12-20',
      end: '2022-12-25',
    },
  ];
  // const dummy = events.map((range) => {
  //   startss = new Date(range.start);
  //   return range;
  // });

  // const disabledDateRanges = events.map((range) => ({
  //   start: new Date(range.start),
  //   end: new Date(range.end),
  // }));
  const pppi = events.pop()?.start;

  const [startDate, setStartDate] = useState<any>(
    pppi !== undefined ? addDays(new Date(pppi), 1) : new Date()
  );
  const [endDate, setEndDate] = useState(addDays(new Date(startDate), 5));
  // const [startDate, setStartDate] = useState<any>(new Date());
  // const [endDate, setEndDate] = useState(addDays(new Date(startDate), 5));
  const [openDateQueryCalendar, setOpenDateQueryCalendar] = useState(false);
  const [openGuestModal, setOpenGuestModal] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(1);

  const [children, setChildren] = useState<number>(0);
  const [infant, setInfant] = useState<number>(0);
  useEffect(() => {
    if (query.adults) {
      setAdult(parseInt(query.adults as string));
      setChildren(parseInt(query.children as string));
      setInfant(parseInt(query.children as string));
    }
  }, [isReady]);

  const roomID = query.id;
  const dateStartquery = query.startDate;
  const dateEndquery = query.endDate;
  // const adultQuery = query.adults;
  // const childrenQuery = query.children;
  // const infantQuery = query.infant;

  const diffDays = moment(dateEndquery).diff(moment(dateStartquery), 'days');
  const date1 = moment(dateStartquery).format('L');
  const date2 = moment(dateEndquery).format('L');
  const newQueryDate1 = new Date(date1);
  const newQueryDate2 = new Date(date2);
  const formattedDateQueryStart = moment(dateStartquery).format('ll');
  const formattedDateQueryEnd = moment(dateEndquery).format('ll');

  // const startedDate = startDate && new Date(startDate);
  // const endedDate = endDate && new Date(endDate);

  const {
    id,
    name,
    number_of_guests,
    price,
    image_url,
    amenities,
    bathrooms,
    bedrooms,
    beds,
    bedtype,
    description,
  } = singleRoom;

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setOpenDateQueryCalendar(true);
  };

  const datestart = moment(startDate).format('YYYY-MM-DD');
  const dateEnd = moment(endDate).format('YYYY-MM-DD');
  const shortDateStart = moment(startDate).format('ll');
  const shortDateEnd = moment(endDate).format('ll');

  let Days: number = 0;
  if (endDate) {
    const numberOfDays = (date1: any, date2: any) => {
      const diff = Math.abs(date1 - date2);

      return diff / (1000 * 60 * 60 * 24);
    };
    Days = numberOfDays(startDate, endDate);
  }

  useEffect(() => {
    if (dateEnd !== 'Invalid date' && isReady) {
      push(
        { pathname, query: { roomID, datestart, dateEnd } },
        `/rooms/${roomID}?startDate=${datestart}&endDate=${dateEnd}&adults=${adult}&children=${children}&infant=${infant}`,
        { shallow: true }
      );
    }
  }, [dateEnd]);

  useEffect(() => {
    if (roomId !== singleRoom.id) {
      setFavorites(false);
    } else {
      setFavorites(true);
    }
  }, [roomId]);

  const handleSave = () => {
    setOpenGuestModal(false);
    push(
      { pathname, query: { roomID, datestart, dateEnd } },
      `/rooms/${roomID}?startDate=${
        dateStartquery ? dateStartquery : datestart
      }&endDate=${
        dateEndquery ? dateEndquery : dateEnd
      }&adults=${adult}&children=${children}&infant=${infant}`,
      { shallow: true }
    );
  };

  const handleClick = (id: string) => {
    push(
      `/confirmation?roomID=${id}&startDate=${
        dateStartquery ? dateStartquery : datestart
      }&endDate=${
        dateEndquery ? dateEndquery : dateEnd
      }&adults=${adult}&children=${children}&infant=${infant}`
      // `/confirmation?roomID=${id}&startDate=${
      //   datestart !== 'Invalid date' ? datestart : dateStartquery
      // }&endDate=${
      //   dateEnd !== 'Invalid date' ? dateEnd : dateEndquery
      // }&adults=${adult}&children=${children}&infant=${infant}`
    );
  };

  const addtoWishlist = (id: string) => {
    setFavorites(!favorites);
    const payload = {
      productID: id,
    };
    if (favorites) {
      dispatch(removeToFavorites(payload));
    } else {
      dispatch(addToFavorites(payload));
    }
  };

  return (
    <>
      <div className=' md:hidden'>
        <AnimatePresence>
          {openGuestModal && (
            <>
              <motion.div className='modal-backdrop'></motion.div>
              <motion.div
                variants={contentVariant}
                initial='hidden'
                animate='vissible'
                exit='exit'
                className='room-guests'>
                <motion.div
                  variants={maintContentVariant}
                  initial='hidden'
                  animate='vissible'
                  exit='exit'>
                  <GuestModal
                    adult={adult}
                    setAdult={setAdult}
                    childs={children}
                    setChildren={setChildren}
                    infant={infant}
                    setInfant={setInfant}
                    setOpenGuestModal={setOpenGuestModal}
                    handleSave={handleSave}
                    // adultQuery={adultQuery}
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className='relative'>
          <div className='section-center'>
            <div
              className='p-3 rounded-full bg-white absolute mt-3 z-50'
              onClick={handleBackClick}>
              <MdArrowBackIosNew className='text-lg cursor-pointer' />
            </div>
            <div
              className='p-3 rounded-full bg-white absolute mt-3 right-5 z-50'
              onClick={() => {
                user ? addtoWishlist(id) : push('/loginuser');
              }}>
              {favorites ? (
                <AiFillHeart className='text-lg cursor-pointer text-red-400' />
              ) : (
                <AiOutlineHeart className='text-lg cursor-pointer' />
              )}
            </div>
          </div>
          <div className='mb-4'>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}>
              {image_url.map((data, index: number) => {
                const { name } = data;
                return (
                  <div key={index}>
                    {data.url.map((img, index: number) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className='relative w-full h-[20rem] md:hidden cursor-pointer'>
                            <Image
                              src={img.url}
                              alt={name}
                              layout='fill'
                              priority
                              onClick={() => setIsOpenGallery(true)}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </div>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className='section-center'>
          <p className='font-semibold text-xl'>{name}</p>
          <p className='text-sm'>
            {number_of_guests} guest - {bedrooms} bedrooms - {beds} beds -{' '}
            {bathrooms} bathrooms
          </p>
          <hr className='border border-gray-200 my-8' />

          <p className='font-semibold text-xl'>Description</p>
          <p className='mt-4 text-[#aaa]'>{description}</p>

          <hr className='border border-gray-200 my-8' />
          <p className='font-semibold text-xl'>Where you&apos;ll sleep</p>
          <div className='mt-4 grid grid-cols-3 gap-4 w-full'>
            {bedtype.map((bed, index) => {
              return (
                <div
                  key={index}
                  className='p-4 w-full h-24 drop-shadow-4xl seconday-bg rounded-lg md:w-fit '>
                  <BiBed className='text-2xl' />
                  <p>{bed}</p>
                </div>
              );
            })}
          </div>
          <hr className='border border-gray-200 my-8' />
          <p className='font-semibold text-xl'>Services</p>
          <div className='grid grid-cols-2 gap-3 mt-4'>
            {amenities.map((data, index) => {
              return <div key={index}>{data}</div>;
            })}
          </div>
          <hr className='border border-gray-200 my-8' />
          <div className='mb-8 text-xl'>
            {Days !== 0 ? (
              <p className='font-medium'>
                {Days} {Days > 1 ? `nights in ${name}` : `night in ${name}`}
              </p>
            ) : dateStartquery !== undefined && dateEndquery !== undefined ? (
              // diffDays
              <p className='font-medium'>
                {diffDays}{' '}
                {diffDays > 1 ? `nights in ${name}` : `night in ${name}`}
              </p>
            ) : (
              <p className='font-medium'>Please select check-in date</p>
            )}
            <div className='text-sm text-[#aaa]'>
              {Days > 1 ? (
                <p>
                  {dateStartquery !== undefined &&
                  dateEndquery !== undefined ? (
                    <span>
                      {formattedDateQueryStart} - {formattedDateQueryEnd}
                    </span>
                  ) : (
                    <span>
                      {shortDateStart} - {shortDateEnd}
                    </span>
                  )}
                </p>
              ) : dateStartquery !== undefined && dateEndquery !== undefined ? (
                <span>
                  {formattedDateQueryStart} - {formattedDateQueryEnd}
                </span>
              ) : (
                <p>Minimum stay: 2 nights</p>
              )}
            </div>
          </div>
          {openDateQueryCalendar ? (
            endDate ? (
              <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                excludeDateIntervals={[
                  {
                    start: new Date('2022-12-11'),
                    end: new Date('2022-12-16'),
                  },
                ]}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            ) : (
              <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                excludeDateIntervals={[
                  {
                    start: new Date('2022-12-11'),
                    end: new Date('2022-12-16'),
                  },
                ]}
                excludeDates={[addDays(new Date(startDate), 1)]}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            )
          ) : (
            <DatePicker
              selected={newQueryDate1}
              onChange={onChange}
              minDate={new Date()}
              excludeDateIntervals={[
                {
                  start: subDays(new Date('2022-12-11'), 1),
                  end: new Date('2022-12-16'),
                },
              ]}
              startDate={newQueryDate1}
              endDate={newQueryDate2}
              selectsRange
              inline
            />
          )}
          <div className='mt-8'>
            <button
              className='p-2 border border-gray-400 rounded-lg'
              onClick={() => setOpenGuestModal(true)}>
              Add Guests
            </button>
          </div>
          <hr className='border border-gray-200 my-8' />
        </div>
      </div>

      <div className='md:hidden flex justify-between items-center pfixed bg-[#EFF6FF] section-center'>
        <p>{formatter(price)}/night</p>
        <button
          onClick={() => {
            handleClick(id);
          }}
          className='p-4 bg-[#E72381] text-white rounded-md'>
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default MobileView;
