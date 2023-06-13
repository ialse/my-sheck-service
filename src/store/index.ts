import { configureStore } from '@reduxjs/toolkit';
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AnyAction, Reducer } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer, { RootReducer } from './rootReducer';

const reducer: Reducer<RootReducer, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return rootReducer(state, action);
};

const isDev = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer,
  devTools: isDev,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: false, // thunk подключаю ниже после refreshTokenMiddleware иначе по дефолту он выполняется до проверки токена
  //     immutableStateInvariant: true,
  //     serializableCheck: false,
  //   }).concat(thunkMiddleware),
});

type Store = typeof store;
export type AppDispatch = Store['dispatch'];
export type RootState = Store['getState'];
export type ReduxState = ReturnType<typeof rootReducer>;
