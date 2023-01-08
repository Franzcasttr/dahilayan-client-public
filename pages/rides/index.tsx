import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { ridesData } from '../../assets/ridesData';
import { API } from '../../client/config';

import Footer from '../../components/Footer/Footer';
import MobileNav from '../../components/Navbar/MobileNav';
import prisma from '../../lib/prisma';
import { RidesTypes } from '../../types/RidesTypes';
import { formatter } from '../../utils/format';

const RidesPage: FC<RidesTypes> = ({ rides }) => {
  return (
    <>
      <div className='section-center py-4'>
        <div className='flex flex-col gap-12 md:grid md:grid-cols-4 mb-8'>
          {rides.map((rides) => {
            const { id, name, price, image_url } = rides;
            const firstImage = image_url[0];
            return (
              <div key={id}>
                <Link href={`/rides/${id}`}>
                  <a>
                    <div className='mb-3 relative cursor-pointer w-full h-[20rem] md:h-[15rem]'>
                      <Image
                        src={firstImage.url}
                        alt={name}
                        layout='fill'
                        className='rounded-3xl'
                      />
                    </div>
                    <div className='space-y-1'>
                      <div className='flex justify-between'>
                        <p className='font-semibold text-xl'>{name}</p>
                      </div>
                      <p>
                        <span className='primary-clr font-semibold text-xl'>
                          {formatter(price)}
                        </span>
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
      <footer className='hidden bg-black text-white md:block'>
        <Footer />
      </footer>
      <MobileNav />
    </>
  );
};

export default RidesPage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await API.get('rides/getRides');
  const { rides } = res.data;
  // const value = JSON.parse(JSON.stringify(rides));
  return {
    props: {
      rides,
    },
    revalidate: 10,
  };
};
