import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { roomData } from '../../assets/roomData';
import { API } from '../../client/config';
import Footer from '../../components/Footer/Footer';
import MobileNav from '../../components/Navbar/MobileNav';
import RoomImage from '../../components/Rooms/RoomImage';
import prisma from '../../lib/prisma';
import { roomTypes } from '../../types/RoomTypes';
import { formatter } from '../../utils/format';

const RoomPage: FC<roomTypes> = ({ rooms }) => {
  return (
    <>
      <div className='section-center py-4'>
        <div className='flex flex-col gap-12 md:grid md:grid-cols-3 lg:grid-cols-4 mb-8'>
          {rooms.map((rooms) => {
            const { id, name, number_of_guests, price, image_url, rating } =
              rooms;
            return (
              <div key={id}>
                <Link href={`/rooms/${id}`}>
                  <a>
                    {image_url.map((data: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className='mb-3 relative cursor-pointer w-full h-[20rem] md:h-[15rem]'>
                          <Image
                            src={data.url[0].url}
                            alt={data.name}
                            layout='fill'
                            className='rounded-3xl'
                          />
                        </div>
                      );
                    })}
                    {/* <Image
                        src={image_url}
                        alt={name}
                        layout='fill'
                        className='rounded-3xl'
                      /> */}

                    <div className='space-y-1'>
                      <div className='flex justify-between'>
                        <p className='font-semibold text-lg md:text-base'>
                          {name}
                        </p>
                        {parseInt(rating) >= 1 ? (
                          <div className='flex space-x-2 items-center'>
                            <AiFillStar className='text-yellow-400' />{' '}
                            <p className='font-semibold'>{rating}</p>
                          </div>
                        ) : null}
                      </div>
                      <p className='text-sm'>
                        Up to {number_of_guests} persons
                      </p>
                      <p className=''>
                        <span className='primary-clr font-semibold text-xl'>
                          {formatter(price)}
                        </span>
                        /night
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className='my-20 md:hidden'></div>
      <footer className='hidden md:block'>
        <Footer />
      </footer>
      <MobileNav />
    </>
  );
};

export default RoomPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await API.get('rooms/getRooms');
  const { rooms } = res.data;
  // const value = JSON.parse(JSON.stringify(rooms));
  return {
    props: {
      rooms,
    },
    revalidate: 10,
  };
};
