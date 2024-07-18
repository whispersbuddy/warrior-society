import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdModeEdit, MdUpload, MdUploadFile } from "react-icons/md";
import { PiMagnifyingGlassMinus, PiMagnifyingGlassPlus } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { imageUrl } from "../../config/apiUrl";
import { GalleryImage } from "../../constant/imagePath";
import classes from "./CropImage.module.css";

const cropAspectRatio = 1 / 0.231;

function CropImage({
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
  defaultImageSelected,
  setCoverUpdated,
  uploadClass,
}) {
  const inputRef = useRef(null);
  const scale = 100 / coverPhotoDimensions?.width;
  const transform = {
    x: `${-coverPhotoDimensions?.x * scale}%`,
    y: `${-coverPhotoDimensions?.y * scale}%`,
    scale: scale,
    width: "calc(100% + 0.5px)",
    height: defaultImageSelected ? "auto" : "100%",
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
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
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
        <div className={[classes.uploadImageBox, uploadClass].join(" ")}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              {/* <IoClose /> */}
              <IoCheckmarkSharp />
            </span>
          )}

          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              {isCrop ? (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
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
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{ paddingBottom: `${100 / cropAspectRatio}%` }}
                  className={classes.output}
                  onClick={(e) => {
                    if (isCrop) {
                      e.stopPropagation();
                    }
                  }}
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

              <div
                className={classes.editAndDelete}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div
                        className={classes.icon}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete();
                        }}
                      >
                        <RiDeleteBinLine />
                      </div>
                    )}
                    {isCrop && (
                      <div
                        className={classes.icon}
                        onClick={(e) => {
                          setIsCrop(false);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                          setCoverUpdated && setCoverUpdated(true);
                        }}
                      >
                        {/* <IoClose /> */}
                        <IoCheckmarkSharp title="Save Cover Photo Changes" />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={(e) => {
                        if (!isCrop) {
                          setIsCrop(true);
                          setCoverUpdated && setCoverUpdated(false);
                          return;
                        }

                        inputRef.current.click();
                        onEdit && onEdit();
                      }}
                    >
                      {!isCrop ? (
                        <MdModeEdit title="Edit Cover Photo" />
                      ) : (
                        <MdUploadFile title="Upload Cover Photo" />
                      )}
                      <input
                        hidden
                        type={"file"}
                        ref={inputRef}
                        onChange={(e) => {
                          const fileType = e.target.files[0].type;
                          if (
                            acceptedTypes === "*" ||
                            fileType.match(
                              acceptedTypes
                                .replace(".", "\\.")
                                .replace(",", "|")
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
                )}
              </div>
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
                    title="Zoom In"
                  />
                  <PiMagnifyingGlassMinus
                    size={24}
                    onClick={() => {
                      if (zoom > 1) {
                        setZoom((prev) => prev - 0.1);
                      }
                    }}
                    color={"var(--white-color)"}
                    title="Zoom Out"
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={classes.uploadBox}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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
      </div>
    </>
  );
}

export default CropImage;
