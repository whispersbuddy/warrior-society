import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GoInfo } from "react-icons/go";
import { HiPlus } from "react-icons/hi";
import { LuEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Delete, Patch, Post } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import NoData from "../../../../Component/NoData/NoData";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import Tooltip from "../../../../Component/Tooltip";
import { profileTooltTipData } from "../../../../config/DummyData";
import { getTimeStamp } from "../../../../config/HelperFunction";
import { BaseURL, apiHeader, imageUrl } from "../../../../config/apiUrl";
import AddEditAccolades from "../../../../modals/AddEditAccolades";
import AddEditAssociation from "../../../../modals/AddEditAssociation";
import AddEditDiscipline from "../../../../modals/AddEditDiscipline";
import AddEditSkill from "../../../../modals/AddEditSkill";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import EditAffiliatedModal from "../../../../modals/EditAffiliatedModal";
import EditBioModal from "../../../../modals/EditBioModal";
import { updateUser } from "../../../../store/auth/authSlice";
import classes from "./StudentUserProfile.module.css";
const StudentUserProfile = ({ newWarriorUsers }) => {
  const navigate = useNavigate();
  const {
    publicFields: { associations: associationOptions, gyms: gymOptions },
  } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const { user, access_token } = useSelector((state) => state.authReducer);
  const [selectedData, setSelectedData] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    loading: false,
  });
  const [enableEdit, setEnableEdit] = useState(user?.studentDetails || false);
  const updateProfile = async (key, body) => {
    const params = {
      studentDetails: { ...user?.studentDetails, [key]: body },
    };
    const apiUrl = BaseURL(`profile/update?profile=student`);
    setModal((prev) => {
      return { ...prev, loading: true };
    });
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      setModal((prev) => {
        return { ...prev, show: false };
      });
    }
    setModal((prev) => {
      return { ...prev, loading: false };
    });
  };
  const handleAddEditAccolades = async (params) => {
    const apiUrl = BaseURL(
      selectedData === null
        ? "profile/addAccolades?profile=student"
        : `profile/updateAccolades?profile=student`
    );
    setModal((prev) => {
      return { ...prev, loading: true };
    });
    const response =
      selectedData === null
        ? await Post(apiUrl, params, apiHeader(access_token))
        : await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Accolade added successfully");
      setModal((prev) => {
        return { ...prev, show: false };
      });
    }
    setModal((prev) => {
      return { ...prev, loading: false };
    });
  };
  const handleDeleteAccolade = async () => {
    const apiUrl = BaseURL(
      `profile/deleteAccolade?accoladeId=${selectedData?._id}&profile=student`
    );
    setModal((prev) => {
      return { ...prev, loading: true };
    });
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success(`Accolade Deleted successfully`);
      setModal((prev) => {
        return { ...prev, show: false };
      });
    }
    setModal((prev) => {
      return { ...prev, loading: false };
    });
  };
  return (
    <div className={classes.profilePage}>
      <Container>
        <div
          className={[
            classes.userProfile,
            !enableEdit && classes.userBlurProfile,
          ].join(" ")}
        >
          <Row>
            <Col lg={8}>
              <div className={classes.leftContainer}>
                <div className={classes.aboutContainer}>
                  <div className={classes.header}>
                    <div className={classes.leftDiv}>
                      <h3>
                        About Me{" "}
                        <Tooltip
                          className={classes.tooltipDiv}
                          icon={
                            <RxInfoCircled className={classes.tooltipSvg} />
                          }
                        >
                          <span>{profileTooltTipData?.student?.aboutMe}</span>
                        </Tooltip>
                      </h3>
                    </div>

                    <span
                      className={classes.editBtn}
                      onClick={() => {
                        setSelectedData(user?.studentDetails?.bio);
                        setModal({ ...modal, show: "bio" });
                      }}
                      title="Edit Bio"
                    >
                      <LuEdit />
                    </span>
                  </div>
                  <p>
                    {user?.studentDetails?.bio ? (
                      user?.studentDetails?.bio
                    ) : (
                      <NoData text="No bio found" />
                    )}
                  </p>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>
                      Discipline(s){" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.student?.fightingDisipline}
                        </span>
                      </Tooltip>
                    </h3>
                    <span
                      className={classes.editBtn}
                      onClick={() => {
                        if (user?.studentDetails?.disciplines?.length >= 3) {
                          return toast.error(
                            "You can not add more than 3 disciplines"
                          );
                        }
                        setSelectedData(null);
                        setModal({ ...modal, show: "discipline" });
                      }}
                      title="Add New Discipline"
                    >
                      <HiPlus />
                    </span>
                  </div>
                  <div className={classes.types}>
                    {user?.studentDetails?.disciplines?.length > 0 ? (
                      user?.studentDetails?.disciplines?.map((discipline) => (
                        <div className={classes.disciplineeBox}>
                          <div>
                            <div className={classes.skill}>
                              <div className={classes.domainHeading}>
                                <h5>{discipline?.domain}</h5>
                                <div className={classes.editDiscipline}>
                                  <LuEdit
                                    className={classes.edit}
                                    onClick={() => {
                                      setSelectedData(discipline);
                                      setModal({
                                        ...modal,
                                        show: "discipline",
                                      });
                                    }}
                                    title="Edit Discipline"
                                  />
                                  <MdDelete
                                    className={classes.delete}
                                    onClick={() => {
                                      setSelectedData(discipline);
                                      setModal({
                                        ...modal,
                                        show: "discipline_delete",
                                      });
                                    }}
                                    title="Delete Discipline"
                                  />
                                </div>
                              </div>
                              <p>{discipline?.journey}</p>
                            </div>
                            <div className={classes.skillLevelTypes}>
                              {discipline?.martialArtType?.length > 0 && (
                                <p>
                                  <span className={classes.skillHeading}>
                                    Martial Art Type:
                                  </span>
                                  <span>
                                    {discipline?.martialArtType?.join?.(" | ")}
                                  </span>
                                </p>
                              )}
                              <p>
                                <span className={classes.skillHeading}>
                                  Knowledge Level:
                                </span>
                                <span>{discipline?.knowledgeLevel}</span>
                              </p>
                              <p>
                                <span className={classes.skillHeading}>
                                  Physical Skill Level:
                                </span>
                                <span>{discipline?.physicalSkillLevel}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <NoData text="No disciplines found" />
                    )}
                  </div>
                </div>
                <div className={classes.awardsContainer}>
                  <div className={classes.header}>
                    <h3>
                      Accolades{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<GoInfo className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.student?.accolades}</span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          setSelectedData(null);
                          setModal({ ...modal, show: "accolades" });
                        }}
                        title="Add New Accolade"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.awardImages}>
                    <Row>
                      {user?.studentDetails?.accolades?.length > 0 ? (
                        user?.studentDetails?.accolades?.map((award) => (
                          <Col sm={6} md={4} lg={3} className={classes.award}>
                            <div className={classes.imageBox}>
                              <img src={imageUrl(award?.image)} alt="" />
                            </div>
                            <p>{award?.accoladeName}</p>
                            <div className={classes.actionFields}>
                              <span
                                className={[
                                  classes.editBtn,
                                  classes.awardEdit,
                                ].join(" ")}
                                onClick={() => {
                                  setSelectedData(award);
                                  setModal({ ...modal, show: "accolades" });
                                }}
                                title="Edit Accolade"
                              >
                                <LuEdit className={classes.edit} />
                              </span>
                              <span
                                className={[
                                  classes.editBtn,
                                  classes.awardEdit,
                                ].join(" ")}
                                onClick={() => {
                                  setSelectedData(award);
                                  setModal({
                                    ...modal,
                                    show: "accolades_delete",
                                  });
                                }}
                                title="Delete Accolade"
                              >
                                <MdDelete className={classes.delete} />
                              </span>
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No accolades found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>
                      GYM{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.student?.gym}</span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          if (
                            gymOptions?.filter((ele) => ele?.name)?.length ===
                            user?.studentDetails?.affiliatedGyms?.length
                          ) {
                            return toast.error(
                              "You have already added all the existing gyms"
                            );
                          }
                          setSelectedData(null);
                          setModal({ ...modal, show: "affiliated" });
                        }}
                        title="Add New Gym"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {user?.studentDetails?.affiliatedGyms?.length > 0 ? (
                        user?.studentDetails?.affiliatedGyms?.map((club) => (
                          <Col sm={6} className={classes.gym}>
                            <img src={imageUrl(club?.gym?.image)} alt="" />
                            <div className={classes.gymContent}>
                              <div className={classes.domainHeading}>
                                <p>{club?.gym?.name}</p>
                                <div className={classes.editField}>
                                  <LuEdit
                                    className={classes.edit}
                                    onClick={() => {
                                      setSelectedData(club);
                                      setModal({
                                        ...modal,
                                        show: "affiliated",
                                      });
                                    }}
                                    title="Edit Gym"
                                  />
                                  <MdDelete
                                    className={classes.delete}
                                    onClick={() => {
                                      setSelectedData(club);
                                      setModal({
                                        ...modal,
                                        show: "affiliated_delete",
                                      });
                                    }}
                                    title="Delete Gym"
                                  />
                                </div>
                              </div>
                              {club?.startDate && club?.endDate && (
                                <span>{`${moment(club?.startDate).format(
                                  "MM/DD/YYYY"
                                )} - ${moment(club?.endDate).format(
                                  "MM/DD/YYYY"
                                )}`}</span>
                              )}
                              {club?.grade && <span>Grade: {club?.grade}</span>}
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No gyms found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>
                      Associations{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.student?.associations}
                        </span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          if (
                            associationOptions?.length ===
                            user?.studentDetails?.association?.length
                          ) {
                            return toast.error(
                              "You have already added all the existing associations"
                            );
                          }
                          setSelectedData(null);
                          setModal({ ...modal, show: "association" });
                        }}
                        title="Add New Association"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {user?.studentDetails?.association?.length > 0 ? (
                        user?.studentDetails?.association?.map((club) => (
                          <Col sm={6} className={classes.gym}>
                            <div className={classes.gymImage}>
                              <img
                                src={imageUrl(club?.association?.image)}
                                alt=""
                              />
                            </div>
                            <div className={classes.gymContent}>
                              <div className={classes.domainHeading}>
                                <p>{club?.association?.associationName}</p>
                                <div className={classes.editField}>
                                  <LuEdit
                                    className={classes.edit}
                                    onClick={() => {
                                      setSelectedData(club);
                                      setModal({
                                        ...modal,
                                        show: "association",
                                      });
                                    }}
                                    title="Edit Association"
                                  />
                                  <MdDelete
                                    className={classes.delete}
                                    onClick={() => {
                                      setSelectedData(club);
                                      setModal({
                                        ...modal,
                                        show: "association_delete",
                                      });
                                    }}
                                    title="Delete Association"
                                  />
                                </div>
                              </div>
                              {club?.startDate && club?.endDate && (
                                <span>{`${moment(club?.startDate).format(
                                  "MM/DD/YYYY"
                                )} - ${moment(club?.endDate).format(
                                  "MM/DD/YYYY"
                                )}`}</span>
                              )}
                              {club?.grade && <span>Grade: {club?.grade}</span>}
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No associations found" />
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={classes.rightContainer}>
                <div className={classes.header}>
                  <h3>
                    Joined Warrior Society{" "}
                    <Tooltip
                      className={classes.tooltipDiv}
                      icon={<RxInfoCircled className={classes.tooltipSvg} />}
                    >
                      <span>
                        {profileTooltTipData?.student?.joinedWarriorSociety}
                      </span>
                    </Tooltip>
                  </h3>
                </div>
                {newWarriorUsers?.length > 0 ? (
                  <>
                    <div className={classes.peopleContainer}>
                      {newWarriorUsers?.map((ele) => (
                        <div
                          className={classes.member}
                          onClick={() => {
                            navigate(`/profile/${ele?.slug}`);
                          }}
                        >
                          <ProfilePhoto
                            photo={ele?.photo}
                            profilePhotoDimensions={ele?.profilePhotoDimensions}
                            className={classes.memberImage}
                          />
                          <div className={classes.memberContent}>
                            <h6>
                              {ele?.firstName} {ele?.lastName}
                            </h6>
                            <p>Joined {getTimeStamp(ele?.createdAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      label={"Show All"}
                      className={classes.showAllBtn}
                      onClick={() => navigate("/users")}
                    />
                  </>
                ) : (
                  <NoData text="No society members" />
                )}
              </div>
            </Col>
          </Row>
          {modal?.show === "bio" && (
            <EditBioModal
              show={modal?.show}
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              onClick={updateProfile}
              isLoading={modal.loading}
              data={selectedData}
            />
          )}
          {modal?.show === "discipline" && (
            <AddEditDiscipline
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              onClick={updateProfile}
              apiLoading={modal?.loading}
              data={selectedData}
              roleDiscipline={user?.studentDetails?.disciplines || []}
            />
          )}
          {modal?.show === "discipline_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to delete this discipline?"}
              onClick={() => {
                const filteredDisciplineArr =
                  user?.studentDetails?.disciplines?.filter(
                    (ele) => ele?._id !== selectedData?._id
                  );
                updateProfile("disciplines", filteredDisciplineArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "accolades" && (
            <AddEditAccolades
              show={modal?.show}
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              data={selectedData}
              label={selectedData ? "Edit" : "Add"}
              onClick={handleAddEditAccolades}
              apiLoading={modal.loading}
            />
          )}
          {modal?.show === "accolades_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to remove this accolade?"}
              onClick={handleDeleteAccolade}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "skill" && (
            <AddEditSkill
              show={modal?.show}
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              data={selectedData}
              onClick={updateProfile}
              modalLoading={modal.loading}
              fieldArray={user?.studentDetails?.skills}
            />
          )}
          {modal?.show === "skill_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to remove this skill?"}
              onClick={() => {
                const filteredSkillArr = user?.studentDetails?.skills?.filter(
                  (ele) => ele?._id !== selectedData?._id
                );
                updateProfile("skills", filteredSkillArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "affiliated" && (
            <EditAffiliatedModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              onClick={updateProfile}
              isLoading={modal?.loading}
              data={selectedData}
              roleAffiliated={user?.studentDetails?.affiliatedGyms || []}
            />
          )}
          {modal?.show === "affiliated_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to remove this gym?"}
              onClick={() => {
                const filteredAffiliatedArr =
                  user?.studentDetails?.affiliatedGyms?.filter(
                    (ele) => ele?._id !== selectedData?._id
                  );
                updateProfile("affiliatedGyms", filteredAffiliatedArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "association" && (
            <AddEditAssociation
              show={modal?.show}
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              data={selectedData}
              onclick={updateProfile}
              modalLoading={modal.loading}
              roleAffiliated={user?.studentDetails?.association || []}
            />
          )}
          {modal?.show === "association_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to remove this association?"}
              onClick={() => {
                const filteredAssociationArr =
                  user?.studentDetails?.association?.filter(
                    (ele) => ele?._id !== selectedData?._id
                  );
                updateProfile("association", filteredAssociationArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
        </div>
      </Container>
      {!enableEdit && (
        <div className={classes.allowEditDiv}>
          <div className={classes.allowToEdit}>
            <h2>Are You A Student As Well?</h2>
            <Button
              label={"Fill In Your Information Now!"}
              onClick={() => setEnableEdit(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentUserProfile;
