import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Get, Patch } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import { DropDown } from "../../../../Component/DropDown/DropDown";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { BaseURL, apiHeader } from "../../../../config/apiUrl";
import classes from "./Request.module.css";

const filterOption = [
  { label: "Owner", value: "owner" },
  { label: "Instructor", value: "instructor" },
  { label: "Student", value: "student" },
];
const Request = () => {
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [filter, setFilter] = useState(filterOption[0]);
  const getData = async (flt) => {
    const apiUrl = BaseURL(`profile/getRequest?type=${flt}`);
    setIsLoading(true);
    const response = await Get(apiUrl, accessToken);
    if (response !== undefined) {
      setRequestData(response?.data?.data?.request);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData(filter?.value);
  }, [filter]);

  const handleSubmit = async (item, val) => {
    const apiUrl = BaseURL(`profile/acceptRequest`);
    setIsApiCall(true);
    const response = await Patch(
      apiUrl,
      { userId: item?._id, accepted: val, type: filter?.value },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      toast.success(`Request ${val ? "Accepted" : "Rejected"} Successfully`);
      setRequestData(requestData?.filter((ele) => ele?._id !== item?._id));
    }
    setIsApiCall(false);
  };

  return (
    <div className={classes.followRequest}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.drop__down}>
            <DropDown
              customStyle={{ width: "200px" }}
              setter={(e) => {
                setFilter(e);
                getData(e?.value);
              }}
              value={filter}
              options={filterOption}
              placeholder={"Filter"}
            />
          </div>
          {requestData?.length == 0 ? (
            <NoData
              text={`
            You don't have any user request
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

export default Request;
