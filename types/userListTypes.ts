import { SetStateAction } from 'react';

export interface ListTypes {
  user: {
    id: string;
    name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: number;
    image_url: string;
    image: string;
  }[];
  numOfpages: number;
  page: number;
}

export interface IUserTypes {
  id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone_number: number;
  image_url: string;
  image: string;
}

export interface IUserEditTypes {
  editUser: {
    id: string;
    name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: number;
    image_url: string;
  };
  setOpenEdit: React.Dispatch<SetStateAction<boolean>>;
}
