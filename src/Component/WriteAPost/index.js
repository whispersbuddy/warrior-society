import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import classes from "./WriteAPost.module.css";

export default function WriteAPost({ onClick }) {
  return (
    <div className={classes.writeAPost} onClick={onClick}>
      <p>Write a post</p>
      <div className={classes.edit}>
        <BiSolidEdit />
      </div>
    </div>
  );
}
