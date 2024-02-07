import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Blank_Error= () => {
  return (
    <>
    <div>Your payment Transactions failed.</div>
    {/* <Link to='/user/userinfo'>Click here to get back</Link> */}
    <a href='/user/userinfo'>Click here to get back</a>
    </>
  
  )
}

export default Blank_Error;