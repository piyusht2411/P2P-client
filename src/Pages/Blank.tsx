import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Blank = () => {
  return (
    <>
    <div>Your payment is successful</div>
    {/* <Link to='/user/userinfo'>Click here to get back</Link> */}
    <a href='/user/userinfo'>Click here to get back</a>
    </>
  
  )
}

export default Blank;