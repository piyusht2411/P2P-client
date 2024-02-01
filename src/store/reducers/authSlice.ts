import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from '../store'
export interface AuthState {
    name: string | null;
    authToken:string | null;
    refreshToken:string |null;
    _id:string | null;
}
const initialState: AuthState = {
    name: null,
    authToken:null,
    refreshToken:null,
    _id:null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{name: string, _id:string,  authToken:string; refreshToken:string}>) => {
            localStorage.setItem("user", JSON.stringify({
                name: action.payload.name,
                _id:action.payload._id,
                authToken:action.payload.authToken,
                refreshToken:action.payload.refreshToken,
            }))
            state.name = action.payload.name;
            state.authToken=action.payload.authToken;
        state.refreshToken=action.payload.refreshToken;
        state._id=action.payload._id;
        },
        logout:(state)=>{
            localStorage.clear();
            state.name = null;
            state.authToken = null;
            state.refreshToken = null;
            state._id = null;
        }

    }
})
export const selectAuth = (state: RootState) => state.auth;
export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state:any) => state.auth.name;
export const selectCurrentauth = (state:any) => state.auth.authToken;
export const selectCurrentrefresh = (state:any) => state.auth.refreshToken;