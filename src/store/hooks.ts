import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

import { RootReducer } from './rootReducer';
import { ReduxState } from '.';

export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //TODO

export type CustomThunkAction = (dispatch: Dispatch<any>, getState: () => RootReducer) => Promise<void>