import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { DropDown } from "../DropDown/DropDown";
import { Col, Row } from "react-bootstrap";
import classes from "./StateCitySelect.module.css";
import { Input } from "../Input/Input";
import { IoLocationSharp } from "react-icons/io5";

const StateCitySelect = ({
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  errorFields,
  style,
  label,
}) => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const getStatesOfCountry = (country) => {
    if (typeof country == "string") {
      return State?.getStatesOfCountry(
        Country.getAllCountries()?.find((item) => item?.name == country)
          ?.isoCode
      );
    } else {
      return State?.getStatesOfCountry(country?.isoCode);
    }
  };

  const getCitiesOfState = (state, country) => {
    if (typeof state == "string") {
      return City.getCitiesOfState(
        Country.getAllCountries()?.find((item) => item?.name == country)
          ?.isoCode,
        State?.getStatesOfCountry(
          Country.getAllCountries()?.find((item) => item?.name == country)
            ?.isoCode
        )?.find((item) => item?.name == state)?.isoCode
      );
    } else {
      return City.getCitiesOfState(state?.countryCode, state?.isoCode);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setCountry(
        typeof selectedCountry == "string"
          ? Country.getAllCountries()?.find(
              (item) => item?.name == selectedCountry
            )
          : selectedCountry
      );
    }
    if (selectedState) {
      setState(
        typeof selectedState == "string"
          ? State?.getStatesOfCountry(
              Country.getAllCountries()?.find(
                (item) => item?.name == selectedCountry
              )?.isoCode
            )?.find((item) => item?.name == selectedState)
          : selectedState
      );
    }
    if (selectedCity) {
      setCity(
        typeof selectedCity == "string"
          ? City.getCitiesOfState(
              Country.getAllCountries()?.find(
                (item) => item?.name == selectedCountry
              )?.isoCode,
              State?.getStatesOfCountry(
                Country.getAllCountries()?.find(
                  (item) => item?.name == selectedCountry
                )?.isoCode
              )?.find((item) => item?.name == selectedState)?.isoCode
            )?.find((item) => item?.name == selectedCity)
          : selectedCity
      );
    }
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <>
      <style>{`
            .DropdownOptionContainer__indicator {
              padding:5px;
            }
            `}</style>
      <Col xl={6} lg={12} className={classes["mb-10"]}>
        <DropDown
          options={Country.getAllCountries()}
          getOptionLabel={(options) => {
            return options["name"];
          }}
          getOptionValue={(options) => {
            return options["name"];
          }}
          value={country}
          setter={(e) => {
            setSelectedState("");
            setSelectedCity("");
            setSelectedCountry(e);
          }}
          inputStyle={{
            padding: "12px 15px",
          }}
          placeholder="Select Country"
          label={"Country / Region"}
          isSearchable={true}
          labelLeftIcon={<IoLocationSharp />}
          error={errorFields[0]}
        />
      </Col>
      <Col xl={6} lg={12} className={classes["mb-10"]}>
        {getStatesOfCountry(selectedCountry)?.length === 0 &&
        selectedCountry ? (
          <Input
            placeholder="Enter State"
            label={"State"}
            value={selectedState}
            setter={setSelectedState}
            inputStyle={{
              padding: "12px 15px",
            }}
            labelLeftIcon={<IoLocationSharp />}
            error={errorFields[1]}
          />
        ) : (
          <DropDown
            options={getStatesOfCountry(selectedCountry)}
            optionValue={"name"}
            optionLabel={"name"}
            value={state}
            setter={(e) => {
              setSelectedState(e);
              setSelectedCity("");
            }}
            placeholder="Select State"
            label={"State"}
            isSearchable={true}
            labelLeftIcon={<IoLocationSharp />}
            error={errorFields[1]}
          />
        )}
      </Col>
      <Col xl={6} lg={12} className={classes["mb-10"]}>
        {(getCitiesOfState(selectedState, selectedCountry)?.length === 0 &&
          selectedState) ||
        (getStatesOfCountry(selectedCountry)?.length === 0 &&
          selectedCountry) ? (
          <Input
            value={selectedCity}
            setter={setSelectedCity}
            placeholder="Enter City"
            label={"Town / City"}
            inputStyle={{
              padding: "12px 15px",
            }}
            labelLeftIcon={<IoLocationSharp />}
            error={errorFields[2]}
          />
        ) : (
          <DropDown
            options={getCitiesOfState(selectedState, selectedCountry)}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={city}
            setter={setSelectedCity}
            placeholder="Select City"
            label={"Town / City"}
            isSearchable={true}
            labelLeftIcon={<IoLocationSharp />}
            error={errorFields[2]}
          />
        )}
      </Col>
    </>
  );
};
export default StateCitySelect;
