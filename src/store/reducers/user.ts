import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUserState, IUserInfo, ILoginPayload } from 'src/types/types';

const initialState: IUserState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
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
      state.logInLoading = false;
      state.logInDone = true;
      state.userInfo = action.payload;
    },
    logInFailure(state, action: PayloadAction<AxiosError>) {
      state.logInLoading = false;
      const errorMessage =
        action.payload.message || '로그인 중 오류가 발생했습니다.';
      state.logInError = new Error(errorMessage);
      console.log(errorMessage);
    },
  },
});

export const logInActions = userSlice.actions;
export default userSlice.reducer;
