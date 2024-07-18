import React, { useEffect, useState } from "react";
import classes from "./FollowRequest.module.css";
import { Button } from "../../../../Component/Button/Button";
import { userAvatar } from "../../../../constant/imagePath";
import { Get, Post } from "../../../../Axios/AxiosFunctions";
import { useSelector } from "react-redux";
import { BaseURL, apiHeader, imageUrl } from "../../../../config/apiUrl";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import { toast } from "react-toastify";
import { updateUser } from "../../../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
const FollowRequest = () => {
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
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
                    />{' '}
                    <p>
                      <span>
                        {ele?.firstName} {ele?.lastName}
                      </span>{' '}
                      has sent you follow requested
                    </p>
                  </div>
                  <div className={classes.btn__wrapper}>
                    <Button
                      disabled={isApiCall}
                      onClick={() => handleSubmit(ele, true)}
                      label={'Confirm'}
                    />
                    <Button
                      disabled={isApiCall}
                      onClick={() => handleSubmit(ele, false)}
                      label={'Cancel'}
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
