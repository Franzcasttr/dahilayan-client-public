import { Dispatch, SetStateAction } from 'react';

export interface RidesTypes {
  rides: {
    id: string;
    name: string;
    description: string;
    image_url: {
      url: string;
    }[];
    price: number;
  }[];
}
export interface RidesDataTypes {
  id: string;
  name: string;
  description: string;
  image_url: {
    url: string;
  }[];
  price: number;
}
export interface ISingleRideTypes {
  singleRide: {
    id: string;
    name: string;
    description: string;
    image_url: {
      url: string;
    }[];
    price: number;
    slots: number;
  };
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
}
export interface IViewMobileRidesDataTypes {
  singleRide: {
    id: string;
    name: string;
    description: string;
    image_url: {
      url: string;
    }[];
    price: number;
  };
}
