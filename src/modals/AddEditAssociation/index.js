import React, { useEffect, useState } from "react";
import styles from "./AddEditAssociation.module.css";
import ModalSkeleton from "../../modals/ModalSkeleton";
import { Input } from "../../Component/Input/Input";
import { Button } from "../../Component/Button/Button";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";
import { DropDown } from "../../Component/DropDown/DropDown";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import { useSelector } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";

export default function AddEditAssociation({
  show,
  setShow,
  modalLoading,
  onclick,
  data,
  roleAffiliated,
}) {
  const {
    publicFields: { associations: associationOptions },
  } = useSelector((state) => state.commonReducer);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [association, setAssociation] = useState(null);
  const [grade, setGrade] = useState(null);
  useEffect(() => {
    if (data) {
      setStartDate(data?.startDate || null);
      setEndDate(data?.endDate || null);
      setAssociation(
        associationOptions?.find((ele) => ele._id == data?.association?._id)
      );
      setGrade(data?.grade || null);
    }
  }, []);

  const handleSubmit = async () => {
    const params = {
      startDate: startDate
        ? moment(startDate?.$d || startDate).format("MM/DD/YYYY")
        : "",
      endDate: endDate
        ? moment(endDate?.$d || endDate).format("MM/DD/YYYY")
        : "",
      association: association?._id,
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
    if (
      data == null &&
      roleAffiliated?.find((ele) => ele?.association?._id === association?._id)
    ) {
      return toast.error("Association already added");
    }
    let dataArr = roleAffiliated ? [...roleAffiliated] : [];
    if (data !== null) {
      dataArr = dataArr?.map((ele) => (ele?._id === data?._id ? params : ele));
    } else {
      dataArr?.push(params);
    }
    await onclick("association", dataArr);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`${data ? "Update" : "Create"} Association`}
      width={"900px"}
      modalClass={styles.modalBody}
    >
      <div className={styles.container}>
        <Row>
          <Col lg={12} className={styles.inputField}>
            <DropDown
              value={association}
              setter={setAssociation}
              placeholder={"Select"}
              label={"Association"}
              options={associationOptions?.filter((ele) => {
                if (data?.association?._id == ele._id) {
                  return true;
                }
                return !roleAffiliated?.find(
                  (ele2) => ele2?.association?._id === ele?._id
                );
              })}
              optionLabel={"associationName"}
              optionValue={"_id"}
            />
          </Col>
          <Col md={6} className={styles.inputField}>
            <ResponsiveDatePickers
              setter={setStartDate}
              calenderLabel={"Start Date"}
              value={startDate}
              placeholder={"Start Date"}
              maxValue={true}
            />
          </Col>

          <Col md={6} className={styles.inputField}>
            <ResponsiveDatePickers
              setter={setEndDate}
              calenderLabel={"End Date"}
              value={endDate}
              placeholder={"End Date"}
              maxValue={true}
            />
          </Col>
          <Col lg={12} className={styles.inputField}>
            <Input
              value={grade}
              setter={(e) => {
                if (Number(e) <= 12 ) {
                  setGrade(e);
                }
              }}
              placeholder={"Grade"}
              label={"Grade (In between 1-12) "}
              type={"number"}
            />
          </Col>
          <div className={styles.submitBtn}>
            <Button
              label={modalLoading ? "Submitting..." : "Submit"}
              disabled={modalLoading}
              onClick={handleSubmit}
            />
          </div>
        </Row>
      </div>
    </ModalSkeleton>
  );
}
