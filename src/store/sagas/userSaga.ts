import type { PayloadAction } from '@reduxjs/toolkit';
import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { userSignActions } from '../reducers/userReducer';
import { ILoginPayload } from 'src/types/types';

function logInAPI(data: ILoginPayload) {
  return axios.post('/api/logInUser', data);
}

function* logInSaga(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(logInAPI, action.payload);
    yield put(userSignActions.logInSuccess(result.data));
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message);
    } else {
      yield put(userSignActions.logInFailure(error));
    }
  }
}

function* logOutSaga() {
  try {
    yield put(userSignActions.logOutSuccess());
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.message);
    } else {
      yield put(userSignActions.logInFailure(error));
    }
  }
}

function* watchLogIn() {
  yield takeLatest(userSignActions.logInRequest, logInSaga);
}

function* watchLogOut() {
  yield takeLatest(userSignActions.logOutRequest, logOutSaga);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
