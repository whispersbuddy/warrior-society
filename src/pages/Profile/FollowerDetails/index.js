import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get, Patch, Post } from "../../../Axios/AxiosFunctions";
import { Button } from "../../../Component/Button/Button";
import { Loader } from "../../../Component/Loader";
import NoData from "../../../Component/NoData/NoData";
import PaginationComponent from "../../../Component/PaginationComponent";
import ProfilePhoto from "../../../Component/ProfilePhoto";
import { BaseURL, apiHeader, recordsLimit } from "../../../config/apiUrl";
import { updateUser } from "../../../store/auth/authSlice";
import FollowRequest from "./FollowRequest";
import classes from "./FollowerDetails.module.css";
import Request from "./Request";
const FollowerDetails = () => {
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("followers");
  const [followData, setFollowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isUnfollow, setIsUnfollow] = useState(false);
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
    setPage(1);
    getData(1);
  }, [status]);

  const handleFollow = async (item) => {
    const apiUrl = BaseURL(`profile/followUser`);
    setIsApiCall(true);
    const response = await Post(
      apiUrl,
      { followerID: item?._id, requested: !item?.requested },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      setFollowData(
        followData?.map((ele) =>
          ele?._id === item?._id ? response?.data?.data : ele
        )
      );
    }
    setIsApiCall(false);
  };

  const handleUnfollow = async (id, type) => {
    const apiUrl = BaseURL("profile/remove");
    setIsUnfollow(true);
    const response = await Patch(
      apiUrl,
      { userId: id, type: type },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      setFollowData(followData?.filter((ele) => ele?._id !== id));
      dispatch(updateUser(response?.data?.data));
    }
    setIsUnfollow(false);
  };

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
            <div
              className={`${classes.tab} ${
                status == "requested" ? classes.active : ""
              }`}
              onClick={() => setStatus("requested")}
            >
              <h6>Follow Requests</h6>
            </div>
            <div
              className={`${classes.tab} ${
                status == "userRequest" ? classes.active : ""
              }`}
              onClick={() => setStatus("userRequest")}
            >
              <h6>School Requests</h6>
            </div>
          </div>
          {status == "followers" || status == "following" ? (
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
                          <div className={classes.profile} onClick={()=>navigate(`/profile/${ele?.slug}`)} >
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
                          {status === "followers" ? (
                            <div className={classes.btns}>
                              <Button
                                disabled={isUnfollow}
                                onClick={() =>
                                  handleUnfollow(ele?._id, "follower")
                                }
                                label={"Remove Follower"}
                                customStyle={{
                                  backgroundColor: "var(--white-color)",
                                  color: "var(--primary-color)",
                                  border: "1px solid var(--primary-color)",
                                }}
                              />
                              {!ele?.followBack && (
                                <Button
                                  disabled={isApiCall}
                                  onClick={() => handleFollow(ele)}
                                  label={
                                    ele?.requested
                                      ? "Cancel Request"
                                      : "Follow Back"
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <div className={classes.btns}>
                              <Button
                                disabled={isUnfollow}
                                onClick={() =>
                                  handleUnfollow(ele?._id, "following")
                                }
                                label={"Unfollow"}
                                customStyle={{
                                  backgroundColor: "var(--white-color)",
                                  color: "var(--primary-color)",
                                  border: "1px solid var(--primary-color)",
                                }}
                              />
                            </div>
                          )}
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
          ) : status == "requested" ? (
            <FollowRequest />
          ) : (
            <Request />
          )}
        </div>
      </Container>
    </>
  );
};

export default FollowerDetails;
