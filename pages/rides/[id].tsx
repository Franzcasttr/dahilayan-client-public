import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { FC, useState } from 'react';
import { API } from '../../client/config';
import Footer from '../../components/Footer/Footer';
import TitleHeader from '../../components/Header/Title';
import RidesImageGallery from '../../components/Rides/RidesImageGallery';
import RidesMobileView from '../../components/Rides/RidesMobileView';
import RidesWebView from '../../components/Rides/RidesWebView';
import RoomReviews from '../../components/Rooms/RoomReviews';
import { ISingleRideTypes, RidesDataTypes } from '../../types/RidesTypes';

const SingleRides: FC<ISingleRideTypes> = ({ singleRide }) => {
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
  const [openPicture, setOpenPicture] = useState<boolean>(false);
  const [roomImg, setRoomImg] = useState<string>('');

  const { id, name, description, image_url, price } = singleRide;

  const handleSingleImage = (data: string) => {
    setOpenPicture(true);
    setRoomImg(data);
  };

  if (isOpenGallery) {
    return (
      <RidesImageGallery
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
      <RidesMobileView
        singleRide={singleRide}
        setIsOpenGallery={setIsOpenGallery}
      />

      <RidesWebView
        singleRide={singleRide}
        setIsOpenGallery={setIsOpenGallery}
      />

      <footer className=' bg-black text-white md:block'>
        <Footer />
      </footer>
    </>
  );
};

export default SingleRides;

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const res = await API.get(`rides/${params?.id}`);
//   const { singleRide } = res.data;

//   return {
//     props: {
//       singleRide,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await API.get('rides/getRides');
  const { rides } = res.data;
  const paths = rides.map((rides: RidesDataTypes) => ({
    params: { id: rides.id },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ridesID = ctx.params?.id;
  const res = await API.get(`rides/getsingleride/${ridesID}`);
  const { singleRide } = res.data;

  return {
    props: {
      singleRide,
    },
    revalidate: 10,
  };
};
