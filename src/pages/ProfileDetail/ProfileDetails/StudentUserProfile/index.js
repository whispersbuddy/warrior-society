import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../config/apiUrl";
import classes from "./StudentUserProfile.module.css";
const StudentUserProfile = ({ profileData, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.userProfile}>
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col lg={12}>
            <div className={classes.leftContainer}>
              <div className={classes.aboutContainer}>
                <div className={classes.header}>
                  <h3>About Me</h3>
                </div>
                <p>
                  {profileData?.studentDetails?.bio ? (
                    profileData?.studentDetails?.bio
                  ) : (
                    <NoData text="No bio found" />
                  )}
                </p>
              </div>
              <div className={classes.fightingContainer}>
                <div className={classes.header}>
                  <h3>Discipline(s)</h3>
                </div>
                <div className={classes.types}>
                  {profileData?.studentDetails?.disciplines?.length > 0 ? (
                    profileData?.studentDetails?.disciplines?.map(
                      (discipline) => (
                        <div className={classes.disciplineeBox}>
                          <div>
                            <div className={classes.skill}>
                              <h5>{discipline?.domain}</h5>
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
                      )
                    )
                  ) : (
                    <NoData text="No disciplines found" />
                  )}
                </div>
              </div>
              <div className={classes.awardsContainer}>
                <div className={classes.header}>
                  <h3>Accolades</h3>
                </div>{" "}
                <div className={classes.awardImages}>
                  <Row>
                    {profileData?.studentDetails?.accolades?.length > 0 ? (
                      profileData?.studentDetails?.accolades?.map((award) => (
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
                  <h3>GYM</h3>
                </div>{" "}
                <div className={classes.gymContent}>
                  <Row>
                    {profileData?.studentDetails?.affiliatedGyms?.length > 0 ? (
                      profileData?.studentDetails?.affiliatedGyms?.map(
                        (club) => (
                          <Col sm={6} className={classes.gym}>
                            <img src={imageUrl(club?.gym?.image)} alt="" />
                            <div className={classes.gymContent}>
                              <p>{club?.gym?.name}</p>
                              {club?.startDate && club?.startDate && (
                                <span>{`${moment(club?.startDate).format(
                                  "MM/DD/YYYY"
                                )} 
                              - ${moment(club?.endDate).format(
                                "MM/DD/YYYY"
                              )}`}</span>
                              )}
                              {club?.grade && <span>Grade: {club?.grade}</span>}
                            </div>
                          </Col>
                        )
                      )
                    ) : (
                      <NoData text="No gyms found" />
                    )}
                  </Row>
                </div>
              </div>
              <div className={classes.gymsContainer}>
                <div className={classes.header}>
                  <h3>Associations</h3>
                </div>{" "}
                <div className={classes.gymContent}>
                  <Row>
                    {profileData?.studentDetails?.association?.length > 0 ? (
                      profileData?.studentDetails?.association?.map((club) => (
                        <Col sm={6} className={classes.gym}>
                          <div className={classes.gymImage}>
                            <img
                              src={imageUrl(club?.association?.image)}
                              alt=""
                            />
                          </div>
                          <div className={classes.gymContent}>
                            <p>{club?.association?.associationName}</p>
                            {club?.startDate && club?.startDate && (
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
      )}
    </div>
  );
};

export default StudentUserProfile;
