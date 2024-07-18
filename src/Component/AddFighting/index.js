import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { GiCrossedSwords } from "react-icons/gi";
import { MdOutlineAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import ResponsiveDatePickers from "../Calender/Calender";
import { DropDown } from "../DropDown/DropDown";
import { Input } from "../Input/Input";
import { Radio } from "../Radio/Radio";
import classes from "./AddFighting.module.css";
const wonOptions = [
  {
    label: "Won 1",
    value: "Won 1",
  },
  {
    label: "Won 2",
    value: "Won 2",
  },
];
const amateurOptions = [
  {
    label: "Amateur 1",
    value: "Amateur 1",
  },
  {
    label: "Amateur 2",
    value: "Amateur 2",
  },
];
const disciplineOptions = [
  {
    label: "Discipline 1",
    value: "Discipline 1",
  },
  {
    label: "Discipline 2",
    value: "Discipline 2",
  },
];
const methodOptions = [
  {
    label: "Method 1",
    value: "Method 1",
  },
  {
    label: "Method 2",
    value: "Method 2",
  },
];
const titleWonOptions = [
  {
    label: "Title Won 1",
    value: "Title Won 1",
  },
  {
    label: "Title Won 2",
    value: "Title Won 2",
  },
];
const AddFighting = ({ setter, value }) => {
  const handleAdd = () => {
    for (let i = 0; i < value.length; i++) {
      for (let key in value[i]) {
        if (value[i][key] === "") {
          return toast.error("Please fill all the fields");
        }
      }
    }
    setter((ele) => [
      ...ele,
      {
        opponent: "",
        fightDate: null,
        amateur: "",
        won: "",
        discipline: "",
        method: "",
        titleWon: "",
        fighterType: "",
      },
    ]);
  };
  return (
    <div className={classes.experienceContainer}>
      <p className={classes.addIcon} onClick={() => handleAdd()}>
        <MdOutlineAddBox cursor={"pointer"} />
      </p>
      {value?.map((ele, index) => (
        <div className={classes.inputContainer}>
          <div className={classes.rowCOl}>
            <Row>
              <Col md={6} className={`${classes.firstField}`}>
                <Input
                  value={ele?.opponent}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].opponent = e;
                    setter(tempArr);
                  }}
                  placeholder={"Opponent"}
                  label={"Fighting Record"}
                  labelLeftIcon={<GiCrossedSwords />}
                />
              </Col>
              <Col md={6} className={` ${classes.date}`}>
                <ResponsiveDatePickers
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].fightDate = e?.$d;
                    setter(tempArr);
                  }}
                  calenderLabel={"Fight Date"}
                  value={ele?.fightDate}
                  placeholder={"Fight Date"}
                />{" "}
              </Col>
              <Col md={6} className={classes.inputField}>
                <DropDown
                  options={wonOptions}
                  value={wonOptions?.find((e) => e.value === ele?.won)}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].won = e?.value;
                    setter(tempArr);
                  }}
                  placeholder="Won"
                />
              </Col>
              <Col md={6} className={classes.inputField}>
                <DropDown
                  options={amateurOptions}
                  value={amateurOptions?.find((e) => e.value === ele?.amateur)}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].amateur = e?.value;
                    setter(tempArr);
                  }}
                  placeholder="Amature"
                />
              </Col>
              <Col md={6} className={classes.inputField}>
                <DropDown
                  options={disciplineOptions}
                  value={disciplineOptions?.find(
                    (e) => e.value === ele?.discipline
                  )}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].discipline = e?.value;
                    setter(tempArr);
                  }}
                  placeholder="Discipline"
                />
              </Col>
              <Col md={6} className={classes.inputField}>
                <DropDown
                  options={methodOptions}
                  value={methodOptions?.find((e) => e.value === ele?.method)}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].method = e?.value;
                    setter(tempArr);
                  }}
                  placeholder="Method"
                />
              </Col>
              <Col md={6} className={classes.inputField}>
                <DropDown
                  options={titleWonOptions}
                  value={titleWonOptions?.find(
                    (e) => e.value === ele?.titleWon
                  )}
                  setter={(e) => {
                    const tempArr = [...value];
                    tempArr[index].titleWon = e?.value;
                    setter(tempArr);
                  }}
                  placeholder="Title Won"
                />
              </Col>
              <Col lg={6}>
                <div className={classes.fighterSelect}>
                  <Radio
                    value={ele?.fighterType}
                    setValue={(e) => {
                      const tempArr = [...value];
                      tempArr[index].fighterType = e;
                      setter(tempArr);
                    }}
                    label="Challenger"
                  />
                  <Radio
                    value={ele?.fighterType}
                    setValue={(e) => {
                      const tempArr = [...value];
                      tempArr[index].fighterType = e;
                      setter(tempArr);
                    }}
                    label="Defender"
                  />
                </div>
              </Col>
            </Row>
          </div>
          {value?.length !== 1 && (
            <div
              className={classes.deleteBtn}
              onClick={() =>
                setter((prev) => {
                  const tempArr = [...value];
                  tempArr.splice(index, 1);
                  return tempArr;
                })
              }
            >
              <AiFillDelete />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddFighting;
