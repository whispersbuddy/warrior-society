import React from "react";
import { FaRegEye } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./UserCard.module.css";
const UserCard = ({ user, onFollow, isApiCall }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.userBox}>
      <div className={classes.userContent}>
        <div>
          <ProfilePhoto
            photo={user?.photo}
            profilePhotoDimensions={user?.profilePhotoDimensions}
            className={classes.profile}
          />
        </div>
        <div className={classes.header}>
          <h3>{user?.firstName + " " + user?.lastName}</h3>
        </div>
        {user?.address && (
          <div className={classes.location}>
            <p>
              <IoLocationOutline /> {user?.address}
            </p>
          </div>
        )}
      </div>
      <div className={classes.userOptions}>
        <div
          onClick={() => {
            navigate(`/profile/${user?.slug}`);
          }}
          className={classes.option}
          title="View Profile"
        >
          <FaRegEye size={20} />
          <p>View Profile</p>
        </div>
        <div
          style={isApiCall || user?.following ? { pointerEvents: "none" } : {}}
          onClick={onFollow}
          className={classes.option}
          title={
            user?.following
              ? "Following"
              : user?.requested
              ? "Cancel Follow Request"
              : "Follow User"
          }
        >
          <HiOutlineUserAdd size={20} />
          {user?.following ? (
            <p>Following</p>
          ) : user?.requested ? (
            <p>Cancel Request</p>
          ) : (
            <p>Follow</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
