import React from 'react';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout, selectAuth } from '../store/reducers/authSlice';
import { useLazyLogoutUserQuery } from '../service/user';

const Header = () => {
  const {authToken} = useAppSelector(selectAuth);
  console.log(authToken);
  const dispatch = useAppDispatch();
  const [logoutUser] = useLazyLogoutUserQuery();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const result = await logoutUser();
      console.log(result);
      dispatch(logout());
      navigate('/');

  }

  return (
   <>
   <nav>
    <h3>P2P wallet</h3>
    {!authToken ?<div>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div> : <div><button onClick={()=>handleLogout()}>logout</button></div>}
   </nav>
   </>
  )
}

export default Header