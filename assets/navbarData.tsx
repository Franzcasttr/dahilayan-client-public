import { AiOutlineHome } from 'react-icons/ai';
import { BiBed } from 'react-icons/bi';
import { TbRollercoaster } from 'react-icons/tb';
import { GiMushroomHouse } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';

export const navbarData = [
  {
    id: 1,
    name: 'Home',
    link: '/',
    icons: <AiOutlineHome />,
  },
  {
    id: 2,
    name: 'Rooms',
    link: '/rooms',
    icons: <BiBed />,
  },
  {
    id: 3,
    name: 'Rides',
    link: '/rides',
    icons: <TbRollercoaster />,
  },
  {
    id: 4,
    name: 'Venues',
    link: '/venues',
    icons: <GiMushroomHouse />,
  },
  {
    id: 5,
    name: 'Profile',
    link: '/profile',
    icons: <CgProfile />,
  },
];
export const DesktopnavbarData = [
  {
    id: 1,
    name: 'Home',
    link: '/',
  },
  {
    id: 2,
    name: 'Rooms',
    link: '/rooms',
  },
  {
    id: 3,
    name: 'Rides',
    link: '/rides',
  },
  {
    id: 4,
    name: 'Venues',
    link: '/venues',
  },
];
