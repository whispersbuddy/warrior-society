import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./forgotPasswordModal.module.css";

function ForgotPasswordModal({
  show,
  setShow,
  handleForgotPassword,
  isLoading,
}) {
  const [email, setEmail] = useState("");

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      width="600px"
      borderRadius="20px"
      header={`Forgot Password`}
    >
      <div className={classes.container}>
        <Row className={classes.row}>
          <Col md={12}>
            <Input
              setter={setEmail}
              value={email}
              placeholder={"Enter email here"}
              label={"Email"}
            />
          </Col>
          <Col md={12} className={classes.btn_main}>
            <Button
              label={isLoading ? "Submitting..." : "Submit"}
              onClick={() => handleForgotPassword(email)}
              className={classes.btn}
              disabled={isLoading}
            />
          </Col>
        </Row>
      </div>
    </ModalSkeleton>
  );
}

export default ForgotPasswordModal;
