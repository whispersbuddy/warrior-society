import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import CropImage from "../CropImage";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./TrainerCard.module.css";
let initialDimensions = {
  x: 0,
  y: 6.231578947368419,
  width: 100,
  height: 87.53684210526316,
};
const TrainerCard = ({ user }) => {
  return (
    <div className={classes.trainerCard}>
      <div className={classes.trainerCard__inner}>
        <div className={classes.top_content}>
          <div className={classes.coverDiv}>
            <CropImage
              state={user?.bgPhoto}
              edit={false}
              coverPhotoDimensions={
                user?.coverPhotoDimensions || initialDimensions
              }
              defaultImageSelected={user?.coverPhotoDimensions}
            />
          </div>
          <div className={classes.avatar__main}>
            <ProfilePhoto
              photo={user?.photo}
              profilePhotoDimensions={user?.profilePhotoDimensions}
              className={classes.profile}
            />
            {/* <img src={imageUrl(user?.photo)} /> */}
          </div>
          <h6>
            {user?.firstName} {user?.lastName}
          </h6>
          {user?.address && (
            <p className={classes.location}>
              <IoLocationOutline color="var(--sidebar-text-color)" />
              {user?.address}
            </p>
          )}
        </div>

        <div className={classes.about__wrapper}>
          <p>About</p>
          {user?.bio ? (
            <p className={classes.textEllipsis}>{user?.bio}</p>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
