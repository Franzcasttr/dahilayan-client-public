import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { RoomWebViewTypes } from '../../types/RoomTypes';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import moment from 'moment';
import { addDays } from 'date-fns';
import { formatter } from '../../utils/format';
import GuestModal from './GuestModal';
import { IoIosArrowDown } from 'react-icons/io';
import { useAppDispatch } from '../../features/app/hook';

import {
  addToFavorites,
  removeToFavorites,
} from '../../features/favorite/favoriteSlice';

const RoomWebView: FC<RoomWebViewTypes> = ({
  setIsOpenGallery,
  singleRoom,
  setFavorites,
  favorites,
  roomId,
  user,
}) => {
  const dispatch = useAppDispatch();
  const events: any = [];
  // const events = [
  //   {
  //     start: '2022-12-11',
  //     end: '2022-12-16',
  //   },
  //   {
  //     start: '2022-12-20',
  //     end: '2022-12-25',
  //   },
  // ];
  const pppi = events.pop()?.start;
  const dateRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<any>(
    pppi !== undefined ? addDays(new Date(pppi), 1) : new Date()
  );
  const [endDate, setEndDate] = useState<any>(addDays(new Date(startDate), 5));
  const [openDateQueryCalendar, setOpenDateQueryCalendar] = useState(false);
  const [sideCalendarOpen, setSideCalendarOpen] = useState(false);
  const [sideCalendarClose, setSideCalendarClose] = useState(false);
  const [openGuestModal, setOpenGuestModal] = useState<boolean>(false);

  const { push, pathname, query, isReady } = useRouter();
  const [adult, setAdult] = useState<number>(1);

  const [children, setChildren] = useState<number>(0);
  const [infant, setInfant] = useState<number>(0);
  const roomID = query.id;
  const dateStartquery = query.startDate;
  const dateEndquery = query.endDate;

  const diffDays = moment(dateEndquery).diff(moment(dateStartquery), 'days');
  const date1 = moment(dateStartquery).format('L');
  const date2 = moment(dateEndquery).format('L');
  const newQueryDate1 = new Date(date1);
  const newQueryDate2 = new Date(date2);
  const formattedDateQueryStart = moment(dateStartquery).format('ll');
  const formattedDateQueryEnd = moment(dateEndquery).format('ll');
  const datestart = moment(startDate).format('YYYY-MM-DD');
  const dateEnd = moment(endDate).format('YYYY-MM-DD');
  const shortDateStart = moment(startDate).format('ll');
  const shortDateEnd = moment(endDate).format('ll');

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
    rating,
  } = singleRoom;

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setOpenDateQueryCalendar(true);
  };

  let Days: number = 0;
  if (endDate) {
    const numberOfDays = (date1: any, date2: any) => {
      const diff = Math.abs(date1 - date2);

      return diff / (1000 * 60 * 60 * 24);
    };
    // console.log(numberOfDays);
    Days = numberOfDays(startDate, endDate);
    // console.log(Days);
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
    if (datestart !== 'Invalid date' && isReady) {
      push(
        { pathname, query: { roomID, datestart, dateEnd } },
        `/rooms/${roomID}?startDate=${datestart}&endDate=${dateEnd}&adults=${adult}&children=${children}&infant=${infant}`,
        { shallow: true }
      );
    }
  }, [datestart]);

  useEffect(() => {
    if (query.adults) {
      setAdult(parseInt(query.adults as string));
      setChildren(parseInt(query.children as string));
      setInfant(parseInt(query.children as string));
    }
  }, [isReady]);

  useEffect(() => {
    const getClickOutside = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setOpenGuestModal(false);
      }
    };
    window.addEventListener('mousedown', getClickOutside);
    return () => {
      window.removeEventListener('mousedown', getClickOutside);
    };
  }, [openGuestModal]);

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

  const handleClick = (id: string) => {
    push(
      `/confirmation?roomID=${id}&startDate=${
        dateStartquery ? dateStartquery : datestart
      }&endDate=${
        dateEndquery ? dateEndquery : dateEnd
      }&adults=${adult}&children=${children}&infant=${infant}`
    );
  };

  const totalGuest = adult + children + infant;

  return (
    <div className=''>
      <div className='hidden md:flex md:gap-12 section-center'>
        <div>
          {/* web */}
          {image_url.map((data, index: number) => {
            return (
              <div key={index} className='columns-2'>
                {data.url.slice(0, 2).map((img, index: number) => {
                  return (
                    <div
                      // className='hidden md:block relative  h-[30rem] mb-4'
                      key={index}>
                      <Image
                        src={img.url}
                        alt={name}
                        width={250}
                        height={250}
                        layout='responsive'
                        priority
                        className='rounded-md cursor-pointer'
                        onClick={() => setIsOpenGallery(true)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className='my-6 flex justify-center'>
            <button
              className='font-semibold seconday-bg p-3 drop-shadow-4xl rounded-lg'
              onClick={() => setIsOpenGallery(true)}>
              Show all photos
            </button>
          </div>
          {/* <div className=' hidden md:block relative  h-[30rem] mb-4'>
                  <Image
                    src={image_url}
                    alt={name}
                    layout='fill'
                    className='rounded-xl'
                  />
                </div> */}
          {/* end */}
          <div>
            <div className='flex  justify-between'>
              <div>
                <p className='font-semibold text-xl'>{name}</p>
                <p className='text-sm'>
                  {number_of_guests} guest - {bedrooms} bedrooms - {beds} beds -{' '}
                  {bathrooms} bathrooms
                </p>
              </div>
              {user ? (
                <div className='flex items-center space-x-1'>
                  <div
                    className=' rounded-full'
                    onClick={() => addtoWishlist(id)}>
                    {favorites ? (
                      <AiFillHeart className='text-4xl cursor-pointer text-red-400' />
                    ) : (
                      <AiOutlineHeart className='text-4xl cursor-pointer text-red-400' />
                    )}
                  </div>
                  <p>Save</p>
                </div>
              ) : null}
            </div>
            <hr className='border border-gray-200 my-8' />

            <p className='font-semibold text-xl'>Description</p>
            <p className='mt-4 text-[#aaa]'>{description}</p>

            <hr className='border border-gray-200 my-8' />
            <p className='font-semibold text-xl'>Where you&apos;ll sleep</p>
            <div className='mt-4 flex gap-9 w-full'>
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
          </div>
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
                    start: new Date('2022-12-09'),
                    end: new Date('2022-12-16'),
                  },
                ]}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                // onSelect={handleSelect}
              />
            ) : (
              <DatePicker
                selected={startDate}
                onChange={onChange}
                minDate={new Date()}
                excludeDateIntervals={[
                  {
                    start: new Date('2022-12-09'),
                    end: new Date('2022-12-16'),
                  },
                ]}
                excludeDates={[addDays(new Date(startDate), 1)]}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                // onSelect={handleSelect}
              />
            )
          ) : (
            <DatePicker
              selected={newQueryDate1}
              onChange={onChange}
              minDate={new Date()}
              excludeDateIntervals={[
                {
                  start: new Date('2022-12-09'),
                  end: new Date('2022-12-16'),
                },
              ]}
              startDate={newQueryDate1}
              endDate={newQueryDate2}
              selectsRange
              inline
              // onSelect={handleSelect}
            />
          )}

          <hr className='border border-gray-200 my-8' />
        </div>

        {/* pricing */}
        <div className='p-8 seconday-bg drop-shadow-4xl rounded-xl h-fit relative'>
          <div className='flex gap-12 mb-4'>
            <p className='font-semibold'>{formatter(price)}/night</p>
            <div className='flex space-x-1 items-center'>
              <AiFillStar className='text-yellow-400' />{' '}
              <p className='font-semibold'>{rating}</p>
            </div>
          </div>
          <div className='border border-gray-300 rounded-xl p-3'>
            <div className='flex justify-between border-b border-gray-400 '>
              <div
                className='text-xs uppercase space-y-2 cursor-pointer'
                onClick={() => setSideCalendarOpen(true)}>
                <p>Check In</p>
                <p>{dateStartquery ? dateStartquery : datestart}</p>
              </div>
              <div className='border-r border-gray-400'></div>
              <div
                className='space-y-2 text-xs uppercase cursor-pointer'
                onClick={() => setSideCalendarClose(true)}>
                <p>Check Out</p>
                <p>{dateEndquery ? dateEndquery : dateEnd}</p>
              </div>
              {sideCalendarOpen && (
                <div className='absolute z-50 left-4'>
                  <DatePicker
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date) => {
                      setSideCalendarOpen(false);
                      setStartDate(date);
                    }}
                    inline
                    onClickOutside={() => setSideCalendarOpen(false)}
                    // monthsShown={2}
                  />
                </div>
              )}
              {sideCalendarClose && (
                <div className='absolute z-50 left-4'>
                  <DatePicker
                    selected={endDate}
                    minDate={new Date()}
                    excludeDates={[
                      new Date(startDate),
                      addDays(new Date(startDate), 1),
                    ]}
                    onChange={(date) => {
                      setSideCalendarClose(false);
                      setEndDate(date);
                    }}
                    inline
                    onClickOutside={() => setSideCalendarClose(false)}
                  />
                </div>
              )}
            </div>
            {openGuestModal && (
              <div
                ref={dateRef}
                className='absolute z-50 seconday-bg left-3 border border-gray-300 rounded-xl'>
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
              </div>
            )}
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() => setOpenGuestModal(true)}>
              <div className='space-y-2 text-xs uppercase'>
                <p>Guest</p>
                <p>{totalGuest}</p>
              </div>
              <IoIosArrowDown className='text-xl' />
            </div>
          </div>
          <div className='my-4'>
            <button
              onClick={() => handleClick(id)}
              className='bg-black text-white capitalize p-3 rounded-xl w-full cursor-pointer'>
              reserve now
            </button>
          </div>
          <p className='text-xs text-center mb-5'>You won&apos;t charge yet</p>
          <div className='flex justify-between text-sm font-semibold'>
            <p className='underline'>
              {formatter(price)}x {Days} nights
            </p>
            <p className='underline'>{formatter(price * Days)}</p>
          </div>
          <hr className='border border-gray-300 my-8' />
          <div className='flex justify-between'>
            <p className='font-semibold'>Total</p>
            <p className='font-semibold underline'>{formatter(price * Days)}</p>
          </div>
        </div>
        {/* end of pricing */}
      </div>
      {/* web */}
      {/* section 2 */}
    </div>
  );
};

export default RoomWebView;
