import React from "react";
import { userProfile } from "../../constant/imagePath";
import { MdModeEdit } from "react-icons/md";
import classes from "./CreatePost.module.css";
const CreatePost = ({ onClick }) => {
  return (
    <div className={classes.createPost} onClick={() => onClick()}>
      <div className={classes.rightDiv}>
        <div className={classes.userProfile}>
          <img src={userProfile} alt="" />
        </div>
        <div className={classes.placeholder}>let’s share what you're up to</div>
      </div>
      <div className={classes.editPost}>
        <MdModeEdit />
      </div>
    </div>
  );
};

export default CreatePost;
