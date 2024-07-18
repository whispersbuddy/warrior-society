import React, { useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { imageUrl } from "../../config/apiUrl";
import classes from "./CoverWithEditButton.module.css";

export const CoverWithEditButton = ({
  updateImage,
  setUpdateImage,
  onClick,
  isEdit,
}) => {
  const inputRef = useRef(null);
  return (
    <>
      <div
        className={`${classes.profileEditContainer}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      >
        {typeof updateImage === "object" ? (
          <div className={`${classes.profileEditImage_box}`}>
            <img
              className={`${classes.profileEditImage}`}
              src={URL.createObjectURL(updateImage)}
            />
          </div>
        ) : (
          typeof updateImage == "string" && (
            <div className={`${classes.profileEditImage_box}`}>
              <img
                className={`${classes.profileEditImage}`}
                src={`${imageUrl(updateImage)}`}
              />
            </div>
          )
        )}
        {isEdit && (
          <div className={`${classes.profileEditPen_box}`}>
            <AiFillCamera
              className={`${classes.profileEditPen}`}
              onClick={() => {
                inputRef.current.click();
              }}
              color={"#000"}
            />
            <input
              ref={inputRef}
              type="file"
              size="2000000"
              className={`${classes.file_upload_form3rd}`}
              onChange={(e) => {
                if (e.target.files?.length > 0) {
                  if (
                    ![
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/gif",
                    ].includes(e.target.files[0].type)
                  ) {
                    return toast.error(
                      "Please upload a valid image. [jpg and png formats only]"
                    );
                  }
                  // max size 2MB
                  if (e.target.files[0]?.size / 1024 / 1024 > 2)
                    return toast.error(
                      "Please upload a valid image. [Max size: 2MB]"
                    );

                  setUpdateImage(e.target.files[0]);
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
