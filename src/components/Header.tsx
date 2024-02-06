import React from 'react';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout, selectAuth } from '../store/reducers/authSlice';
import { useLazyLogoutUserQuery } from '../service/user';
import styles from '../styles/Header.module.css';

const Header = () => {
  const {authToken} = useAppSelector(selectAuth);
  // console.log(authToken);
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
   <nav className={styles.nav}>
    <li className={styles.logoHeading}><p>P2P wallet</p></li>
  
    <li><p>How it works</p></li>
    <li><p>Why Us</p></li>
    <li><p>About Us</p></li>
    <li><p>Contact Us</p></li>

    {!authToken ?<li className={styles.loginButtons}>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </li> : <li className={styles.loginButtons}><button onClick={()=>handleLogout()}>logout</button></li>}
   </nav>
   </>
  )
}

export default Header