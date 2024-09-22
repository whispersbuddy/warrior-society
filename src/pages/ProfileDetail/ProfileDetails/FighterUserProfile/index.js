import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Button } from "../../../../Component/Button/Button";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import { Input } from "../../../../Component/Input/Input";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { imageUrl } from "../../../../config/apiUrl";
import classes from "./FighterUserProfile.module.css";

const FighterUserProfile = ({
  profileData,
  isLoading,
  setCreateRoomModal,
  amount,
  setAmount,
  handleSponsorAmount,
  acceptedSponsorRequests,
}) => {
  const { user } = useSelector((state) => state.authReducer);
  const showAvailabilityBorder =
    profileData?.fighterDetails?.availableForFight ||
    profileData?.fighterDetails?.availableForSparring;
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
                  <h3>About Me</h3>
                </div>
                <p>
                  {profileData?.fighterDetails?.bio ? (
                    profileData?.fighterDetails?.bio
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
                  {profileData?.fighterDetails?.disciplines?.length > 0 ? (
                    profileData?.fighterDetails?.disciplines?.map(
                      (discipline) => {
                        return (
                          <div className={classes.disciplineeBox}>
                            <div>
                              <div className={classes.skill}>
                                <h5>{discipline?.domain}</h5>
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
                                  <span>{discipline?.physicalSkillLevel}</span>
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
                  <h3>Fighting Record</h3>
                </div>
                <div className={classes.content}>
                  <div className={classes.tableWrapper}>
                    {profileData?.fighterDetails?.fightingRecord?.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Discipline</th>
                            <th>Result</th>
                            <th>Venue</th>
                          </tr>
                        </thead>

                        <tbody>
                          {profileData?.fighterDetails?.fightingRecord?.map(
                            (e, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{e?.category}</td>
                                <td>{moment(e?.date)?.format("MM/DD/YYYY")}</td>
                                <td>{e?.discipline}</td>
                                <td>{e?.opponent}</td>
                                <td>{e?.result}</td>
                                <td>{e?.via}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <NoData text="No Fighting Record found" />
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.fightingContainer}>
                <div className={classes.header}>
                  <h3>Upcoming Fights</h3>
                </div>
                <div className={classes.content}>
                  <div className={classes.tableWrapper}>
                    {profileData?.fighterDetails?.upcomingFight?.length > 0 ? (
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
                          {profileData?.fighterDetails?.upcomingFight?.map(
                            (e, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{e?.time}</td>
                                <td>{moment(e?.date)?.format("MM/DD/YYYY")}</td>
                                <td>{e?.opponent}</td>
                                <td>{e?.venue}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <NoData text="No Upcoming Fights found" />
                    )}
                  </div>
                </div>
              </div>
              <div className={classes.awardsContainer}>
                <div className={classes.header}>
                  <h3>Accolades</h3>
                </div>{" "}
                <div className={classes.awardImages}>
                  <Row>
                    {profileData?.fighterDetails?.accolades?.length > 0 ? (
                      profileData?.fighterDetails?.accolades?.map((award) => (
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

              <div className={classes.gymsContainer}>
                <div className={classes.header}>
                  <h3>Affiliated Gyms</h3>
                </div>{" "}
                <div className={classes.gymContent}>
                  <Row>
                    {profileData?.fighterDetails?.affiliatedGyms?.length > 0 ? (
                      profileData?.fighterDetails?.affiliatedGyms?.map(
                        (club) => (
                          <Col sm={6} className={classes.gym}>
                            <img src={imageUrl(club?.gym?.image)} alt="" />
                            <div className={classes.gymContent}>
                              <p>{club?.gym?.name}</p>
                              <span>
                                {moment(club?.startDate).format("MM/DD/YYYY")}
                                {club?.endDate &&
                                  ` - ${moment(club?.endDate).format(
                                    "MM/DD/YYYY"
                                  )}`}
                              </span>
                              <span>Grade: {club?.grade}</span>
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
                  <h3>Associations</h3>
                </div>{" "}
                <div className={classes.gymContent}>
                  <Row>
                    {profileData?.fighterDetails?.association?.length > 0 ? (
                      profileData?.fighterDetails?.association?.map((club) => (
                        <Col sm={6} className={classes.gym}>
                          <div className={classes.gymImage}>
                            <img
                              src={imageUrl(club?.association?.image)}
                              alt=""
                            />
                          </div>
                          <div className={classes.gymContent}>
                            <p>{club?.association?.associationName}</p>
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
            <div
              className={[
                classes.availability_container,
                showAvailabilityBorder && classes.border_container,
              ].join(" ")}
            >
              {profileData?.fighterDetails?.availableForFight && (
                <div className={classes.chattingBox}>
                  <h3>Available at 155 LBS for MMA</h3>
                </div>
              )}
              {profileData?.fighterDetails?.availableForSparring && (
                <div className={classes.chattingBox}>
                  <h3>Available as a Sparring Partner</h3>
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
              {user?.logo ? (
                <>
                  <Input
                    customClass="mt-4"
                    value={amount}
                    setter={setAmount}
                    placeholder={"Amount"}
                    type="number"
                  />
                  <Button
                    onClick={handleSponsorAmount}
                    label="Sponsor"
                    className="mt-2 w-100"
                  />
                </>
              ) : null}
              {acceptedSponsorRequests?.length ? (
                <div className={classes.sponsorRequests}>
                  <h3 className="mt-4">Sponsors</h3>
                  <div className="mt-2">
                    {acceptedSponsorRequests?.map((sponsor, ind) => {
                      let sponsorshipLevel = "";
                      let sponsorshipClass = "";

                      if (ind === 0) {
                        sponsorshipLevel = "Gold";
                        sponsorshipClass = classes.gold;
                      } else if (ind === 1) {
                        sponsorshipLevel = "Silver";
                        sponsorshipClass = classes.silver;
                      } else if (ind === 2) {
                        sponsorshipLevel = "Bronze";
                        sponsorshipClass = classes.bronze;
                      }

                      return (
                        <div
                          key={sponsor?._id}
                          className={`card p-4 d-flex align-items-center mt-2`}
                        >
                          <div className={classes.sponsorRequests__header}>
                            <ProfilePhoto
                              photo={sponsor?.sender?.logo}
                              profilePhotoDimensions={
                                sponsor?.sender?.logoDimensions
                              }
                              className={classes.profileImg}
                            />
                          </div>

                          {/* {sponsorshipLevel && (
                            <p className={sponsorshipClass}>
                              {sponsorshipLevel}
                            </p>
                          )} */}

                          <h5 className="mt-1">
                            {sponsor?.sender?.firstName}{" "}
                            {sponsor?.sender?.lastName}
                          </h5>
                          <div className={classes.sponsorRequests__amount}>
                            <h6>${sponsor?.amount}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FighterUserProfile;
