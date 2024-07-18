import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import classes from "./MapAndPlaces.module.css";
import Places from "../PlacesInput";
import { googleMapApiKey } from "../../config/apiUrl";
import MapView from "../MapView";
import MapEditView from "../MapEditView";

// type = 'map' || 'places' || 'editAbleMap'
const Maps = ({
  type = "map",
  className,
  mapClass,
  placeClass,
  setCoordinates,
  setAddress,
  address,
  setPlaceDetail,
  location,
  placeholder,
  label,
  leftIcon,
  data,
  loader,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
    libraries: ["places", "visualization"],
  });
  if (!isLoaded) {
    return loader ? (
      loader
    ) : (
      <div className={classes?.loadingContainer}>Loading</div>
    );
  }

  if (loadError) {
    return (
      <div className={classes?.ErrorContainer}>
        <span>Map cannot be loaded right now, sorry. </span>
      </div>
    );
  }

  return (
    <div className={`${classes.Container} ${className ? className : ""}`}>
      {type === "map" ? (
        <MapView data={data} location={location} className={mapClass} />
      ) : type === "editAbleMap" ? (
        <MapEditView
          coordinates={location}
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          setPlaceDetail={setPlaceDetail}
          className={mapClass}
        />
      ) : (
        <Places
          setCoordinates={setCoordinates}
          setAddress={setAddress}
          address={address}
          className={placeClass}
          placeholder={placeholder}
          setPlaceDetail={setPlaceDetail}
          label={label}
          leftIcon={leftIcon}
        />
      )}
    </div>
  );
};

export default Maps;
