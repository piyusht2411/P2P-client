import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './reducers/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { userApi } from '../service/user';
import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export const store = configureStore({
    reducer:{
        auth:authReducer,
        [userApi.reducerPath]:userApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(userApi.middleware),
    
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector