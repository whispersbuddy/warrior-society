import moment from "moment";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaPeopleRoof, FaUserTie } from "react-icons/fa6";
import { MdOutlineAddBox } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { validateExperiencesField } from "../../config/HelperFunction";
import ResponsiveDatePickers from "../Calender/Calender";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea";
import classes from "./AddExperience.module.css";

const AddExperience = ({
  setter,
  value,
  addMore = true,
  activateErrorFields,
}) => {
  const handleAdd = () => {
    if (!validateExperiencesField(value)) {
      return;
    }
    setter((ele) => [
      ...ele,
      {
        designation: "",
        organization: "",
        startDate: null,
        endDate: null,
        information: "",
        stillWorking: false,
      },
    ]);
  };
  return (
    <div className={classes.experienceContainer}>
      <p className={classes.addIcon}>
        <p>
          <FaUserTie /> Previous Experience
        </p>
        {addMore && (
          <MdOutlineAddBox cursor={"pointer"} onClick={() => handleAdd()} />
        )}
      </p>
      {value?.map((ele, index) => (
        <div className={value?.length !== 1 && classes.divBox}>
          <div
            className={classes.inputContainer}
            style={{
              marginTop: value?.length !== 1 ? "30px" : "0px",
            }}
          >
            <div className={classes.rowCOl}>
              <Row>
                <Col md={12} className={`${classes.firstField}`}>
                  <Input
                    value={ele?.designation}
                    setter={(e) => {
                      const tempArr = [...value];
                      tempArr[index] = { ...tempArr[index], designation: e };
                      setter(tempArr);
                    }}
                    placeholder={"Designation Here"}
                    error={!ele?.designation && activateErrorFields[index]}
                    errorText={"Designation is required"}
                  />
                </Col>
                <Col md={12} className={classes.inputField}>
                  <Input
                    value={ele?.organization}
                    setter={(e) => {
                      const tempArr = [...value];
                      tempArr[index] = { ...tempArr[index], organization: e };
                      setter(tempArr);
                    }}
                    placeholder={"Organization Here"}
                    labelLeftIcon={<FaPeopleRoof />}
                    error={!ele?.organization && activateErrorFields[index]}
                    errorText={"Organization is required"}
                  />
                </Col>
                <Col md={6} className={classes.inputField}>
                  <ResponsiveDatePickers
                    setter={(e) => {
                      const tempArr = [...value];
                      tempArr[index] = { ...tempArr[index], startDate: e };
                      setter(tempArr);
                    }}
                    value={ele?.startDate}
                    // maxValue={true}
                    placeholder={"Start Date"}
                    error={!ele?.startDate && activateErrorFields[index]}
                    errorText={"Start Date is required"}
                  />{" "}
                </Col>
                {!ele?.stillWorking && (
                  <Col md={6} className={classes.inputField}>
                    <ResponsiveDatePickers
                      // maxValue={true}
                      setter={(e) => {
                        const tempArr = [...value];
                        tempArr[index] = { ...tempArr[index], endDate: e};
                        setter(tempArr);
                      }}
                      value={ele?.endDate}
                      placeholder={"End Date"}
                      error={!ele?.endDate && activateErrorFields[index]}
                      errorText={"End Date is required"}
                    />{" "}
                  </Col>
                )}
                <Col md={12} className={classes.inputField}>
                  <TextArea
                    setter={(e) => {
                      const tempArr = [...value];
                      tempArr[index] = { ...tempArr[index], information: e };
                      setter(tempArr);
                    }}
                    value={ele?.information}
                    placeholder={"Enter Information"}
                    error={!ele?.information && activateErrorFields[index]}
                    errorText={"Information is required"}
                  />
                </Col>
                <Col md={12}>
                  <Checkbox
                    setValue={(e) => {
                      const tempArr = [...value];
                      tempArr[index] = {
                        ...tempArr[index],
                        endDate: e ? moment().format() : null,
                        stillWorking: tempArr[index]?.stillWorking ? false : e,
                      };
                      setter(tempArr);
                    }}
                    label={"Are you still working here"}
                    value={
                      ele?.stillWorking ? "Are you still working here" : ""
                    }
                  />
                </Col>
              </Row>
            </div>
            {value?.length !== 1 && (
              <div
                className={classes.deleteBtn}
                onClick={() => {
                  const tempArr = [...value];
                  tempArr.splice(index, 1);
                  setter(tempArr);
                }}
              >
                <RxCross2 />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddExperience;
