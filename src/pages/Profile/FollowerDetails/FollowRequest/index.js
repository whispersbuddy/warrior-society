import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Get, Post } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { BaseURL, apiHeader } from "../../../../config/apiUrl";
import { updateUser } from "../../../../store/auth/authSlice";
import classes from "./FollowRequest.module.css";
const FollowRequest = () => {
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const getData = async () => {
    const apiUrl = BaseURL(`profile/getFollowrequest`);
    setIsLoading(true);
    const response = await Get(apiUrl, accessToken);
    if (response !== undefined) {
      setRequestData(response?.data?.data?.requests);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (item, val) => {
    const apiUrl = BaseURL(`profile/acceptFollowRequest`);
    setIsApiCall(true);
    const response = await Post(
      apiUrl,
      { userId: item?._id, accepted: val },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      toast.success(`Request ${val ? "Accepted" : "Rejected"} Successfully`);
      setRequestData(requestData?.filter((ele) => ele?._id !== item?._id));
      dispatch(updateUser(response?.data?.data));
    }
    setIsApiCall(false);
  };

  return (
    <div className={classes.followRequest}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {requestData?.length == 0 ? (
            <NoData
              text={`
            You don't have any follow request
            `}
            />
          ) : (
            requestData?.map((ele) => {
              return (
                <div className={classes.inner}>
                  <div className={classes.img__wrapper}>
                    <ProfilePhoto
                      photo={ele?.photo}
                      profilePhotoDimensions={ele?.profilePhotoDimensions}
                      className={classes.profileImg}
                    />
                    <p>
                      <span onClick={() => navigate(`/profile/${ele?.slug}`)}>
                        {ele?.firstName} {ele?.lastName}
                      </span>{" "}
                      has sent you a follow request
                    </p>
                  </div>
                  <div className={classes.btn__wrapper}>
                    <Button
                      disabled={isApiCall}
                      onClick={() => handleSubmit(ele, true)}
                      label={"Accept"}
                    />
                    <Button
                      disabled={isApiCall}
                      onClick={() => handleSubmit(ele, false)}
                      label={"Reject"}
                    />
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default FollowRequest;
