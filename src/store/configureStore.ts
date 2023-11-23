import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import rootReducer from './reducers';
import rootSaga from './sagas';

interface SagaStore extends EnhancedStore {
  sagaTask?: Task;
}

const makeStore: MakeStore<SagaStore> = () => {
  const sagaMiddleware = createSagaMiddleware();

  // Redux Toolkit을 사용하여 스토어 구성
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', // 개발 도구 활성화 여부
  }) as SagaStore;

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper<SagaStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof rootReducer>;

export default wrapper;
