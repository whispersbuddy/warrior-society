import parse from "html-react-parser";
import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import HeroSection from "../../Component/HeroSection";
import classes from "./TermsAndConditions.module.css";
const TermsAndConditions = () => {
  const { allCmsData } = useSelector((state) => state?.commonReducer);
  const cmsData = allCmsData?.find(
    (item) => item?.pageName === "termsAndConditions"
  );
  return (
    <>
      <Header />
      <HeroSection>
        <div className={classes.heading}>
          <h1>Terms And Conditions</h1>
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

export default TermsAndConditions;
