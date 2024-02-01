import React, { useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import UserInfo from './Pages/UserInfo';
import Home from './Pages/Home';
import Transactions from './Pages/Transactions';
import { useAppDispatch } from './store/store';
import { setUser } from './store/reducers/authSlice';

const App = ()=>{
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('user')|| "{}");
  useEffect(()=>{
    dispatch(setUser(user))
  },[]);
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/user/userinfo" element={<UserInfo/>}/>
      <Route path="/sendmoney" element={<Transactions/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )

}

export default App;
