import { createSlice } from '@reduxjs/toolkit';

export interface ridesTypes {
  image_url: string[];
  price: string[];
  editPrice: string[];
}

const initialStateValue: ridesTypes = {
  image_url: [],
  price: [],
  editPrice: [],
};

export const ridesSlice = createSlice({
  name: 'rides',
  initialState: initialStateValue,
  reducers: {},
});

export default ridesSlice.reducer;
