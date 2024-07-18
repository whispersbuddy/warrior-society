import React, { useState } from "react";
import styles from "./MobileFooter.module.css";
import Accordion from "react-bootstrap/Accordion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Logo } from "../../constant/imagePath";
import { BsTelephoneFill } from "react-icons/bs";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { classes } from "istanbul-lib-coverage";
import { useSelector } from "react-redux";
import { BaseURL, apiHeader, validateEmail } from "../../config/apiUrl";
import { Post } from "../../Axios/AxiosFunctions";
import { toast } from "react-toastify";

const MobileFooter = ({ mainWrapper }) => {
  return (
    <>
      <style>
        {`
        .accordion-header > button{
            background-color:unset !important;
            padding-left: 0;
            box-shadow:unset !important;
        }
        `}
      </style>
      <div className={`${[styles.mobileFooter_main, mainWrapper].join(" ")}`}>
        <div className="container">
          <div className={classes.innerMain}>
            <img src={Logo} alt="" />
            <p className={styles.footerPara}>
              Book your trip in minute, get full Control for much longer.
            </p>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item className={styles.Accordion_items} eventKey="0">
                  <Accordion.Header className={styles.Accordion_header_main}>
                    <p className={`p-17 ${[styles.links_head].join(" ")}`}>
                      Company
                    </p>
                  </Accordion.Header>
                  <Accordion.Body className={styles.Accordion_body}>
                    <ul className={styles.Accordion_links_main}>
                      <li>
                        <Link to="/about-us" className="footerLink">
                          About
                        </Link>
                        <Link to="/services" className="footerLink">
                          Services
                        </Link>
                        <Link to="/carriers" className="footerLink">
                          Mobile
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item className={styles.Accordion_items} eventKey="0">
                  <Accordion.Header className={styles.Accordion_header_main}>
                    <p className={`p-17 ${[styles.links_head].join(" ")}`}>
                      Contact
                    </p>
                  </Accordion.Header>
                  <Accordion.Body className={styles.Accordion_body}>
                    <ul className={styles.Accordion_links_main}>
                      <li>
                        <Link to="/" className="footerLink">
                          Help/FAQ
                        </Link>
                        <Link to="/about-us" className="footerLink">
                          Press
                        </Link>
                        <Link to="/services" className="footerLink">
                          Affilates
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item className={styles.Accordion_items} eventKey="0">
                  <Accordion.Header className={styles.Accordion_header_main}>
                    <p className={`p-17 ${[styles.links_head].join(" ")}`}>
                      More
                    </p>
                  </Accordion.Header>
                  <Accordion.Body className={styles.Accordion_body}>
                    <ul className={styles.Accordion_links_main}>
                      <li>
                        <Link to="/" className="footerLink">
                          Airlinefees
                        </Link>
                        <Link to="/about-us" className="footerLink">
                          Airlinefees
                        </Link>
                        <Link to="/services" className="footerLink">
                          Low fare tips
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <p className={`p-17 ${[styles.links_head].join(" ")}`}>
              Social links
            </p>

            <div className={styles.socialLinks}>
              <a href={"/"} target="_blank">
                <div className={styles.link_main}>
                  <FaFacebookF className={styles.all_links} color="#111012" />
                </div>
              </a>
              <a href={"/"} target="_blank">
                <div className={styles.link_main}>
                  <FaTwitter className={styles.all_links} color="#111012" />
                </div>
              </a>
              <a href={"/"} target="_blank">
                <div className={styles.link_main}>
                  <FaInstagram className={styles.all_links} color="#111012" />
                </div>
              </a>
            </div>
          </div>
          <div className={styles.hr_line}>
            <hr />
          </div>
          <div className={styles.copy_line_main}>
            <p className={styles.copy_line}>©2023 all rights reserved</p>
            <p className={styles.copy_line}>terms & conditions apply</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
