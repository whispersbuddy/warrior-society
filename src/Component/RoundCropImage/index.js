import React, { useRef, useState } from "react";
import { MdUpload, MdModeEdit, MdClose, MdUploadFile } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { imageUrl } from "../../config/apiUrl";
import { GalleryImage } from "../../constant/imagePath";
import classes from "./RoundCropImage.module.css";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { PiMagnifyingGlassMinus, PiMagnifyingGlassPlus } from "react-icons/pi";

const cropAspectRatio = 1 / 1;

function RoundCropImage({
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
  fallBackIcon,
  acceptedTypes = "*",
  setCoverPhotoDimensions,
  coverPhotoDimensions,
}) {
  const inputRef = useRef(null);
  const scale = 100 / coverPhotoDimensions?.width;
  const transform = {
    x: `${-coverPhotoDimensions?.x * scale}%`,
    y: `${-coverPhotoDimensions?.y * scale}%`,
    scale: scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    ...(coverPhotoDimensions && {
      transform: `translate3d(${transform?.x}, ${transform?.y}, 0) scale3d(${transform?.scale},${transform?.scale},1)`,
      width: transform?.width,
      height: transform?.height,
    }),
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCrop, setIsCrop] = useState(false);
  const onCropComplete = (croppedArea) => {
    setCoverPhotoDimensions(croppedArea);
  };

  return (
    <>
      {label && <label className={classes.label}>{label}</label>}

      <div
        className={`${classes.box} ${containerClass}`}
        style={{
          aspectRatio: `${cropAspectRatio}`,
          height: "auto",
        }}
      >
        <div className={classes.uploadImageBox}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose />
            </span>
          )}

          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              {isCrop ? (
                <Cropper
                  image={
                    typeof state == "object"
                      ? URL.createObjectURL(state)
                      : imageUrl(state)
                  }
                  crop={crop}
                  zoom={zoom}
                  aspect={cropAspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  cropShape="round"
                  showGrid={false}
                />
              ) : (
                <div
                  style={{ paddingBottom: `${100 / cropAspectRatio}%` }}
                  className={classes.output}
                >
                  <img
                    src={
                      typeof state == "object"
                        ? URL.createObjectURL(state)
                        : imageUrl(state)
                    }
                    className={[classes.renderImg, imgClass && imgClass].join(
                      " "
                    )}
                    style={{
                      ...imageStyle,
                    }}
                  />
                </div>
              )}

              <div className={classes.editAndDelete}>
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div className={classes.icon} onClick={onDelete}>
                        <RiDeleteBinLine />
                      </div>
                    )}
                    {isCrop && (
                      <div
                        className={classes.icon}
                        onClick={() => {
                          setIsCrop(false);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                        }}
                      >
                        <IoCheckmarkSharp />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={() => {
                        if (!isCrop) {
                          setIsCrop(true);
                          return;
                        }
                        inputRef.current.click();
                        onEdit && onEdit();
                      }}
                    >
                      {!isCrop ? <MdModeEdit /> : <MdUploadFile />}
                    </div>
                  </>
                )}
                {isCrop && (
                  <div
                    className={classes.controls}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <PiMagnifyingGlassPlus
                      size={24}
                      onClick={() => {
                        if (zoom < 3) {
                          setZoom((prev) => prev + 0.1);
                        }
                      }}
                      color={"var(--white-color)"}
                    />
                    <PiMagnifyingGlassMinus
                      size={24}
                      onClick={() => {
                        if (zoom > 1) {
                          setZoom((prev) => prev - 0.1);
                        }
                      }}
                      color={"var(--white-color)"}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={classes.uploadBox}>
              {fallBackIcon ? (
                fallBackIcon
              ) : (
                <img src={GalleryImage} className={classes.icon} />
              )}
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
          onChange={(e) => {
            const fileType = e.target.files[0].type;
            if (
              acceptedTypes === "*" ||
              fileType.match(
                acceptedTypes.replace(".", "\\.").replace(",", "|")
              )
            ) {
              setter(e.target.files[0]);
            } else {
              toast.warn("Invalid file type");
            }
          }}
        />
      </div>
    </>
  );
}

export default RoundCropImage;
