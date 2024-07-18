import React from "react";
import { BsTrash } from "react-icons/bs";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { imageUrl } from "../../config/apiUrl";
import { Button } from "../Button/Button";
import "./ImageSlider.css";

export default function ImageSlider({
  gallery,
  actions = true,
  onDel,
  imageHeight,
  customStyle,
  mediaStyle,
  imageIndex = 0,
}) {
  return (
    <>
      <style>
        {`
        .swiper-button-prev{
            color:#f1af16;
        }
        `}
      </style>

      <div className="slider">
        <Swiper
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          initialSlide={imageIndex}
        >
          {gallery?.map((elem) => (
            <SwiperSlide>
              <div
                className={
                  ["jfif", "png", "jpg", "jpeg", "avif"].includes(
                    elem?.split(".")[1]
                  ) && "image-box"
                }
                style={{
                  height: imageHeight || "450px",
                  ...customStyle,
                }}
              >
                {actions && (
                  <div className={"deleteBtn"}>
                    <Button onClick={() => onDel(elem)}>
                      <BsTrash size={20} /> Delete
                    </Button>
                  </div>
                )}
                {["jfif", "png", "jpg", "jpeg", "avif"].includes(
                  elem?.split(".")[1]
                ) ? (
                  <img
                    style={{
                      ...mediaStyle,
                    }}
                    src={imageUrl(elem)}
                    alt="..."
                  />
                ) : (
                  <video
                    style={{
                      ...mediaStyle,
                    }}
                    src={imageUrl(elem)}
                    controls
                    height="100%"
                    width="100%"
                  ></video>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
