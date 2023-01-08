import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { navbarData } from '../../assets/navbarData';

const MobileNav = () => {
  const { replace, pathname } = useRouter();
  return (
    <>
      <div className='md:hidden flex justify-between pfixed bg-[#EFF6FF]'>
        {navbarData.map((data) => {
          const { id, name, link, icons } = data;
          return (
            <div key={id}>
              <Link href={link}>
                <a
                  className={
                    pathname === link
                      ? ' flex flex-col text-[#14DAB6] font-bold items-center'
                      : ' flex flex-col items-center'
                  }>
                  <div className='text-2xl'>{icons}</div>
                  <p>{name}</p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileNav;
