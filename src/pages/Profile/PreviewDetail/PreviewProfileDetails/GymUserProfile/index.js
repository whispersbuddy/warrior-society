import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import NoData from "../../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../../config/apiUrl";
import classes from "./GymUserProfile.module.css";
import ProfilePhoto from "../../../../../Component/ProfilePhoto";
import { useNavigate } from "react-router-dom";

const GymUserProfile = () => {
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state?.authReducer);

  return (
    <div className={classes.profilePage}>
      <Container>
        <div className={classes.userProfile}>
          <Row>
            <Col lg={12}>
              <div className={classes.leftContainer}>
                <Row className={classes.topDiv}>
                  <Col lg={8} className={classes.aboutRow}>
                    <div className={classes.aboutContainer}>
                      <div className={classes.header}>
                        <h3>About Gym </h3>
                      </div>
                      <p>
                        {userData?.schoolDetails?.bio ? (
                          userData?.schoolDetails?.bio
                        ) : (
                          <NoData text="No bio found" />
                        )}
                      </p>
                    </div>
                  </Col>
                  <Col lg={4} className={classes.aboutRow}>
                    <div className={classes.ownersContainer}>
                      <div className={classes.header}>
                        <h3>Owners </h3>
                      </div>
                      <div className={classes.owners}>
                        {userData?.schoolDetails?.owners?.length > 0 ? (
                          userData?.schoolDetails?.owners?.map((owner) => (
                            <>
                              <div className={classes.owners__wrapper}>
                                <div
                                  className={classes.ownerDetails}
                                  onClick={() => {
                                    navigate(`/profile/${owner?.slug}`);
                                  }}
                                >
                                  <div className={classes.owner}>
                                    <ProfilePhoto
                                      photo={owner?.photo}
                                      profilePhotoDimensions={
                                        owner?.profilePhotoDimensions
                                      }
                                      className={classes.imgBox}
                                    />
                                  </div>
                                  <div>
                                    <p>
                                      {owner?.firstName} {owner?.lastName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))
                        ) : (
                          <NoData text="No Owners Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.fightingContainer}>
                      <div className={classes.header}>
                        <h3>Discipline(s) </h3>
                      </div>
                      <div className={classes.types}>
                        {userData?.schoolDetails?.disciplines?.length > 0 ? (
                          userData?.schoolDetails?.disciplines?.map((ele) => {
                            return (
                              <div className={classes.skill}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.title}</h5>
                                </div>
                                <p>{ele?.disciplineDiscription}</p>
                              </div>
                            );
                          })
                        ) : (
                          <NoData text="No Discipline Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.rightContainer}>
                      <div className={classes.dues}>
                        <div className={classes.header}>
                          <h5>Dues Information </h5>
                        </div>
                        {userData?.schoolDetails?.duesInformation
                          ?.monthlyDueMin ? (
                          <>
                            <div className={classes.fee}>
                              <p>Monthly dues</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.monthlyDueMin
                                }{" "}
                                - $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.monthlyDueMax
                                }
                              </span>
                            </div>
                            <div className={classes.fee}>
                              <p>Private Lessons</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.privateMinFees
                                }{" "}
                                - $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.privateMaxFees
                                }
                              </span>
                            </div>{" "}
                            <div className={classes.fee}>
                              <p>Drop ins</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.dropin
                                }
                              </span>
                            </div>
                            <div className={classes.specials}>
                              <h5>Specials</h5>
                              <p>{userData?.schoolDetails?.special}</p>
                            </div>
                            <div className={classes.specials}>
                              <h5>Additional Information</h5>
                              <p>
                                {userData?.schoolDetails?.additionInformation}
                              </p>
                            </div>
                          </>
                        ) : (
                          <NoData text="No dues information found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.fightingContainer}>
                      <div className={classes.header}>
                        <h3>Amenities </h3>
                      </div>
                      <div className={classes.types}>
                        {userData?.schoolDetails?.equipments?.length > 0 ? (
                          userData?.schoolDetails?.equipments?.map((ele) => {
                            return (
                              <div className={classes.skill}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.equipmentName}</h5>
                                </div>
                                <p>{ele?.description}</p>
                              </div>
                            );
                          })
                        ) : (
                          <NoData text="No Amenities Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col lg={12}>
                  <div className={classes.awardsContainer}>
                    <div className={classes.header}>
                      <h3>Accolades </h3>
                    </div>{" "}
                    <div className={classes.awardImages}>
                      <Row>
                        {userData?.schoolDetails?.accolades?.length > 0 ? (
                          userData?.schoolDetails?.accolades?.map((award) => (
                            <Col xs={6} sm={4} lg={3} className={classes.award}>
                              <div className={classes.imageBox}>
                                <img src={imageUrl(award?.image)} alt="" />
                              </div>
                              <p>{award?.accoladeName}</p>
                            </Col>
                          ))
                        ) : (
                          <NoData text="No Accolades Found" />
                        )}
                      </Row>
                    </div>
                  </div>
                </Col>
                <div className={classes.instructorContainer}>
                  <div className={classes.header}>
                    <h3>Associated Instructors </h3>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.instructors?.length > 0 ? (
                        userData?.schoolDetails?.instructors?.map(
                          (instructor) => (
                            <Col
                              xs={6}
                              md={4}
                              lg={3}
                              xl={2}
                              className={classes.gym}
                            >
                              <img src={imageUrl(instructor?.photo)} alt="" />
                              <div className={classes.gymContent}>
                                <p>
                                  {instructor?.firstName} {instructor?.lastName}
                                </p>
                              </div>
                            </Col>
                          )
                        )
                      ) : (
                        <NoData text="No Instructors Found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.studentsContainer}>
                  <div className={classes.header}>
                    <h3>Students </h3>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.students?.length > 0 ? (
                        userData?.schoolDetails?.students?.map((instructor) => (
                          <Col
                            xs={6}
                            md={4}
                            lg={3}
                            xl={2}
                            className={classes.gym}
                          >
                            <img src={imageUrl(instructor?.photo)} alt="" />
                            <div className={classes.gymContent}>
                              <p>
                                {instructor?.firstName} {instructor?.lastName}
                              </p>
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No Students Found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>Associations </h3>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.association?.length > 0 ? (
                        userData?.schoolDetails?.association?.map((club) => (
                          <Col sm={6} className={classes.gym}>
                            <div className={classes.gymImage}>
                              <img
                                src={imageUrl(club?.association?.image)}
                                alt=""
                              />
                            </div>
                            <div className={classes.gymContent}>
                              <div className={classes.domainHeading}>
                                <p>{club?.association?.associationName}</p>
                              </div>
                              {club?.startDate && club?.endDate && (
                                <span>{`${moment(club?.startDate).format(
                                  "MM/DD/YYYY"
                                )} - ${moment(club?.endDate).format(
                                  "MM/DD/YYYY"
                                )}`}</span>
                              )}
                              {club?.grade && <span>Grade: {club?.grade}</span>}
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No Associations Found" />
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default GymUserProfile;
