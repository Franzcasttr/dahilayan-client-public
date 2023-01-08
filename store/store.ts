import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/rooms/roomSlice';
import ridesReducer from '../features/rides/ridesSlice';
import venueReducer from '../features/venues/venueSlice';
import userReducer from '../features/user/userSlice';
import bookingRecuder from '../features/booking/bookingSlice';
import favoriteReducer from '../features/favorite/favoriteSlice';
import reviewReducer from '../features/reviews/reviewSlice';

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
    rides: ridesReducer,
    venue: venueReducer,
    user: userReducer,
    booking: bookingRecuder,
    favorite: favoriteReducer,
    review: reviewReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
