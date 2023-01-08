import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { API } from '../../client/config';
import { ISingleVenue, IVenueTypes } from '../../types/VenueTypes';

import React, { FC, useState } from 'react';
import MobileVenueView from '../../components/Venues/MobileVenueView';
import VenueWebView from '../../components/Venues/VenueWebView';
import VenueImageGallery from '../../components/Venues/VenueImageGallery';
import Footer from '../../components/Footer/Footer';
import TitleHeader from '../../components/Header/Title';

const SingleVenues: FC<ISingleVenue> = ({ singleVenue }) => {
  const { id, name, image_url, services } = singleVenue;
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
  const [openPicture, setOpenPicture] = useState<boolean>(false);
  const [roomImg, setRoomImg] = useState<string>('');

  const handleSingleImage = (data: string) => {
    setOpenPicture(true);
    setRoomImg(data);
  };

  if (isOpenGallery) {
    return (
      <VenueImageGallery
        roomImg={roomImg}
        setOpenPicture={setOpenPicture}
        setIsOpenGallery={setIsOpenGallery}
        image_url={image_url}
        handleSingleImage={handleSingleImage}
        name={name}
        openPicture={openPicture}
      />
    );
  }

  return (
    <>
      <TitleHeader titlePage={name} />
      <MobileVenueView
        singleVenue={singleVenue}
        setIsOpenGallery={setIsOpenGallery}
      />
      \
      <VenueWebView
        setIsOpenGallery={setIsOpenGallery}
        singleVenue={singleVenue}
      />
      <footer className=' bg-black text-white md:block'>
        <Footer />
      </footer>
    </>
  );
};

export default SingleVenues;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const res = await API.get(`venues/getsinglevenue/${params?.id}`);
//   const { singleVenue } = res.data;

//   return {
//     props: {
//       singleVenue,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await API.get('venues/getVenues');
  const { venues } = res.data;
  const paths = venues.map((venues: IVenueTypes) => ({
    params: { id: venues.id },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const roomID = ctx.params?.id;
  const res = await API.get(`venues/getsinglevenue/${roomID}`);
  const { singleVenue } = res.data;

  return {
    props: {
      singleVenue,
    },
    revalidate: 10,
  };
};
