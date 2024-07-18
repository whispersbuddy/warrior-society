import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { validateEmail } from "../../config/apiUrl";
import ModalSkeleton from "../ModalSkeleton";
import styles from "./OtpModal.module.css";
const OtpModal = ({
  show,
  setShow,
  email,
  handleOtpFunc,
  isOtpSend,
  resendOtp,
  resendOtpLoader,
}) => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(120);
  const handleSubmit = async () => {
    const params = {
      code: String(otp),
      email: email,
    };
    if (!validateEmail(params?.email)) {
      return toast.error("Please enter correct email");
    }
    for (let key in params) {
      if (params[key] == "") {
        return toast.error(`Please fill ${key} Code.`);
      }
    }
    if (String(params?.otpCode)?.length < 6) {
      return toast.error(`Otp Code is incomplete!`);
    }
    await handleOtpFunc(params);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1 > 0 ? seconds - 1 : "00");
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);
  return (
    <>
      <style></style>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        borderRadius="20px"
        header={`Otp Verification`}
        width={"600px"}
      >
        <div className={styles.OtpInput_main}>
          <p className={styles.pass}>Enter the One Time Password sent to</p>
          <p className={styles.gmail}>{email}</p>
          <div className={styles.otpMain}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputStyle={styles.OtpInput_style}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <p className={styles.resend}>
            {seconds !== "00" && (
              <span>
                Your OTP code will expire in{" "}
                <span className={styles.timeColor}>
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}
                </span>
                :
                <span className={styles.timeColor}>
                  {String(seconds % 60).padStart(2, "0")}
                </span>
              </span>
            )}{" "}
            {seconds == "00" && (
              <span>
                Your OTP code has expired.{" "}
                <span
                  onClick={async () => {
                    const res = await resendOtp(email);
                    if (res) {
                      setSeconds(120);
                    }
                  }}
                  className={styles.resendColor}
                >
                  Resend OTP
                </span>
              </span>
            )}
          </p>
          <div className={styles.verify_btn_main}>
            <Button
              disabled={isOtpSend}
              onClick={handleSubmit}
              label={isOtpSend ? "Verifying..." : "Verify"}
              className={styles.verify_btn}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default OtpModal;
