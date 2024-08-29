import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillFileText } from "react-icons/ai";
import { FaLayerGroup, FaPeopleGroup } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import { LiaDumbbellSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../../Component/Button/Button";
import { Checkbox } from "../../../Component/Checkbox/Checkbox";
import { DropDown } from "../../../Component/DropDown/DropDown";
import MultiDiscipline from "../../../Component/MultiDiscipline";
import { TextArea } from "../../../Component/TextArea";
import Tooltip from "../../../Component/Tooltip";
import { weightOptions } from "../../../config/Data";
import { profileTooltTipData } from "../../../config/DummyData";
import {
  validateDisciplineErrors,
  validateDisciplineFields,
} from "../../../config/HelperFunction";
import classes from "./Signup.module.css";
import { Input } from "../../../Component/Input/Input";
import { ImUser } from "react-icons/im";
const getPreviousRoleFields = (data, role, page, stateName = "disciplines") => {
  const lastFighterIndex = role.lastIndexOf("student");
  const lastTrainerIndex = role.lastIndexOf("trainer");
  const lastMaxIndex = Math.max(lastFighterIndex, lastTrainerIndex);
  const lastMinIndex = Math.min(lastFighterIndex, lastTrainerIndex);
  const firstSelectedRole =
    lastMaxIndex < page - 1
      ? role[lastMaxIndex]
      : lastMinIndex < page - 1
      ? role[lastMinIndex]
      : null;
  if (data && data?.fighterDetails) {
    return JSON.parse(JSON.stringify(data?.fighterDetails?.[stateName]));
  } else if (firstSelectedRole) {
    return JSON.parse(
      JSON.stringify(data[`${firstSelectedRole}Details`]?.[stateName])
    );
  }
  return [{}];
};
const FighterBioForm = ({
  data,
  setData,
  page,
  setPage,
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
    getPreviousRoleFields(data, role, page, "association")
      ?.map((ele) =>
        associationOptions?.find((item) => item._id === ele?.association)
      )
      ?.filter(Boolean) || []
  );
  const [affiliatedGyms, setAffiliatedGyms] = useState(
    getPreviousRoleFields(data, role, page, "affiliatedGyms")?.map((ele) =>
      gymOptions?.find((item) => item._id === ele?.gym?._id)
    ) || []
  );

  const [weight, setWeight] = useState(
    weightOptions?.find((ele) => ele?.value == data?.fighterDetails?.weight) ||
      null
  );

  const [selectFees, setSelectFees] = useState([]);
  const [bio, setBio] = useState(data?.fighterDetails?.bio || null);
  const [nickName, setNickName] = useState(data?.fighterDetails?.nickName || null);

  const [booleanErrors, setBooleanErrors] = useState([]);
  const [errorFields, setErrorFields] = useState([]);
  const handleSignUp = async () => {
    const errorFieldNames = [];

    let params = {
      bio,
      nickName,
      association: association?.map((ele) => {
        return { association: ele._id };
      }),
      affiliatedGyms: affiliatedGyms?.map((ele) => {
        return { gym: ele };
      }),
      weight: weight?.value,
      disciplines,
    };
    for (let key in params) {
      if (["affiliatedGyms", "association"].includes(key)) continue;
      if (
        params[key] == "" ||
        params[key] == null ||
        params[key].length === 0
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
    const hasDisciplineErrors = disciplineErrorBooleans?.some(
      (ele) => ele.length > 0
    );
    if (hasDisciplineErrors || errorFieldNames.length > 0) {
      if (errorFieldNames.length > 0) {
        setErrorFields(errorFieldNames);
      }
      if (hasDisciplineErrors && !errorFieldNames?.includes("disciplines")) {
        setBooleanErrors(Array(disciplineErrorBooleans.length).fill(true));
      }
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    if (!validateDisciplineFields(params.disciplines)) {
      return;
    }
    params = {
      ...params,
      availableForFight: selectFees?.includes("Available For Fights"),
      availableForSparring: selectFees?.includes("Available For Sparring"),
    };
    setData({ ...data, fighterDetails: { ...params } });
    isSubmit
      ? await onClick({ fighterDetails: { ...params } })
      : setPage((prev) => prev + 1);
  };
  useEffect(() => {
    setSelectFees(() => {
      const availableOptions = [];
      if (data?.fighterDetails?.availableForFight) {
        availableOptions.push("Available For Fights");
      }
      if (data?.fighterDetails?.availableForSparring) {
        availableOptions.push("Available For Sparring");
      }
      return availableOptions;
    });
  }, []);
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;
    return (
      ((Array.isArray(eval(theField)) && !eval(theField)?.[0]?.domain) ||
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
            <h1>Fighter Details</h1>
            <div className={classes.form}>
              <Row className="gy-4">
                <Col lg={12} className={classes.inputField}>
                  <MultiDiscipline
                    discipline={disciplines}
                    setDiscipline={setDisciplines}
                    disciplineLabel={
                      <h3 className={classes.lableTooltip}>
                        Fighting Discipline(s)
                        <Tooltip
                          className={classes.tooltipDiv}
                          icon={
                            <RxInfoCircled className={classes.tooltipSvg} />
                          }
                        >
                          <span>
                            {" "}
                            {profileTooltTipData?.fighter?.fightingDisipline}
                          </span>
                        </Tooltip>
                      </h3>
                    }
                    activateErrorFields={booleanErrors}
                    setActivateErrorFields={setBooleanErrors}
                  />
                  {handleFieldError("disciplines") && (
                    <p className={`${[classes.errorText].join(" ")}`}>
                      {"Atleast one discipline is required"}
                    </p>
                  )}
                </Col>
                <Col md={12} className={classes.inputField}>
                  <DropDown
                    setter={(e) => {
                      setWeight(e);
                    }}
                    value={weight}
                    options={weightOptions}
                    placeholder={"Weight"}
                    labelClassName={classes.labelStyle}
                    error={handleFieldError("weight")}
                    errorText={"Weight is required"}
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
                  <DropDown
                    value={association}
                    setter={setAssociation}
                    label="Associations"
                    placeholder="Club Name here"
                    labelLeftIcon={<FaLayerGroup />}
                    labelRightIcon={
                      <Tooltip
                        position="right"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.fighter?.association}</span>
                      </Tooltip>
                    }
                    options={associationOptions}
                    optionLabel={"associationName"}
                    optionValue={"_id"}
                    isMulti={true}
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
                <Col xl={12} className={classes.inputField}>
                  <Input
                    value={nickName}
                    setter={setNickName}
                    placeholder={"Nick Name"}
                    label={"Nick Name"}
                    labelLeftIcon={<ImUser />}
                    error={handleFieldError("nickName")}
                  />
                </Col>
                <div className={classes.checkBox}>
                  <div>
                    <Checkbox
                      value={selectFees}
                      setValue={setSelectFees}
                      label={"Available For Fights"}
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

export default FighterBioForm;
