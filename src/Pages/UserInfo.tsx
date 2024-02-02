import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { useLazyLogoutUserQuery, useUserInfoQuery } from '../service/user';
import { selectAuth, logout } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const UserInfo = () => {
  const {_id} = useAppSelector(selectAuth);
  const responseInfo = useUserInfoQuery(_id);
  console.log(responseInfo);
  // if(responseInfo.isLoading){ return (<h4>Loading user data.....</h4>)}
  // else if(responseInfo.isError){ return (<h4>Error fetching user data.....</h4>)}
  // else if(responseInfo.isSuccess){
  return (
  <>
  <Header/>
  <h2>Hello {responseInfo.data.user.name}</h2>
  <p>Your wallet amount is Rs. {responseInfo.data.user.wallet}</p>
  
   <Link to ='/sendmoney'><button>Send Money</button></Link>
  </>

  )
  
}

export default UserInfo;