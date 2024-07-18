import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Maps from "../../../Component/MapAndPlaces";
import classes from "./PostLocation.module.css";
const PostLocation = ({
  address,
  setAddress,
  coordinates,
  setCoordinates,
  setLocationModal,
}) => {
  const [placeDetail, setPlaceDetail] = useState("");

  return (
    <>
      <div className={classes.locationPage}>
        <div className={classes.backIcon}>
          <FaArrowLeft onClick={() => setLocationModal(false)} />
        </div>
        <Maps
          setCoordinates={setCoordinates}
          address={address}
          setAddress={setAddress}
          setPlaceDetail={setPlaceDetail}
          location={coordinates}
          loader={
            <>
              <Skeleton height={60} variant="rounded" />
            </>
          }
          type="place"
        />
        {coordinates && (
          <div className={classes.mapClass}>
            <Maps
              type="editAbleMap"
              location={coordinates}
              setCoordinates={setCoordinates}
              setAddress={setAddress}
              setPlaceDetail={setPlaceDetail}
              loader={
                <>
                  <Skeleton variant="rounded" />
                </>
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PostLocation;
