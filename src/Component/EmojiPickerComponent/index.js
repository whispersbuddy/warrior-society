import React, { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import classes from "./Emoji.module.css";
import { BsEmojiSmile } from "react-icons/bs";

export default function EmojiInputComponent({
  value,
  setter,
  placeholder = "Type a message",
  label,
  sharedPost,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textAreaRef = useRef(null);
  function handleEmojiClick(emojiObject) {
    setter((prev) => prev + emojiObject?.emoji);
    setShowEmojiPicker(false);
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <>
      {sharedPost && (
        <style>
          {`
      .modal-body{
        padding-bottom:${showEmojiPicker ? "297px" : "32px"};
        margin-bottom:${showEmojiPicker ? "-265px" : "0px"};
      }
      `}
        </style>
      )}
      <div className={classes.mainDiv}>
        {label && <p className={classes.emojiLabel}>{label}</p>}
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            disableAutoFocus={true} // Optional: Disable autofocus on the picker
          />
        )}
        {/* Emoji Icon to Toggle Picker */}
        <BsEmojiSmile
          onClick={toggleEmojiPicker}
          className={classes.emojiIcon}
          color={"grey"}
        />
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setter(e.target.value);
          }}
          onBlur={() => {
            setter(value?.trim());
          }}
          ref={textAreaRef}
          className={classes.textarea}
          rows={5}
        />
      </div>
    </>
  );
}
