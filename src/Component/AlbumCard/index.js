import React from "react";
import classes from "./AlbumCard.module.css";
import { postImageOne } from "../../constant/imagePath";
import { imageUrl, mediaUrl } from "../../config/apiUrl";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
const AlbumCard = ({ album, onEditClick, onDelClick }) => {
  const thumbnail =
    album?.media?.[0]?.split(".")[album?.media?.[0]?.split(".")?.length - 1];

  return (
    <div className={classes.albumCard}>
      <div className={classes.text}>
        <h2>{album?.name}</h2>
      </div>
      {["jfif", "jpeg", "jpg", "png"]?.includes(thumbnail) ? (
        <img src={imageUrl(album?.media?.[0])} />
      ) : ["mp4", "mov", "mkv"]?.includes(thumbnail) ? (
        <>
          <ReactPlayer
            url={mediaUrl(album?.media?.[0])}
            playing={false}
            controls={false}
            width={"100%"}
            height={"100%"}
            className={classes.videoPlayer}
          />
          <div className={classes.playBtn}>
            <FaPlay />
          </div>
        </>
      ) : (
        <img src={postImageOne} />
      )}
      <div className={classes.editDeleteBtn}>
        {onEditClick && (
          <span
            className={classes.edit}
            onClick={onEditClick}
            title="Edit Album"
          >
            <FaRegEdit />
          </span>
        )}
        {onDelClick && (
          <span
            className={classes.delete}
            onClick={onDelClick}
            title="Delete Album"
          >
            <MdDelete />
          </span>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
