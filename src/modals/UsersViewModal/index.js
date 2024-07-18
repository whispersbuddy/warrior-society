import React from "react";
import ModalSkeleton from "../ModalSkeleton";
import ProfilePhoto from "../../Component/ProfilePhoto";
import classes from "./UsersViewModal.module.css";
import { useNavigate } from "react-router-dom";
import { calculateBirthdayMessage } from "../../config/HelperFunction";
const UsersViewModal = ({
  show,
  setShow,
  users,
  heading = "Tagged People",
  type,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={heading}
        width={"650px"}
      >
        <div className={classes.tagsContainer}>
          {users?.map((user, index) => (
            <div key={index} className={classes.tag}>
              <div className={classes.tagImage}>
                <ProfilePhoto
                  photo={user?.photo}
                  profilePhotoDimensions={user?.profilePhotoDimensions}
                  className={classes.profileImage}
                />
              </div>
              <div
                className={classes.tagContent}
                onClick={() => navigate(`/profile/${user?.slug}`)}
              >
                <p>
                  {user?.firstName} {user?.lastName}{" "}
                </p>
                {type === "birthday" && (
                  <p className={classes.date}>
                    {calculateBirthdayMessage(user?.DOB)}
                  </p>
                )}{" "}
              </div>
            </div>
          ))}
        </div>
      </ModalSkeleton>
    </>
  );
};

export default UsersViewModal;
