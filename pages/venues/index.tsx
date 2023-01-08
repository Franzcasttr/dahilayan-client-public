import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import { API } from '../../client/config';

import Footer from '../../components/Footer/Footer';
import MobileNav from '../../components/Navbar/MobileNav';
import prisma from '../../lib/prisma';
import { VenueTypes } from '../../types/VenueTypes';

const VenuePage: FC<VenueTypes> = ({ venues }) => {
  return (
    <>
      <div className='section-center py-4'>
        <div className='flex flex-col gap-12 md:grid md:grid-cols-4 mb-8'>
          {venues.map((rides) => {
            const { id, name, image_url, services } = rides;
            const firstImage = image_url[0];
            return (
              <div key={id}>
                <Link href={`/venues/${id}`}>
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
                      <p className='font-semibold text-xl'>{name}</p>

                      <p>{services}</p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
          {/* hello */}
        </div>
        {/* <Authenticate /> */}
      </div>
      <div className='my-20 md:hidden'></div>
      <footer className='hidden bg-black text-white md:block'>
        <Footer />
      </footer>
      <MobileNav />
    </>
  );
};

export default VenuePage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await API.get('venues/getVenues');
  const { venues } = res.data;
  // const value = JSON.parse(JSON.stringify(venues));
  return {
    props: {
      venues,
    },
    revalidate: 10,
  };
};
