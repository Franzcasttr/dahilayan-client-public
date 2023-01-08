import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../client/config';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    payload:
      | string
      | { name: string }
      | { date_of_birth: string }
      | { gender: string }
      | { phone_number: number },
    thunkAPI
  ) => {
    const res = await API.put(`users/updateUser`, payload);
    if (res.status === 200) {
      thunkAPI.dispatch(getUser());
      return res.data.msg;
    }
    return res.data.errorMsg;
  }
);

export const updateUserImage = createAsyncThunk(
  'user/updateUserImage',
  async (image: FormData, thunkAPI) => {
    const res = await API.post('users/updateUserImage', image);
    if (res.status === 200) {
      thunkAPI.dispatch(getUser());
      return res.data.msg;
    }
    return res.data.errorMsg;
  }
);

export const getUser = createAsyncThunk(
  'user/showUser',
  async (token, thunkAPI) => {
    const res = await API.get(`users/showme`);
    if (res.status === 200) {
      return res.data.result;
    }
    return res.data.errorMsg;
  }
);

export const signupUser = createAsyncThunk(
  'user/createUser',
  async (
    payload: { name: string; email: string; password: string; uid: string },
    thunkAPI
  ) => {
    const res = await API.post('users/signupuser', payload);
    if (res.status === 201) {
      return res.data.result;
    }
    return res.data.errorMsg;
  }
);

interface IPayloadTypes {
  id: string;
  userData: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: number;
  };
}

export type IUser = {
  name: string;
  id: string;
  date_of_birth: string;
  gender: string;
  email: string;
  phone_number: number;
  image: string;
  role: string;
};
export type IUser2 = {
  user: {
    name: string;
    id: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: number;
    image: string;
    role: string;
  };
};

interface IUserTypes {
  user: {
    name: string;
    id: string;
    date_of_birth: string;
    gender: string;
    email: string;
    phone_number: number;
    image: string;
    role: string;
  };
  loading: boolean;
  error: boolean;
  errorMsg: string;
  message: string;
  usercreated: null;
}

const initialState: IUserTypes = {
  user: {} as IUser,
  loading: false,
  error: false,
  errorMsg: '',
  message: '',
  usercreated: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {},
    removeUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      // state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(signupUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.usercreated = action.payload;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
    builder.addCase(updateUserImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUserImage.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
    builder.addCase(updateUserImage.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.payload as string;
    });
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
