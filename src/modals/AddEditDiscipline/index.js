import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import MultiDiscipline from "../../Component/MultiDiscipline";
import { disciplineData, disciplineOptions } from "../../config/Data";
import {
  validateDisciplineErrors,
  validateDisciplineFields,
} from "../../config/HelperFunction";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./AddEditDiscipline.module.css";
const AddEditDiscipline = ({
  show,
  setShow,
  data,
  apiLoading,
  onClick,
  roleDiscipline,
}) => {
  const [discipline, setDiscipline] = useState(data ? [data] : [{}]);
  const [booleanDiscipline, setBooleanDiscipline] = useState([]);
  const [emptyDiscipline, setEmptyDiscipline] = useState(false);
  const handleClick = async () => {
    const params = data
      ? { ...discipline?.[0] }
      : {
          discipline,
        };
    if (!discipline?.[0]?.domain) {
      setEmptyDiscipline(true);
      return;
    }
    const disciplineErrorBooleans = validateDisciplineErrors(discipline);
    const hasDisciplineErrors = disciplineErrorBooleans?.some(
      (ele) => ele.length > 0
    );
    if (hasDisciplineErrors) {
      setBooleanDiscipline(disciplineErrorBooleans);
      return toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
    }
    if (!validateDisciplineFields(discipline)) {
      return;
    }
    if (
      data == null &&
      roleDiscipline?.find((ele) => ele?.domain === params?.domain)
    ) {
      return toast.error("Discipline already exist");
    }
    let dataArr = [...roleDiscipline];
    if (data !== null) {
      dataArr = dataArr?.map((ele) => (ele?._id === data?._id ? params : ele));
    } else {
      dataArr = [...roleDiscipline, ...params?.discipline];
      // dataArr?.push(params);
    }
    await onClick("disciplines", dataArr);
  };

  return (
    <>
      <style>
        {`
          .modal-content{
            overflow:visible;
          }
        `}
      </style>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`${data ? "Update" : "Create"} Discipline`}
        width={"800px"}
        modalClass={discipline?.[0]?.domain ? classes.modalClass : ""}
      >
        <div className={classes.modalContainer}>
          <div className={classes.uploadImage}>
            <MultiDiscipline
              discipline={discipline}
              setDiscipline={setDiscipline}
              disciplineLabel={"Discipline"}
              disciplineIcon={""}
              addMore={!data}
              // disabledDomainEdit={true}
              disabled={data}
              options={disciplineData}
              // options={disciplineData?.filter((ele) => {
              //   if (ele?.value === discipline?.[0]?.domain) {
              //     return true;
              //   }
              //   return !roleDiscipline?.find(
              //     (ele2) => ele2?.domain === ele?.value
              //   );
              // })}
              activateErrorFields={booleanDiscipline}
              setActivateErrorFields={setBooleanDiscipline}
            />
            {!discipline?.[0]?.domain && emptyDiscipline && (
              <p className={`${[classes.errorText].join(" ")}`}>
                {"Atleast one discipline is required"}
              </p>
            )}
          </div>
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={apiLoading ? `Submitting...` : `Submit`}
              disabled={apiLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AddEditDiscipline;
