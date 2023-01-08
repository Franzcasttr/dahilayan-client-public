import { API } from './config';

export const signup = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await API.post('auth/signup', payload);
  } catch (error) {
    console.log(error);
  }
};

export const createBooking = async (payload: {
  userById: unknown;
  check_in: string | string[] | undefined;
  check_out: string | string[] | undefined;
  room_type: string | string[] | undefined;
  paid: number;
}) => {
  try {
    await API.post('bookings/createbooking', payload);
  } catch (error) {
    console.log(error);
  }
};
