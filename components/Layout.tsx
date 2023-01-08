import React, { ReactNode } from 'react';
import Logo from './Logo/Logo';
import DesktopNav from './Navbar/DesktopNav';
import MobileNav from './Navbar/MobileNav';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className='md:hidden section-center'>{/* <Logo /> */}</div>
      <DesktopNav />
      {children}
      {/* <MobileNav /> */}
    </div>
  );
};

export default Layout;
