import React, { useEffect, useState} from 'react';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logout, selectAuth } from '../store/reducers/authSlice';
import { useLazyLogoutUserQuery } from '../service/user';
import { useMediaQuery } from 'react-responsive';
import { IoClose, IoMenu } from "react-icons/io5";
import styles from '../styles/Header.module.css';
import { notifyError, notifySuccess } from '../toast';
import ReactLoading from 'react-loading';

const Header2 = () => {
  const {authToken} = useAppSelector(selectAuth);
  // console.log(authToken);
  const dispatch = useAppDispatch();
  const [logoutUser, {isSuccess, isError, isLoading}] = useLazyLogoutUserQuery();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const result = await logoutUser();
      console.log(result);
      dispatch(logout());
      navigate('/');

  }
  useEffect(()=>{
    if(isSuccess){
      notifySuccess("Logout Successfully");
    }
    if(isError){
      notifyError("Error in logging out")
    }

  })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };
  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";
    return(
         <nav className={styles.nav}>
    <li className={styles.logoHeading}><Link to = "/" onClick={closeMobileMenu}><p>P2P wallet</p></Link></li>
  
    <li><Link to = "/howitworks" onClick={closeMobileMenu}><p>How it works</p></Link></li>
    <li><Link to = "/whyus" onClick={closeMobileMenu}><p>Why US</p></Link></li>
    <li><Link to = "/aboutus" onClick={closeMobileMenu}><p>About Us</p></Link></li>
    <li><Link to = "/contactus" onClick={closeMobileMenu}><p>Contact Us</p></Link></li>

    {!authToken ?<li className={styles.loginButtons}>
      <Link to="/login" onClick={closeMobileMenu}><button>Login</button></Link>
      <Link to="/register" onClick={closeMobileMenu}><button>Register</button></Link>
    </li> : <li className={styles.loginButtons} onClick={closeMobileMenu}><button onClick={()=>handleLogout()}>Logout</button></li>}
    {/* {isLoading &&   <ReactLoading type={"spokes"} color={"white"} height={"7rem"} width={"7rem"} className={styles.loaderlogout}/>} */}
   </nav> 

    )
}

  return (
   <>
   <nav>
   {isMobile && (
          <div className={styles.navToggle} id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}
        {isMobile ? (
          <div
            className={styles.navMenu + " "+  (isMenuOpen ? styles.showMenu : "")}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className={styles.navClose} id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
   </>
  )
}

export default Header2;