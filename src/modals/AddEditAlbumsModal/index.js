import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import MultiFileUpload from "../../Component/MultiFileUpload";
import { separateMedia } from "../../config/HelperFunction";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./AddEditAlbumsModal.module.css";
const AddEditAlbumsModal = ({
  setShow,
  show,
  data,
  onClick,
  isLoading,
  imagesOnly = false,
  label,
}) => {
  const [name, setName] = useState(data?.name || "");
  const [media, setMedia] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const handleClick = async () => {
    if (media?.length == 0) {
      return toast.error("Please select atleast one media file");
    }
    const { images, videos } = separateMedia(media);
    const mimeType = videos?.map((video) => {
      const extension = video.name?.split(".");
      return extension[extension.length - 1];
    });
    const imageType = images?.map((image) => {
      const extension = image.name?.split(".");
      return extension[extension.length - 1];
    });
    const params = {
      ...(!imagesOnly && { name }),
      ...(data && { albumId: data?._id }),
      ...(imageType?.length && { imageType }),
      ...(mimeType?.length && { mimeType }),
      ...(deletedFiles.length && { deletedMedia: deletedFiles }),
    };
    for (let key in params) {
      if (params[key] === "" || params[key]?.length === 0) {
        return toast.error("Please fill all fields");
      }
    }
    await onClick(params, videos, images);
  };
  useEffect(() => {
    if (data && !imagesOnly) {
      setMedia(data?.media);
    }
  }, []);
  return (
    <ModalSkeleton
      width={"750px"}
      header={label}
      setShow={setShow}
      show={show}
      modalClass={classes.modalClass}
    >
      <div className={classes.main}>
        <Row className={classes.rowMain}>
          {!imagesOnly && (
            <Col md={12}>
              <Input
                setter={setName}
                value={name}
                label={"Album Name"}
                placeholder={"Album Name"}
              />
            </Col>
          )}
          <Col md={12}>
            <MultiFileUpload
              acceptTypes={{
                "image/*": [".png", ".jpeg", ".jpg"],
                "video/*": [".mp4", ".mov", ".mkv"],
              }}
              files={media}
              setFiles={setMedia}
              uploadDocument={"Upload Image"}
              setDeletedFiles={setDeletedFiles}
              deletedFiles={deletedFiles}
            />
          </Col>
          <Col md={12}>
            <Button
              className={classes.btn}
              onClick={handleClick}
              disabled={isLoading}
              label={isLoading ? "Please wait..." : "Submit"}
            />
          </Col>
        </Row>
      </div>
    </ModalSkeleton>
  );
};

export default AddEditAlbumsModal;
