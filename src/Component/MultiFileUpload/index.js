import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Dropzone from "react-dropzone";
import { AiFillEye, AiFillFileWord } from "react-icons/ai";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { MdPhoto } from "react-icons/md";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { imageUrl, mediaUrl } from "../../config/apiUrl";
import { uploadImage } from "../../constant/imagePath";
import { Button } from "../Button/Button";
import classes from "./MultiFileUpload.module.css";
const MultiFileUpload = ({
  label,
  files = [],
  setFiles,
  maxFiles = 10,
  acceptTypes = {
    "image/*": [".png", ".jpeg", ".jpg"],
    "video/*": [".mp4"],
    "application/pdf": [".pdf"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  },
  uploadBoxClass = "",
  noDrag,
  maxSize = 20000000,
  deletedFiles = [],
  setDeletedFiles,
  multiple = true,
  allowDrag = false,
  postStatus = false,
}) => {
  const [_noClick, _setNoClick] = useState(false);
  const onDragEnd = (result) => {
    const { source, destination } = result;
    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (destination.index === source.index) return;

    const reorderedFiles = [...files];
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);

    setFiles(reorderedFiles);

    setTimeout(() => {
      _setNoClick(false);
    }, 1000);
  };

  return (
    <div className={classes.fileInputDiv}>
      {label && <label>{label}</label>}
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => _setNoClick(true)}
      >
        <Dropzone
          maxSize={maxSize}
          noClick={_noClick}
          noDrag={noDrag}
          accept={acceptTypes}
          maxFiles={maxFiles}
          multiple={multiple}
          onDrop={(acceptedFiles) => {
            setFiles([...files, ...acceptedFiles]);
          }}
          onDropRejected={(rejectedFiles) => {
            rejectFilesError(rejectedFiles, maxSize, maxFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section
              className={[
                !postStatus && classes.main,
                files?.length > 0 && classes.isFiles,
                uploadBoxClass && uploadBoxClass,
              ].join(" ")}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {files?.length === 0 ? (
                postStatus ? (
                  <>
                    <div className={classes.option}>
                      <MdPhoto />
                      <span>Photo/Video</span>
                    </div>
                    {/* <div className={classes.format_allowed}>
                      <span className={classes.supported}>
                        Supported Formats:{" "}
                      </span>
                      <span className={classes.formats}>
                        Png, Jpg, Jpeg, Jfif, Mp4, Mov, Mkv
                      </span>
                    </div> */}
                  </>
                ) : (
                  <div className={classes.section}>
                    <div className={classes.uploadImage}>
                      <img src={uploadImage} />
                    </div>
                  </div>
                )
              ) : (
                <Droppable droppableId="files" direction="horizontal">
                  {(droppableProvided) => (
                    <div
                      className={classes.imagesWrap}
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {files?.map((item, index) => (
                        <Draggable
                          key={index}
                          draggableId={index?.toString()}
                          index={index?.toString()}
                          isDragDisabled={!allowDrag || typeof item == "object"}
                        >
                          {(draggableProvided) => (
                            <div
                              key={index}
                              className={classes.image}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <Button
                                className={classes.closeIconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const newFiles = [...files];
                                  newFiles?.splice(index, 1);
                                  setFiles(newFiles);
                                  if (typeof item !== "object") {
                                    setDeletedFiles([...deletedFiles, item]);
                                  }
                                }}
                              >
                                <IoCloseOutline size={20} />
                              </Button>
                              <RenderFileComponent item={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              )}
            </section>
          )}
        </Dropzone>
        <div className={classes.format_allowed}>
          <span className={classes.supported}>Supported Formats: </span>
          <span className={classes.formats}>
            Png, Jpg, Jpeg, Jfif, Mp4, Mov, Mkv
          </span>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MultiFileUpload;

const RenderFileComponent = ({ item }) => {
  return (
    <>
      {(
        typeof item == "object"
          ? item?.type?.split("/")[0] === "image"
          : ["jpg", "jpeg", "png", "jfif", "avif"]?.includes(
              item?.split(".")[1]
            )
      ) ? (
        <img
          src={
            typeof item == "string" ? imageUrl(item) : URL.createObjectURL(item)
          }
          alt=""
        />
      ) : (
          typeof item == "object"
            ? item?.type?.split("/")[0] === "video"
            : ["mp4", "mov", "mkv"]?.includes(item?.split(".")[1])
        ) ? (
        <ReactPlayer
          url={
            typeof item == "string" ? mediaUrl(item) : URL.createObjectURL(item)
          }
          playing={false}
          controls={true}
          width={"100%"}
          height={"100%"}
          className={classes.videoPlayer}
        />
      ) : (
          typeof item == "object"
            ? item?.type == "application/pdf"
            : ["pdf"]?.includes(item?.split(".")[1])
        ) ? (
        <div className={classes.pdfView}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                typeof item == "string"
                  ? mediaUrl(item)
                  : URL.createObjectURL(item),
                "_blank"
              );
            }}
          >
            <AiFillEye color="var(--white-color)" size={22} />
          </span>
          <div>
            <BsFileEarmarkPdfFill size={40} color={`#ff1300`} />
            <p>{typeof item == "string" ? item?.slice(7) : item?.name}</p>
          </div>
          {/* <iframe
            src={
              typeof item == "string"
                ? `https://2514-39-51-68-238.ngrok-free.app/api/v1/media/${item}`
                : URL.createObjectURL(item)
            }
            className={classes.pdfIframe}
            seamless="seamless"
            style={{
              overflow: "hidden",
            }}
          /> */}
        </div>
      ) : (
        (typeof item == "object"
          ? item?.type ==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : ["document", "docx", "doc"]?.includes(
              item?.split(".")[item?.split(".")?.length - 1]
            )) && (
          <div className={classes.pdfView}>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  typeof item == "string"
                    ? mediaUrl(item)
                    : URL.createObjectURL(item),
                  "_blank"
                );
              }}
            >
              <AiFillEye color="var(--white-color)" size={22} />
            </span>
            <div>
              <AiFillFileWord size={40} color={`#004db3`} />
              <p>{typeof item == "string" ? item?.slice(7) : item?.name}</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

const rejectFilesError = (rejectedFiles, maxSize, maxFiles) => {
  for (let i = 0; i < rejectedFiles?.length; i++) {
    for (let j = 0; j < rejectedFiles?.[i]?.errors?.length; j++) {
      let code = rejectedFiles?.[i]?.errors?.[j]?.code;
      if (code === "file-too-large") {
        return toast.warn(
          `File size should be less than ${maxSize / 1000000}MB`
        );
      } else if (code === "file-invalid-type") {
        return toast.warn(`Invalid file format`);
      } else if (code === "too-many-files") {
        return toast.warn(`You can upload maximum ${maxFiles} files`);
      }
    }
  }
};
