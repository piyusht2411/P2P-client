import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' ,
    prepareHeaders:(headers,{getState})=>{
        const authToken=(getState() as RootState).auth.authToken;
        // const refreshToken=(getState() as RootState).auth.refreshToken;
        if(authToken){
            // console.log(`Bearer ${authToken}+${refreshToken}`)
            headers.set("authorization",`Bearer ${authToken}`);
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
            query:({_id, ...rest})=>({
                url: `/sendmoney/${_id}`,
                method: 'PUT',
                body: rest,
                headers:{ 'Content-Type': 'application/json',}
            }),
          
        }),
        addMoney: builder.mutation({
            query:({_id, ...rest})=>({
                url: `/addmoney/${_id}`,
                method: 'PUT',
                body: rest,
                headers:{ 'Content-Type': 'application/json',}
            }),
          
        }),
        userInfo :builder.query({
            query:(_id)=>({
                url:`/userinfo/${_id}`,
                method: 'GET',
                headers:{ 'Content-Type': 'application/json',}
            })

        }),
        logoutUser: builder.query<void, void>({
            // query:()=> `/logout`
            query:()=>({
                url: '/logout',
                method: 'GET',
                headers:{ 'Content-Type': 'application/json',}
            })
            
        })
     
    }),
    
  })
  export const {useRegisterUserMutation,useLoginUserMutation, useLazyLogoutUserQuery, useSendMoneyMutation, useUserInfoQuery, useAddMoneyMutation} = userApi;