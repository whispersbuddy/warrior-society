import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button } from "../../Component/Button/Button";
import RoundCropImage from "../../Component/RoundCropImage";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./EditFighterLogoModal.module.css";

import { Patch } from "../../Axios/AxiosFunctions";
import { BaseURL, CreateFormData, apiHeader } from "../../config/apiUrl";
import { updateUser } from "../../store/auth/authSlice";

let initialDimensions = {
  x: 0,
  y: 0,
  width: 500,
  height: 500,
};

const EditFighterLogoModal = ({
  show,
  setShow,
  modalLoading,
  logo,
  logoDimensions,
}) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.authReducer);
  const [image, setImage] = useState(logo || null);
  const [profilePhotoDimensions, setProfilePhotoDimensions] = useState(
    logoDimensions || initialDimensions
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const apiUrl = BaseURL(`profile/updateLogo`);
    const params = {
      image: image,
      logoDimensions: JSON.stringify(profilePhotoDimensions),
      key: "logo",
    };
    const formData = CreateFormData(params);
    const res = await Patch(apiUrl, formData, apiHeader(access_token));
    if (!res) {
      setIsLoading(false);
      return;
    }
    if (res) {
      toast.success(`Logo ${logo ? "updated" : "added"} successfully`);
      dispatch(updateUser(res?.data.data));
      setShow(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`${logo ? "Update" : "Add"} Logo`}
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
              cropActive={true}
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

export default EditFighterLogoModal;
