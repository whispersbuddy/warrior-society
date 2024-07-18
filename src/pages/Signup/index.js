import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { ImUser } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import CustomPhoneInput from "../../Component/CustomPhoneInput";
import { Input } from "../../Component/Input/Input";
import StateCitySelect from "../../Component/StateCitySelect";
import { BaseURL, apiHeader, validateEmail } from "../../config/apiUrl";
import { Logo, signupBg, whiteLogo } from "../../constant/imagePath";
import { saveLoginUserData } from "../../store/auth/authSlice";
import FighterSignup from "./FighterSignup";
import SchoolSignup from "./SchoolSignup";
import classes from "./Signup.module.css";
import StudentSignup from "./StudentSignup";
import TrainerSignup from "./TrainerSignup";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectRole, setSelectRole] = useState(true);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(userData?.email || null);
  const [current, setCurrent] = useState(0);
  const [password, setPassword] = useState(userData?.password || null);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(userData?.firstName || null);
  const [lastName, setLastName] = useState(userData?.lastName || null);
  const [contact, setContact] = useState(userData?.contact || null);
  const [country, setCountry] = useState(userData?.country || null);
  const [city, setCity] = useState(userData?.city || null);
  const [state, setState] = useState(userData?.state || null);
  const [passwordConfirm, setPasswordConfirm] = useState(
    userData?.passwordConfirm || null
  );
  const [DOB, setDOB] = useState(userData?.DOB || null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [role, setRole] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  const handleCheckEmail = async (email) => {
    const apiUrl = BaseURL(`users/checkEmail`);
    setLoading(true);
    const response = await Post(apiUrl, { email });
    if (response) {
      setLoading(false);
      return response;
    }
    setLoading(false);
    return false;
  };
  const handleSubmit = async (body) => {
    const errorFieldNames = [];
    let params = {
      firstName,
      lastName,
      contact: contact
        ? contact?.charAt(0) !== "+"
          ? `+${contact}`
          : contact
        : "",
      DOB: DOB ? moment(DOB?.$d || DOB).format("MM/DD/YYYY") : null,
      country: country?.name || country,
      state: state?.name || state,
      city: city?.name || city,
      email,
      password,
      passwordConfirm,
      role: role,
    };
    for (let key in params) {
      if (
        params[key] == "" ||
        params[key] == null ||
        params[key]?.length === 0
      ) {
        errorFieldNames.push(key);
      }
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      return;
    }
    if (moment(params.DOB).isAfter(dayjs())) {
      return toast.error("Date of birth cannot be greater than current date!");
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email!");
    }
    if (password?.length < 8 || passwordConfirm?.length < 8) {
      return toast.error(
        "Password/Confirm Password should not be less than 8 characters!"
      );
    }
    if (password !== passwordConfirm) {
      return toast.error("Password and confirm password does not match!");
    }
    if (!validator.isMobilePhone(contact)) {
      return toast.error("Invalid contact number!");
    }
    if (current == 0) {
      const res = await handleCheckEmail(email);
      if (!res) {
        return;
      }
    }
    params = {
      ...params,
      ...body,
      ...userData,
    };
    if (current !== role?.length && !isSubmit) {
      setCurrent(current + 1);
      return;
    }
    const url = BaseURL("auth/signup");
    setLoading(true);
    const response = await Post(url, params, apiHeader());
    if (response !== undefined) {
      dispatch(saveLoginUserData(response?.data));
      toast.success("SignUp successfully!");
      navigate("/login");
    }
    setLoading(false);
  };
  const FormByRole = () => {
    const currentRole = role[current - 1];
    return currentRole === "fighter" ? (
      <FighterSignup
        data={userData}
        setData={setUserData}
        page={current}
        setPage={setCurrent}
        onClick={handleSubmit}
        isSubmit={isSubmit}
        loading={loading}
        role={role}
      />
    ) : currentRole === "school" ? (
      <SchoolSignup
        data={userData}
        setData={setUserData}
        setPage={setCurrent}
        onClick={handleSubmit}
        isSubmit={isSubmit}
        loading={loading}
        role={role}
      />
    ) : currentRole === "trainer" ? (
      <TrainerSignup
        data={userData}
        setData={setUserData}
        page={current}
        setPage={setCurrent}
        onClick={handleSubmit}
        isSubmit={isSubmit}
        loading={loading}
        role={role}
      />
    ) : currentRole === "student" ? (
      <StudentSignup
        data={userData}
        setData={setUserData}
        page={current}
        setPage={setCurrent}
        onClick={handleSubmit}
        isSubmit={isSubmit}
        loading={loading}
        role={role}
      />
    ) : null;
  };
  const handleFieldError = (field, actualField) => {
    const theField = actualField ? actualField : field;

    return (
      ((Array.isArray(eval(theField)) && eval(theField)?.length === 0) ||
        [undefined, null, ""].includes(eval(theField))) &&
      errorFields?.includes(field)
    );
  };
  useEffect(() => {
    if (role?.length !== 0 && current === Number(role?.length)) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [role, current, selectRole]);

  return (
    <>
      {selectRole ? (
        <div className={classes.selectRoleWrapper}>
          <div
            className={classes.imageWrapper}
            style={{ backgroundImage: `url(${signupBg})` }}
          >
            <img
              className={classes.selectRoleLogo}
              src={whiteLogo}
              onClick={() => navigate("/")}
            />
            <div className={classes.description}>
              <h1>
                <span>Connecting</span> Warriors Across the <span>Globe</span>
              </h1>
            </div>
          </div>
          <div className={classes.chooseRoleWrapper}>
            <div className={classes.header}>
              <h1>Select All That Apply</h1>
            </div>
            <div className={classes.chooseRole}>
              <div
                className={`${classes.roleCheckbox} ${
                  role.includes("student") && classes.active
                }`}
                onClick={() =>
                  setRole((prev) => {
                    if (prev.includes("student")) {
                      return prev.filter((e) => e !== "student");
                    }
                    return [...prev, "student"];
                  })
                }
              >
                <p>Student</p>
                <div
                  className={[
                    classes.checkBoxDiv,
                    role.includes("student") && classes.checkBoxActive,
                  ].join(" ")}
                >
                  <FaCheck />
                </div>
              </div>
              <div
                className={`${classes.roleCheckbox} ${
                  role.includes("school") && classes.active
                }`}
                onClick={() =>
                  setRole((prev) => {
                    if (prev.includes("school")) {
                      return prev.filter((e) => e !== "school");
                    }
                    return [...prev, "school"];
                  })
                }
              >
                <p>GYM</p>
                <div
                  className={[
                    classes.checkBoxDiv,
                    role.includes("school") && classes.checkBoxActive,
                  ].join(" ")}
                >
                  <FaCheck />
                </div>
              </div>
              <div
                className={`${classes.roleCheckbox} ${
                  role.includes("trainer") && classes.active
                }`}
                onClick={() =>
                  setRole((prev) => {
                    if (prev.includes("trainer")) {
                      return prev.filter((e) => e !== "trainer");
                    }
                    return [...prev, "trainer"];
                  })
                }
              >
                <p>Trainer</p>
                <div
                  className={[
                    classes.checkBoxDiv,
                    role.includes("trainer") && classes.checkBoxActive,
                  ].join(" ")}
                >
                  <FaCheck />
                </div>
              </div>
              <div
                className={`${classes.roleCheckbox} ${
                  role.includes("fighter") && classes.active
                }`}
                onClick={() =>
                  setRole((prev) => {
                    if (prev.includes("fighter")) {
                      return prev.filter((e) => e !== "fighter");
                    }
                    return [...prev, "fighter"];
                  })
                }
              >
                <p>Fighter</p>
                <div
                  className={[
                    classes.checkBoxDiv,
                    role.includes("fighter") && classes.checkBoxActive,
                  ].join(" ")}
                >
                  <FaCheck />
                </div>
              </div>
            </div>
            <div className={classes.actionWrapper}>
              <Button
                onClick={() => {
                  if (role?.length === 0) {
                    return toast.error("Please select at least one role!");
                  }
                  setSelectRole(false);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.logo}>
            <img onClick={() => navigate("/")} src={Logo} alt="" />
          </div>
          {current === 0 ? (
            <div className={classes.pageMain}>
              <Container>
                <div className={classes.main}>
                  <h1>SignUp</h1>
                  <div className={classes.form}>
                    <Row className="gy-4">
                      <Col md={6} className={classes.inputField}>
                        <Input
                          setter={setFirstName}
                          value={firstName}
                          label={"First Name"}
                          placeholder={"First Name"}
                          labelLeftIcon={<ImUser />}
                          error={handleFieldError("firstName")}
                        />
                      </Col>
                      <Col md={6} className={classes.inputField}>
                        <Input
                          setter={setLastName}
                          value={lastName}
                          label={"Last Name"}
                          placeholder={"Last Name"}
                          labelLeftIcon={<ImUser />}
                          error={handleFieldError("lastName")}
                        />
                      </Col>
                      <Col md={6} className={classes.inputField}>
                        <CustomPhoneInput
                          setter={setContact}
                          value={contact}
                          label={"Phone Number"}
                          labelLeftIcon={<MdEmail />}
                          error={handleFieldError("contact")}
                        />
                      </Col>
                      <Col md={6} className={classes.inputField}>
                        <ResponsiveDatePickers
                          setter={setDOB}
                          calenderLabel={"Date Of Birth"}
                          value={DOB}
                          labelIcon={<SlCalender />}
                          maxValue={true}
                          placeholder="Date Of Birth"
                          error={handleFieldError("DOB")}
                        />
                      </Col>
                      <Col lg={12} className={classes.inputField}>
                        <Row>
                          <StateCitySelect
                            selectedCountry={country}
                            setSelectedCountry={setCountry}
                            selectedCity={city}
                            setSelectedCity={setCity}
                            selectedState={state}
                            setSelectedState={setState}
                            errorFields={["country", "state", "city"]?.map(
                              (item) => handleFieldError(item)
                            )}
                          />
                        </Row>
                      </Col>
                      <Col md={12} className={classes.inputField}>
                        <Input
                          setter={setEmail}
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
                          label={"Password"}
                          placeholder={"Password"}
                          labelLeftIcon={<BiSolidLockAlt />}
                          error={handleFieldError("password")}
                        />
                      </Col>
                      <Col md={12} className={classes.inputField}>
                        <Input
                          setter={setPasswordConfirm}
                          value={passwordConfirm}
                          type={"password"}
                          label={"Re-enter Password"}
                          placeholder={"Password"}
                          labelLeftIcon={<BiSolidLockAlt />}
                          error={handleFieldError("passwordConfirm")}
                        />
                      </Col>
                    </Row>
                    <div className={classes.submitBtn}>
                      <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        label={
                          loading
                            ? "Please wait..."
                            : isSubmit
                            ? "Submit"
                            : "Next"
                        }
                        customStyle={{
                          backgroundColor: "var(--secondary-color)",
                        }}
                      />
                      <Button
                        disabled={loading}
                        onClick={() => setSelectRole(true)}
                        label={"Previous"}
                      />
                    </div>
                    <div className={classes.chooseOther}>
                      <p>
                        Already have an account, please{" "}
                        <span onClick={() => navigate("/login")}> Login</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          ) : current <= role?.length ? (
            <FormByRole />
          ) : null}
        </>
      )}
    </>
  );
};

export default Signup;
