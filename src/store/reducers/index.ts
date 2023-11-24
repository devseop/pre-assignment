import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import user from './userReducer';

const rootReducer = (state: any, action: any) => {
  // console.log('types: ', typeof state, typeof action);
  // console.log('root', state, action);
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
