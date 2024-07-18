import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../../../Component/Button/Button";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../config/apiUrl";
import classes from "./TrainerUserProfile.module.css";
const TrainerUserProfile = ({ profileData, isLoading, setCreateRoomModal }) => {
  return (
    <div className={classes.userProfile}>
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          <Col lg={8}>
            <div className={classes.leftContainer}>
              <div className={classes.aboutContainer}>
                <div className={classes.header}>
                  <h3>Experience and Training Ideology</h3>
                </div>
                <p>
                  {profileData?.trainerDetails?.bio ? (
                    profileData?.trainerDetails?.bio
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
                  {profileData?.trainerDetails?.disciplines?.length > 0 ? (
                    profileData?.trainerDetails?.disciplines?.map(
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
                  <h3>Professional Background</h3>
                </div>
                <div className={[classes.types, classes.experiences].join(" ")}>
                  {profileData?.trainerDetails?.experiences?.length == 0 ? (
                    <NoData />
                  ) : (
                    profileData?.trainerDetails?.experiences?.map((ele) => {
                      return (
                        <div className={classes.experience}>
                          <div>
                            <div className={classes.topHeading}>
                              <h5>{ele?.organization}</h5>
                              <p>{ele?.designation}</p>
                            </div>
                            <p className={classes.date}>
                              {moment(ele?.startDate).format("MM/DD/YYYY")} -{" "}
                              {moment(ele?.endDate).format("MM/DD/YYYY")}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div className={classes.awardsContainer}>
                <div className={classes.header}>
                  <h3>Accolades</h3>
                </div>{" "}
                <div className={classes.awardImages}>
                  <Row>
                    {profileData?.trainerDetails?.accolades?.length > 0 ? (
                      profileData?.trainerDetails?.accolades?.map((award) => (
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
              {/* <div className={classes.fightingContainer}>
                <div className={classes.header}>
                  <h3>Skills</h3>
                </div>
                <div className={classes.types}>
                  {profileData?.trainerDetails?.skills?.length == 0 ? (
                    <NoData text="No Skills Found" />
                  ) : (
                    profileData?.trainerDetails?.skills?.map((ele) => (
                      <div className={classes.skill}>
                        <h5>{ele?.label}</h5>
                        <p>{ele?.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div> */}
              <div className={classes.gymsContainer}>
                <div className={classes.header}>
                  <h3>Affiliated Gyms</h3>
                  <div className={classes.actions}></div>
                </div>{" "}
                <div className={classes.gymContent}>
                  <Row>
                    {profileData?.trainerDetails?.affiliatedGyms?.length > 0 ? (
                      profileData?.trainerDetails?.affiliatedGyms?.map(
                        (club) => (
                          <Col sm={6} className={classes.gym}>
                            <img src={imageUrl(club?.gym?.image)} alt="" />
                            <div className={classes.gymContent}>
                              <p>{club?.gym?.name}</p>
                              <span>{`${moment(club?.startDate).format(
                                "MM/DD/YYYY"
                              )} - ${moment(club?.endDate).format(
                                "MM/DD/YYYY"
                              )}`}</span>
                              <span>Grade: {club?.grade}</span>
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
                    {profileData?.trainerDetails?.association?.length > 0 ? (
                      profileData?.trainerDetails?.association?.map((club) => (
                        <Col sm={6} className={classes.gym}>
                          <div className={classes.gymImage}>
                            <img
                              src={imageUrl(club?.association?.image)}
                              alt=""
                            />
                          </div>
                          <div className={classes.gymContent}>
                            <p>{club?.association?.associationName}</p>
                            <span>{`${moment(club?.startDate).format(
                              "MM/DD/YYYY"
                            )} - ${moment(club?.endDate).format(
                              "MM/DD/YYYY"
                            )}`}</span>
                            <span>Grade: {club?.grade}</span>
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

          <Col lg={4}>
            <div className={classes.rightContainer}>
              {profileData?.trainerDetails?.availableForLesson && (
                <div className={classes.chattingBox}>
                  <h3>Available For Private Lessons</h3>
                </div>
              )}
              {profileData?.trainerDetails?.availableForSparring && (
                <div className={classes.chattingBox}>
                  <h3>Available For Sparring</h3>
                </div>
              )}
              <Button
                onClick={() => setCreateRoomModal(true)}
                label={"Chat Now"}
                customStyle={{
                  fontFamily: "var(--ff-primary-semiBold)",
                  width: "100%",
                }}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TrainerUserProfile;
