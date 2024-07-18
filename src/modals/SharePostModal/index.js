import React, { useState } from "react";
import { Button } from "../../Component/Button/Button";
import EmojiInputComponent from "../../Component/EmojiPickerComponent";
import Switch from "../../Component/Switch/Switch";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./SharePostModal.module.css";
const SharePostModal = ({ show, setShow, postId, modalLoading, onClick }) => {
  const [description, setDescription] = useState("");
  const [statusToggle, setStatusToggle] = useState(true);

  const handleClick = async () => {
    const params = {
      description,
      originalPost: postId,
      privacy: statusToggle ? "private" : "public",
    };
    const response = await onClick(params);
    if (response) {
      setDescription("");
      setShow({
        ...show,
        show: false,
      });
    }
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`Share Post`}
        width={"800px"}
      >
        <div className={classes.modalContainer}>
          <div className={classes.switchWrapper}>
            <hr />{" "}
            <p>
              Public
              <Switch
                value={statusToggle}
                setter={(e) => {
                  setStatusToggle(e);
                }}
              />{" "}
              Private
            </p>{" "}
          </div>{" "}
          <div className={classes.inputField}>
            <EmojiInputComponent
              value={description}
              setter={setDescription}
              placeholder={"Say something about post..."}
              label={"Description"}
            />
          </div>
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={modalLoading ? `Sharing...` : `Share Now`}
              disabled={modalLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default SharePostModal;
