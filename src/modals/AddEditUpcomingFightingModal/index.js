import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import { DropDown } from "../../Component/DropDown/DropDown";
import { Input } from "../../Component/Input/Input";
import TimePicker from "../../Component/TimePicker/TimePicker";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";
import ModalSkeleton from "../../modals/ModalSkeleton";
import styles from "./AddEditUpcomingFightingModal.module.css";
const venueOptions = [
  { label: "Dubai", value: "dubai" },
  { label: "US", value: "us" },
];
export default function AddEditUpcomingFightingModal({
  show,
  setShow,
  isLoading,
  onclick,
  data,
  roleAffiliated,
}) {
  const { user: userData } = useSelector((state) => state?.authReducer);
  const [fightDate, setFightDate] = useState(null);
  const [time, setTime] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [venue, setVenue] = useState(null);
  useEffect(() => {
    if (data) {
      const momentDate = data?.date;
      const momentTime = data?.time;
      const mergeDateTime = moment(
        `${momentDate} ${momentTime}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();
      setFightDate(data?.date);
      setTime(mergeDateTime);
      setOpponent(data?.opponent);
      setVenue({
        label: data?.venue,
        value: data?.venue,
      });
    }
  }, []);

  const handleSubmit = async () => {
    const params = {
      date: fightDate
        ? moment(fightDate?.$d || fightDate).format("MM/DD/YYYY")
        : "",
      opponent,
      venue: venue?.value,
      time: time ? moment(time?.$d || time).format("hh:mm A") : "",
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
    await onclick("upcomingFight", dataArr);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Upcoming Fights`}
      width={"900px"}
      modalClass={styles.modalBody}
    >
      <div className={styles.container}>
        <Row>
          <Col lg={6} className={styles.inputField}>
            <Input
              value={opponent}
              setter={setOpponent}
              placeholder={"Opponent"}
              label={"Opponent"}
            />
          </Col>
          <Col md={6} className={styles.inputField}>
            <ResponsiveDatePickers
              setter={setFightDate}
              calenderLabel={"Date"}
              value={fightDate}
              placeholder="Date"
            />
          </Col>
          <Col md={6} className={styles.inputField}>
            <TimePicker setter={setTime} dateLabel={"Time"} value={time} />
          </Col>

          <Col lg={6} className={styles.inputField}>
            <DropDown
              value={venue}
              setter={setVenue}
              placeholder={"Select"}
              label={"Via"}
              options={venueOptions}
            />
          </Col>
          <div className={styles.submitBtn}>
            <Button
              label={isLoading ? "Submitting..." : "Submit"}
              disabled={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </Row>
      </div>
    </ModalSkeleton>
  );
}
