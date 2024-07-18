import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get, Patch } from "../../Axios/AxiosFunctions";
import { getTimeStamp } from "../../config/HelperFunction";
import { BaseURL, apiHeader } from "../../config/apiUrl";
import { saveNewNotification } from "../../store/common/commonSlice";
import { Loader } from "../Loader";
import NoData from "../NoData/NoData";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./HeaderNotification.module.css";
const routes = {
  post: `/post/`,
  followRequest: "/profile/",
  chat: "/messaging",
  tags: "/post/",
};
const notificationRoutes = (flag, item) => {
  if (flag === "post") {
    return routes[flag] + `${item?.payload?.post}`;
  } else if (flag === "tags") {
    return routes[flag] + `${item?.payload?.post}`;
  } else if (flag === "followRequest") {
    return routes[flag] + `${item?.sender?.slug}`;
  } else {
    return routes[flag];
  }
};
const Notifications = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token: accessToken } = useSelector(
    (state) => state?.authReducer
  );
  const updateAllNotificationAsSeen = async (notifyId) => {
    const url = BaseURL(`notifications/${notifyId}`);
    let response = await Patch(url, {}, apiHeader(accessToken));
    if (response !== undefined) {
      dispatch(saveNewNotification([]));
    }
  };
  return (
    <div
      className={[classes.HeaderNotificationInnerDiv]}
      onClick={() => {
        if (data?.seen == false) {
          updateAllNotificationAsSeen(data?._id);
        }
        navigate(notificationRoutes(data?.flag, data));
      }}
    >
      <div>
        <ProfilePhoto
          photo={data?.sender?.photo}
          profilePhotoDimensions={data?.sender?.profilePhotoDimensions}
          className={classes.ImgDiv}
        />
      </div>
      <div className={[classes.contentDiv]}>
        <div className={[classes.titleDiv]}>
          <h6>{data?.sender?.firstName}</h6>
          <p>{getTimeStamp(data?.createdAt)}</p>
        </div>
        <p>{data?.message}</p>
      </div>
    </div>
  );
};

const HeaderNotification = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state?.authReducer?.access_token);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const url = BaseURL(`notifications`);
    setLoading(true);
    let response = await Get(url, accessToken);
    if (response !== undefined) {
      setNotifications(response?.data?.data?.notifications);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={[classes.HeaderNotification]}>
      <div className={[classes.notificationHeader]}>
        <h4>Notifications</h4>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {notifications?.length > 0 ? (
            notifications?.slice(0, 3)?.map((item, i) => {
              return (
                <div className={[classes.mb16]} key={i}>
                  <Notifications data={item} />
                </div>
              );
            })
          ) : (
            <NoData text="No notifications" />
          )}
        </>
      )}
      <p
        className={["reg", classes.viewAll].join(" ")}
        onClick={() => navigate("/notifications")}
      >
        See all
      </p>
    </div>
  );
};
export default HeaderNotification;
