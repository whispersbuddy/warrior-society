import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsInfoCircle, BsTools } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import { ImUser } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RxInfoCircled } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../../Component/Button/Button";
import ResponsiveDatePickers from "../../../Component/Calender/Calender";
import { DropDown } from "../../../Component/DropDown/DropDown";
import { Input } from "../../../Component/Input/Input";
import Maps from "../../../Component/MapAndPlaces";
import { TextArea } from "../../../Component/TextArea";
import Tooltip from "../../../Component/Tooltip";
import { disciplineOptions, martialArtTypes } from "../../../config/Data";
import { profileTooltTipData } from "../../../config/DummyData";
import classes from "./Signup.module.css";

const BioForm = ({
  data,
  setData,
  page,
  setPage,
  onClick,
  loading,
  isSubmit,
}) => {
  const {
    publicFields: { equipment: equipmentOptions },
  } = useSelector((state) => state.commonReducer);

  const [name, setName] = useState(data?.schoolDetails?.name || null);
  const [schoolDescription, setSchoolDescription] = useState(
    data?.schoolDetails?.bio || ""
  );
  const [disciplines, setDisciplines] = useState([]);
  const [noOfStudents, setNoOfStudents] = useState(
    data?.schoolDetails?.noOfStudents || null
  );
  const [dateEstablished, setDateEstablished] = useState(
    data?.schoolDetails?.dateEstablished || ""
  );
  const [noOfInstructors, setNoOfInstructors] = useState(
    data?.schoolDetails?.noOfInstructors || null
  );
  const [additionInformation, setAdditionInformation] = useState(
    data?.schoolDetails?.additionInformation || null
  );
  const [special, setSpecial] = useState(data?.schoolDetails?.special || null);
  const [coordinates, setCoordinates] = useState(
    data?.schoolDetails?.location?.coordinates?.length > 0
      ? {
          lat: data?.schoolDetails?.location?.coordinates[1],
          lng: data?.schoolDetails?.location?.coordinates[0],
        }
      : ""
  );
  const [address, setAddress] = useState(data?.schoolDetails?.address || "");
  const [addressDetail, setAddressDetail] = useState("");
  const [equipments, setEquipments] = useState([]);
  const [duesInformation, setDuesInformation] = useState(
    data?.schoolDetails?.duesInformation || {
      monthlyDueMin: "",
      monthlyDueMax: "",
      privateMinFees: "",
      privateMaxFees: "",
      dropin: "",
    }
  );
  const [types, setTypes] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setDisciplines(
      data?.schoolDetails?.disciplines?.map((ele) =>
        disciplineOptions?.find((find) => find.value === ele?.title)
      )
    );
    setEquipments(
      data?.schoolDetails?.equipments?.map((ele) =>
        equipmentOptions?.find((find) => find._id === ele?._id)
      )
    );
  }, [page]);

  useEffect(() => {
    // console.log(types);
    if (types.some((e) => e?.value === "unselect")) {
      console.log("unselect");

      setSelected(false);
      setTypes([]);
    } else if (types.some((e) => e?.value === "all")) {
      setSelected(true);
      setTypes(martialArtTypes.slice(1));
    }
    if (selected) {
      martialArtTypes[0].label = "Unselect";
      martialArtTypes[0].value = "unselect";
    } else {
      martialArtTypes[0].label = "Select All";
      martialArtTypes[0].value = "all";
    }
    console.log(selected);
  }, [selected, types]);

  const [errorFields, setErrorFields] = useState([]);
  const handleSignUp = async () => {
    const errorFieldNames = [];
    let params = {
      name,
      bio: schoolDescription,
      noOfStudents: noOfStudents ? noOfStudents * 1 : "",
      disciplines: disciplines?.map((ele) => {
        return {
          title: ele?.value,
          ...(ele.value === "martial arts" && {
            disciplineDiscription: types?.map((e) => e?.value).join(","),
          }),
        };
      }),
      dateEstablished: dateEstablished
        ? moment(dateEstablished?.$d || dateEstablished)?.format("MM/DD/YYYY")
        : "",
      noOfInstructors: noOfInstructors ? noOfInstructors * 1 : "",
      duesInformation,
      // additionInformation,
      // special,
      location: {
        type: "Point",
        coordinates: coordinates ? [coordinates.lng, coordinates.lat] : [],
      },
      address,
      equipments: equipments?.map((ele) => {
        return {
          _id: ele?._id,
        };
      }),
    };
    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        errorFieldNames.push(key);
      }
      if (
        ["disciplines", "equipments"]?.includes(key) &&
        params[key]?.length === 0
      ) {
        errorFieldNames.push(key);
      }
      if (key == "duesInformation") {
        for (let dueKey in duesInformation) {
          if (params[key][dueKey] == "" || params[key][dueKey] == null) {
            errorFieldNames.push(dueKey);
          }
        }
      }
    }
    if (errorFieldNames.length > 0) {
      if (errorFieldNames.length > 0) {
        setErrorFields(errorFieldNames);
      }
      return toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
    }
    if (moment(params.dateEstablished).isAfter(dayjs())) {
      return toast.error(
        "Date Established cannot be greater than current date!"
      );
    }
    if (
      Number(duesInformation?.monthlyDueMin) >
      Number(duesInformation?.monthlyDueMax)
    ) {
      return toast.error(
        "Monthly due min fees cannot be greater than Monthly due max fees!"
      );
    }
    if (
      Number(duesInformation?.privateMinFees) >
      Number(duesInformation?.privateMaxFees)
    ) {
      return toast.error(
        "Private Min fees cannot be greater than Private Max fees !"
      );
    }
    setData({ ...data, schoolDetails: { ...params } });
    isSubmit
      ? await onClick({ schoolDetails: { ...params } })
      : setPage((prev) => prev + 1);
  };
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;
    return (
      ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };
  return (
    <>
      <style>
        {`
      @media screen and (max-width:400px){

        .container{
          max-width:100% !important
        }
      }
      `}
      </style>
      <div className={classes.pageMain}>
        <Container>
          <div className={classes.main}>
            <h1>GYM Details</h1>
            <div className={classes.form}>
              <Row className="gy-4">
                <Col md={12} className={classes.inputField}>
                  <Input
                    setter={setName}
                    value={name}
                    label={"Name Of School/GYM"}
                    placeholder={"Name Of School/GYM"}
                    labelLeftIcon={<PiUsersThreeLight />}
                    error={handleFieldError("name", undefined, errorFields)}
                  />
                </Col>
                <Col md={12} className={classes.inputField}>
                  <TextArea
                    value={schoolDescription}
                    setter={setSchoolDescription}
                    labelLeftIcon={<BsInfoCircle />}
                    label={"About School"}
                    placeholder={"About School...."}
                    error={handleFieldError("bio", "schoolDescription")}
                  />
                </Col>
                <Col md={6} className={classes.inputField}>
                  <Input
                    setter={setNoOfStudents}
                    value={noOfStudents}
                    regexType={"number"}
                    labelLeftIcon={<ImUser />}
                    label={"No. Of Students"}
                    placeholder={"10"}
                    error={handleFieldError("noOfStudents")}
                  />
                </Col>
                <Col md={6} className={classes.inputField}>
                  <Input
                    setter={setNoOfInstructors}
                    value={noOfInstructors}
                    regexType={"number"}
                    labelLeftIcon={<ImUser />}
                    label={"No. Of Instructors"}
                    placeholder={"10"}
                    error={handleFieldError("noOfInstructors")}
                  />
                </Col>

                <Col md={12} className={`${classes.inputField}`}>
                  <ResponsiveDatePickers
                    value={dateEstablished}
                    calenderLabel={"Date Established"}
                    placeholder="Date Established"
                    setter={setDateEstablished}
                    labelIcon={<SlCalender />}
                    error={handleFieldError("dateEstablished")}
                    // maxValue={true}
                  />{" "}
                </Col>
                <Col md={12} className={classes.inputField}>
                  <DropDown
                    setter={setDisciplines}
                    value={disciplines}
                    options={disciplineOptions}
                    label={"Discipline(s)"}
                    placeholder={"Discipline(s)"}
                    labelLeftIcon={<GiCrossedSwords />}
                    labelClassName={classes.labelStyle}
                    isMulti={true}
                    labelRightIcon={
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.gym?.fightingDisipline}
                        </span>
                      </Tooltip>
                    }
                    error={handleFieldError("disciplines")}
                    closeMenuOnSelect={false}
                  />
                </Col>
                {disciplines
                  ?.map((e) => e?.value)
                  ?.includes("martial arts") && (
                  <div className={classes.inputField}>
                    <DropDown
                      value={types}
                      showIndicatorAtTop={true}
                      options={martialArtTypes}
                      placeholder={"Martial Arts Types"}
                      optionLabel={"label"}
                      optionValue={"value"}
                      setter={setTypes}
                      closeMenuOnSelect={selected}
                      isMulti={true}
                    />
                  </div>
                )}
                <Col md={12}>
                  <Row>
                    <p className={classes.duesHeading}>
                      <FaMoneyCheckDollar /> Dues Information
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.gym?.dues}</span>
                      </Tooltip>
                    </p>

                    <Col
                      md={6}
                      className={[classes.inputField, classes.duesField].join(
                        " "
                      )}
                    >
                      <Input
                        setter={(e) => {
                          setDuesInformation((prev) => {
                            return { ...prev, monthlyDueMin: e };
                          });
                        }}
                        value={duesInformation?.monthlyDueMin}
                        regexType={"number"}
                        placeholder={"Monthly Due Min Fees ($)"}
                        error={
                          errorFields?.includes("monthlyDueMin") &&
                          !duesInformation?.monthlyDueMin
                        }
                        errorText={"Monthly Due Min Fees is required"}
                      />
                    </Col>

                    <Col
                      md={6}
                      className={[classes.inputField, classes.duesField].join(
                        " "
                      )}
                    >
                      <Input
                        setter={(e) => {
                          setDuesInformation((prev) => {
                            return { ...prev, monthlyDueMax: e };
                          });
                        }}
                        value={duesInformation?.monthlyDueMax}
                        regexType={"number"}
                        placeholder={"Monthly Due Max Fees ($)"}
                        error={
                          errorFields?.includes("monthlyDueMax") &&
                          !duesInformation?.monthlyDueMax
                        }
                        errorText={"Monthly Due Max Fees is required"}
                      />
                    </Col>
                    <Col md={6} className={classes.inputField}>
                      <Input
                        setter={(e) => {
                          setDuesInformation((prev) => {
                            return { ...prev, privateMinFees: e };
                          });
                        }}
                        value={duesInformation?.privateMinFees}
                        regexType={"number"}
                        placeholder={"Private Lesson Min Fees ($)"}
                        error={
                          errorFields?.includes("privateMinFees") &&
                          !duesInformation?.privateMinFees
                        }
                        errorText={"Private Lesson Min Fees is required"}
                      />
                    </Col>
                    <Col md={6} className={classes.inputField}>
                      <Input
                        setter={(e) => {
                          setDuesInformation((prev) => {
                            return { ...prev, privateMaxFees: e };
                          });
                        }}
                        value={duesInformation?.privateMaxFees}
                        regexType={"number"}
                        placeholder={"Private Lesson Max Fees ($)"}
                        error={
                          errorFields?.includes("privateMaxFees") &&
                          !duesInformation?.privateMaxFees
                        }
                        errorText={"Private Lesson Max Fees is required"}
                      />
                    </Col>
                    <Col md={12} className={classes.inputField}>
                      <Input
                        setter={(e) => {
                          setDuesInformation((prev) => {
                            return { ...prev, dropin: e };
                          });
                        }}
                        value={duesInformation?.dropin}
                        regexType={"number"}
                        placeholder={"DropIn Fees ($)"}
                        error={
                          errorFields?.includes("dropin") &&
                          !duesInformation?.dropin
                        }
                        errorText={"Dropin Fees is required"}
                      />
                    </Col>
                    {/* <Col md={12} className={classes.inputField}>
                      <TextArea
                        value={additionInformation}
                        setter={setAdditionInformation}
                        placeholder={"Additional information"}
                        error={handleFieldError("additionInformation")}
                        errorText={"Additional information is required"}
                      />
                    </Col>
                    <Col md={12} className={classes.inputField}>
                      <TextArea
                        value={special}
                        setter={setSpecial}
                        placeholder={"Special"}
                        error={handleFieldError("special")}
                        errorText={"Special is required"}
                      />
                    </Col> */}
                  </Row>
                </Col>
                <Col className={classes.inputField} lg={12}>
                  <p className={classes.location}>
                    <IoLocationSharp /> Location
                  </p>
                  <Row>
                    <Col lg={12} className={classes.rowCol}>
                      <Maps
                        setCoordinates={setCoordinates}
                        setAddress={setAddress}
                        setPlaceDetail={(e) => {
                          setAddressDetail(e);
                        }}
                        address={address}
                        placeClass={classes.placeClass}
                        type="place"
                      />
                      {handleFieldError("address") && (
                        <p className={`${[classes.errorText].join(" ")}`}>
                          {"Address is required"}
                        </p>
                      )}
                    </Col>

                    {coordinates && (
                      <Col lg={12} className={classes.mapClass}>
                        <Maps
                          location={coordinates}
                          setCoordinates={setCoordinates}
                          setAddress={setAddress}
                          setPlaceDetail={(e) => {
                            setAddressDetail(e);
                          }}
                          type="editAbleMap"
                        />
                      </Col>
                    )}
                  </Row>
                </Col>
                <Col lg={12} className={classes.inputField}>
                  <DropDown
                    labelLeftIcon={<BsTools />}
                    label={"Amenities"}
                    options={equipmentOptions}
                    value={equipments}
                    labelRightIcon={
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.gym?.amenities}</span>
                      </Tooltip>
                    }
                    setter={setEquipments}
                    placeholder={"Amenities"}
                    isMulti={true}
                    optionLabel={"equipmentName"}
                    optionValue={"_id"}
                    error={handleFieldError("equipments")}
                    closeMenuOnSelect={false}
                  />
                </Col>
              </Row>
              <div className={classes.submitBtn}>
                <Button
                  disabled={loading}
                  onClick={handleSignUp}
                  label={
                    loading ? "Please wait..." : isSubmit ? "Sign Up" : "Next"
                  }
                  customStyle={{
                    backgroundColor: "var(--secondary-color)",
                  }}
                />
              </div>
              <div className={classes.submitBtn}>
                <Button
                  disabled={loading}
                  onClick={() => setPage((prev) => prev - 1)}
                  label={"Previous"}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BioForm;
