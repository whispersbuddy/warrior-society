import React from "react";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ShowProfileModal.module.css";
import CropImage from "../../Component/CropImage";
import ProfilePhoto from "../../Component/ProfilePhoto";
const ShowProfilePicModal = ({ show, setShow, user, flag }) => {
  let initialDimensions = {
    x: 0,
    y: 6.231578947368419,
    width: 100,
    height: 87.53684210526316,
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={flag == "cover" ? "Cover Image" : `Profile Picture`}
        width={flag == "cover" ? "1800px" : `500px`}
        modalClass={classes.modal_body}
        modal_width={"96%"}
      >
        {flag == "cover" ? (
          <div className={classes.coverContainer}>
            <div className={classes.coverImg}>
              <CropImage
                state={user?.bgPhoto}
                edit={false}
                coverPhotoDimensions={
                  user?.coverPhotoDimensions || initialDimensions
                }
                defaultImageSelected={user?.coverPhotoDimensions}
              />
            </div>
          </div>
        ) : (
          <div className={classes.modalContainer}>
            <div className={classes.profileInfo}>
              <div className={classes.profileDiv}>
                <ProfilePhoto
                  className={classes.speacial}
                  photo={user?.photo}
                  profilePhotoDimensions={user?.profilePhotoDimensions}
                />
              </div>
            </div>
          </div>
        )}
      </ModalSkeleton>
    </>
  );
};

export default ShowProfilePicModal;
