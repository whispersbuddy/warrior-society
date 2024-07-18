import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Input } from "../../Component/Input/Input";
import { BaseURL, apiHeader, validateEmail } from "../../config/apiUrl";
import { Logo } from "../../constant/imagePath";
import { saveLoginUserData } from "../../store/auth/authSlice";
import classes from "./ForgotPassword.module.css";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    let params = {
      email,
    };
    if (params.email == "" || params.email == null)
      return toast.error("Please fill the email field!");
    if (!validateEmail(email)) {
      return toast.error("Invalid email!");
    }
    const url = BaseURL("auth/login");
    setLoading(true);
    const response = await Post(url, params, apiHeader());
    if (response !== undefined) {
      await dispatch(saveLoginUserData(response?.data));
      toast.success("ForgotPassword successfully");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.logo}>
        <img src={Logo} alt="" />
      </div>

      <div className={classes.pageMain}>
        <Container>
          <div className={classes.main}>
            <h1>Forgot Password</h1>
            <p>
              Enter your email and we'll send you a link to reset your password
            </p>
            <div className={classes.form}>
              <Row className="gy-4">
                <Col md={12} className={classes.inputField}>
                  <Input
                    setter={setEmail}
                    value={email}
                    label={"Email"}
                    placeholder={"Email"}
                    labelLeftIcon={<MdEmail />}
                  />
                </Col>
              </Row>
              <div className={classes.submitBtn}>
                <Button
                  disabled={loading}
                  onClick={handleLogin}
                  label={loading ? "Please wait..." : "Submit"}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
