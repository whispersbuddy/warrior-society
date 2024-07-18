import React, { useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlassMinus, HiOutlineMagnifyingGlassPlus } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { TbZoomReset } from "react-icons/tb";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./LightBoxModal.module.css";

function LightBoxModal({
  mainSrc,
  show,
  setShow,
  coverPhotoDimensions,
  cropAspectRatio,
}) {

  const ref = useRef(null);
  const [mouseState, setMouseState] = useState({
    x: 0,
    y: 0,
    isOnElement: false,
    screenY: 1080,
    screenX: 1920,
    isMouseDown: false,
  });
  const [zoom, setZoom] = useState(10);
  const scale = 100 / coverPhotoDimensions?.width;
  const transform = {
    x: `${-coverPhotoDimensions?.x * scale}%`,
    y: `${-coverPhotoDimensions?.y * scale}%`,
    scale: scale,
    width: "calc(100% + 0.5px)",
  };

  const imageStyle = {
    ...(coverPhotoDimensions && {
      transform: `translate3d(${transform?.x}, ${transform?.y}, 0) scale3d(${transform?.scale},${transform?.scale},1)`,
      width: transform?.width,
      height: transform?.height,
    }),
  };
  const zoomInHandler = () => {
    setZoom((prev) => {
      if (prev >= 20) {
        return prev;
      }
      return prev + 6;
    });
  };
  const zoomOutHandler = () => {
    setZoom((prev) => {
      if (prev <= 4) {
        return prev;
      }
      return prev - 6;
    });
  };

  const onMouseDown = (e) => {
    if (zoom < 16) {
      return;
    }
    setMouseState((prev) => ({
      ...prev,
      isMouseDown: true,
      startX: e.clientX - prev.x,
      startY: e.clientY - prev.y,
    }));
  };

  const onMouseUp = () => {
    setMouseState((prev) => ({ ...prev, isMouseDown: false }));
  };

  const onMouseMove = (e) => {
    if (mouseState.isMouseDown) {
      setMouseState((prev) => ({
        ...prev,
        x: e.clientX - prev.startX,
        y: e.clientY - prev.startY,
      }));
    }
  };
  const resetZoomHandler = () => {
    setMouseState({
      isMouseDown: false,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
    });
    setZoom(10);
  };

  // Attach and detach mousemove and mouseup event listeners
  useEffect(() => {
    if (mouseState.isMouseDown) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseState.isMouseDown]);
  // useEffect(() => {
  //   if (mouseState.isOnElement) {
  //     ref.current.isOnElement = mouseState.isOnElement;
  //     ref.current.x = mouseState.x;
  //     ref.current.y = mouseState.y;
  //     ref.current.screenY = mouseState.screenY;
  //     ref.current.screenX = mouseState.screenX;
  //     ref.current.isMouseDown = mouseState.isMouseDown;
  //   }
  // }, [mouseState]);
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      borderRadius={"0"}
      modalClass={classes.modalBody}
      width={"100vw"}
      modal_width={"100vw"}
      modal_padding={"0"}
      showCloseIcon={false}
      className={classes.modal}
    >
      <div className={classes.lightboxHeader}>
        <span className={classes.resetZoom} onClick={resetZoomHandler}>
          <TbZoomReset color={"var(--white-color)"} size={30} />
        </span>
        <span className={classes.zoomIn} onClick={zoomInHandler}>
          <HiOutlineMagnifyingGlassPlus
            color={"var(--white-color)"}
            size={30}
          />
        </span>
        <span className={classes.zoomOut} onClick={zoomOutHandler}>
          <HiOutlineMagnifyingGlassMinus
            color={"var(--white-color)"}
            size={30}
          />
        </span>
        <span onClick={() => setShow(false)}>
          <IoMdClose size={30} color={"var(--white-color)"} />
        </span>
      </div>
      <div
        className={classes.transformWrapper}
        ref={ref}
        onMouseDown={onMouseDown}
        style={{
          transform: `scale(${zoom / 10}) translate(${mouseState.x}px, ${
            mouseState.y
          }px)`,
          cursor: zoom < 16 ? "default" : "move",
        }}
      >
        <div
          className={classes.cropperWrapper}
          style={{ aspectRatio: `${cropAspectRatio}` }}
        >
          <img
            src={mainSrc}
            className={classes.image}
            style={{
              ...imageStyle,
            }}
            draggable={false}
          />
        </div>
      </div>
    </ModalSkeleton>
  );
}

export default LightBoxModal;
