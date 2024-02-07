import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Payment.module.css"

const PaymentFailed = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
        <div className={styles.printerTop}></div>

        <div className={styles.paperContainer}>
            <div className={styles.printerBottom}></div>

            <div className={styles.paper}>
                <div className={styles.mainContents}>
                    <div className={styles.failIcon}>&#10060;</div>
                    <div className={styles.successTitle}>
                        Payment Failed
                    </div>
                    <div className={styles.sucessDescription}>
                        We encountered an issue processing your payment.Please double check your payment information and try again.
                    </div>
                    <div className={styles.orderDetails}>
                        <div className={styles.orderNumberLabel}>Error</div>
                        <div className={styles.orderNumber}>{location.state.message}</div>
                        <div className={styles.complementFail}>Sorry!</div>
                        <a href='/user/userinfo'>Click here to get back</a>
                    </div>
                </div>
                <div className={styles.jaggedEdge}></div>
            </div>
        </div>
    </div>
  
  )
}

export default PaymentFailed;