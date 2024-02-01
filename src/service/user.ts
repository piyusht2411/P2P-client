import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' ,
    prepareHeaders:(headers,{getState})=>{
        const authToken=(getState() as RootState).auth.authToken;
        const refreshToken=(getState() as RootState).auth.refreshToken;
        if(authToken && refreshToken){
            console.log(`Bearer ${authToken}+${refreshToken}`)
            headers.set("authorization",`Bearer ${authToken}+${refreshToken}`);
        }
        return headers;
    }
}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query:(body)=>({
                url: '/register',
                method: 'POST',
                body: body,
            }),
          
        }),
        loginUser: builder.mutation({
            query:(body)=>({
                url: '/login',
                method: 'POST',
                body: body,
            }),
          
        }),
        sendMoney: builder.mutation({
            query:({_id, receiverMail, amount})=>({
                url: `/sendmoney/${_id}`,
                method: 'PUT',
                body: {receiverMail, amount},
                headers:{ 'Content-Type': 'application/json',}
            }),
          
        }),
        logoutUser: builder.query<void, void>({
            query:()=> `/logout`
            
        })
     
    }),
    
  })
  export const {useRegisterUserMutation,useLoginUserMutation, useLazyLogoutUserQuery, useSendMoneyMutation} = userApi;