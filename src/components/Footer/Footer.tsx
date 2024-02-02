import React from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import "./footer.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t] = useTranslation("global");


  const scrollToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth' // Optional: For smooth scrolling auto smooth
    });
  };

  return (
    <div id="footer-container">
      {/* Footer */}
      <div id="social-media-container">
        <FaWhatsapp  className="social-media-icons"/>
        <FaFacebook  className="social-media-icons"/>
        <FaInstagram className="social-media-icons"/>
        <FaTiktok    className="social-media-icons"/>
        <FaYoutube   className="social-media-icons"/>
        <BiLogoGmail className="social-media-icons"/>
      </div>

      <div id="footer-links-container">
        <Link className="footer-links" to={"/shop"} >{t('footer.shop')}</Link>
        {/* <Link className="footer-links" to={"/contactus"} >{t('footer.contactus')}</Link> */}
        <Link className="footer-links" to={"/story"} >{t('footer.story')}</Link>
        {/* <Link className="footer-links" to={"/account"} >{t('footer.account')}</Link> */}
        <Link className="footer-links" to={"/home"} >{t('footer.home')}</Link>
      </div>

      {/* <button onClick={scrollToTop}>Go to Top</button> */}
    </div>
  );
};

export default Footer;
