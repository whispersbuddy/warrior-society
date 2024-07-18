import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Logo, beforeLogo } from "../../constant/imagePath";
import classes from "./Footer.module.css";
import { IoMail } from "react-icons/io5";
import { useSelector } from "react-redux";
const Footer = ({ mainWrapper }) => {
  const { isLogin } = useSelector((state) => state.authReducer);
  const { allCmsData } = useSelector((state) => state?.commonReducer);
  const cmsData = allCmsData?.find((item) => item?.pageName === "footer");
  return (
    <>
      <div className={`${[classes.footerMain, mainWrapper].join(" ")}`}>
        <div className={classes.contentMain}>
          <Container>
            <div className={classes.innerMain}>
              <Row>
                <Col lg={2}>
                  <div className={classes.logoMain}>
                    <img src={beforeLogo} alt="..." />
                  </div>
                </Col>
                <Col lg={8}>
                  <div className={classes.linksMain}>
                    <Link to={"/"}>Home</Link>
                    <Link to={isLogin ? "/users" : "/public-search"}>
                      Community
                    </Link>
                    <Link to={"/terms-and-conditions"}>
                      Terms & Conditions{" "}
                    </Link>
                    <Link to={"/privacy-policy"}>Privacy Policy </Link>
                  </div>
                </Col>

                <Col lg={2}>
                  <div
                    className={[classes.linksMain, classes.socialLinks].join(
                      " "
                    )}
                  >
                    {cmsData?.footer_icons?.map((ele) => {
                      return (
                        <a href={ele?.link} target="_blank">
                          <span className={classes.socialLink}>
                            {ele?.icon_type == "facebook" ? (
                              <FaFacebookF
                                size={25}
                                color="var(--white-color)"
                              />
                            ) : ele?.icon_type == "twitter" ? (
                              <BsTwitter size={25} color="var(--white-color)" />
                            ) : (
                              <FaInstagram
                                size={25}
                                color="var(--white-color)"
                              />
                            )}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className={classes.footerBottom}>
            <Container>
              <div className={classes.footerBottomInner}>
                <p>© 2023 all copyright reserved.</p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
