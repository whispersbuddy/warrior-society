import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import NoData from "../../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../../config/apiUrl";
import classes from "./StudentUserProfile.module.css";
const StudentUserProfile = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className={classes.profilePage}>
      <Container>
        <div className={classes.userProfile}>
          <Row>
            <Col lg={12}>
              <div className={classes.leftContainer}>
                <div className={classes.aboutContainer}>
                  <div className={classes.header}>
                    <div className={classes.leftDiv}>
                      <h3>About Me </h3>
                    </div>
                  </div>
                  <p>
                    {user?.studentDetails?.bio ? (
                      user?.studentDetails?.bio
                    ) : (
                      <NoData text="No bio found" />
                    )}
                  </p>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>Discipline(s) </h3>
                  </div>
                  <div className={classes.types}>
                    {user?.studentDetails?.disciplines?.length > 0 ? (
                      user?.studentDetails?.disciplines?.map((discipline) => (
                        <div className={classes.disciplineeBox}>
                          <div>
                            <div className={classes.skill}>
                              <div className={classes.domainHeading}>
                                <h5>{discipline?.domain}</h5>
                              </div>
                              <p>{discipline?.journey}</p>
                            </div>
                            <div className={classes.skillLevelTypes}>
                              {discipline?.martialArtType?.length > 0 && (
                                <p>
                                  <span className={classes.skillHeading}>
                                    Martial Art Type:
                                  </span>
                                  <span>
                                    {discipline?.martialArtType?.join?.(" | ")}
                                  </span>{" "}
                                </p>
                              )}
                              <p>
                                <span className={classes.skillHeading}>
                                  Knowledge Level:
                                </span>
                                <span>{discipline?.knowledgeLevel}</span>
                              </p>
                              <p>
                                <span className={classes.skillHeading}>
                                  Physical Skill Level:
                                </span>
                                <span>{discipline?.physicalSkillLevel}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoData text="No disciplines found" />
                    )}
                  </div>
                </div>
                <div className={classes.awardsContainer}>
                  <div className={classes.header}>
                    <h3>Accolades </h3>
                    <div className={classes.actions}></div>
                  </div>{" "}
                  <div className={classes.awardImages}>
                    <Row>
                      {user?.studentDetails?.accolades?.length > 0 ? (
                        user?.studentDetails?.accolades?.map((award) => (
                          <Col sm={6} md={4} lg={2} className={classes.award}>
                            <div className={classes.imageBox}>
                              <img src={imageUrl(award?.image)} alt="" />
                            </div>
                            <p>{award?.accoladeName}</p>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No accolades found" />
                      )}
                    </Row>
                  </div>
                </div>

                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>GYM </h3>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {user?.studentDetails?.affiliatedGyms?.length > 0 ? (
                        user?.studentDetails?.affiliatedGyms?.map((club) => (
                          <Col sm={6} className={classes.gym}>
                            <img src={imageUrl(club?.gym?.image)} alt="" />
                            <div className={classes.gymContent}>
                              <div className={classes.domainHeading}>
                                <p>{club?.gym?.name}</p>
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
                        <NoData text="No gyms found" />
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
                      {user?.studentDetails?.association?.length > 0 ? (
                        user?.studentDetails?.association?.map((club) => (
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
                        <NoData text="No associations found" />
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

export default StudentUserProfile;
