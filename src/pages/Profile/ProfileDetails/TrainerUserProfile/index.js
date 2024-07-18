import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiPlus } from "react-icons/hi";
import { LuEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Delete, Patch, Post } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import NoData from "../../../../Component/NoData/NoData";
import Tooltip from "../../../../Component/Tooltip";
import { profileTooltTipData } from "../../../../config/DummyData";
import { BaseURL, apiHeader, imageUrl } from "../../../../config/apiUrl";
import AddEditAccolades from "../../../../modals/AddEditAccolades";
import AddEditAssociation from "../../../../modals/AddEditAssociation";
import AddEditDiscipline from "../../../../modals/AddEditDiscipline";
import AddEditSkill from "../../../../modals/AddEditSkill";
import AddExperienceModal from "../../../../modals/AddExperienceModal";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import EditAffiliatedModal from "../../../../modals/EditAffiliatedModal";
import EditBioModal from "../../../../modals/EditBioModal";
import EditLessonModal from "../../../../modals/EditLessonModal";
import { updateUser } from "../../../../store/auth/authSlice";
import classes from "./TrainerUserProfile.module.css";
const TrainerUserProfile = () => {
  const {
    publicFields: { associations: associationOptions, gyms: gymOptions },
  } = useSelector((state) => state.commonReducer);
  const dispatch = useDispatch();
  const { user: userData, access_token } = useSelector(
    (state) => state?.authReducer
  );
  const [selectedData, setSelectedData] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    loading: false,
  });
  const [enableEdit, setEnableEdit] = useState(
    userData?.trainerDetails || false
  );
  const updateProfile = async (key, body) => {
    const params = {
      trainerDetails: { ...userData?.trainerDetails, [key]: body },
    };
    const apiUrl = BaseURL(`profile/update?profile=trainer`);
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
        ? "profile/addAccolades?profile=trainer"
        : `profile/updateAccolades?profile=trainer`
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
      toast.success(
        `Accolade ${selectedData ? "Updated" : "Created"} successfully`
      );
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
      `profile/deleteAccolade?accoladeId=${selectedData?._id}&profile=trainer`
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
  const updateSelectedFees = async (body) => {
    const params = {
      trainerDetails: { ...userData?.trainerDetails, ...body },
    };
    const apiUrl = BaseURL(`profile/update?profile=trainer`);
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
                    <h3>
                      Experience and Training Ideology{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {" "}
                          {
                            profileTooltTipData?.trainer
                              ?.experienceAndTrainingIdeology
                          }
                        </span>
                      </Tooltip>
                    </h3>

                    <span
                      className={classes.editBtn}
                      onClick={() => {
                        setSelectedData(userData?.trainerDetails?.bio);
                        setModal({ ...modal, show: "bio" });
                      }}
                      title="Edit training experience and ideology"
                    >
                      <LuEdit />
                    </span>
                  </div>
                  <p>
                    {userData?.trainerDetails?.bio ? (
                      userData?.trainerDetails?.bio
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
                          {" "}
                          {profileTooltTipData?.trainer?.trainingDisiplines}
                        </span>
                      </Tooltip>
                    </h3>

                    <span
                      className={classes.editBtn}
                      onClick={() => {
                        if (
                          userData?.trainerDetails?.disciplines?.length >= 3
                        ) {
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
                    {userData?.trainerDetails?.disciplines?.length > 0 ? (
                      userData?.trainerDetails?.disciplines?.map(
                        (discipline) => (
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
                                      {discipline?.martialArtType?.join(" | ")}
                                    </span>{" "}
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
                        )
                      )
                    ) : (
                      <NoData text="No disciplines found" />
                    )}
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>
                      Professional Background{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {" "}
                          {profileTooltTipData?.trainer?.professionalBackground}
                        </span>
                      </Tooltip>
                    </h3>
                    <span
                      className={classes.editBtn}
                      onClick={() => {
                        setSelectedData(null);
                        setModal({ ...modal, show: "experience" });
                      }}
                      title="Add Professional Experience"
                    >
                      <HiPlus />
                    </span>
                  </div>
                  <div
                    className={[classes.types, classes.experiences].join(" ")}
                  >
                    {userData?.trainerDetails?.experiences?.length > 0 ? (
                      userData?.trainerDetails?.experiences?.map((ele) => {
                        return (
                          <div className={classes.experience}>
                            <div>
                              <div className={classes.topHeading}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.organization}</h5>
                                  <div className={classes.editDiscipline}>
                                    <LuEdit
                                      className={classes.edit}
                                      onClick={() => {
                                        setSelectedData(ele);
                                        setModal({
                                          ...modal,
                                          show: "experience",
                                        });
                                      }}
                                      title="Edit Experience"
                                    />
                                    <MdDelete
                                      className={classes.delete}
                                      onClick={() => {
                                        setSelectedData(ele);
                                        setModal({
                                          ...modal,
                                          show: "experience_delete",
                                        });
                                      }}
                                      title="Delete Experience"
                                    />
                                  </div>
                                </div>
                                <p>{ele?.designation}</p>
                              </div>
                              <p className={classes.date}>
                                {moment(ele?.startDate).format("MM/DD/YYYY")} -{" "}
                                {ele?.stillWorking
                                  ? "Present"
                                  : moment(ele?.endDate).format("MM/DD/YYYY")}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <NoData text="No experiences found" />
                    )}
                  </div>
                </div>
                <div className={classes.awardsContainer}>
                  <div className={classes.header}>
                    <h3>
                      Accolades{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span> {profileTooltTipData?.trainer?.accolades}</span>
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
                      {userData?.trainerDetails?.accolades?.length > 0 ? (
                        userData?.trainerDetails?.accolades?.map((award) => (
                          <Col xs={6} sm={4} lg={3} className={classes.award}>
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
                    <div className={classes.leftDiv}>
                      <h3>Affiliated Gyms</h3>
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.trainer?.gym}</span>
                      </Tooltip>
                    </div>{" "}
                    <div className={classes.actions}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          if (
                            gymOptions?.filter((ele) => ele?.name)?.length ===
                            userData?.trainerDetails?.affiliatedGyms?.length
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
                      {userData?.trainerDetails?.affiliatedGyms?.length > 0 ? (
                        userData?.trainerDetails?.affiliatedGyms?.map(
                          (club) => (
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
                                {club?.grade && (
                                  <span>Grade: {club?.grade}</span>
                                )}
                              </div>
                            </Col>
                          )
                        )
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
                          {" "}
                          {profileTooltTipData?.trainer?.association}
                        </span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          if (
                            associationOptions?.length ===
                            userData?.trainerDetails?.association?.length
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
                      {userData?.trainerDetails?.association?.length > 0 ? (
                        userData?.trainerDetails?.association?.map((club) => (
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
                {userData?.trainerDetails?.availableForLesson && (
                  <div className={classes.chattingBox}>
                    <h3>Available For Private Lessons</h3>
                  </div>
                )}
                {userData?.trainerDetails?.availableForSparring && (
                  <div className={classes.chattingBox}>
                    <h3>Available For Sparring</h3>
                  </div>
                )}
                <div className={classes.editBtnDiv}>
                  <Button
                    label={"Edit Availability"}
                    onClick={() => {
                      setModal({ ...modal, show: "selectFees" });
                    }}
                    title="Edit your availability for Private Lessons and Sparring"
                  />
                </div>
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
              roleDiscipline={userData?.trainerDetails?.disciplines || []}
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
                  userData?.trainerDetails?.disciplines?.filter(
                    (ele) => ele?._id !== selectedData?._id
                  );
                updateProfile("disciplines", filteredDisciplineArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "experience" && (
            <AddExperienceModal
              show={modal?.show}
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              data={selectedData}
              modalLoading={modal.loading}
              onClick={updateProfile}
              roleExperiences={userData?.trainerDetails?.experiences || []}
            />
          )}
          {modal?.show === "experience_delete" && (
            <AreYouSureModal
              setShow={(e) => {
                setModal({ ...modal, show: false });
              }}
              show={modal?.show}
              subTitle={"Are you sure you want to remove this experience?"}
              onClick={() => {
                const filteredExperienceArr =
                  userData?.trainerDetails?.experiences
                    ?.filter((ele) => ele?._id !== selectedData?._id)
                    ?.map((ele) => {
                      const { createdAt, updatedAt, __v, _id, ...rest } = ele;
                      return {
                        ...rest,
                        startDate: moment(rest?.startDate).format("MM/DD/YYYY"),
                        endDate: moment(rest?.endDate).format("MM/DD/YYYY"),
                      };
                    });
                updateProfile("experiences", filteredExperienceArr);
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
              fieldArray={userData?.trainerDetails?.skills || []}
              role={"trainer"}
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
                const filteredSkillArr =
                  userData?.trainerDetails?.skills?.filter(
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
              roleAffiliated={userData?.trainerDetails?.affiliatedGyms || []}
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
                  userData?.trainerDetails?.affiliatedGyms?.filter(
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
              roleAffiliated={userData?.trainerDetails?.association || []}
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
                  userData?.trainerDetails?.association?.filter(
                    (ele) => ele?._id !== selectedData?._id
                  );
                updateProfile("association", filteredAssociationArr);
              }}
              isApiCall={modal?.loading}
            />
          )}
          {modal?.show === "selectFees" && (
            <EditLessonModal
              show={modal?.show}
              setShow={() => {
                setModal({
                  ...modal,
                  show: false,
                });
              }}
              roles={[
                "Available For Private Lessons",
                "Available For Sparring",
              ]}
              data={userData?.trainerDetails}
              onclick={updateSelectedFees}
              modalLoading={modal.loading}
            />
          )}
        </div>
      </Container>
      {!enableEdit && (
        <div className={classes.allowEditDiv}>
          <div className={classes.allowToEdit}>
            <h2>Are You A Trainer As Well?</h2>
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

export default TrainerUserProfile;
