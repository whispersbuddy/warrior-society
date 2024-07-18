import React, { useState } from "react";
import { Loader } from "../../../Component/Loader";
import NoData from "../../../Component/NoData/NoData";
import { imageUrl } from "../../../config/apiUrl";
import classes from "./FollowerDetails.module.css";
import ProfilePhoto from "../../../Component/ProfilePhoto";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const FollowerDetails = ({ profileData, isLoading }) => {
  const [status, setStatus] = useState("followers");
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div className={classes.followerContainer}>
          <div className={classes.tabs}>
            <div
              className={`${classes.tab} ${
                status == "followers" ? classes.active : ""
              }`}
              onClick={() => setStatus("followers")}
            >
              <h6>Followers</h6>
            </div>
            <div
              className={`${classes.tab} ${
                status == "following" ? classes.active : ""
              }`}
              onClick={() => setStatus("following")}
            >
              <h6>Following</h6>
            </div>
          </div>
          {status == "followers" || status == "following" ? (
            <div className={classes.followersPage}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className={classes.followers}>
                    {profileData[status]?.length > 0 ? (
                      profileData[status]?.map((ele) => (
                        <div className={classes.follower} key={ele?._id}>
                          <div
                            className={classes.profile}
                            onClick={() => navigate(`/profile/${ele?.slug}`)}
                          >
                            <ProfilePhoto
                              photo={ele?.photo}
                              profilePhotoDimensions={
                                ele?.profilePhotoDimensions
                              }
                              className={classes.profileImg}
                            />
                            <div className={classes.profileContent}>
                              <h6>
                                {ele?.firstName} {ele?.lastName}
                              </h6>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoData
                        text={`
                    You have no ${
                      status === "followers" ? "followers" : "following"
                    } yet.
                    
                    `}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
};

export default FollowerDetails;
