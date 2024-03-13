import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { SiGmail } from "react-icons/si";
import styles from "../styles/Footer.module.css"

const Footer = () => {
  return (
    <div className={styles.logoPage}>
    <div className={styles.logos}>
      <div className={styles.instagramIcon}>
        <a href = ""><FaInstagram/></a>
      </div>
      <div className={styles.instagramIcon}>
        <a href = ""><FiGithub/></a>
      </div>
      <div className={styles.instagramIcon}>
        <a href = ""><SiGmail/></a>
      </div>
      <div className={styles.instagramIcon}>
        <a href = ""><FaXTwitter/></a>
      </div>
    </div>
    </div>
  )
}

export default Footer