import { Dispatch, SetStateAction } from 'react';

export interface galleryTypes {
  roomImg: string;
  setOpenPicture: Dispatch<SetStateAction<boolean>>;
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
  image_url: {
    id: string;
    name: string;
    roomImageById: string;

    url: {
      url: string;
    }[];
  }[];
  handleSingleImage: (data: string) => void;
  name: string;
  openPicture: boolean;
}
export interface IRidesgalleryTypes {
  roomImg: string;
  setOpenPicture: Dispatch<SetStateAction<boolean>>;
  setIsOpenGallery: Dispatch<SetStateAction<boolean>>;
  image_url: {
    url: string;
  }[];
  handleSingleImage: (data: string) => void;
  name: string;
  openPicture: boolean;
}
