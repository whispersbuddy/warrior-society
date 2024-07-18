import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import validator from "validator";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { formRegEx, formRegExReplacer } from "../../config/apiUrl";
import ModalSkeleton from "../../modals/ModalSkeleton";
import styles from "./NewsletterModal.module.css";

export default function NewsletterModal({ show, setShow, loading, onclick }) {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    const params = {
      email,
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
    if (!validator.isEmail(email)) {
      return toast.error("Please enter valid email");
    }
    await onclick(params);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Our website and mobile application will be live soon!`}
      width={"900px"}
      modalClass={styles.modalBody}
      showCloseIcon={true}
      headerStyles={{
        textTransform: "uppercase",
        padding: "20px 30px 20px 0px",
      }}
      iconClass={styles.iconClass}
    >
      <div className={styles.container}>
        <Row>
          <Col lg={12} className={styles.inputField}>
            <h6>Enter your email address to get notified!</h6>
          </Col>
          <Col lg={12} className={styles.inputField}>
            <Input
              value={email}
              setter={setEmail}
              placeholder={"Email"}
              label={"Email"}
              type={"email"}
            />
          </Col>
          <div className={styles.submitBtn}>
            <Button
              label={loading ? "Submitting..." : "Submit"}
              disabled={loading}
              onClick={handleSubmit}
            />
          </div>
        </Row>
      </div>
    </ModalSkeleton>
  );
}
