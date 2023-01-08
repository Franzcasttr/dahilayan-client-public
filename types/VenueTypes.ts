import { Dispatch, SetStateAction } from 'react';

export interface VenueTypes {
  venues: {
    id: string;
    name: string;
    image_url: {
      url: string;
    }[];
    services: string[];
    description: string;
    url: string;
  }[];
  numOfpages: number;
  page: number;
}

export interface IVenueTypes {
  id: string;
  name: string;
  services: string[];
  description: string;
  image_url: {
    url: string;
  }[];
}
export interface ISingleVenue {
  singleVenue: {
    id: string;
    name: string;
    services: string[];
    description: string;
    image_url: {
      url: string;
    }[];
  };
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
}
