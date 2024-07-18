import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../../Component/Button/Button";
import { DropDown } from "../../../Component/DropDown/DropDown";
import classes from "./StudentSignup.module.css";
// Icons
import { FaLayerGroup } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MultiDiscipline from "../../../Component/MultiDiscipline";
import Tooltip from "../../../Component/Tooltip";
import { profileTooltTipData } from "../../../config/DummyData";
import {
  validateDisciplineErrors,
  validateDisciplineFields,
} from "../../../config/HelperFunction";
// Dependencies
const getPreviousRoleFields = (data, role, page, stateName = "disciplines") => {
  const lastFighterIndex = role.lastIndexOf("fighter");
  const lastTrainerIndex = role.lastIndexOf("trainer");
  const lastMaxIndex = Math.max(lastFighterIndex, lastTrainerIndex);
  const lastMinIndex = Math.min(lastFighterIndex, lastTrainerIndex);
  const firstSelectedRole =
    lastMaxIndex < page - 1
      ? role[lastMaxIndex]
      : lastMinIndex < page - 1
      ? role[lastMinIndex]
      : null;
  if (data && data?.studentDetails?.[stateName]) {
    return JSON.parse(JSON.stringify(data?.studentDetails?.[stateName]));
  } else if (firstSelectedRole) {
    return JSON.parse(
      JSON.stringify(data[`${firstSelectedRole}Details`]?.[stateName])
    );
  }
  return null;
};
export default function StudentSignup({
  data,
  setData,
  page,
  setPage,
  onClick,
  isSubmit,
  loading,
  role,
}) {
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
  const [booleanErrors, setBooleanErrors] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const handleSignUp = async () => {
    const errorFieldNames = [];
    let params = {
      association: association?.map((ele) => {
        return { association: ele._id };
      }),
      affiliatedGyms: affiliatedGyms?.map((ele) => {
        return { gym: ele };
      }),
      disciplines,
    };
    if (!params?.disciplines?.[0]?.domain) {
      errorFieldNames.push("disciplines");
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    const disciplineErroBooleans = validateDisciplineErrors(params.disciplines);
    if (disciplineErroBooleans?.filter((ele) => ele.length > 0)?.length > 0) {
      setBooleanErrors(Array(disciplineErroBooleans.length).fill(true));
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    if (!validateDisciplineFields(params.disciplines)) {
      return;
    }
    setData({ ...data, studentDetails: { ...params } });
    isSubmit
      ? await onClick({ studentDetails: { ...params } })
      : setPage((prev) => prev + 1);
  };
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;
    return (
      Array.isArray(eval(theField)) &&
      !eval(theField)?.[0]?.domain &&
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
            <h1>Student Details</h1>
            <div className={classes.form}>
              <Col lg={12}>
                <MultiDiscipline
                  discipline={disciplines}
                  setDiscipline={setDisciplines}
                  disciplineLabel={
                    <h3 className={classes.lableTooltip}>
                      Discipline(s) Studied
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {" "}
                          {profileTooltTipData?.student?.fightingDisipline}
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
              <Row>
                <Col lg={12} className={classes.inputField}>
                  <DropDown
                    value={association}
                    labelClassName={classes.lableToolTipIcon}
                    setter={setAssociation}
                    label="Associations"
                    placeholder="Club Name here"
                    labelLeftIcon={<FaLayerGroup />}
                    cus
                    labelRightIcon={
                      <Tooltip
                        position="bottom"
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.student?.associations}
                        </span>
                      </Tooltip>
                    }
                    options={associationOptions}
                    optionLabel={"associationName"}
                    optionValue={"_id"}
                    isMulti={true}
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
                    isMulti={true}
                    affilatedAllow={true}
                    labelRightIcon={
                      <Tooltip
                        className={classes.tooltipDiv}
                        position="bottom"
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.student?.gym}</span>
                      </Tooltip>
                    }
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
}
