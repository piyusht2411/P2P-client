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
import DailyHistory from '../components/DailyHistory';
import WeeklyHistory from '../components/WeeklyHistory';
import MonthlyHistory from '../components/MonthlyHistory';
import styles from "../styles/UserInfo.module.css"
import Header2 from '../components/Header2';


const UserInfo = () => {
  const [hour, sethour] = useState<boolean>(false);
   const [daily, setdaily] = useState<boolean>(false);
   const [week, setweek] = useState<boolean>(false);
   const [month, setmonth] = useState<boolean>(false);
   const [year, setyear] = useState<boolean>(false);
   const [show,setShow] = useState<boolean>(false);
  const {_id} = useAppSelector(selectAuth);
  // console.log(_id);
  const responseInfo = useUserInfoQuery(_id);
  // console.log(responseInfo);
  function handleHour(){
    sethour(true);
    setdaily(false);
    setweek(false);
    setmonth(false);
    setyear(false);

   }
   function handleDay(){
    sethour(false);
    setdaily(true);
    setweek(false);
    setmonth(false);
    setyear(false);

   }
   function handleWeek(){
    sethour(false);
    setdaily(false);
    setweek(true);
    setmonth(false);
    setyear(false);

   }
   function handleMonth(){
    sethour(false);
    setdaily(false);
    setweek(false);
    setmonth(true);
    setyear(false);

   }
   function handleYear(){
    sethour(false);
    setdaily(false);
    setweek(false);
    setmonth(false);
    setyear(true);

   }
   function handleShow(){
    setShow(true);
   }

  if(responseInfo.isLoading){
    return <div>Loading user info...</div>
  }
  if(responseInfo.isError){
    return <div>Error fetching user data</div>
  }
  return (
  <div className={styles.mainPage + " " +(!hour && !daily && !week && !month && !year? styles.mainPageHeight:"")}>
  <Header2/>
  <br/>
  <div className={styles.userInfo}>
  <h2>Hello {responseInfo.data.user.name}</h2>
  <div className={styles.userWallet}>
  <p>Wallet Balance</p>
  <p>&#8377; {responseInfo.data.user.wallet}</p>
  </div>
  <div className={styles.userEmail}>
  <p>Email</p>
  <p> {responseInfo.data.user.email}</p>
  </div>
  <div className={styles.userPhone}>
  <p>Phone no.</p>
  <p> +91{responseInfo.data.user.phone}</p>
  </div>
  <p className={styles.userButtonPara}>Want to send money to your friends or family</p>
   <Link to ='/sendmoney'><button className={styles.userButton}>Send Money</button></Link>
   <br/>
   <p className={styles.userButtonPara}>Want to add money to your wallet</p>
   <Link to ='/addmoney'><button className={styles.userButton}>Add Money</button></Link><br/>
   <p className={styles.userButtonPara}>You may check all your transaction history by clicking below </p>
  <button className={styles.userButton} onClick={handleShow}>transaction history</button>
 {show? <div>
  <ol className={styles.GreenNumbers}>
  <li> <button onClick={handleHour}>last hour tansition History</button></li>
    <li><button onClick={handleDay}>last day tansition History</button></li>
   <li> <button onClick={handleWeek}>last week tansition History</button></li>
    <li><button onClick={handleMonth}>last month tansition History</button></li>
   <li> <button onClick={handleYear}>last year tansition History</button></li>
   </ol>
   {hour?<HourlyHistory/>:""}
  { daily?<DailyHistory/>:""}
  {week?<WeeklyHistory/>:""}
  {month?<MonthlyHistory/>:""}
  {year?<YearlyHistory/>:""}
  </div>:""}
  </div>
  </div>

  )
  
}

export default UserInfo;