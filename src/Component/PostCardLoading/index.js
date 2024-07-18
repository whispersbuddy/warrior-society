import { Skeleton } from "@mui/material";
import React from "react";
import classes from "./PostCardLoading.module.css";

const PostCardLoading = () => {
  return (
    <>
      <div className={classes.job_card}>
        <div className={classes.job_profile}>
          <Skeleton variant="circular" width={60} height={60} />
          <div className={classes.icons}>
            <Skeleton variant="rectangular" sx={{ height: 15, width: 150 }} />
            <Skeleton variant="rectangular" sx={{ height: 15, width: 60 }} />
          </div>
        </div>
        <div className={classes.investment_type}>
          <Skeleton variant="rounded" sx={{ height: 100, width: "100%" }} />
        </div>
        <div className={classes.description}>
          <Skeleton variant="rectangular" sx={{ height: 400 }} />
        </div>
        <div className={classes.bottom}>
          <Skeleton variant="rectangular" sx={{ height: 30, width: "33%" }} />
          <Skeleton variant="rectangular" sx={{ height: 30, width: "33%" }} />
          <Skeleton variant="rectangular" sx={{ height: 30, width: "33%" }} />
        </div>
      </div>
    </>
  );
};

export default PostCardLoading;
