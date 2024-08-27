import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { TextArea } from "../../Component/TextArea";
import ModalSkeleton from "../ModalSkeleton";
import classes from "../EditBioModal/EditBioModal.module.css"; // Updated CSS file to match the new modal name
// ./EditNicknameModal.module.css
const EditNicknameModal = ({ setShow, show, isLoading, onClick, data }) => {
  // State to manage nickname input
  const [nickname, setNickname] = useState("");

  // Effect to set the initial nickname value when modal is shown and data changes
  useEffect(() => {
    if (data) {
      setNickname(data); // Set nickname if data is provided
    }
  }, [data]); // Dependency array updated to include data

  // Handle click event for submit button
  const handleClick = async () => {
    if (nickname === "") return toast.error("Please enter a nickname");
    await onClick("nickname", nickname); // Updated key to 'nickname'
  };

  return (
    <ModalSkeleton
      width={"600px"}
      header={"Add/Edit Nickname"} // Updated modal header
      show={show}
      setShow={setShow}
    >
      <div className={classes.modal}>
        <TextArea
          setter={setNickname} // Updated setter function for TextArea
          value={nickname} // Updated value for TextArea
          label={"Nickname"} // Updated label for TextArea
          placeholder={"Enter your nickname"} // Updated placeholder for TextArea
          rows={2} // Adjusted rows for a shorter input
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

export default EditNicknameModal;
