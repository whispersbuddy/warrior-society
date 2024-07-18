import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Patch } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import RoundCropImage from "../../Component/RoundCropImage";
import { BaseURL, CreateFormData, apiHeader } from "../../config/apiUrl";
import { updateUser } from "../../store/auth/authSlice";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./EditCoverModal.module.css";
let initialDimensions = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};
const EditCoverModal = ({
  show,
  setShow,
  modalLoading,
  onClick,
  label,
  selectedItem,
  updatePhoto,
}) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.authReducer);
  const [image, setImage] = useState(selectedItem?.photo || null);
  const [profilePhotoDimensions, setProfilePhotoDimensions] = useState(
    selectedItem?.profilePhotoDimensions || initialDimensions
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    const params = {
      photo: image,
      profilePhotoDimensions,
    };
    if (updatePhoto) {
      setIsLoading(true);
      const res = await updateImage();
      if (!res) {
        setIsLoading(false);
        return;
      }
      const apiUrl = BaseURL("users/updateUserProfile");
      const response = await Patch(
        apiUrl,
        { profilePhotoDimensions },
        apiHeader(access_token)
      );
      if (response !== undefined) {
        toast.success("Profile photo updated successfully");
        dispatch(updateUser(response.data.data));
        onClick(response.data.data);
        setShow(false);
      }
      setIsLoading(false);
      return;
    }
    await onClick(params);
    setShow(false);
  };
  const updateImage = async () => {
    const apiUrl = BaseURL(`profile/updatePicture`);
    if (image?.name) {
      const params = {
        image: image,
        key: "photo",
      };
      const formData = CreateFormData(params);
      const response = await Patch(apiUrl, formData, apiHeader(access_token));
      if (!response) {
        return false;
      }
    }
    return true;
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`Update ${label} Photo`}
        borderRadius={"20px"}
        width={"700px"}
      >
        <div className={classes.profileContainer}>
          <div className={classes.uploadCover}>
            <RoundCropImage
              state={image}
              setter={setImage}
              setCoverPhotoDimensions={setProfilePhotoDimensions}
              coverPhotoDimensions={profilePhotoDimensions}
              acceptedTypes="image/*"
            />
          </div>
        </div>
        <div className={classes.submitBtn}>
          <Button
            label={modalLoading || isLoading ? "Submitting..." : "Submit"}
            disabled={modalLoading || isLoading}
            onClick={handleSubmit}
          />
        </div>
      </ModalSkeleton>{" "}
    </>
  );
};

export default EditCoverModal;
