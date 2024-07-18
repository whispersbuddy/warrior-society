import React from "react";
import { useNavigate } from "react-router-dom";
import { displayDate } from "../../config/HelperFunction";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./NotificationCard.module.css";
const routes = {
  post: `/post/`,
  followRequest: "/profile/",
  chat: "/messaging",
};
const notificationRoutes = (flag, item) => {
  if (flag === "post") {
    return routes[flag] + `${item?.payload?.post}`;
  } else if (flag === "followRequest") {
    return routes[flag] + `${item?.sender?.slug}`;
  } else {
    return routes[flag];
  }
};
const NotificationCard = ({ data, isComment = false, onClick }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={classes.notificationCard}
        onClick={() => {
          if (data?.seen == false) {
            onClick(data?._id);
          }
          navigate(notificationRoutes(data?.flag, data));
        }}
      >
        <div className={classes.notifyContant}>
          <div>
            <ProfilePhoto
              photo={data?.sender?.photo}
              profilePhotoDimensions={data?.sender?.profilePhotoDimensions}
              className={classes.imageMain}
            />
          </div>

          <div className={classes.content}>
            <h5>
              <span>{data?.sender?.firstName}</span> {data?.message}
            </h5>
            <p className={classes.description}>{data?.description}</p>
            <p>{displayDate(data?.createdAt)}</p>
          </div>
        </div>
        <div
          className={classes.status}
          style={{
            backgroundColor: data?.seen ? "#1dbc1d" : "#af1a27",
          }}
          title={data?.seen ? "Seen" : "Unseen"}
        ></div>
      </div>
    </>
  );
};

export default NotificationCard;
