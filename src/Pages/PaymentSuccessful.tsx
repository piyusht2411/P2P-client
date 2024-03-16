import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Payment.module.css"

const PaymentSuccessfull = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
        <div className={styles.printerTop}></div>

        <div className={styles.paperContainer}>
            <div className={styles.printerBottom}></div>

            <div className={styles.paper}>
                <div className={styles.mainContents}>
                    <div className={styles.successIcon}>&#10004;</div>
                    <div className={styles.successTitle}>
                        Payment Complete
                    </div>
                    <div className={styles.sucessDescription}>
                        Your payment is successful! You will shortly receive an email of your payment.
                    </div>
                    <div className={styles.orderDetails}>
                        <div className={styles.orderNumberLabel}>Transaction ID</div>
                        <div className={styles.orderNumber}>{location.state.transitionId}</div>
                        <div className={styles.complement}>Thank You!</div>
                        <a href='/user/userinfo' style={{color:"#32a852"}}>Click here to get back</a>
                    </div>
                </div>
                <div className={styles.jaggedEdge}></div>
            </div>
        </div>
    </div>
  
  )
}

export default PaymentSuccessfull;