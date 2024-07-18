import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import NoData from "../../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../../config/apiUrl";
import classes from "./TrainerUserProfile.module.css";
const TrainerUserProfile = () => {
  const { user: userData } = useSelector((state) => state?.authReducer);

  return (
    <div className={classes.profilePage}>
      <Container>
        <div className={classes.userProfile}>
          <Row>
            <Col lg={8}>
              <div className={classes.leftContainer}>
                <div className={classes.aboutContainer}>
                  <div className={classes.header}>
                    <h3>Experience and Training Ideology </h3>
                  </div>
                  <p>
                    {userData?.trainerDetails?.bio ? (
                      userData?.trainerDetails?.bio
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
                    {userData?.trainerDetails?.disciplines?.length > 0 ? (
                      userData?.trainerDetails?.disciplines?.map(
                        (discipline) => (
                          <div className={classes.disciplineeBox}>
                            <div>
                              <div className={classes.skill}>
                                <div className={classes.domainHeading}>
                                  <h5>{discipline?.domain}</h5>
                                </div>
                                <p>{discipline?.journey}</p>
                              </div>
                              <div className={classes.skillLevelTypes}>
                                {discipline?.martialArtType?.length && (
                                  <p>
                                    <span className={classes.skillHeading}>
                                      Martial Art Type:
                                    </span>
                                    <span>
                                      {discipline?.martialArtType?.join(" | ")}
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
                        )
                      )
                    ) : (
                      <NoData text="No disciplines found" />
                    )}
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>Professional Background </h3>
                  </div>
                  <div
                    className={[classes.types, classes.experiences].join(" ")}
                  >
                    {userData?.trainerDetails?.experiences?.length > 0 ? (
                      userData?.trainerDetails?.experiences?.map((ele) => {
                        return (
                          <div className={classes.experience}>
                            <div>
                              <div className={classes.topHeading}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.organization}</h5>
                                </div>
                                <p>{ele?.designation}</p>
                              </div>
                              <p className={classes.date}>
                                {moment(ele?.startDate).format("MM/DD/YYYY")} -{" "}
                                {ele?.stillWorking
                                  ? "Present"
                                  : moment(ele?.endDate).format("MM/DD/YYYY")}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoData text="No experiences found" />
                    )}
                  </div>
                </div>
                <div className={classes.awardsContainer}>
                  <div className={classes.header}>
                    <h3>Accolades </h3>
                  </div>{" "}
                  <div className={classes.awardImages}>
                    <Row>
                      {userData?.trainerDetails?.accolades?.length > 0 ? (
                        userData?.trainerDetails?.accolades?.map((award) => (
                          <Col xs={6} sm={4} lg={3} className={classes.award}>
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
                    <h3>Associations </h3>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.trainerDetails?.association?.length > 0 ? (
                        userData?.trainerDetails?.association?.map((club) => (
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
            {(userData?.trainerDetails?.availableForLesson ||
              userData?.trainerDetails?.availableForSparring) && (
              <Col lg={4}>
                <div className={classes.rightContainer}>
                  {userData?.trainerDetails?.availableForLesson && (
                    <div className={classes.chattingBox}>
                      <h3>Available For Private Lessons</h3>
                    </div>
                  )}
                  {userData?.trainerDetails?.availableForSparring && (
                    <div className={classes.chattingBox}>
                      <h3>Available For Sparring</h3>
                    </div>
                  )}
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default TrainerUserProfile;
