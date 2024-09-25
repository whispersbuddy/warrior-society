import React from "react";
import classes from "./ProfilePhoto.module.css";
import { imageUrl } from "../../config/apiUrl";
let initialDimensions = {
  x: 12.73694344163658,
  y: 0,
  width: 66.666,
  height: 44.39,
};
const ProfilePhoto = ({ profilePhotoDimensions, className, photo }) => {
  const scale = 100 / profilePhotoDimensions?.width;
  const dimensions = profilePhotoDimensions || initialDimensions;
  const transform = {
    x: `${-dimensions?.x * scale}%`,
    y: `${-dimensions?.y * scale}%`,
    scale: scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    ...(dimensions && {
      transform: `translate3d(${transform?.x}, ${transform?.y}, 0) scale3d(${transform?.scale},${transform?.scale},1)`,
      width: transform?.width,
      height: transform?.height,
    }),
  };
  return (
    <div
      className={[
        className ? className : classes.profileImage,
        classes.border_image,
      ].join(" ")}
    >
      <img
        src={
          typeof photo !== "object"
            ? imageUrl(photo)
            : null
        }
        style={{
          ...imageStyle,
        }}
        className={classes.imageBox}
      />
    </div>
  );
};

export default ProfilePhoto;
