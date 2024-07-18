import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import { DropDown } from "../../Component/DropDown/DropDown";
import { Input } from "../../Component/Input/Input";
import { disciplineOptions } from "../../config/Data";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";
import ModalSkeleton from "../../modals/ModalSkeleton";
import styles from "./AddFightingModal.module.css";
const venueOptions = [
  { label: "Hall 1", value: "hall1" },
  { label: "Hall 2", value: "hall2" },
  { label: "Open Ground", value: "openGround" },
];
const resultOptions = [
  { label: "WON", value: "WON" },
  { label: "LOST", value: "LOST" },
  { label: "DRAW", value: "DRAW" },
];
const skillOptions = [
  { label: "Amateur", value: "amateur" },
  { label: "Pro", value: "pro" },
];
export default function AddFightingModal({
  show,
  setShow,
  modalLoading,
  onclick,
  data,
  roleAffiliated,
}) {
  const [skillLevel, setSkillLevel] = useState(null);
  const [fightDate, setFightDate] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [discipline, setDiscipline] = useState(null);
  const [result, setResult] = useState(null);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    if (data) {
      setSkillLevel({
        label: data?.category,
        value: data?.category,
      });
      setFightDate(data?.date);
      setOpponent(data?.opponent);
      setDiscipline({
        label: data?.discipline,
        value: data?.discipline,
      });
      setResult({
        label: data?.result,
        value: data?.result,
      });
      setVenue({
        label: data?.via,
        value: data?.via,
      });
    }
  }, []);

  const handleSubmit = async () => {
    const params = {
      category: skillLevel?.value,
      date: fightDate
        ? moment(fightDate?.$d || fightDate).format("MM/DD/YYYY")
        : "",
      opponent,
      discipline: discipline?.value,
      result: result?.value,
      via: venue?.value,
      challenger: true,
      defender: true,
    };
    for (let key in params) {
      if (!params[key]) {
        return toast.error(
          `Please select ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()}`
        );
      }
    }

    let dataArr = [...roleAffiliated];
    if (data !== null) {
      dataArr = dataArr?.map((ele) => (ele?._id === data?._id ? params : ele));
    } else {
      dataArr?.push(params);
    }
    await onclick("fightingRecord", dataArr);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Fighting Record`}
      width={"900px"}
      modalClass={styles.modalBody}
    >
      <div className={styles.container}>
        <Row>
          <Col lg={6} className={styles.inputField}>
            <DropDown
              value={skillLevel}
              setter={setSkillLevel}
              placeholder={"Select"}
              label={"Amateur or Pro"}
              options={skillOptions}
              labelClassName={styles.dropLabel}
            />
          </Col>

          <Col md={6} className={styles.inputField}>
            <ResponsiveDatePickers
              setter={setFightDate}
              calenderLabel={"Date"}
              value={fightDate}
              placeholder={"Date"}
            />
          </Col>
          <Col lg={6} className={styles.inputField}>
            <Input
              value={opponent}
              setter={setOpponent}
              placeholder={"Opponent"}
              label={"Opponent"}
            />
          </Col>
          <Col lg={6} className={styles.inputField}>
            <DropDown
              value={discipline}
              setter={setDiscipline}
              placeholder={"Select"}
              label={"Discipline"}
              options={disciplineOptions}
            />
          </Col>
          <Col lg={6} className={styles.inputField}>
            <DropDown
              value={result}
              setter={setResult}
              placeholder={"Select"}
              label={"Result"}
              options={resultOptions}
            />
          </Col>
          <Col lg={6} className={styles.inputField}>
            <DropDown
              value={venue}
              setter={setVenue}
              placeholder={"Select"}
              label={"Venue"}
              options={venueOptions}
            />
          </Col>
          {/* <Col lg={6} className={styles.inputField}>
            <h5 className={styles.title}>Title:</h5>
            <div className={styles.result}>
              <Radio value={title} setValue={setTitle} label="Won" />
              <Radio value={title} setValue={setTitle} label="Lost" />
            </div>
          </Col> */}
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
