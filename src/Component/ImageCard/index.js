import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { imageUrl } from "../../config/apiUrl";
import classes from "./ImageCard.module.css";
const ImageCard = ({ item, onDelete, onSelect, selectedFiles }) => {
  return (
    <div className={classes.imageCard}>
      {onSelect && (
        <div
          className={classes.selIcon}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          title="Select Media"
        >
          <IoCheckmarkSharp
            className={selectedFiles?.includes(item) && classes.active}
          />
        </div>
      )}
      {["jfif", "png", "jpg", "jpeg","avif"].includes(item?.split(".")[1]) ? (
        <img src={imageUrl(item)} />
      ) : (
        <video src={imageUrl(item)} controls height="100%" width="100%"></video>
      )}
    </div>
  );
};

export default ImageCard;
