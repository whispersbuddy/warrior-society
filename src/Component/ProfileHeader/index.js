import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  FaEdit,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaShare,
  FaTwitter,
} from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Patch, Post } from "../../Axios/AxiosFunctions";
import {
  BaseURL,
  CreateFormData,
  apiHeader,
  imageUrl,
} from "../../config/apiUrl";
import AreYouSureModal from "../../modals/AreYouSureModal";
import EditCoverModal from "../../modals/EditCoverModal";
import LightBoxModal from "../../modals/LightBoxModal";
import ShareModal from "../../modals/ShareModal";
import { updateUser } from "../../store/auth/authSlice";
import { Button } from "../Button/Button";
import CropImage from "../CropImage";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./ProfileHeader.module.css";

let initialDimensions = {
  x: 0,
  y: 6.231578947368419,
  width: 100,
  height: 87.53684210526316,
};
const profileInitialDimensions = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};
const coverAspectRatio = "1 / 0.231";
const profileAspectRatio = "1 / 1";

export const handleNewUpload = (photo, user, dimensions, type) => {
  if (typeof photo === "object" && photo) {
    return true;
  }
  if (type === "profile") {
    if (
      JSON.stringify(profileInitialDimensions) === JSON.stringify(dimensions)
    ) {
      return false;
    }
    return (
      JSON.stringify(user?.profilePhotoDimensions) !==
      JSON.stringify(dimensions)
    );
  } else {
    if (JSON.stringify(initialDimensions) === JSON.stringify(dimensions)) {
      return false;
    }
    return (
      JSON.stringify(user?.coverPhotoDimensions) !== JSON.stringify(dimensions)
    );
  }
};
const ProfileHeader = ({
  user,
  setProfileData,
  isFollowBtn = false,
  viewOnlyUser = false,
  setPreview,
  preview,
  previewShow = false,
  loggedInUser,
  activeGym,
}) => {
  const { access_token: accessToken, user: userDetails } = useSelector(
    (state) => state.authReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isApiCall, setIsApiCall] = useState(false);
  const [showCover, setShowCover] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [profilePhotoDimensions, setProfilePhotoDimensions] = useState(
    user?.profilePhotoDimensions || profileInitialDimensions
  );
  const [photo, setPhoto] = useState(user?.photo || "");
  const [coverPhotoDimensions, setCoverPhotoDimensions] = useState(
    user?.coverPhotoDimensions || initialDimensions
  );
  const [bgPhoto, setBgPhoto] = useState(user?.bgPhoto || "");
  const [coverUpdated, setCoverUpdated] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUnFollow = async (id, type) => {
    const apiUrl = BaseURL("profile/remove");
    setIsApiCall(true);

    const response = await Patch(
      apiUrl,
      { userId: id, type: type },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      setProfileData((prev) => ({ ...prev, isFollowing: false }));

      dispatch(updateUser(response?.data?.data));
      setAreYouSureModal(false);
    }
    setIsApiCall(false);
  };
  const handleFollow = async (item) => {
    const apiUrl = BaseURL(`profile/followUser`);
    setIsApiCall(true);
    const response = await Post(
      apiUrl,
      { followerID: item?._id, requested: !item?.requested },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      toast.success(
        `Request ${!item?.requested ? "Sent" : "Cancelled"} Successfully`
      );
      setProfileData({ ...user, requested: response?.data?.data?.requested });
    }
    setIsApiCall(false);
  };
  const updateProfile = async () => {
    setUpdateLoading(true);
    const res = await updateImage();
    if (!res) {
      setUpdateLoading(false);
      return;
    }
    const apiUrl = BaseURL("users/updateUserProfile");
    const response = await Patch(
      apiUrl,
      { coverPhotoDimensions },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      const { data } = response?.data;
      toast.success("Cover Updated Successfully");
      dispatch(updateUser(data));
      setPhoto(data?.photo);
      setBgPhoto(data?.bgPhoto);
      setCoverUpdated(false);
    }
    setUpdateLoading(false);
  };
  const updateImage = async () => {
    if (bgPhoto?.name) {
      const apiUrl = BaseURL(`profile/updatePicture`);
      const params = {
        image: bgPhoto,
        key: "bgPhoto",
      };
      const formData = CreateFormData(params);
      const response = await Patch(apiUrl, formData, apiHeader(accessToken));
      if (!response) {
        return false;
      }
    }
    return true;
  };
  const [acceptRequest, setAcceptRequest] = useState(false);
  const handleFollowRequest = async (val) => {
    const apiUrl = BaseURL(`profile/acceptFollowRequest`);
    setAcceptRequest(val);
    const response = await Post(
      apiUrl,
      { userId: user?._id, accepted: val === "reject" ? false : true },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      toast.success(`Request ${val ? "Accepted" : "Rejected"} Successfully`);
      dispatch(updateUser(response?.data?.data));
    }
    setAcceptRequest(false);
  };
  return (
    <>
      <div className={classes.main}>
        <div
          className={classes.coverImg}
          onClick={() => {
            setShowCover(true);
          }}
        >
          <CropImage
            state={bgPhoto}
            setter={setBgPhoto}
            edit={loggedInUser ? true : false}
            setCoverPhotoDimensions={setCoverPhotoDimensions}
            coverPhotoDimensions={coverPhotoDimensions}
            setCoverUpdated={setCoverUpdated}
            uploadClass={classes.uploadClass}
            acceptedTypes="image/*"
          />
          {loggedInUser &&
            handleNewUpload(bgPhoto, user, coverPhotoDimensions, "cover") &&
            coverUpdated && (
              <div className={classes.submitBtn}>
                <div
                  className={classes.update}
                  onClick={(e) => {
                    if (updateLoading) return;
                    e.stopPropagation();
                    updateProfile();
                  }}
                >
                  {updateLoading ? "Saving..." : "Save"}
                </div>
              </div>
            )}
        </div>
        <Container className={classes.coverContainer}>
          <div className={classes.profileInfo}>
            <div className={classes.outer_profile_div}>
              <div
                className={classes.profileDiv}
                onClick={() => setShowProfile(true)}
              >
                <ProfilePhoto
                  photo={photo}
                  profilePhotoDimensions={profilePhotoDimensions}
                  className={classes.profilePhoto}
                />
              </div>
              {loggedInUser && (
                <div
                  className={classes.editBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditProfileModal(true);
                  }}
                >
                  <FaRegEdit title="Edit Profile Photo" />
                </div>
              )}
            </div>
            <div className={classes.profileContent}>
              <h1>
                {activeGym
                  ? user?.schoolDetails?.name ||
                    `${user?.firstName} ${user?.lastName}`
                  : `${user?.firstName} ${user?.lastName}`}{" "}
              </h1>
            </div>
          </div>
          <div className={classes.right__wrapper}>
            {previewShow && (
              <>
                <div>
                  {!preview ? (
                    <Button
                      onClick={() => setPreview(true)}
                      label="Show Preview"
                      title="See how your profile looks to other users on the platform"
                      className={classes.previewBtn}
                    />
                  ) : (
                    <Button
                      onClick={() => setPreview(false)}
                      label="Exit Preview"
                      title="Exit Preview Mode"
                      className={classes.previewBtn}
                    />
                  )}
                </div>
              </>
            )}

            {isFollowBtn && userDetails?._id !== user?._id && (
              <div className={classes.actionBtns}>
                {userDetails?.requests?.includes(user?._id) && (
                  <div className={classes.profile_actions}>
                    <Button
                      label={
                        acceptRequest === "accept" ? "Accepting..." : "Accept"
                      }
                      className={classes.acceptBtn}
                      onClick={() => handleFollowRequest("accept")}
                    />
                    <Button
                      label={
                        acceptRequest === "reject" ? "Rejecting..." : "Reject"
                      }
                      className={classes.rejectBtn}
                      onClick={() => handleFollowRequest("reject")}
                    />
                  </div>
                )}
                <Button
                  disabled={isApiCall}
                  onClick={() =>
                    user?.isFollowing
                      ? setAreYouSureModal(true)
                      : handleFollow(user)
                  }
                  customStyle={{ cursor: "pointer" }}
                  label={
                    user?.isFollowing
                      ? "Following"
                      : !user?.requested
                      ? isApiCall
                        ? "Wait..."
                        : "Follow"
                      : isApiCall
                      ? "Cancelling..."
                      : "Cancel Request"
                  }
                  className={classes.followBtn}
                />
              </div>
            )}
            {!viewOnlyUser && (
              <div className={classes.infoBtn__wrapper}>
                <Button onClick={() => navigate("/settings")}>
                  <FaEdit /> Update Profile
                </Button>

                <Button
                  onClick={() => setShareModal(true)}
                  className={classes.shareBtn}
                  title="Share your profile link"
                >
                  Share <FaShare />
                </Button>
              </div>
            )}
          </div>
        </Container>
        <Container>
          <div className={classes.socialIcons}>
            {user?.facebook && (
              <span
                onClick={() => {
                  if (user?.facebook?.includes("http")) {
                    window.open(user?.facebook, "_blank");
                  } else {
                    window.open(`https://${user?.facebook}`, "_blank");
                  }
                }}
                className={classes.icon}
                title="Facebook"
              >
                <FaFacebook color="#1877F2" />
              </span>
            )}
            {user?.instagram && (
              <span
                onClick={() => {
                  if (user?.instagram?.includes("http")) {
                    window.open(user?.instagram, "_blank");
                  } else {
                    window.open(`https://${user?.instagram}`, "_blank");
                  }
                }}
                className={classes.icon}
                title="Instagram"
              >
                <FaInstagram color="#E1306C" />
              </span>
            )}
            {user?.twitter && (
              <span
                onClick={() => {
                  if (user?.twitter?.includes("http")) {
                    window.open(user?.twitter, "_blank");
                  } else {
                    window.open(`https://${user?.twitter}`, "_blank");
                  }
                }}
                className={classes.icon}
                title="Twitter"
              >
                <FaTwitter color="#1DA1F2" />
              </span>
            )}
            {user?.linkedin && (
              <span
                onClick={() => {
                  if (user?.linkedin?.includes("http")) {
                    window.open(user?.linkedin, "_blank");
                  } else {
                    window.open(`https://${user?.linkedin}`, "_blank");
                  }
                }}
                className={classes.icon}
                title="Linkedin"
              >
                <FaLinkedin color="#0A66C2" />
              </span>
            )}
          </div>
        </Container>
        {areYouSureModal && (
          <AreYouSureModal
            show={areYouSureModal}
            isApiCall={isApiCall}
            onClick={() => handleUnFollow(user?._id, "following")}
            subTitle={"You want to Unfollow"}
            setShow={setAreYouSureModal}
          />
        )}
        {shareModal && (
          <ShareModal
            show={shareModal}
            setShow={setShareModal}
            url={`${window.location.origin}`}
          />
        )}
        {showProfile && (
          <LightBoxModal
            show={showProfile}
            setShow={setShowProfile}
            mainSrc={imageUrl(photo)}
            coverPhotoDimensions={profilePhotoDimensions}
            cropAspectRatio={profileAspectRatio}
          />
        )}
        {showCover && (
          <LightBoxModal
            show={showCover}
            setShow={setShowCover}
            mainSrc={imageUrl(bgPhoto)}
            coverPhotoDimensions={coverPhotoDimensions}
            cropAspectRatio={coverAspectRatio}
          />
        )}
        {editProfileModal && (
          <EditCoverModal
            show={editProfileModal}
            setShow={setEditProfileModal}
            label={"Profile"}
            selectedItem={{ photo, profilePhotoDimensions }}
            onClick={(params) => {
              setPhoto(params?.photo);
              setProfilePhotoDimensions(params?.profilePhotoDimensions);
            }}
            updatePhoto={true}
          />
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
