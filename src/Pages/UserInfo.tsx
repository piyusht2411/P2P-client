import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { useLazyLogoutUserQuery, useUserInfoQuery } from '../service/user';
import { selectAuth, logout } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import {useState,useEffect} from 'react'
import HourlyHistory from '../components/HourlyHistory';
import YearlyHistory from '../components/YearlyHistory';


const UserInfo = () => {
  const {_id} = useAppSelector(selectAuth);
  // console.log(_id);
  const responseInfo = useUserInfoQuery(_id);
  console.log(responseInfo);


  if(responseInfo.isLoading){
    return <div>Loading user info...</div>
  }
  if(responseInfo.isError){
    return <div>Error fetching user data</div>
  }
  return (
  <>
  <Header/>
  <h2>Hello {responseInfo.data.user.name}</h2>
  <p>Your wallet amount is Rs. {responseInfo.data.user.wallet}</p>
  
   <Link to ='/sendmoney'><button>Send Money</button></Link>
   <br/>
   <p>Add money in your wallet</p>
   <Link to ='/addmoney'><button>Add Money</button></Link>
   {/* <HourlyHistory/> */}
   <YearlyHistory/>
  </>

  )
  
}

export default UserInfo;