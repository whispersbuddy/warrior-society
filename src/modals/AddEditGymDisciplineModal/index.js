import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { DropDown } from "../../Component/DropDown/DropDown";
import { disciplineOptions, martialArtTypes } from "../../config/Data";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./AddEditGymDisciplineModal.module.css";
const AddEditGymDisciplineModal = ({
  show,
  setShow,
  data,
  apiLoading,
  onClick,
  roleAffiliated,
}) => {
  const [disciplines, setDisciplines] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (roleAffiliated || data) {
      setDisciplines(
        disciplineOptions?.filter((ele) =>
          roleAffiliated?.map((e) => e?.title)?.includes(ele.value)
        )
      );
      let martialArtTypesArr = roleAffiliated
        ?.map((ele) => {
          if (ele?.title === "martial arts") {
            return ele?.disciplineDiscription?.split(",");
          }
        })
        ?.flat();
      if (martialArtTypesArr?.length > 0) {
        setTypes(
          martialArtTypesArr?.map((ele) => {
            return martialArtTypes?.find((e) => e.value === ele);
          })
        );
      }
    }
  }, []);

  const handleClick = async () => {
    let dataArr = disciplines.map((ele) => {
      return {
        title: ele.value,
        ...(ele.value === "martial arts" && {
          disciplineDiscription: types?.map((e) => e?.value).join(","),
        }),
      };
    });
    if (dataArr.length === 0) {
      return toast.error("Please fill at least one discipline");
    }
    await onClick("disciplines", dataArr);
  };

  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`${data ? "Edit" : "Add"} Disciplines`}
        width={"800px"}
      >
        <div className={classes.modalContainer}>
          <div className={classes.inputField}>
            <DropDown
              setter={setDisciplines}
              value={disciplines}
              options={disciplineOptions}
              label={"Discipline(s)"}
              placeholder={"Text Here"}
              labelClassName={classes.labelStyle}
              isMulti={true}
            />
          </div>
          {disciplines?.map((e) => e?.value)?.includes("martial arts") && (
            <div className={classes.inputField}>
              <DropDown
                value={types}
                options={martialArtTypes}
                placeholder={"Martial Arts Types"}
                optionLabel={"label"}
                optionValue={"value"}
                setter={setTypes}
                isSearchable={true}
                isMulti={true}
              />
            </div>
          )}
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={apiLoading ? `Please wait...` : `Submit`}
              disabled={apiLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AddEditGymDisciplineModal;
