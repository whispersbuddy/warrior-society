import parse from "html-react-parser";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiArrowUpRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Component/Button/Button";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import HeroSection from "../../Component/HeroSection";
import SearchInput from "../../Component/SearchInput";
import { imageUrl } from "../../config/apiUrl";
import classes from "./Landing.module.css";

export default function Landing() {
  const { isLogin } = useSelector((state) => state.authReducer);
  const { allCmsData } = useSelector((state) => state?.commonReducer);
  const cmsData = allCmsData?.find((item) => item?.pageName === "home");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <>
      <Header />
      <main className={classes.main}>
        <HeroSection cmsData={cmsData}>
          <div className={classes.content__wrapper}>
            {cmsData?.section1_heading && parse(cmsData?.section1_heading)}

            <p className={classes.main__description}>
              {cmsData?.section1_description &&
                parse(cmsData?.section1_description)}
            </p>
            <div className={classes.Herosearch__wrapper}>
              <p>
                {cmsData?.section1_subDescription &&
                  parse(cmsData?.section1_subDescription)}
              </p>
              <div className={classes.search__}>
                <SearchInput
                  setter={setSearch}
                  value={search}
                  customStyle={{
                    width: "100%",
                    height: "70px",
                    borderRadius: "100px",
                  }}
                  inputStyle={{ borderRadius: "100px" }}
                  placeholder="Search By Name"
                  btnClick={() => {
                    navigate(`/public-search`, { state: search });
                  }}
                  customClass={classes.search__input}
                />
              </div>
            </div>
          </div>
        </HeroSection>
        <section className={classes.info__section}>
          <Container>
            <div className={classes.btn_info__wrapper}>
              <div className={classes.info__wrapper}>
                <div className={classes.info}>
                  <h2 className={classes.accent__heading}>
                    {cmsData?.section2_title1 &&
                      parse(cmsData?.section2_title1)}
                  </h2>
                  {cmsData?.section2_description1 &&
                    parse(cmsData?.section2_description1)}
                </div>
                <div className={classes.info}>
                  <h2 className={classes.accent__heading}>
                    {cmsData?.section2_title2 &&
                      parse(cmsData?.section2_title2)}
                  </h2>
                  {cmsData?.section2_description2 &&
                    parse(cmsData?.section2_description2)}
                </div>
                <div className={classes.info}>
                  <h2 className={classes.accent__heading}>
                    {cmsData?.section2_title3 &&
                      parse(cmsData?.section2_title3)}
                  </h2>
                  {cmsData?.section2_description3 &&
                    parse(cmsData?.section2_description3)}
                </div>
                <div className={classes.info}>
                  <h2 className={classes.accent__heading}>
                    {cmsData?.section2_title4 &&
                      parse(cmsData?.section2_title4)}
                  </h2>
                  {cmsData?.section2_description4 &&
                    parse(cmsData?.section2_description4)}
                </div>
              </div>
              {!isLogin && (
                <div className={classes.btn__wrapper}>
                  <Button
                    className={classes.__btn}
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign Up
                    <FiArrowUpRight size={26} />
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </section>
        <section className={classes.joinOurCommunity__section}>
          <Container>
            <div className={classes.joinOurCommunity__wrapper}>
              <div className={classes.__header}>
                {cmsData?.section3_title && parse(cmsData?.section3_title)}
              </div>
              <div className={classes.__content}>
                <Row>
                  <Col xl={3} md={6} key={4}>
                    <div className={classes.trainerCard}>
                      <div className={classes.__image}>
                        <img
                          src={
                            cmsData?.section3_image1 &&
                            imageUrl(cmsData?.section3_image1)
                          }
                          alt={`image`}
                        />
                      </div>

                      {cmsData?.section3_name1 &&
                        parse(cmsData?.section3_name1)}
                    </div>
                  </Col>
                  <Col xl={3} md={6} key={1}>
                    <div className={classes.trainerCard}>
                      <div className={classes.__image}>
                        <img
                          src={
                            cmsData?.section3_image2 &&
                            imageUrl(cmsData?.section3_image2)
                          }
                          alt={`image`}
                        />
                      </div>
                      {cmsData?.section3_name2 &&
                        parse(cmsData?.section3_name2)}
                    </div>
                  </Col>
                  <Col xl={3} md={6} key={2}>
                    <div className={classes.trainerCard}>
                      <div className={classes.__image}>
                        <img
                          src={
                            cmsData?.section3_image3 &&
                            imageUrl(cmsData?.section3_image3)
                          }
                          alt={`image`}
                        />
                      </div>

                      {cmsData?.section3_name3 &&
                        parse(cmsData?.section3_name3)}
                    </div>
                  </Col>
                  <Col xl={3} md={6} key={3}>
                    <div className={classes.trainerCard}>
                      <div className={classes.__image}>
                        <img
                          src={
                            cmsData?.section3_image4 &&
                            imageUrl(cmsData?.section3_image4)
                          }
                          alt={`image`}
                        />
                      </div>

                      {cmsData?.section3_name4 &&
                        parse(cmsData?.section3_name4)}
                    </div>
                  </Col>
                  <Col md={12}>
                    <h4 className={classes.heading__uppercase}>
                      TRAIN-ADVANCE-REPEAT
                    </h4>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
