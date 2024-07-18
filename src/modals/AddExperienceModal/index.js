import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import AddExperience from "../../Component/AddExperience";
import { Button } from "../../Component/Button/Button";
import {
  validateExperienceErrors,
  validateExperiencesField,
} from "../../config/HelperFunction";
import ModalSkeleton from "../../modals/ModalSkeleton";
import styles from "./AddExperienceModal.module.css";

export default function AddExperienceModal({
  show,
  setShow,
  data,
  modalLoading,
  onClick,
  roleExperiences,
}) {
  const [experienceArr, setExperienceArr] = useState(null);
  const [booleanExperience, setBooleanExperience] = useState([]);

  const handleSubmit = async () => {
    const params = {
      ...experienceArr[0],
    };
    const experienceErrorBooleans = validateExperienceErrors([params]);
    const hasExperienceErrors = experienceErrorBooleans?.some(
      (ele) => ele.length > 0
    );
    if (hasExperienceErrors) {
      setBooleanExperience(experienceErrorBooleans);
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    if (!validateExperiencesField([params])) {
      return;
    }
    let dataArr = [...roleExperiences];
    if (data !== null) {
      dataArr = dataArr?.map((ele) => {
        return ele?._id === data?._id
          ? { ...params, stillWorking: params?.stillWorking ? true : false }
          : ele;
      });
    } else {
      dataArr?.push({
        ...params,
        stillWorking: params?.stillWorking ? true : false,
      });
    }
    dataArr = dataArr?.map((ele) => {
      const { createdAt, updatedAt, ...rest } = ele;
      return {
        ...rest,
        startDate: moment(rest?.startDate).format("MM/DD/YYYY"),
        endDate: moment(rest?.endDate).format("MM/DD/YYYY"),
      };
    });
    await onClick("experiences", dataArr);
  };
  useEffect(() => {
    if (data) {
      const experiences = JSON.parse(JSON.stringify(data));
      setExperienceArr([experiences]);
    } else {
      setExperienceArr([
        {
          designation: "",
          organization: "",
          startDate: null,
          endDate: null,
          information: "",
          stillWorking: false,
        },
      ]);
    }
  }, []);

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Edit Experience`}
      width={"800px"}
      modalClass={styles.modalBody}
    >
      <div className={styles.container}>
        <Row>
          <Col lg={12}>
            <AddExperience
              value={experienceArr}
              setter={setExperienceArr}
              activateErrorFields={booleanExperience}
              setActivateErrorFields={setBooleanExperience}
              addMore={false}
            />{" "}
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
