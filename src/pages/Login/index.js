import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiSolidLockAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Patch, Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { BaseURL, apiHeader, validateEmail } from "../../config/apiUrl";
import { Logo } from "../../constant/imagePath";
import ConfirmPassword from "../../modals/ConfirmPassword";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal";
import OtpModal from "../../modals/OtpModal/OtpModal";
import { saveLoginUserData } from "../../store/auth/authSlice";
import classes from "./Login.module.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // forget
  const [forgetModal, setForgetModal] = useState(false);
  const [forgetLoader, setForgetLoader] = useState(false);
  // otp---
  const [otpModal, setOtpModal] = useState(false);
  const [otpLoader, setOtpLoader] = useState(false);
  const [forgotPassEmail, setForgotPassEmail] = useState("");
  const [code, setCode] = useState("");
  // confirmPass---
  const [confirmPassModal, setConfirmPassModal] = useState(false);
  const [confirmPassLoader, setConfirmPassLoader] = useState(false);
  // resend otp -------
  const [resendOtpLoader, setResendOtpLoader] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const handleLogin = async () => {
    const errorFieldNames = [];

    let params = {
      email,
      password,
    };
    for (let key in params) {
      if (params[key] == "" || params[key] == null) {
        errorFieldNames.push(key);
      }
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      toast.error(
        "Please check the error(s) in the form and fill the required fields!"
      );
      return;
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email!");
    }
    if (password?.length < 8) {
      return toast.error("Password should greater than 8 character!");
    }
    const url = BaseURL("auth/login");
    setLoading(true);
    const response = await Post(url, params, apiHeader());
    if (response !== undefined) {
      await dispatch(saveLoginUserData(response?.data));
      toast.success("Login successfully");
      navigate("/news-feed");
    }
    setLoading(false);
  };

  // forgot pass
  const handleForgotPassword = async (email) => {
    if (email == "") {
      return toast.error("Email is required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter correct email");
    }
    const url = BaseURL(`auth/forgotPassword`);
    setForgetLoader(true);
    const response = await Post(url, { email }, apiHeader());
    if (response !== undefined) {
      toast.success(
        "OTP code has been sent successfully. Please check your email!"
      );
      setForgetModal(false);
      setOtpModal(true);
      setForgotPassEmail(email);
    }
    setForgetLoader(false);
  };

  // Otp Code
  const handleResetPassword = async (params) => {
    const url = BaseURL(`auth/validate-otp`);
    setOtpLoader(true);
    const response = await Post(url, params, apiHeader());
    if (response !== undefined) {
      toast.success("Otp code is valid. Please change your password!");
      setOtpModal(false);
      setConfirmPassModal(true);
      setCode(params?.code);
    }
    setOtpLoader(false);
  };
  // Confirm Password -----
  const handleConfirmPassword = async (params) => {
    const url = BaseURL(`auth/resetPassword`);
    setConfirmPassLoader(true);
    const response = await Patch(url, params, apiHeader());
    if (response !== undefined) {
      await dispatch(saveLoginUserData(response?.data));
      toast.success("Password has been changed successfully!");
      setConfirmPassModal(false);
    }
    setConfirmPassLoader(false);
  };

  // resend otp ------
  const handleResendOtp = async (email) => {
    const url = BaseURL(`auth/resend-otp`);
    setResendOtpLoader(true);
    const response = await Patch(url, { email }, apiHeader());
    if (response !== undefined) {
      toast.success(
        "OTP code has been sent successfully. Please check your email!"
      );
      setResendOtpLoader(false);
      return response;
    }
    setResendOtpLoader(false);
    return false;
  };
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;

    return (
      ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };
  return (
    <>
      <div className={classes.logo} onClick={() => navigate("/")}>
        <img src={Logo} alt="" />
      </div>
      <div className={classes.pageMain}>
        <Container>
          <div className={classes.main}>
            <h1>Login</h1>
            <div className={classes.form}>
              <Row className="gy-4">
                <Col md={12} className={classes.inputField}>
                  <Input
                    setter={(e) => {
                      setEmail(e);
                    }}
                    value={email}
                    label={"Email"}
                    placeholder={"Email"}
                    labelLeftIcon={<MdEmail />}
                    error={handleFieldError("email")}
                  />
                </Col>
                <Col md={12} className={classes.inputField}>
                  <Input
                    setter={setPassword}
                    value={password}
                    type={"password"}
                    labelLeftIcon={<BiSolidLockAlt />}
                    label={"Password"}
                    placeholder={"Password"}
                    error={handleFieldError("password")}
                    enterClick={handleLogin}
                  />
                </Col>
              </Row>
              <div className={classes.forgot}>
                <div>
                  <p
                    onClick={() => {
                      setForgetModal(true);
                    }}
                  >
                    Forgot Password?
                  </p>
                </div>
              </div>
              <div className={classes.submitBtn}>
                <Button
                  disabled={loading}
                  onClick={handleLogin}
                  label={loading ? "Please wait..." : "Login"}
                />
              </div>
              <div className={classes.chooseOther}>
                <p>
                  Don't have an account, Please{" "}
                  <span onClick={() => navigate("/sign-up")}> Signup</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {forgetModal && (
        <ForgotPasswordModal
          isLoading={forgetLoader}
          handleForgotPassword={handleForgotPassword}
          setShow={setForgetModal}
          show={forgetModal}
        />
      )}
      {otpModal && (
        <OtpModal
          isOtpSend={otpLoader}
          handleOtpFunc={handleResetPassword}
          setShow={setOtpModal}
          show={otpModal}
          email={forgotPassEmail}
          resendOtp={handleResendOtp}
          resendOtpLoader={resendOtpLoader}
        />
      )}
      {confirmPassModal && (
        <ConfirmPassword
          isConfirmPass={confirmPassLoader}
          handleConfirmPass={handleConfirmPassword}
          setShow={setConfirmPassModal}
          show={confirmPassModal}
          email={forgotPassEmail}
          code={code}
        />
      )}
    </>
  );
};

export default Login;
