import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getZipCode } from "use-places-autocomplete";
import classes from "./MapEditView.module.css";

export default function MapEditView({
  coordinates,
  setCoordinates,
  setAddress,
  setPlaceDetail,
  className,
}) {
  const onMarkerDragEnd = async (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    const results = await getGeocode({ location: newPosition });
    const zipcode = await getZipCode(results[0], false);

    let country = "";
    let city = "";
    let state = "";

    let addrComp = results[0].address_components;
    for (let i = 0; i < addrComp.length; ++i) {
      if (addrComp[i].types.includes("administrative_area_level_1"))
        state = addrComp[i].long_name;
      else if (addrComp[i].types.includes("locality"))
        city = addrComp[i].long_name;
      else if (addrComp[i].types.includes("country"))
        country = addrComp[i].long_name;
      //we can break early if we find all three data
      if (state != "" && city != "" && country != "") break;
    }
    setCoordinates && setCoordinates(newPosition);
    setAddress && setAddress(results[0].formatted_address);
    setPlaceDetail && setPlaceDetail({ state, city, country, zipcode });
  };

  return (
    <div className={`${classes?.container} ${className && className}`}>
      <GoogleMap
        zoom={16}
        center={coordinates}
        mapContainerClassName={classes["map-container"]}
      >
        {coordinates && (
          <>
            <Marker
              position={coordinates}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
}
