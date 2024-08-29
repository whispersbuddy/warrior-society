import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { GiCrossedSwords } from "react-icons/gi";
import { MdOutlineAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import { disciplineData, martialArtTypes } from "../../config/Data";
import {
  validateDisciplineErrors,
  validateDisciplineFields,
} from "../../config/HelperFunction";
import { DropDown } from "../DropDown/DropDown";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea";
import classes from "./MultiDiscipline.module.css";

const SingleDiscipline = ({
  discipline,
  setDiscipline,
  index,
  disabled,
  disciplineOptions,
  activateError,
}) => {
  // disciplineObj is the object of single discipline
  const disciplineObj = discipline?.[index];
  const handleDelete = (index) => {
    setDiscipline((prev) => {
      const temp = [...prev];
      temp.splice(index, 1);
      return temp;
    });
  };
  const [types, setTypes] = useState(
    martialArtTypes?.filter((ele) =>
    disciplineObj?.martialArtType?.[0]?.includes(ele?.value)
  )
);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log('hello');
    console.log(types);
    if (types.some((e) => e?.value === 'unselect')) {
      console.log('unselect');
      setSelected(false)
      setTypes([]);
    }
    else if (types.some((e) => e?.value === 'all')) {
      setSelected(true)
      setTypes(martialArtTypes.slice(1));
    }
    if (selected) {
      martialArtTypes[0].label = 'Unselect';
      martialArtTypes[0].value = 'unselect'
    } else {
      martialArtTypes[0].label = 'Select All';
      martialArtTypes[0].value = 'all'
    }
    const selectedDiscipline = disciplineOptions?.find(
      (ele) => ele?.value == disciplineObj?.domain
    );
    if (selectedDiscipline) {
      setDiscipline((prev) => {
        const temp = structuredClone([...prev]);
        temp[index] = {
          domain: selectedDiscipline?.value,
          questions: selectedDiscipline?.questions?.map((ele) => {
            return {
              question: ele?.question,
              answer: temp[index]?.questions?.find(
                (e) => e?.question == ele?.question
              )?.answer,
              type: ele?.type,
              best: "",
              ...(ele?.options && {
                options: ele?.options,
              }),
            };
          }),
          physicalSkillLevelOptions:
            selectedDiscipline?.physicalSkillLevelOptions,
          knowledgeLevelOptions: selectedDiscipline?.knowledgeLevelOptions,
          physicalSkillLevel: temp?.[index]?.physicalSkillLevel,
          knowledgeLevel: temp?.[index]?.knowledgeLevel,
          journey: temp?.[index]?.journey,
          ...(selectedDiscipline?.value === "Martial Arts" && {
            martialArtType: types.map((e)=>e.value).join(','),
          }),
        };
        return temp;
      });
      // setTypes(martialArtTypes?.filter((ele) =>
      //   disciplineObj?.martialArtType?.[0].includes(ele?.value)
      // ));
    }
  }, [disciplineObj?.domain, disciplineOptions, index, selected, setDiscipline, types]);
  return (
    <div className={[classes.disciplineBox].join(" ")}>
      {discipline?.length !== 1 && (
        <div className={classes.deleteBtn}>
          <p>{disciplineObj?.domain}</p>
          <AiFillDelete
            cursor={"pointer"}
            onClick={() => handleDelete(index)}
          />
        </div>
      )}
      <Row>
        {/* discipline section start */}
        <Col lg={12}>
          <DropDown
            className={classes.dropDownMain}
            value={disciplineOptions?.find(
              (ele) => ele?.value === disciplineObj?.domain
            )}
            setter={(e) => {
              // whole discipline data setup here
              setDiscipline((prev) => {
                const temp = structuredClone([...prev]);
                temp[index] = {
                  domain: e?.value,
                  questions: disciplineOptions
                    .find((q) => q.value === e?.value)
                    ?.questions?.map((ele) => {
                      return {
                        question: ele?.question,
                        answer: "",
                        type: ele?.type,
                        best: "",
                        ...(ele?.options && {
                          options: ele?.options,
                        }),
                      };
                    }),
                  physicalSkillLevelOptions: e?.physicalSkillLevelOptions,
                  knowledgeLevelOptions: e?.knowledgeLevelOptions,
                  physicalSkillLevel: "",
                  knowledgeLevel: "",
                  journey: "",
                  ...(e?.value === "Martial Arts" && {
                    martialArtType: types.map((e)=>e.value).join(','),
                  }),
                };
                return temp;
              });
            }}
            placeholder="Select Discipline"
            options={disciplineOptions}
            optionLabel={"value"}
            optionValue={"_id"}
            labelClassName={classes.labelStyle}
            disabled={disabled}
            error={
              !disciplineOptions?.find(
                (ele) => ele?.value === disciplineObj?.domain
              ) && activateError
            }
            errorText={"Discipline is required"}
          />
        </Col>
        {disciplineObj?.domain === "Martial Arts" && (
          <Col lg={12} className={classes.inputField}>
            <DropDown
              // martialArtTypes is the array of martial arts types
              value={types
              }
              options={martialArtTypes}
              placeholder={"Martial Arts Types..."}
              optionLabel={"label"}
              optionValue={"value"}
              setter={
                setTypes
                //   (e) => {
                //   setDiscipline((prev) => {
                //     const tempArr = structuredClone([...prev]);
                //     tempArr[index] = {
                //       ...disciplineObj,
                //       martialArtType: e?.map((ele) => ele?.value),
                //     };
                //     return tempArr;
                //   });
                // }
              }
              isSearchable={true}
              error={
                activateError &&
                !martialArtTypes?.find(
                  (level) => level?.value == disciplineObj?.martialArtType
                )
              }
              errorText={"Martial Arts Type is required"}
              isMulti={true}
            />
          </Col>
        )}
        {disciplineObj?.questions?.map((ele, i) => {
          // disciplineObjQuestion is the question object of the discipline
          const disciplineObjQuestion = disciplineObj?.questions?.[i];
          return (
            <Col lg={12} className={classes.inputField}>
              {/* ele?.type is checking the type of answer to a question should be whether
                it is input or dropdown or textarea */}
              {ele?.type === "textarea" ? (
                <TextArea
                  value={disciplineObjQuestion?.answer}
                  setter={(e) => {
                    const tempArr = structuredClone([
                      ...disciplineObj?.questions,
                    ]);
                    tempArr[i] = {
                      answer: e,
                      question: ele?.question,
                      type: ele?.type,
                    };
                    setDiscipline((prev) => {
                      const temp = structuredClone([...prev]);
                      temp[index] = {
                        ...temp[index],
                        questions: tempArr,
                      };
                      return temp;
                    });
                  }}
                  placeholder={ele?.question}
                  error={activateError && !disciplineObjQuestion?.answer}
                  errorText={`Q${i + 1} is required`}
                />
              ) : ele?.type == "dropdown" ? (
                <DropDown
                  value={disciplineObjQuestion?.options?.find((ele) => {
                    return ele?.value == disciplineObjQuestion?.answer;
                  })}
                  setter={(e) => {
                    const tempArr = structuredClone([
                      ...disciplineObj?.questions,
                    ]);
                    tempArr[i] = {
                      answer: e?.value,
                      question: ele?.question,
                      type: ele?.type,
                      options: ele?.options,
                    };
                    setDiscipline((prev) => {
                      const temp = structuredClone(prev);
                      temp[index] = {
                        ...temp[index],
                        questions: tempArr,
                      };
                      return temp;
                    });
                  }}
                  options={disciplineObjQuestion?.options}
                  placeholder={ele?.question}
                  error={
                    !disciplineObjQuestion?.options?.find((ele) => {
                      return ele?.value == disciplineObjQuestion?.answer;
                    }) && activateError
                  }
                  errorText={`Q${i + 1} is required`}
                />
              ) : (
                <Input
                  value={disciplineObjQuestion?.answer}
                  setter={(e) => {
                    const tempArr = structuredClone([
                      ...disciplineObj?.questions,
                    ]);
                    tempArr[i] = {
                      answer: e,
                      question: ele?.question,
                      type: ele?.type,
                    };
                    setDiscipline((prev) => {
                      const temp = structuredClone([...prev]);
                      temp[index] = {
                        ...temp[index],
                        questions: tempArr,
                      };
                      return temp;
                    });
                  }}
                  regexType={ele?.type == "year" ? "number" : "text"}
                  placeholder={ele?.question}
                  error={!disciplineObjQuestion?.answer && activateError}
                  errorText={`Q${i + 1} is required`}
                />
              )}
            </Col>
          );
        })}
        {disciplineObj?.domain && (
          <>
            <Col lg={12} className={classes.inputField}>
              <DropDown
                placeholder={"Physical Skill Level"}
                value={
                  // value is set in string form so we have to find the object of that string value
                  disciplineObj?.physicalSkillLevelOptions?.find(
                    (level) => level?.value == disciplineObj?.physicalSkillLevel
                  )
                }
                setter={(e) =>
                  setDiscipline((prev) => {
                    const tempArr = structuredClone([...prev]);
                    tempArr[index] = {
                      ...disciplineObj,
                      physicalSkillLevel: e?.value,
                    };
                    return tempArr;
                  })
                }
                options={disciplineObj?.physicalSkillLevelOptions}
                error={
                  !disciplineObj?.physicalSkillLevelOptions?.find(
                    (level) => level?.value == disciplineObj?.physicalSkillLevel
                  ) && activateError
                }
                errorText={"Physical Skill Level is required"}
              />
            </Col>
            <Col lg={12} className={classes.inputField}>
              <DropDown
                placeholder={"Knowledge Level"}
                value={disciplineObj?.knowledgeLevelOptions?.find(
                  (level) => level?.value == disciplineObj?.knowledgeLevel
                )}
                setter={(e) =>
                  setDiscipline((prev) => {
                    const tempArr = structuredClone([...prev]);
                    tempArr[index] = {
                      ...disciplineObj,
                      knowledgeLevel: e?.value,
                    };
                    return tempArr;
                  })
                }
                options={disciplineObj?.knowledgeLevelOptions}
                error={
                  !disciplineObj?.knowledgeLevelOptions?.find(
                    (level) => level?.value == disciplineObj?.knowledgeLevel
                  ) && activateError
                }
                errorText={"Knowledge Level is required"}
              />
            </Col>

            <Col lg={12} className={classes.inputField}>
              <TextArea
                placeholder={"Journey"}
                value={disciplineObj?.journey}
                setter={(e) =>
                  setDiscipline((prev) => {
                    const temp = structuredClone([...prev]);
                    temp[index] = {
                      ...temp[index],
                      journey: e,
                    };
                    return temp;
                  })
                }
                error={!disciplineObj?.journey && activateError}
                errorText={"Journey is required"}
              />
            </Col>
          </>
        )}
        {/* discipline section end */}
      </Row>
    </div>
  );
};
const MultiDiscipline = ({
  discipline,
  setDiscipline,
  disciplineLabel = "Fighting Discipline(s)",
  disciplineIcon = <GiCrossedSwords />,
  addMore = true,
  disabled = false,
  options = disciplineData,
  activateErrorFields,
  setActivateErrorFields,
}) => {
  const handleAdd = () => {
    const disciplineErroBooleans = validateDisciplineErrors(discipline);
    if (disciplineErroBooleans?.filter((ele) => ele?.length > 0)?.length > 0) {
      setActivateErrorFields(Array(disciplineErroBooleans.length).fill(true));
      toast.error(
        "Please check the errors in the form and fill the required fields!"
      );
      return;
    }
    if (validateDisciplineFields(discipline)) {
      setDiscipline((prev) => {
        const temp = [...prev];
        temp.push({});
        return temp;
      });
    }
  };
  return (
    <>
      <div className={classes.addDiscipline}>
        <p className={classes.disciplineHeading}>
          {" "}
          {disciplineIcon} {disciplineLabel}
        </p>
        {addMore && options?.length > discipline?.length && (
          <MdOutlineAddBox className={classes.addBtn} onClick={handleAdd} />
        )}
      </div>
      <div className={discipline?.length !== 1 && classes.divBox}>
        {discipline?.map((ele, index) => (
          <SingleDiscipline
            discipline={discipline}
            setDiscipline={setDiscipline}
            index={index}
            disabled={disabled}
            disciplineOptions={options}
            activateError={activateErrorFields[index]}
          />
        ))}
      </div>
    </>
  );
};
export default MultiDiscipline;
