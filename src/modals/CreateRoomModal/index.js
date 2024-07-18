import React, { useState } from "react";
import classes from "./CreateRoomModal.module.css";
import ModalSkeleton from "../ModalSkeleton";
import { Input } from "../../Component/Input/Input";
import { Button } from "../../Component/Button/Button";
import { toast } from "react-toastify";
const CreateRoomModal = ({ show, setShow, isLoading, onClick }) => {
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    const data = {
      message,
    };
    if (message == "") {
      return toast.error("Please enter message");
    }
    await onClick(data);
  };
  return (
    <ModalSkeleton
      width={"600px"}
      header={"Create Room"}
      setShow={setShow}
      show={show}
      borderRadius={"10px"}
    >
      <div className={classes.main}>
        <Input setter={setMessage} value={message} />

        <Button
          onClick={handleClick}
          disabled={isLoading}
          label={isLoading ? "Please wait..." : "Submit"}
        />
      </div>
    </ModalSkeleton>
  );
};

export default CreateRoomModal;
