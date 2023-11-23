import type { PayloadAction } from '@reduxjs/toolkit';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { logInActions } from '../reducers/user';
import { ILoginPayload } from 'src/types/types';

function logInAPI(data: ILoginPayload) {
  return axios.post('/api/logInUser', data);
}

function* logInSaga(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(logInAPI, action.payload);
    yield put(logInActions.logInSuccess(result.data));
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message);
    } else {
      yield put(logInActions.logInFailure(error));
    }
  }
}

function* watchLogIn() {
  yield takeLatest(logInActions.logInRequest, logInSaga);
}

export default function* userSaga() {
  yield all([fork(watchLogIn)]);
}
