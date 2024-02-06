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
  console.log(responseInfo);
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
    setyear(year);

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
  <>
  <Header/>
  <h2>Hello {responseInfo.data.user.name}</h2>
  <p>Your wallet amount is Rs. {responseInfo.data.user.wallet}</p>
  
   <Link to ='/sendmoney'><button>Send Money</button></Link>
   <br/>
   <p>Add money in your wallet</p>
   <Link to ='/addmoney'><button>Add Money</button></Link><br/>
  <button onClick={handleShow}>Clcik here to see your transiton history</button>
 {show? <div>
  <div>
   <button onClick={handleHour}>last hour tansition History</button>
    <button onClick={handleDay}>last day tansition History</button>
    <button onClick={handleWeek}>last week tansition History</button>
    <button onClick={handleMonth}>last month tansition History</button>
    <button onClick={handleYear}>last year tansition History</button>
   </div>
   {hour?<HourlyHistory/>:""}
  { daily?<DailyHistory/>:""}
  {week?<WeeklyHistory/>:""}
  {month?<MonthlyHistory/>:""}
  {year?<YearlyHistory/>:""}
  </div>:""}
  </>

  )
  
}

export default UserInfo;