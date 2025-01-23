import React from "react";
import classes from "./loader.module.css";
import Spinner from 'react-bootstrap/Spinner';
import { ImSpinner10 } from "react-icons/im";
export const Loader = ({ className }) => {
  return (
    <>
      <div className={`${classes.loaderContainer} ${className && className}`}>
        <div className={classes.loaderBox}>
        <ImSpinner10 size={100} className="text-red-700 animate-spin"/>
        </div>
      </div>
    </>
  );
};

