import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import PaginationComponent from "../../../../Component/PaginationComponent";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { BaseURL, recordsLimit } from "../../../../config/apiUrl";
import classes from "./FollowerDetails.module.css";
const FollowerDetails = () => {
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const [status, setStatus] = useState("followers");
  const [followData, setFollowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const getData = async (pgNo = page) => {
    const apiUrl = BaseURL(
      `profile/getFollowersAndFollowing?type=${status}&page=${pgNo}&limit=${recordsLimit}`
    );
    setIsLoading(true);
    const response = await Get(apiUrl, accessToken);
    if (response !== undefined) {
      setTotalCount(response?.data?.data?.totalCount);
      if (status === "followers") {
        setFollowData(response?.data?.data?.data);
      }
      if (status === "following") {
        setFollowData(response?.data?.data?.data);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "requested" || status === "userRequest") return;
    setPage(1);
    getData(1);
  }, [status]);

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
          {(status == "followers" || status == "following") && (
            <div className={classes.followersPage}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <div className={classes.followers}>
                    {followData?.length === 0 ? (
                      <NoData
                        text={`
                    You have no ${
                      status === "followers" ? "followers" : "following"
                    } yet.
                    
                    `}
                      />
                    ) : (
                      followData?.map((ele) => (
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

                          <div className={classes.btns}>
                            <Button
                              label={"View Profile"}
                              onClick={() => navigate(`/profile/${ele?.slug}`)}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
              {followData?.length > 0 && (
                <div className={classes.paginationDiv}>
                  <PaginationComponent
                    totalPages={Math.ceil(totalCount / recordsLimit)}
                    setCurrentPage={(e) => {
                      setPage(e);
                      getData(e);
                    }}
                    currentPage={page}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default FollowerDetails;
