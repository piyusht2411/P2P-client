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
import AddMoney from './Pages/AddMoney';
import Error_404 from './Pages/Error_404';
import PaymentSuccessfull from './Pages/PaymentSuccessful';
import PaymentFailed from './Pages/PaymentFailed';
import ContactUs from './Pages/ContactUs';
import WhyUs from './Pages/WhyUs';
import HowItWorks from './Pages/HowItWorks';
import AboutUs from './Pages/AboutUs';

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
      <Route path="/addmoney" element={<AddMoney/>}/>
      <Route path ='/payment' element = {<PaymentSuccessfull/>}/>
      <Route path="/paymentfailed" element={<PaymentFailed/>}/>
      <Route path="/contactus" element={<ContactUs/>}/>
      <Route path="/whyus" element={<WhyUs/>}/>
      <Route path="/howitworks" element={<HowItWorks/>}/>
      <Route path="/aboutus" element={<AboutUs/>}/>
      <Route path="*" element={<Error_404/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )

}

export default App;
