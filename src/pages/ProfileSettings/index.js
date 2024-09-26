import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaKey,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Patch } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import ResponsiveDatePickers from "../../Component/Calender/Calender";
import CropImage from "../../Component/CropImage";
import CustomPhoneInput from "../../Component/CustomPhoneInput";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Input } from "../../Component/Input/Input";
import { handleNewUpload } from "../../Component/ProfileHeader";
import ProfilePhoto from "../../Component/ProfilePhoto";
import StateCitySelect from "../../Component/StateCitySelect";
import { validateUserFields } from "../../config/HelperFunction";
import { BaseURL, CreateFormData, apiHeader } from "../../config/apiUrl";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import EditCoverModal from "../../modals/EditCoverModal";
import EditFighterLogoModal from "../../modals/EditFighterLogoModal";
import { saveLoginUserData, updateUser } from "../../store/auth/authSlice";
import classes from "./ProfileSettings.module.css";

let coverInitialDimensions = {
  x: 0,
  y: 6.231578947368419,
  width: 100,
  height: 87.53684210526316,
};
const profileInitialDimensions = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

const ProfileSettings = () => {
  const { user, access_token: accessToken } = useSelector(
    (state) => state?.authReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [photo, setPhoto] = useState(user?.photo || "");
  const [bgPhoto, setBgPhoto] = useState(user?.bgPhoto || "");
  const [firstName, setFirstName] = useState(user?.firstName || null);
  const [lastName, setLastName] = useState(user?.lastName || null);
  const [contact, setContact] = useState(user?.contact || null);
  const [DOB, setDOB] = useState(user?.DOB || null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [facebook, setFacebook] = useState(user?.facebook || "");
  const [instagram, setInstagram] = useState(user?.instagram || "");
  const [twitter, setTwitter] = useState(user?.twitter || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [coverPhotoDimensions, setCoverPhotoDimensions] = useState(
    user?.coverPhotoDimensions || coverInitialDimensions
  );
  const [profilePhotoDimensions, setProfilePhotoDimensions] = useState(
    user?.profilePhotoDimensions || profileInitialDimensions
  );
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [coverUpdated, setCoverUpdated] = useState(false);
  const [updateCoverLoading, setUpdateCoverLoading] = useState(false);
  const [logoModal, setLogoModal] = useState(false);

  const handleSubmit = async () => {
    const errorFieldNames = [];
    const params = {
      firstName,
      lastName,
      contact: contact[0] == "+" ? contact : `+${contact}`,
      DOB: DOB ? moment(DOB?.$d || DOB).format("MM/DD/YYYY") : "",
      country: typeof country === "string" ? country : country?.name,
      state: typeof state === "string" ? state : state?.name,
      city: typeof city === "string" ? city : city?.name,
      coverPhotoDimensions,
      profilePhotoDimensions,
      facebook,
      instagram,
      twitter,
      linkedin,
    };
    for (let key in params) {
      if (["facebook", "instagram", "twitter", "linkedin"].includes(key))
        continue;
      if (!params[key]) {
        errorFieldNames.push(key);
      }
    }
    if (errorFieldNames.length > 0) {
      setErrorFields(errorFieldNames);
      return toast.error("Please fill all the required fields!");
    }
    if (!validateUserFields(params)) {
      return;
    }
    setUpdateLoading(true);
    const apiUrl = BaseURL("users/updateUserProfile");
    const response = await Patch(apiUrl, params, apiHeader(accessToken));
    if (response !== undefined) {
      toast.success("Profile Updated Successfully");
      dispatch(updateUser(response.data.data));
      navigate("/profile");
    }
    setUpdateLoading(false);
  };
  const handleUpdatePassword = async (body) => {
    const url = BaseURL("auth/updateMyPassword");
    setIsUpdating(true);
    const response = await Patch(url, body, apiHeader(accessToken));
    if (response !== undefined) {
      dispatch(saveLoginUserData(response));
      toast.success("Password updated successfully!");
      setModalOpen(false);
    }
    setIsUpdating(false);
  };
  const updateImage = async () => {
    const apiUrl = BaseURL(`profile/updatePicture`);
    if (bgPhoto?.name) {
      const params = {
        image: bgPhoto,
        key: "bgPhoto",
      };
      const formData = CreateFormData(params);
      const response = await Patch(apiUrl, formData, apiHeader(accessToken));
      if (!response) {
        return false;
      }
    }
    if (photo?.name) {
      const params = {
        image: photo,
        key: "photo",
      };
      const formData = CreateFormData(params);
      const response = await Patch(apiUrl, formData, apiHeader(accessToken));
      if (!response) {
        return false;
      }
    }
    return true;
  };
  const updateProfile = async () => {
    setUpdateCoverLoading(true);
    const res = await updateImage();
    if (!res) {
      setUpdateCoverLoading(false);
      return;
    }
    const apiUrl = BaseURL("users/updateUserProfile");
    const response = await Patch(
      apiUrl,
      { coverPhotoDimensions },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      toast.success("Cover Updated Successfully");
      dispatch(updateUser(response.data.data));
      setCoverUpdated(false);
    }
    setUpdateCoverLoading(false);
  };
  const location = useLocation();
  useEffect(() => {
    setCountry(user?.country);
    setCity(user?.city);
    setState(user?.state);
    coverInitialDimensions =
      user?.coverPhotoDimensions || coverInitialDimensions;
    const params = new URLSearchParams(location.search);
    const scroll = params.get("scroll");

    if (scroll === "end") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [location]);
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
      <NewsFeedHeader />
      <div className={classes.settingsPage}>
        <div className={classes.coverImg}>
          <CropImage
            state={bgPhoto}
            setter={setBgPhoto}
            setCoverPhotoDimensions={setCoverPhotoDimensions}
            coverPhotoDimensions={coverPhotoDimensions}
            setCoverUpdated={setCoverUpdated}
            acceptedTypes="image/*"
          />
          {handleNewUpload(bgPhoto, user, coverPhotoDimensions, "cover") &&
            coverUpdated && (
              <div className={classes.submitBtn}>
                <div
                  className={classes.update}
                  onClick={(e) => {
                    if (updateLoading) return;
                    e.stopPropagation();
                    updateProfile();
                  }}
                >
                  {updateCoverLoading ? "Saving..." : "Save"}
                </div>
              </div>
            )}
        </div>
        <Container>
          <div className={classes.settingsContainer}>
            <div className={classes.outerProfileDiv}>
              <ProfilePhoto
                photo={photo}
                profilePhotoDimensions={profilePhotoDimensions}
              />
              <div
                className={classes.editBtn}
                onClick={() => setEditProfileModal(true)}
              >
                <FaRegEdit title="Edit Profile Photo" />
              </div>
            </div>
            <div className={classes.changePassowrdDiv}>
              <Button
                onClick={() => setModalOpen(true)}
                className={classes.passowrdBtn}
              >
                <FaKey /> Change Password
              </Button>
            </div>
            <div className={classes.updateFields}>
              <Row>
                <Col xl={6} className={classes.inputField}>
                  <Input
                    value={firstName}
                    setter={setFirstName}
                    placeholder={"First Name"}
                    label={"First Name"}
                    labelLeftIcon={<ImUser />}
                    error={handleFieldError("firstName")}
                  />
                </Col>
                <Col xl={6} className={classes.inputField}>
                  <Input
                    value={lastName}
                    setter={setLastName}
                    placeholder={"Last Name"}
                    label={"Last Name"}
                    labelLeftIcon={<ImUser />}
                    error={handleFieldError("lastName")}
                  />
                </Col>
                {/* <Col xl={6} className={classes.inputField}>
                  <Input
                    value={nickname}
                    setter={setNickname}
                    placeholder={"Nick Name"}
                    label={"Nick Name"}
                    labelLeftIcon={<ImUser />}
                    error={handleFieldError("nickName")}
                  />
                </Col> */}
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
                    error={handleFieldError("DOB")}
                    placeholder="Date Of Birth"
                  />
                </Col>
                <Col xl={12} className={classes.inputField}>
                  <Input
                    value={user?.email}
                    placeholder={"Email"}
                    label={"Email"}
                    labelLeftIcon={<MdEmail />}
                    disabled={true}
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
                      errorFields={["country", "state", "city"]?.map((item) =>
                        handleFieldError(item)
                      )}
                    />
                  </Row>
                </Col>

                <div className={classes.socialContainer}>
                  <div className={classes.heading}>
                    <h2>Links</h2>
                  </div>
                  <Row>
                    <Col lg={6} className={classes.inputField}>
                      <Input
                        value={facebook}
                        setter={setFacebook}
                        placeholder={"https://www.facebook.com"}
                        label={"Facebook Link"}
                        labelLeftIcon={<FaFacebook />}
                      />
                    </Col>
                    <Col lg={6} className={classes.inputField}>
                      <Input
                        value={instagram}
                        setter={setInstagram}
                        placeholder={"https://www.instagram.com"}
                        label={"Instagram Link"}
                        labelLeftIcon={<FaInstagram />}
                      />
                    </Col>
                    <Col lg={6} className={classes.inputField}>
                      <Input
                        value={twitter}
                        setter={setTwitter}
                        placeholder={"https://twitter.com"}
                        label={"Twitter Link"}
                        labelLeftIcon={<FaTwitter />}
                      />
                    </Col>
                    <Col lg={6} className={classes.inputField}>
                      <Input
                        value={linkedin}
                        setter={setLinkedin}
                        placeholder={"https://linkedin.com"}
                        label={"Linkedin Link"}
                        labelLeftIcon={<FaLinkedin />}
                      />
                    </Col>
                  </Row>
                </div>

                <div className={classes.socialContainer}>
                  <div className={classes.heading}>
                    <h2>Company Details</h2>
                    <div className="mt-2">
                      <div className={classes.outer_profile_div}>
                        <div className={classes.profileDiv}>
                          <ProfilePhoto
                            photo={user?.logo}
                            profilePhotoDimensions={user?.logoDimensions}
                          />
                        </div>
                        <div
                          className={classes.editBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLogoModal(true);
                          }}
                        >
                          <FaRegEdit title="Edit Company Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Col lg={!2} className={classes.inputField}>
                  <Button
                    label={updateLoading ? "Updating..." : "Update Profile"}
                    disabled={updateLoading}
                    onClick={handleSubmit}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
      {editProfileModal && (
        <EditCoverModal
          show={editProfileModal}
          setShow={setEditProfileModal}
          label={"Profile"}
          selectedItem={{ photo, profilePhotoDimensions }}
          onClick={(params) => {
            setPhoto(params?.photo);
            setProfilePhotoDimensions(params?.profilePhotoDimensions);
          }}
          updatePhoto={true}
        />
      )}
      {modalOpen && (
        <ChangePasswordModal
          handleUpdate={handleUpdatePassword}
          isLoading={isUpdating}
          setShow={setModalOpen}
          show={modalOpen}
        />
      )}
      {logoModal && (
        <EditFighterLogoModal
          show={logoModal}
          setShow={setLogoModal}
          logo={user?.logo}
          logoDimensions={user?.logoDimensions}
        />
      )}
    </>
  );
};

export default ProfileSettings;
