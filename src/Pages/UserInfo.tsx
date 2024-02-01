import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Link } from 'react-router-dom';
import { useLazyLogoutUserQuery } from '../service/user';
import { selectAuth, logout } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const UserInfo = () => {
  // const {_id} = useAppSelector(selectAuth);
  // console.log(_id);



  return (
  <>
  <Header/>
   <Link to ='/sendmoney'><button>Send Money</button></Link>
  </>

  )
}

export default UserInfo