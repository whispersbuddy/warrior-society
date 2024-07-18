import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { TextArea } from "../../Component/TextArea";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./EditBioModal.module.css";
const EditBioModal = ({ setShow, show, isLoading, onClick, data }) => {
  useEffect(() => {
    if (data) {
      setBio(data);
    }
  }, []);

  const [bio, setBio] = useState("");
  const handleClick = async () => {
    if (bio === "") return toast.error("Please enter bio");
    await onClick("bio", bio);
  };
  return (
    <ModalSkeleton
      width={"600px"}
      header={"Add/Edit Bio"}
      show={show}
      setShow={setShow}
    >
      <div className={classes.modal}>
        <TextArea
          setter={setBio}
          value={bio}
          label={"Bio"}
          placeholder={"Bio"}
          rows={7}
        />
        <Button
          disabled={isLoading}
          onClick={handleClick}
          className={classes.submitBtn}
          label={isLoading ? "Please wait..." : "Submit"}
        />
      </div>
    </ModalSkeleton>
  );
};

export default EditBioModal;
