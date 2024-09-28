import React, { useEffect, useState } from "react";
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
import { Get, Patch } from "../../../../Axios/AxiosFunctions";
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
  const [id_number, setIdNo] = useState(null);
  const [idProvided, setIdProvided] = useState(false);
  const [businessUrl, setBusinessUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [docVerified, setDocVerified] = useState(false);
  const [errors, setErrors] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const getData = async () => {
    const url = BaseURL("stripe/account");
    // setLoading(true);
    const response = await Get(url, access_token);

    if (response) {
      setErrors(response?.data?.requirements?.currently_due);
      setFirstName(response?.data?.individual?.first_name);
      setLastName(response?.data?.individual?.last_name);
      setEmail(response?.data?.individual?.email);
      setContact(response?.data?.individual?.phone);
      setDOB(
        new Date(
          response?.data?.individual?.dob?.year,
          response?.data?.individual?.dob?.month - 1,
          response?.data?.individual?.dob?.day
        )
      );
      let _country = Country.getAllCountries()?.find(
        (item) => item?.isoCode == response?.data?.country
      );
      let _state = State?.getStatesOfCountry(_country?.isoCode)?.find(
        (item) => item?.name == response?.data?.individual?.address?.state
      );
      let _city = City.getCitiesOfState(
        _country?.isoCode,
        _state?.isoCode
      )?.find(
        (item) => item?.name == response?.data?.individual?.address?.city
      );
      setCountry(_country);
      setState(_state);
      setCity(_city || response?.data?.individual?.address?.city);
      setPostalCode(response?.data?.individual?.address?.postal_code);
      setAddress1(response?.data?.individual?.address?.line1);
      setAddress2(response?.data?.individual?.address?.line2);
      setBusinessUrl(response?.data?.business_profile?.url);
      setIdProvided(response?.data?.individual?.id_number_provided);
      setDocVerified(
        response?.data?.individual?.verification?.status === "verified"
      );
    }
    // setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
    const errorFieldNames = [];
    let params = {
      firstName,
      lastName,
      email,
      contact,
      dob: {
        day: moment(DOB).date(),
        month: moment(DOB).month() + 1,
        year: moment(DOB).year(),
      },
      // address: {
      country: typeof country === "string" ? country : country?.isoCode,
      state: typeof state === "string" ? state : state?.name,
      city: typeof city === "string" ? city : city?.name,
      postalCode,
      address1,
      address2,
      id_number,
      mcc: "5734",
    };
    !address2 && delete params.address2;
    idProvided && delete params.id_number;

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

    params = {
      individual: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: contact?.length
          ? contact[0] == "+"
            ? contact
            : `+${contact}`
          : "",
        dob: {
          day: moment(DOB).date(),
          month: moment(DOB).month() + 1,
          year: moment(DOB).year(),
        },
        address: {
          country: typeof country === "string" ? country : country?.isoCode,
          state: typeof state === "string" ? state : state?.name,
          city: typeof city === "string" ? city : city?.name,
          postal_code: postalCode,
          line1: address1,
          line2: address2,
        },
        id_number,
      },
      business_profile: {
        url: businessUrl || "https://thewarriorsociety.com/",
        mcc: "5734",
      },
    };
    !address2 && delete params.individual.address.line2;
    idProvided && delete params.individual.id_number;

    setUpdateLoading(true);
    const apiUrl = BaseURL("stripe/update-account");
    const formData = new FormData();
    formData.append("data", JSON.stringify(params));
    !docVerified && formData.append("file", file);
    const response = await Patch(apiUrl, formData, apiHeader(access_token));

    if (response) {
      toast.success("Submited Successfully");
    }
    setUpdateLoading(false);
  };

  const handleFile = (e) => {
    if (!e.target.files?.length) return;
    setFile(e.target.files[0]);
  };

  return (
    <div className={classes.container}>
      <Container>
        {errors?.length ? (
          <div
            className={classes.lightred + " border border-danger rounded p-4"}
          >
            Please fill the missing fields:
            <ul>
              {errors?.map((item, index) => {
                switch (item) {
                  case "individual.first_name":
                    item = "First Name";
                    break;
                  case "individual.last_name":
                    item = "Last Name";
                    break;
                  case "individual.email":
                    item = "Email";
                    break;
                  case "individual.phone":
                    item = "Phone Number";
                    break;
                  case "individual.dob.day":
                    item = "Date Of Birth";
                    break;
                  case "individual.dob.month":
                    item = null;
                    break;
                  case "individual.dob.year":
                    item = null;
                    break;
                  case "individual.address.country":
                    item = "Country";
                    break;
                  case "individual.address.state":
                    item = "State";
                    break;
                  case "individual.address.city":
                    item = "City";
                    break;
                  case "individual.address.postal_code":
                    item = "Postal Code";
                    break;
                  case "individual.address.line1":
                    item = "Address 1";
                    break;
                  case "individual.id_number":
                    item = "Id Number";
                    break;
                  case "individual.ssn_last_4":
                    item = "Id Number";
                    break;
                  case "business_profile.url":
                    item = null;
                    break;
                  case "business_profile.mcc":
                    item = null;
                    break;
                  case "external_account":
                    item = "Bank Account";
                    break;
                  case "settings.payments.statement_descriptor":
                    item = null;
                    break;
                  default:
                    item = item;
                }
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        ) : null}
        {/* <h1>Wallet Details</h1> */}
        <Row className="mt-4">
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
              disabled={true}
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
          <Col md={6} className={classes.inputField}>
            <Input
              value={id_number}
              setter={setIdNo}
              placeholder="Id Number"
              label="Id Number"
              error={handleFieldError("id_number")}
              disabled={idProvided}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <Input
              value={businessUrl}
              setter={setBusinessUrl}
              placeholder="Business Url"
              label="Business Url"
              error={handleFieldError("businessUrl")}
            />
          </Col>
          <Col md={6} className={classes.inputField}>
            <input
              type="file"
              // value={file}
              onChange={handleFile}
              placeholder="File"
              // label="File"
              // error={handleFieldError("file")}
              disabled={docVerified}
            />
            {docVerified && (
              <span className="text-success">Document Verified</span>
            )}
          </Col>
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
