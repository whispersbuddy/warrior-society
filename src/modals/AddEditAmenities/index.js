import React, { useState } from "react";
import classes from "./AddEditAmenities.module.css";
import ModalSkeleton from "../ModalSkeleton";
import { Col, Row } from "react-bootstrap";
import { DropDown } from "../../Component/DropDown/DropDown";
import { Button } from "../../Component/Button/Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const AddEditAmenities = ({
  show,
  setShow,
  modalLoading,
  onClick,
  data,
  roleAffiliated,
}) => {
  const {
    publicFields: { equipment: equipmentOptions },
  } = useSelector((state) => state.commonReducer);
  const [SelectEq, setSelectEq] = useState("");

  const handleSubmit = () => {
    if (SelectEq == "") {
      return toast.error("Please select equipments");
    }
    if (roleAffiliated?.find((ele) => ele?._id === SelectEq?._id)) {
      return toast.error("Equipment already added");
    }
    const tempArr = [...roleAffiliated];
    tempArr?.push(SelectEq?._id);
    onClick("equipments", tempArr);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`${data ? "Update" : "Create"} Amenities`}
      width={"700px"}
      modalClass={classes.modalBody}
    >
      <div className={classes.modalContainer}>
        <Row>
          <Col md={12}>
            <DropDown
              setter={setSelectEq}
              value={SelectEq}
              label={"Select Equipments"}
              placeholder={"Select Equipments"}
              options={equipmentOptions}
              optionLabel={"equipmentName"}
              optionValue={"_id"}
            />
          </Col>
          <Col md={12}>
            <div className={classes.submitBtn}>
              <Button
                onClick={handleSubmit}
                disabled={modalLoading}
                label={modalLoading ? "Please wait...." : "Submit"}
              />
            </div>
          </Col>
        </Row>
      </div>
    </ModalSkeleton>
  );
};

export default AddEditAmenities;
