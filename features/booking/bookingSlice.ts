import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../client/config';

export const fetchUserBookingsById = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId, thunkAPI) => {
    const response = await API.get(`bookings/MyBookingList`);
    return response.data.result;
  }
);
export const fetchUserBookingsByPayment = createAsyncThunk(
  'bookings/UserBookingPayment',
  async (payload: string, thunkAPI) => {
    const response = await API.get(`bookings/UserBookingPayment/${payload}`);
    if (response.status === 200) {
      return response.data.result;
    } else if (response.status === 500) {
      console.log(response.data);
      return response.data.error.errorMsg;
    }
  }
);

// export const createBooking = createAsyncThunk(
//   'bookings/createBooking',
//   async (
//     payload: {
//       userById: unknown;
//       check_in: string | string[] | undefined;
//       check_out: string | string[] | undefined;
//       room_type: string | string[] | undefined;
//       paid: number;
//     },
//     thunkAPI
//   ) => {
//     const response = await API.post('bookings/createbooking', payload);
//     if (response.status === 201) {
//       return response.data.msg;
//     }
//     return response.data;
//   }
// );

interface Ibooking {
  userBookings: {
    id: string;
    name: string;
    createdAt: Date;
    toRate: string;
    roomBy: {
      id: string;
      name: string;
      bathrooms: number;
      bedrooms: number;
      beds: number;
      number_of_guests: number;
      image_url: {
        id: string;
        name: string;
        roomImageById: string;

        url: {
          url: string;
        }[];
      }[];
    };

    price: number;
    number_of_guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
    check_in: string;
    check_out: string;
    number_of_nights: string;
    status: string;
  }[];
  loading: boolean;
  errors: string;
  message: string;
  userPaymentIntent: {
    id: string;
    number_of_guest: number;
    userBy: {
      name: string;
      email: string;
    };
    roomBy: {
      name: string;
    };

    check_in: string;
    check_out: string;
    number_of_nights: number;
  };
  error: boolean;
}

const initialStateValue: Ibooking = {
  userBookings: [],
  userPaymentIntent: {
    id: '',
    number_of_guest: 0,
    userBy: {
      name: '',
      email: '',
    },
    roomBy: {
      name: '',
    },

    check_in: '',
    check_out: '',
    number_of_nights: 0,
  },
  loading: false,
  errors: '',
  error: false,
  message: '',
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialStateValue,
  reducers: {
    userBooking: (state, action) => {
      state.userBookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserBookingsById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserBookingsById.fulfilled, (state, action) => {
      state.loading = false;
      state.userBookings = action.payload;
    });
    builder.addCase(fetchUserBookingsById.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errors = action.payload as string;
    });
    builder.addCase(fetchUserBookingsByPayment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserBookingsByPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.userPaymentIntent = action.payload;
    });
    builder.addCase(fetchUserBookingsByPayment.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = true;
    });
    // builder.addCase(createBooking.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(createBooking.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // });
    // builder.addCase(createBooking.rejected, (state, action) => {
    //   state.loading = false;
    //   state.errors = action.payload as string;
    // });
  },
});

export default bookingSlice.reducer;

export const { userBooking } = bookingSlice.actions;
