import React from "react";
import classes from "./PrivacyPolicy.module.css";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import HeroSection from "../../Component/HeroSection";
import { Container } from "react-bootstrap";
const PrivacyPolicy = () => {
  const { allCmsData } = useSelector((state) => state?.commonReducer);
  const cmsData = allCmsData?.find(
    (item) => item?.pageName === "privacyPolicy"
  );
  return (
    <>
      <Header />
      <HeroSection>
        <div className={classes.heading}>
          <h1>Privacy Policy</h1>
        </div>
      </HeroSection>
      <div className={classes.privacyPolicy}>
        <Container>
          <p>{parse(cmsData?.description && cmsData?.description)}</p>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
