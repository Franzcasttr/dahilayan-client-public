import { User } from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';

export interface roomTypes {
  rooms: {
    id: string;
    name: string;
    image_url: string[];
    price: number;
    bedtype: string[];
    number_of_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    amenities: string[];
    description: string;
    rating: string;
  }[];
}
export interface singleRoomTypes {
  singleRoom: {
    id: string;
    name: string;
    image_url: {
      id: string;
      name: string;
      roomImageById: string;

      url: {
        url: string;
      }[];
    }[];
    price: number;
    bedtype: string[];
    number_of_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    amenities: string[];
    description: string;
    rating: string;
    reviews: {
      createdAt: string;
      comment: string;
      Rate: number;
      user: {
        image: string;
        name: string;
      };
    }[];
  };
}

export interface IReviewTypes {
  reviews: {
    createdAt: string;
    comment: string;
    Rate: number;
    user: {
      image: string;
      name: string;
    };
  }[];
  setIsOpenReview: Dispatch<SetStateAction<boolean>>;
}

export interface IReviewModalOptionsType {
  reviews: {
    createdAt: string;
    comment: string;
    Rate: number;
    user: {
      image: string;
      name: string;
    };
  }[];
}
export interface roomDataTypes {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  bedtype: string[];
  number_of_guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  url?: string[];
  rating: string;
}

export interface ViewTypes extends singleRoomTypes {
  handleBackClick: () => void;
  setFavorites: Dispatch<SetStateAction<boolean>>;
  favorites: boolean;
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
  user: User | null | undefined;
  roomId: string | undefined;
}

export interface RoomWebViewTypes {
  singleRoom: {
    id: string;
    name: string;
    image_url: {
      id: string;
      name: string;
      roomImageById: string;

      url: {
        url: string;
      }[];
    }[];
    price: number;
    bedtype: string[];
    number_of_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    amenities: string[];
    description: string;
    rating: string;
  };
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
  setFavorites: Dispatch<SetStateAction<boolean>>;
  favorites: boolean;
  roomId: string | undefined;
  user: User | null | undefined;
}

export interface RoomModalTypes {
  adult: number;
  setAdult: Dispatch<SetStateAction<number>>;
  childs: number;
  setChildren: Dispatch<SetStateAction<number>>;
  infant: number;
  setInfant: Dispatch<SetStateAction<number>>;
  setOpenGuestModal: Dispatch<SetStateAction<boolean>>;
  handleSave: () => void;
  // adultQuery: any;
}
