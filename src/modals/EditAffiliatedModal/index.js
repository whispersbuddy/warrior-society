import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import { DropDown } from "../../Component/DropDown/DropDown";
import { Input } from "../../Component/Input/Input";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./EditAffiliatedModal.module.css";
const EditAffiliatedModal = ({
  setShow,
  show,
  isLoading,
  onClick,
  data,
  roleAffiliated,
}) => {
  const { publicFields } = useSelector((state) => state.commonReducer);
  const [gym, setGym] = useState("");
  const [grade, setGrade] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (data != null) {
      setGym(publicFields?.gyms?.find((ele) => ele?._id === data?.gym?._id));
      setGrade(data?.grade);
      setStartDate(data?.startDate || null);
      setEndDate(data?.endDate || null);
    }
  }, []);
  const handleClick = async () => {
    const params = {
      gym,
      startDate: startDate
        ? moment(startDate?.$d || startDate).format("MM/DD/YYYY")
        : "",
      endDate: endDate
        ? moment(endDate?.$d || endDate).format("MM/DD/YYYY")
        : "",
      grade,
    };

    for (let key in params) {
      if (!params[key]) {
        return toast.error(
          `Please select ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()}`
        );
      }
      if (
        ["startDate", "endDate"].includes(key) &&
        moment(params[key]).isAfter(dayjs())
      ) {
        return toast.error(
          `${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()} cannot be greater than current date!`
        );
      }
      if (key === "grade") {
        if (Number(params[key]) > 12) {
          return toast.error("Grade should be less than 12");
        } else if (Number(params[key]) < 1) {
          return toast.error("Grade should be greater than 0");
        }
      }
    }
    if (moment(params?.startDate)?.isAfter(moment(params?.endDate))) {
      return toast.error("Start date should be less than end date");
    }
    if (roleAffiliated?.find((ele) => ele?._id === gym?._id)) {
      return toast.error("Gym already added");
    }
    let dataArr = roleAffiliated ? [...roleAffiliated] : [];
    if (data !== null) {
      dataArr = dataArr?.map((ele) => (ele?._id === data?._id ? params : ele));
    } else {
      dataArr?.push(params);
    }
    await onClick("affiliatedGyms", dataArr);
  };
  return (
    <ModalSkeleton
      width={"750px"}
      header={`${data ? "Edit" : "Add"} Affiliated Gyms`}
      show={show}
      setShow={setShow}
    >
      <Row className={classes.modal}>
        <Col md={12} className={classes.inputField}>
          <DropDown
            setter={setGym}
            value={gym}
            label={"Gym"}
            placeholder={"Gym"}
            options={publicFields?.gyms
              ?.filter((ele) => ele?.name)
              ?.filter((ele) => {
                if (data?.gym?._id === ele?._id) {
                  return true;
                }
                return !roleAffiliated?.find(
                  (ele2) => ele2?.gym?._id === ele?._id
                );
              })}
            optionLabel={"name"}
            optionValue={"_id"}
            affilatedAllow={true}
          />
        </Col>
        <Col md={6} className={classes.inputField}>
          <ResponsiveDatePickers
            setter={setStartDate}
            calenderLabel={"Start Date"}
            value={startDate}
            placeholder={"Start Date"}
            maxValue={true}
          />
        </Col>
        <Col md={6} className={classes.inputField}>
          <ResponsiveDatePickers
            setter={setEndDate}
            calenderLabel={"End Date"}
            value={endDate}
            placeholder={"End Date"}
            maxValue={true}
          />
        </Col>
        <Col md={12} className={classes.inputField}>
          <Input
            regexType={"number"}
            setter={(e) => {
              if (Number(e) <= 12) {
                setGrade(e);
              }
            }}
            value={grade}
            label={"Grade (In between 1-12) "}
            placeholder={"Grade"}
          />
        </Col>
        <Col md={12} className={classes.inputField}>
          <Button
            disabled={isLoading}
            onClick={handleClick}
            className={classes.submitBtn}
            label={isLoading ? "Please wait..." : "Submit"}
          />
        </Col>
      </Row>
    </ModalSkeleton>
  );
};

export default EditAffiliatedModal;
