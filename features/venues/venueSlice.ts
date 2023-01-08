import { createSlice } from '@reduxjs/toolkit';

export interface venueTypes {
  name: string;
  services: string[];
  description: string;
  image_url: string[];
  editServices: string[];
}

const initialState: venueTypes = {
  name: '',
  services: [],
  image_url: [],
  description: '',
  editServices: [],
};

export const venueSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {
    addVenueServices: (state, action) => {
      state.services.push(action.payload);
    },
    removeVenueServices: (state, action) => {
      state.services.splice(
        state.services.findIndex((data) => data === action.payload),
        1
      );
    },
    updateServices: (state, action) => {
      if (action.payload instanceof Array) {
        state.editServices = action.payload;
      } else {
        state.editServices.push(action.payload);
      }
    },

    removeServices: (state, action) => {
      state.editServices.splice(
        state.editServices.findIndex((data) => data === action.payload),
        1
      );
    },

    handleImages: (state, action) => {
      if (action.payload instanceof Array) {
        state.image_url = action.payload;
      } else {
        state.image_url.push(action.payload);
      }
    },
    removeImages: (state, action) => {
      state.image_url.splice(action.payload, 1);
    },
  },
});

export default venueSlice.reducer;

export const {
  addVenueServices,
  removeVenueServices,
  updateServices,
  removeServices,
  handleImages,
  removeImages,
} = venueSlice.actions;
