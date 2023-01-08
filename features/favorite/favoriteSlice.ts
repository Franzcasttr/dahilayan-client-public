import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../client/config';

export const addToFavorites = createAsyncThunk(
  'favorite/addtoFavorites',
  async (payload: { productID: string }, thunkAPI) => {
    const res = await API.post('favorite/createFavorite', payload);
    if (res.status === 201) {
      thunkAPI.dispatch(getUserFavorites());
      return res.data.result;
    }
    return res.data;
  }
);
export const removeToFavorites = createAsyncThunk(
  'favorite/removetoFavorites',
  async (payload: { productID: string }, thunkAPI) => {
    const res = await API.put('favorite/removeFavorite', payload);
    if (res.status === 200) {
      thunkAPI.dispatch(getUserFavorites());
      return res.data.msg;
    }
    return res.data;
  }
);
export const getUserFavorites = createAsyncThunk(
  'favorite/getUserFavorites',
  async (thunkAPI) => {
    const res = await API.get('favorite/getuserFavorite');
    if (res.status === 200) {
      return res.data.result;
    }
    return res.data;
  }
);

interface IFavorite {
  loading: boolean;
  error: string;
  message: string;
  favorites: string[];
  myFavorite: {
    roomProductId: string;
    id: string;
    favoriteId: string;
    roomProduct: {
      image_url: {
        id: string;
        name: string;
        roomImageById: string;
        url: {
          url: string;
        }[];
      }[];
      name: string;
      number_of_guests: number;
      price: number;
    };
  }[];
}

const initialState: IFavorite = {
  loading: false,
  error: '',
  message: '',
  favorites: [],
  myFavorite: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToFavorites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
    });
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(removeToFavorites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(removeToFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(removeToFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getUserFavorites.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.myFavorite = action.payload;
    });
    builder.addCase(getUserFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default favoriteSlice.reducer;
