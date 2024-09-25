import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

import CustomPhoneInput from "../../../../Component/CustomPhoneInput";
import ResponsiveDatePickers from "../../../../Component/Calender/Calender";
import { Input } from "../../../../Component/Input/Input";
import { DropDown } from "../../../../Component/DropDown/DropDown";
import { Button } from "../../../../Component/Button/Button";
import { validateUserFields } from "../../../../config/HelperFunction";
import { apiHeader, BaseURL } from "../../../../config/apiUrl";
import { Patch } from "../../../../Axios/AxiosFunctions";
import classes from "./ConnectAccount.module.css";

const ConnectAccount = () => {
  const { user, access_token } = useSelector((state) => state?.authReducer);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;

    return (
      ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };

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

  const handleSubmit = async () => {
    console.log({ DOB, country, city, state, postalCode, address1, address2 });
    const errorFieldNames = [];
    const params = {
      firstName,
      lastName,
      email,
      contact: contact?.length
        ? contact[0] == "+"
          ? contact
          : `+${contact}`
        : "",
      DOB: DOB ? moment(DOB?.$d || DOB).format("MM/DD/YYYY") : "",
      country: typeof country === "string" ? country : country?.name,
      state: typeof state === "string" ? state : state?.name,
      city: typeof city === "string" ? city : city?.name,
      postalCode,
      address1,
      address2,
    };
    for (let key in params) {
      if (!params[key]) {
        errorFieldNames.push(key);
      }
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      return toast.error("Please fill all the required fields!");
    }
    if (!validateUserFields(params)) {
      return;
    }

    let data = {
      first_name: "John",
      last_name: "Doe",
      dob: {
        day: 1,
        month: 1,
        year: 1901,
      },
      address: {
        line1: "address_full_match",
        city: "New York",
        state: "NY",
        postal_code: "10001",
        country: "US",
      },
      email: "john.doe@example.com",
      phone: "+11234567890",
      id_number: "123456789",
    };

    setUpdateLoading(true);
    const apiUrl = BaseURL("stripe/update-account");
    const response = await Patch(apiUrl, data, apiHeader(access_token));
    if (response) {
      toast.success("Submited Successfully");
      // dispatch(updateUser(response.data.data));
      // navigate("/profile");
    }
    setUpdateLoading(false);
  };

  return (
    <div className={classes.container}>
      <Container>
        {/* <h1>Wallet Details</h1> */}
        <Row>
          <Col xl={6} className={classes.inputField}>
            <Input
              value={firstName}
              setter={setFirstName}
              placeholder={"First Name"}
              label={"First Name"}
              error={handleFieldError("firstName")}
            />
          </Col>
          <Col xl={6} className={classes.inputField}>
            <Input
              value={lastName}
              setter={setLastName}
              placeholder={"Last Name"}
              label={"Last Name"}
              error={handleFieldError("lastName")}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <Input
              value={email}
              setter={setEmail}
              placeholder={"Email"}
              label={"Email"}
              error={handleFieldError("email")}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <CustomPhoneInput
              setter={setContact}
              value={contact}
              label={"Phone Number"}
              error={handleFieldError("contact")}
            />
          </Col>
          <Col md={12} className={classes.inputField}>
            <ResponsiveDatePickers
              setter={setDOB}
              calenderLabel={"Date Of Birth"}
              value={DOB}
              error={handleFieldError("DOB")}
              placeholder="Date Of Birth"
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <DropDown
              options={Country.getAllCountries()}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={
                typeof country == "string"
                  ? Country.getAllCountries()?.find(
                      (item) => item?.name == country
                    )
                  : country
              }
              setter={(e) => {
                setState("");
                setCity("");
                setCountry(e);
              }}
              inputStyle={{
                padding: "12px 15px",
              }}
              placeholder="Select Country"
              label={"Country / Region"}
              isSearchable={true}
              error={errorFields[0]}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            {getStatesOfCountry(country)?.length === 0 && country ? (
              <Input
                placeholder="Enter State"
                label={"State"}
                value={state}
                setter={setState}
                inputStyle={{
                  padding: "12px 15px",
                }}
                error={errorFields[1]}
              />
            ) : (
              <DropDown
                options={getStatesOfCountry(country)}
                optionValue={"name"}
                optionLabel={"name"}
                value={
                  typeof state == "string"
                    ? State?.getStatesOfCountry(
                        Country.getAllCountries()?.find(
                          (item) => item?.name == country
                        )?.isoCode
                      )?.find((item) => item?.name == state)
                    : state
                }
                setter={(e) => {
                  setState(e);
                  setCity("");
                }}
                placeholder="Select State"
                label={"State"}
                isSearchable={true}
                error={errorFields[1]}
              />
            )}
          </Col>
          <Col md={6} className={classes.inputField}>
            {(getCitiesOfState(state, country)?.length === 0 && state) ||
            (getStatesOfCountry(country)?.length === 0 && country) ? (
              <Input
                value={city}
                setter={setCity}
                placeholder="Enter City"
                label={"Town / City"}
                inputStyle={{
                  padding: "12px 15px",
                }}
                error={errorFields[2]}
              />
            ) : (
              <DropDown
                options={getCitiesOfState(state, country)}
                getOptionLabel={(options) => {
                  return options["name"];
                }}
                getOptionValue={(options) => {
                  return options["name"];
                }}
                value={
                  typeof city == "string"
                    ? City.getCitiesOfState(
                        Country.getAllCountries()?.find(
                          (item) => item?.name == country
                        )?.isoCode,
                        State?.getStatesOfCountry(
                          Country.getAllCountries()?.find(
                            (item) => item?.name == country
                          )?.isoCode
                        )?.find((item) => item?.name == state)?.isoCode
                      )?.find((item) => item?.name == city)
                    : city
                }
                setter={setCity}
                placeholder="Select City"
                label={"Town / City"}
                isSearchable={true}
                error={errorFields[2]}
              />
            )}
          </Col>
          <Col md={6} className={classes.inputField}>
            <Input
              value={postalCode}
              setter={setPostalCode}
              placeholder="Postal Code"
              label="Postal Code"
              error={handleFieldError("postalCode")}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <Input
              value={address1}
              setter={setAddress1}
              placeholder="Address 1"
              label="Address 1"
              error={handleFieldError("address1")}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <Input
              value={address2}
              setter={setAddress2}
              placeholder="Address 2"
              label="Address 2"
              error={handleFieldError("address2")}
            />
          </Col>
          {/* <Col md={12} className={classes.inputField}>
            <Row>
              <StateCitySelect
                country={country}
                setCountry={setCountry}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                errorFields={["country", "state", "city"]?.map((item) =>
                  handleFieldError(item)
                )}
              />
            </Row>
          </Col> */}
        </Row>
        <div className={classes.buttonContainer}>
          <Button
            label={updateLoading ? "Submitting..." : "Submit"}
            disabled={updateLoading}
            onClick={handleSubmit}
          />
        </div>
      </Container>
    </div>
  );
};

export default ConnectAccount;
