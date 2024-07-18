import React from "react";
import classes from "./HeroSection.module.css";
import { Container } from "react-bootstrap";
import { imageUrl } from "../../config/apiUrl";

const HeroSection = ({ children, cmsData = false }) => {
  return (
    <div
      style={
        cmsData
          ? {
              backgroundImage: `url(${imageUrl(
                cmsData?.section1_image && cmsData?.section1_image
              )})`,
            }
          : {}
      }
      className={classes.heroSection}
    >
      <Container>{children}</Container>
    </div>
  );
};

export default HeroSection;
