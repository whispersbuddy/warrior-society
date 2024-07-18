import React, { useRef } from "react";
import { MdClose, MdModeEdit, MdUpload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { imageUrl } from "../../config/apiUrl";
import { uploadImage } from "../../constant/imagePath";
import classes from "./UploadImageBox.module.css";

function UploadImageBox({
  state,
  setter,
  label,
  edit = true,
  onDelete,
  onClose,
  isCloseable,
  hideDeleteIcon = false,
  imgClass,
  containerClass = "",
  onEdit,
}) {
  const inputRef = useRef(null);
  return (
    <>
      {label && <label className={classes.label}>{label}</label>}

      <div className={`${classes.box} ${containerClass}`}>
        <div className={classes.uploadImageBox}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose />
            </span>
          )}
          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              <img
                src={
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : imageUrl(state)
                }
                className={imgClass ? imgClass : ""}
                alt="New Product"
              />
              <div className={classes.editAndDelete}>
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div className={classes.icon} onClick={onDelete}>
                        <RiDeleteBinLine />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={() => {
                        inputRef.current.click();
                        onEdit && onEdit();
                      }}
                    >
                      <MdModeEdit />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={classes.uploadBox}>
              <img src={uploadImage} className={classes.icon} />
              <div
                className={classes.uploadIcon}
                onClick={() => inputRef.current.click()}
              >
                <MdUpload />
              </div>
            </div>
          )}
        </div>
        {/* Input For Image Upload */}
        <input
          hidden
          type={"file"}
          ref={inputRef}
          onChange={(e) => setter(e.target.files[0])}
        />
      </div>
    </>
  );
}

export default UploadImageBox;
