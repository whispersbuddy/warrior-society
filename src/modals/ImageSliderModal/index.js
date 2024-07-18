import React from "react";
import { IoMdClose } from "react-icons/io";
import ImageSlider from "../../Component/ImageSlider";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./ImageSliderModal.module.css";
const ImageSliderModal = ({
  show,
  setShow,
  gallery,
  actions = false,
  imageIndex,
}) => {
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        width={"800px"}
        // header={title}
        className={classes.modal}
        showCloseIcon={false}
      >
        <div className={classes.lightboxHeader}>
          <span onClick={() => setShow(false)}>
            <IoMdClose size={30} color={"var(--white-color)"} />
          </span>
        </div>
        {gallery?.length > 0 ? (
          <ImageSlider
            gallery={gallery}
            actions={actions}
            imageIndex={imageIndex}
          />
        ) : (
          <div className={classes.notFound}>
            <h6>No attachments here</h6>
            <p>Start sharing files to see them here!</p>
          </div>
        )}
      </ModalSkeleton>
    </>
  );
};

export default ImageSliderModal;
