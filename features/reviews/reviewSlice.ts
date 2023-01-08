import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../client/config';
import { fetchUserBookingsById } from '../booking/bookingSlice';

export const showUserReview = createAsyncThunk(
  'review/showUserReview',
  async (payload, thunkAPI) => {
    const res = await API.get('reviews/userReview');
    if (res.status === 200) {
      thunkAPI.dispatch(fetchUserBookingsById());
      return res.data.result;
    }
    return res.data.errorMsg;
  }
);

interface IUserReview {
  userReviews: {
    id: string;
    comment: string;
    Rate: number;
    createdAt: string;
    user: {
      name: string;
      image: string;
    };
  }[];
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

const initialState: IUserReview = {
  userReviews: [],
  loading: false,
  error: false,
  errorMsg: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showUserReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showUserReview.fulfilled, (state, action) => {
      state.loading = false;
      state.userReviews = action.payload;
    });
    builder.addCase(showUserReview.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
  },
});

export default reviewSlice.reducer;
