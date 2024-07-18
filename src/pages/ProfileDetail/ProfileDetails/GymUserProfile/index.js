import React from "react";
import { Col, Row } from "react-bootstrap";
import NoData from "../../../../Component/NoData/NoData";
import { imageUrl } from "../../../../config/apiUrl";
import classes from "./GymUserProfile.module.css";
import moment from "moment";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { useNavigate } from "react-router-dom";
const GymUserProfile = ({ profileData, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.userProfile}>
      <Row>
        <Col lg={12}>
          <div className={classes.leftContainer}>
            <Row className={classes.topDiv}>
              <Col lg={8}>
                <div className={classes.aboutContainer}>
                  <div className={classes.header}>
                    <h3>About Gym</h3>
                  </div>
                  <p>
                    {profileData?.schoolDetails?.bio ? (
                      profileData?.schoolDetails?.bio
                    ) : (
                      <NoData text="No bio found" />
                    )}
                  </p>
                </div>
              </Col>
              <Col lg={4}>
                <div className={classes.ownersContainer}>
                  <div className={classes.header}>
                    <h3>Owners</h3>
                  </div>
                  <div className={classes.owners}>
                    {profileData?.schoolDetails?.owners?.length > 0 ? (
                      profileData?.schoolDetails?.owners?.map((owner) => (
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
                            <p>
                              {owner?.firstName} {owner?.lastName}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoData text="No Owners found" />
                    )}
                  </div>
                </div>
              </Col>

              <Col lg={12}>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>Discipline(s)</h3>
                  </div>
                  <div className={classes.types}>
                    {profileData?.schoolDetails?.disciplines?.length > 0 ? (
                      profileData?.schoolDetails?.disciplines?.map((ele) => {
                        return (
                          <div className={classes.skill}>
                            <h5>{ele?.title}</h5>
                            <p>{ele?.disciplineDiscription}</p>
                          </div>
                        );
                      })
                    ) : (
                      <NoData text="No Discipline found" />
                    )}
                  </div>
                </div>
              </Col>

              <Col lg={12}>
                <div className={classes.rightContainer}>
                  <div className={classes.dues}>
                    <div className={classes.header}>
                      <h5>Dues Information</h5>
                    </div>
                    {profileData?.schoolDetails?.duesInformation
                      ?.monthlyDueMin ? (
                      <>
                        <div className={classes.fee}>
                          <p>Monthly dues</p>
                          <span>
                            $
                            {
                              profileData?.schoolDetails?.duesInformation
                                ?.monthlyDueMin
                            }{" "}
                            - $
                            {
                              profileData?.schoolDetails?.duesInformation
                                ?.monthlyDueMax
                            }
                          </span>
                        </div>
                        <div className={classes.fee}>
                          <p>Private Lessons</p>
                          <span>
                            $
                            {
                              profileData?.schoolDetails?.duesInformation
                                ?.privateMinFees
                            }{" "}
                            - $
                            {
                              profileData?.schoolDetails?.duesInformation
                                ?.privateMaxFees
                            }
                          </span>
                        </div>{" "}
                        <div className={classes.fee}>
                          <p>Drop ins</p>
                          <span>
                            $
                            {
                              profileData?.schoolDetails?.duesInformation
                                ?.dropin
                            }
                          </span>
                        </div>
                        <div className={classes.specials}>
                          <h5>Specials</h5>
                          <p>{profileData?.schoolDetails?.special}</p>
                        </div>
                        <div className={classes.specials}>
                          <h5>Additional Information</h5>
                          <p>
                            {profileData?.schoolDetails?.additionInformation}
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
                    <h3>Amenities</h3>
                  </div>
                  <div className={classes.types}>
                    {profileData?.schoolDetails?.equipments?.length > 0 ? (
                      profileData?.schoolDetails?.equipments?.map((ele) => {
                        return (
                          <div className={classes.skill}>
                            <h5>{ele?.equipmentName}</h5>
                            <p>{ele?.description}</p>
                          </div>
                        );
                      })
                    ) : (
                      <NoData text="No Amenities found" />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Col lg={12}>
              <div className={classes.awardsContainer}>
                <div className={classes.header}>
                  <h3>Accolades</h3>
                  <div className={classes.actions}></div>
                </div>{" "}
                <div className={classes.awardImages}>
                  <Row>
                    {profileData?.schoolDetails?.accolades?.length > 0 ? (
                      profileData?.schoolDetails?.accolades?.map((award) => (
                        <Col xs={6} sm={4} lg={3} className={classes.award}>
                          <div className={classes.imageBox}>
                            <img src={imageUrl(award?.image)} alt="" />
                          </div>
                          <p>{award?.accoladeName}</p>
                        </Col>
                      ))
                    ) : (
                      <NoData text="No Accolades found" />
                    )}
                  </Row>
                </div>
              </div>
            </Col>
            <div className={classes.instructorContainer}>
              <div className={classes.header}>
                <h3>Associated Instructors</h3>
              </div>{" "}
              <div className={classes.gymContent}>
                <Row>
                  {profileData?.schoolDetails?.instructors?.length > 0 ? (
                    profileData?.schoolDetails?.instructors?.map(
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
                    <NoData text="No Instructors found" />
                  )}
                </Row>
              </div>
            </div>
            <div className={classes.studentsContainer}>
              <div className={classes.header}>
                <h3>Students</h3>
              </div>{" "}
              <div className={classes.gymContent}>
                <Row>
                  {profileData?.schoolDetails?.students?.length > 0 ? (
                    profileData?.schoolDetails?.students?.map((instructor) => (
                      <Col xs={6} md={4} lg={3} xl={2} className={classes.gym}>
                        <img src={imageUrl(instructor?.photo)} alt="" />
                        <div className={classes.gymContent}>
                          <p>
                            {instructor?.firstName} {instructor?.lastName}
                          </p>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <NoData text="No Students found" />
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
                  {profileData?.schoolDetails?.association?.length > 0 ? (
                    profileData?.schoolDetails?.association?.map((club) => (
                      <Col xs={6} md={4} lg={3} xl={2} className={classes.gym}>
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
                    <NoData text="No Associations found" />
                  )}
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GymUserProfile;
