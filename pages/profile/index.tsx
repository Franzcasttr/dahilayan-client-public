import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ProfileData } from '../../assets/profileLinks';
import Logo from '../../components/Logo/Logo';
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri';
import MobileNav from '../../components/Navbar/MobileNav';
import { useRouter } from 'next/router';
import TitleHeader from '../../components/Header/Title';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppSelector } from '../../features/app/hook';

const ProfilePage = () => {
  const { push } = useRouter();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { user: stateUser, loading: stateLoading } = useAppSelector(
    (state) => state.user
  );

  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleSize);

    handleSize();
    return () => window.removeEventListener('resize', handleSize);
    // eslint-disable-next-line
  }, []);

  if (screenSize && screenSize >= 768) {
    push('/');
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        push('/loginuser');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TitleHeader titlePage='Profile' />
      <div className='section-center'>
        <div className='md:hidden'>
          <Logo />
        </div>
        <div className='text-center font-semibold'>
          <p className='text-2xl'>Welcome back</p>
          <p>{stateUser.name}</p>
        </div>
        <hr className='border border-gray-200 my-8' />

        {ProfileData.map((data, index) => {
          const { name, icon, links } = data;
          return (
            <div key={index}>
              <Link href={links}>
                <a>
                  <div className='flex justify-between cursor-pointer'>
                    <p className='text-lg text-[#aaa]'>{name}</p>
                    <div className='text-2xl'>{icon}</div>
                  </div>
                </a>
              </Link>
              <hr className='border border-gray-200 my-8' />
            </div>
          );
        })}
        <div className='flex justify-center cursor-pointer mb-24'>
          {user ? (
            <button
              className='p-4 flex items-center gap-3 text-xl seconday-bg drop-shadow-4xl red-clr font-semibold rounded-lg'
              onClick={handleLogout}>
              <RiLogoutCircleLine className='text-3xl' />
              <p>Logout</p>
            </button>
          ) : (
            <button
              className='p-4 flex items-center gap-3 text-xl seconday-bg drop-shadow-4xl primary-clr font-semibold rounded-lg'
              onClick={() => push('/loginuser')}>
              <RiLoginCircleLine className='text-3xl' />
              <p>Login</p>
            </button>
          )}
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default ProfilePage;
