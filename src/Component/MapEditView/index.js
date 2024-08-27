import { GoogleMap, Marker } from "@react-google-maps/api";
import { getGeocode, getZipCode } from "use-places-autocomplete";
import classes from "./MapEditView.module.css";
import { useState, useEffect } from "react";

export default function MapEditView({
  coordinates,
  setCoordinates,
  setAddress,
  setPlaceDetail,
  className,
}) {
  // Function to handle marker drag end event
  const onMarkerDragEnd = async (e) => {
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    try {
      const results = await getGeocode({ location: newPosition });

      if (results && results.length > 0) {
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
          if (state !== "" && city !== "" && country !== "") break;
        }

        // Update state only when results are valid
        setCoordinates && setCoordinates(newPosition);
        setAddress && setAddress(results[0].formatted_address);
        setPlaceDetail && setPlaceDetail({ state, city, country, zipcode });
      } else {
        console.error("No results found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching geocode or zip code:", error);
    }
  };

  const handleSave = () => {
    // Implement the save functionality here
    console.log("Address saved");
  };

  useEffect(() => {
    console.log("Component re-rendered");
    console.log("Coordinates:", coordinates);
  }, [coordinates]);

  return (
    <div className={`${classes?.container} ${className || ""}`}>
      <GoogleMap
        zoom={16}
        center={coordinates}  
        mapContainerClassName={classes["map-container"]}
      >
        {coordinates && (
          <Marker
            position={coordinates}  
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
      {/* Save button below the map */}
      <button
        style={{
          position: 'absolute',
          right: '27px',
          top: '80px',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        onClick={handleSave}  
      >
        Save Address
      </button>
    </div>
  );
}
