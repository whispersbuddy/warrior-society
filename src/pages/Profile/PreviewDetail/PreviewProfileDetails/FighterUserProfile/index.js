import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import NoData from "../../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../../config/apiUrl";
import classes from "./FighterUserProfile.module.css";

const FighterUserProfile = ({ user }) => {
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
                    <h3>About Me </h3>
                  </div>
                  <p>
                    {userData?.fighterDetails?.bio ? (
                      userData?.fighterDetails?.bio
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
                    {userData?.fighterDetails?.disciplines?.length > 0 ? (
                      userData?.fighterDetails?.disciplines?.map(
                        (discipline) => {
                          return (
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
                                        {discipline?.martialArtType?.join(
                                          " | "
                                        )}
                                      </span>
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
                                    <span>
                                      {discipline?.physicalSkillLevel}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <NoData text="No Discipline found" />
                    )}
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>Fighting Record </h3>
                  </div>
                  <div className={classes.content}>
                    <div className={classes.gridWrapper}>
                      {user?.fighterStats?.map((e, i) => (
                        <p key={i}>
                          {e?.type}
                          <span>{e?.value}</span>
                        </p>
                      ))}
                    </div>
                    <div className={classes.tableWrapper}>
                      {userData?.fighterDetails?.fightingRecord?.length > 0 ? (
                        <>
                          {userData?.fighterDetails?.fightingRecord?.length >
                            4 && <p className={classes.viewMore}>view all</p>}
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Discipline</th>
                                <th>Opponent</th>
                                <th>Result</th>
                                <th>Via</th>
                              </tr>
                            </thead>

                            <tbody>
                              {userData?.fighterDetails?.fightingRecord?.map(
                                (e, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{e?.category}</td>
                                    <td>
                                      {moment(e?.date)?.format("MM/DD/YYYY")}
                                    </td>
                                    <td>{e?.discipline}</td>
                                    <td>{e?.opponent}</td>
                                    <td>{e?.result}</td>
                                    <td>{e?.via}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <NoData text="No Fighting Record found" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>Upcoming Fights </h3>
                  </div>
                  <div className={classes.content}>
                    <div className={classes.tableWrapper}>
                      {userData?.fighterDetails?.upcomingFight?.length > 0 ? (
                        <>
                          {userData?.fighterDetails?.upcomingFight?.length >
                            4 && (
                            <p className={classes.viewMore}>view all</p>
                          )}{" "}
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Opponent</th>
                                <th>Venue</th>
                              </tr>
                            </thead>

                            <tbody>
                              {userData?.fighterDetails?.upcomingFight?.map(
                                (e, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{e?.time}</td>
                                    <td>
                                      {moment(e?.date)?.format("MM/DD/YYYY")}
                                    </td>
                                    <td>{e?.opponent}</td>
                                    <td>{e?.venue}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <NoData text="No Upcoming Fights found" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.awardsContainer}>
                  <div className={classes.header}>
                    <h3>Accolades </h3>
                  </div>{" "}
                  <div className={classes.awardImages}>
                    <Row>
                      {userData?.fighterDetails?.accolades?.length > 0 ? (
                        userData?.fighterDetails?.accolades?.map((award) => (
                          <Col xs={6} sm={4} lg={3} className={classes.award}>
                            <div className={classes.imageBox}>
                              <img src={imageUrl(award?.image)} alt="" />
                            </div>
                            <div className={classes.domainHeading}>
                              <p>{award?.accoladeName}</p>
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No Accolades found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>Affiliated Gyms </h3>
                    <div className={classes.actions}>
                      {/* <span className={classes.editBtn}>
                    <LuEdit />
                  </span> */}
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.fighterDetails?.affiliatedGyms?.length > 0 ? (
                        userData?.fighterDetails?.affiliatedGyms?.map(
                          (club) => (
                            <Col sm={6} className={classes.gym}>
                              <img src={imageUrl(club?.gym?.image)} alt="" />
                              <div className={classes.gymContent}>
                                <div className={classes.domainHeading}>
                                  <p>{club?.gym?.name}</p>
                                </div>
                                {club?.startDate && (
                                  <span>
                                    {moment(club?.startDate).format(
                                      "MM/DD/YYYY"
                                    )}
                                    {club?.endDate &&
                                      ` - ${moment(club?.endDate).format(
                                        "MM/DD/YYYY"
                                      )}`}
                                  </span>
                                )}
                                {club?.grade && (
                                  <span>Grade: {club?.grade}</span>
                                )}
                              </div>
                            </Col>
                          )
                        )
                      ) : (
                        <NoData text="No Affiliated Gyms found" />
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
                      {userData?.fighterDetails?.association?.length > 0 ? (
                        userData?.fighterDetails?.association?.map((club) => (
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
                        <NoData text="No Associations found" />
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              {userData?.fighterDetails?.availableForFight &&
                userData?.fighterDetails?.availableForSparring && (
                  <div className={classes.rightContainer}>
                    {userData?.fighterDetails?.availableForFight && (
                      <div className={classes.chattingBox}>
                        <h3>Available at 155 LBS for MMA</h3>
                      </div>
                    )}
                    {userData?.fighterDetails?.availableForSparring && (
                      <div className={classes.chattingBox}>
                        <h3>Available as a Sparring Partner</h3>
                      </div>
                    )}
                  </div>
                )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default FighterUserProfile;
