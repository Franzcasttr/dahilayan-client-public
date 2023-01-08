import { createSlice } from '@reduxjs/toolkit';

export interface roomTypes {
  rooms: string[];
}

const initialState: roomTypes = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    rooms: (state, action) => {
      state.rooms.push(action.payload);
    },
  },
});

export default roomSlice.reducer;

export const { rooms } = roomSlice.actions;
