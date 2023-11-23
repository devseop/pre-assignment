import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUserState, IUserInfo, ILoginPayload } from 'src/types/types';

const initialState: IUserState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInRequest(state, action: PayloadAction<ILoginPayload>) {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = null;
    },
    logInSuccess(state, action: PayloadAction<IUserInfo>) {
      console.log('logInSuccess', state);
      state.logInLoading = false;
      state.logInDone = true;
      state.userInfo = action.payload;
    },
    logInFailure(state, action: PayloadAction<AxiosError>) {
      state.logInLoading = false;
      const errorMessage =
        action.payload.message || '로그인 중 오류가 발생했습니다.';
      state.logInError = new Error(errorMessage);
    },
    logOutRequest(state) {
      state.logInLoading = true;
      state.logOutDone = false;
      state.logInError = null;
    },
    logOutSuccess(state) {
      state.logInDone = false;
      state.logOutLoading = false;
      state.logOutDone = true;
      state.userInfo = null;
    },
    logOutFailure(state, action: PayloadAction<AxiosError>) {
      state.logOutLoading = false;
      const errorMessage =
        action.payload.message || '로그인 중 오류가 발생했습니다.';
      state.logInError = new Error(errorMessage);
    },
  },
});

export const userSignActions = userSlice.actions;
export default userSlice.reducer;
