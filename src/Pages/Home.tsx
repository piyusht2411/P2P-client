import React, { useState } from 'react';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectAuth } from '../store/reducers/authSlice';

const Home = () => {
  const {authToken} = useAppSelector(selectAuth);
  const [show, setShow] = useState<boolean>(false);

  const handleShow = ()=>{
    setShow(true);
  }
  const handleHide = ()=>{
    setShow(false);
  }
  return (
    <div className={styles.home}>
      <Header />
      {/* <h2>Welcome to P2P wallet</h2> */}
      <div className={styles.main}>
        <div className={styles.homeDescription}>
          <h2>Save time and money when you transfer your money</h2>
          <p>We help you to transfer your money securly and easily. Let's Join us to use seemless environment to transfer money with your friends and family.</p>
          {!show?<button onClick={handleShow}>View more</button>:""}
          {show?<div><p className={styles.more}>You may add money in your wallet in our secure platform and transfer the money with your friends and family seamlessly. You may also check all your transition history to track your money.</p>
          <button onClick={handleHide}>View less</button></div>:""}
          
        </div>
        <div className={styles.homeSidebar}>
          <h3>Send Money to your friends and family</h3>
          <label>You Send</label><br/>
          <input type="text" placeholder="&#8377; 1000" disabled /><br/>
          <label>Recipient get</label><br/>
          <input type="text" placeholder="&#8377; 1000" disabled /><br/>
          {!authToken?<Link to = "/register"><button>Get Started</button></Link>: <Link to = "/user/userinfo"><button>Get Started</button></Link>}
        </div>
      </div>
    </div>
  )
}

export default Home