import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";
import { FaLayerGroup, FaPeopleGroup } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import { LiaDumbbellSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddExperience from "../../../Component/AddExperience";
import { Button } from "../../../Component/Button/Button";
import { Checkbox } from "../../../Component/Checkbox/Checkbox";
import { DropDown } from "../../../Component/DropDown/DropDown";
import MultiDiscipline from "../../../Component/MultiDiscipline";
import { TextArea } from "../../../Component/TextArea";
import Tooltip from "../../../Component/Tooltip";
import { profileTooltTipData } from "../../../config/DummyData";
import {
  validateDisciplineErrors,
  validateDisciplineFields,
  validateExperienceErrors,
  validateExperiencesField,
} from "../../../config/HelperFunction";
import classes from "./Signup.module.css";
const getPreviousRoleFields = (data, role, page, stateName = "disciplines") => {
  const lastFighterIndex = role.lastIndexOf("student");
  const lastTrainerIndex = role.lastIndexOf("fighter");
  const lastMaxIndex = Math.max(lastFighterIndex, lastTrainerIndex);
  const lastMinIndex = Math.min(lastFighterIndex, lastTrainerIndex);

  const firstSelectedRole =
    lastMaxIndex < page - 1
      ? role[lastMaxIndex]
      : lastMinIndex < page - 1
      ? role[lastMinIndex]
      : null;
  if (data && data?.trainerDetails?.[stateName]) {
    return JSON.parse(JSON.stringify(data?.trainerDetails?.[stateName]));
  } else if (firstSelectedRole) {
    return JSON.parse(
      JSON.stringify(data[`${firstSelectedRole}Details`]?.[stateName])
    );
  }
  return null;
};
const TrainerBioForm = ({
  data,
  setData,
  setPage,
  page,
  role,
  onClick,
  loading,
  isSubmit,
}) => {
  const {
    publicFields: { associations: associationOptions, gyms: gymOptions },
  } = useSelector((state) => state.commonReducer);

  const [disciplines, setDisciplines] = useState(
    getPreviousRoleFields(data, role, page, "disciplines") || [{}]
  );
  const [association, setAssociation] = useState(
    getPreviousRoleFields(data, role, page, "association")?.map((ele) =>
      associationOptions?.find((item) => item._id === ele?.association)
    ) || []
  );
  const [affiliatedGyms, setAffiliatedGyms] = useState(
    getPreviousRoleFields(data, role, page, "affiliatedGyms")?.map((ele) =>
      gymOptions?.find((item) => item._id === ele?.gym?._id)
    ) || []
  );
  const [selectFees, setSelectFees] = useState([]);
  const [bio, setBio] = useState(data?.trainerDetails?.bio || null);
  const [booleanDiscipline, setBooleanDiscipline] = useState([]);
  const [booleanExperience, setBooleanExperience] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  const [experiences, setExperiences] = useState(
    data?.trainerDetails?.experiences || [
      {
        designation: "",
        organization: "",
        startDate: null,
        endDate: null,
        information: "",
        stillWorking: false,
      },
    ]
  );
  const handleSignUp = async () => {
    const errorFieldNames = [];
    let params = {
      association: association?.map((ele) => {
        return { association: ele._id };
      }),
      affiliatedGyms: affiliatedGyms?.map((ele) => {
        return { gym: ele };
      }),
      experiences,
      disciplines,
      bio,
    };
    for (let key in params) {
      if (["affiliatedGyms", "association"].includes(key)) continue;
      if (
        params[key] == "" ||
        params[key] == null ||
        params[key]?.length == 0
      ) {
        errorFieldNames.push(key);
      }
      if (key === "disciplines" && !params[key]?.[0]?.domain) {
        errorFieldNames.push("disciplines");
      }
    }
    const disciplineErrorBooleans = validateDisciplineErrors(
      params.disciplines
    );
    const experienceErrorBooleans = validateExperienceErrors(
      params.experiences
    );
    const hasDisciplineErrors = disciplineErrorBooleans?.some(
      (ele) => ele.length > 0
    );
    const hasExperienceErrors = experienceErrorBooleans?.some(
      (ele) => ele.length > 0
    );
    if (
      hasDisciplineErrors ||
      hasExperienceErrors ||
      errorFieldNames.length > 0
    ) {
      if (errorFieldNames.length > 0) {
        setErrorFields(errorFieldNames);
      }
      if (hasDisciplineErrors && !errorFieldNames?.includes("disciplines")) {
        setBooleanDiscipline(Array(disciplineErrorBooleans.length).fill(true));
      }
      if (hasExperienceErrors) {
        setBooleanExperience(Array(experienceErrorBooleans.length).fill(true));
      }
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    if (!validateDisciplineFields(params.disciplines)) {
      return;
    }
    if (!validateExperiencesField(params.experiences)) {
      return;
    }
    params = {
      ...params,
      availableForLesson: selectFees?.includes("Available For Private Lessons"),
      availableForSparring: selectFees?.includes("Available For Sparring"),
    };
    setData({ ...data, trainerDetails: { ...params } });
    isSubmit
      ? await onClick({ trainerDetails: { ...params } })
      : setPage((prev) => prev + 1);
  };
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;
    return (
      ((Array.isArray(eval(theField)) && !eval(theField)?.[0]?.domain) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };
  useEffect(() => {
    setSelectFees(() => {
      const availableOptions = [];
      if (data?.trainerDetails?.availableForLesson) {
        availableOptions.push("Available For Private Lessons");
      }
      if (data?.trainerDetails?.availableForSparring) {
        availableOptions.push("Available For Sparring");
      }
      return availableOptions;
    });
  }, []);
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
            <h1>Trainer Details</h1>
            <div className={classes.form}>
              <Row className="gy-4">
                <Col lg={12} className={classes.inputField}>
                  <DropDown
                    value={association}
                    setter={setAssociation}
                    label="Associations"
                    placeholder="Club Name here"
                    labelLeftIcon={<FaLayerGroup />}
                    options={associationOptions}
                    optionLabel={"associationName"}
                    optionValue={"_id"}
                    isMulti={true}
                    labelRightIcon={
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.trainer?.association}</span>
                      </Tooltip>
                    }
                  />
                </Col>
                <Col lg={12} className={classes.inputField}>
                  <MultiDiscipline
                    discipline={disciplines}
                    setDiscipline={setDisciplines}
                    disciplineLabel={
                      <h3 className={classes.lableTooltip}>
                        Discipline(s)
                        <Tooltip
                          className={classes.tooltipDiv}
                          icon={
                            <RxInfoCircled className={classes.tooltipSvg} />
                          }
                        >
                          <span>
                            {" "}
                            {profileTooltTipData?.trainer?.trainingDisiplines}
                          </span>
                        </Tooltip>
                      </h3>
                    }
                    activateErrorFields={booleanDiscipline}
                    setActivateErrorFields={setBooleanDiscipline}
                  />
                  {handleFieldError("disciplines") && (
                    <p className={`${[classes.errorText].join(" ")}`}>
                      {"Atleast one discipline is required"}
                    </p>
                  )}
                </Col>
                <Col md={12} className={classes.inputField}>
                  <AddExperience
                    value={experiences}
                    setter={setExperiences}
                    activateErrorFields={booleanExperience}
                    setActivateErrorFields={setBooleanExperience}
                  />
                </Col>
                <Col lg={12} className={classes.inputField}>
                  <DropDown
                    value={affiliatedGyms}
                    setter={setAffiliatedGyms}
                    labelLeftIcon={<LiaDumbbellSolid />}
                    label={"Affiliated Gyms"}
                    placeholder={"Affiliated Gyms"}
                    options={gymOptions?.filter((ele) => ele?.name)}
                    optionLabel={"name"}
                    optionValue={"_id"}
                    labelRightIcon={
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.fighter?.affiliatedGyms}
                        </span>
                      </Tooltip>
                    }
                    isMulti={true}
                    affilatedAllow={true}
                  />
                </Col>
                <Col lg={12} className={classes.inputField}>
                  <TextArea
                    labelLeftIcon={<AiFillFileText />}
                    label={"Bio"}
                    placeholder={"Bio...."}
                    value={bio}
                    setter={setBio}
                    error={handleFieldError("bio")}
                  />
                </Col>
                <div className={classes.checkBox}>
                  <div>
                    <Checkbox
                      value={selectFees}
                      setValue={setSelectFees}
                      label={"Available For Private Lessons"}
                      labelIcon={<FaPeopleGroup />}
                    />
                  </div>
                  <div>
                    <Checkbox
                      value={selectFees}
                      setValue={setSelectFees}
                      label={"Available For Sparring"}
                      labelIcon={<GiCrossedSwords />}
                    />
                  </div>
                </div>
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

export default TrainerBioForm;
