import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsEmojiLaughing } from "react-icons/bs";
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import { RxInfoCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import EmojiInputComponent from "../../Component/EmojiPickerComponent";
import MultiFileUpload from "../../Component/MultiFileUpload";
import Switch from "../../Component/Switch/Switch";
import Tooltip from "../../Component/Tooltip";
import { formatTags, separateMedia } from "../../config/HelperFunction";
import ModalSkeleton from "../ModalSkeleton";
import ActivityModal from "./ActivityModal";
import classes from "./AddEditPostModal.module.css";
import PostLocation from "./PostLocation";
import TagPeople from "./TagPeople";
const AddEditPostModal = ({
  setShow,
  show,
  data,
  onClick,
  isLoading,
  sharedPost,
  imagesOnly = false,
}) => {
  const [description, setDescription] = useState(data?.description || "");
  const [file, setFile] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [statusToggle, setStatusToggle] = useState(
    data?.privacy === "public" ? false : true
  );
  const [actionModal, setActionModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [activity, setActivity] = useState("");
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const handleClick = async () => {
    if (!description && file?.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }
    const { images, videos } = separateMedia(file);
    const mimeType = videos?.map((video) => {
      const type = video.name?.split(".");
      return type[type?.length - 1];
    });
    const imageType = images?.map((image) => {
      const type = image.name?.split(".");
      return type[type?.length - 1];
    });
    let params = {
      ...(data?._id && { postId: data?._id }),
      description,
      tags,
      privacy: statusToggle ? "private" : "public",
      ...(!sharedPost && { activity: activity || "", address: address || "" }),
      ...(deletedImages.length && { deletedMedia: deletedImages }),
      ...(mimeType?.length && { mimeType }),
      ...(imageType?.length && { imageType }),
    };
    if (address) {
      params = {
        ...params,
        location: {
          type: "Point",
          coordinates: [coordinates.lat, coordinates.lng],
        },
      };
    }
    await onClick(params, videos, images);
  };
  useEffect(() => {
    if (data && !imagesOnly) {
      setFile(data?.media);
    }
    if (!sharedPost) {
      setTags(data?.tags || []);
      setActivity(data?.activity || "");
      setAddress(data?.address || "");
      setCoordinates(
        data?.location?.coordinates?.length > 0
          ? {
              lat: data?.location?.coordinates[1],
              lng: data?.location?.coordinates[0],
            }
          : { lat: 0, lng: 0 }
      );
    }
  }, []);
  return (
    <ModalSkeleton
      width={"750px"}
      setShow={() => {
        if (actionModal) {
          setActionModal(false);
          return;
        }
        setShow(false);
      }}
      show={show}
      modalClass={actionModal ? classes.modal_body : classes.modal}
    >
      {!actionModal ? (
        <div className={classes.modal_header}>
          <h2>
            <>Add/Edit Feed </>
          </h2>
        </div>
      ) : (
        ""
      )}
      {!actionModal ? (
        <div className={classes.main}>
          <Row className={classes.rowMain}>
            <Col md={12}>
              <div className={classes.switchWrapper}>
                <p>
                  <Tooltip
                    position="bottom"
                    className={classes.tooltipDiv}
                    icon={<RxInfoCircled className={classes.tooltipSvg} />}
                  >
                    <span>
                      Public posts are visible to all users, while private posts
                      can only be seen by you and those who follow you.
                    </span>
                  </Tooltip>
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
            </Col>
            {!imagesOnly && (
              <Col md={12}>
                <EmojiInputComponent
                  value={description}
                  setter={setDescription}
                  placeholder={"Let’s Share What You're Up to"}
                  label={"Description"}
                  sharedPost={sharedPost}
                />
              </Col>
            )}
            {!sharedPost && (
              <div className={classes.postOptions}>
                <h5>add to your post</h5>
                <div className={classes.options}>
                  <MultiFileUpload
                    acceptTypes={{
                      "image/*": [".png", ".jpeg", ".jpg", ".jfif"],
                      "video/*": [".mp4", ".mov", ".mkv"],
                    }}
                    files={file}
                    setFiles={setFile}
                    uploadDocument={"Upload Image"}
                    setDeletedFiles={setDeletedImages}
                    deletedFiles={deletedImages}
                    postStatus={file?.length == 0}
                  />
                  <div
                    className={classes.option}
                    onClick={() => {
                      setActionModal("feeling");
                    }}
                  >
                    <BsEmojiLaughing />
                    <span>Feeling/Activity</span>
                    {activity && (
                      <p className={classes.selectedActivity}>--{activity}</p>
                    )}
                  </div>
                  <div
                    className={classes.option}
                    onClick={() => {
                      setActionModal("tags");
                    }}
                  >
                    <FaUserTag />
                    <span>Tag People</span>
                    {tags?.length > 0 && (
                      <>
                        <p className={classes.tagPeople}>
                          --{formatTags(tags)}
                        </p>
                      </>
                    )}
                  </div>
                  <div
                    className={classes.option}
                    onClick={() => {
                      setActionModal("location");
                    }}
                  >
                    <FaLocationDot />
                    <span>Location/Check In</span>
                    {address && (
                      <>
                        <p className={classes.tagPeople}>--{address}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            <Col md={12}>
              <Button
                className={classes.btn}
                onClick={handleClick}
                disabled={isLoading}
                label={isLoading ? "Submiting..." : "Submit"}
              />
            </Col>
          </Row>
        </div>
      ) : actionModal === "feeling" ? (
        <ActivityModal
          setActivityModal={setActionModal}
          setActivity={setActivity}
          activity={activity}
        />
      ) : actionModal === "tags" ? (
        <TagPeople
          setTagsModal={setActionModal}
          setTags={setTags}
          tags={tags}
        />
      ) : actionModal === "location" ? (
        <PostLocation
          address={address}
          setAddress={setAddress}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          setLocationModal={setActionModal}
        />
      ) : null}
    </ModalSkeleton>
  );
};

export default AddEditPostModal;
