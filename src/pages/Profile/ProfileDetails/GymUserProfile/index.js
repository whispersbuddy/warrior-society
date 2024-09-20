import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { RxInfoCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Delete, Get, Patch, Post } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import { Input } from "../../../../Component/Input/Input";
import NoData from "../../../../Component/NoData/NoData";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import Tooltip from "../../../../Component/Tooltip";
import { profileTooltTipData } from "../../../../config/DummyData";
import {
  BaseURL,
  apiHeader,
  formRegEx,
  formRegExReplacer,
  imageUrl,
} from "../../../../config/apiUrl";
import AddEditAccolades from "../../../../modals/AddEditAccolades";
import AddEditAmenities from "../../../../modals/AddEditAmenities";
import AddEditAssociation from "../../../../modals/AddEditAssociation";
import AddEditGymDisciplineModal from "../../../../modals/AddEditGymDisciplineModal";
import AddOwners from "../../../../modals/AddOwners";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import CancelRequestModal from "../../../../modals/CancelRequestModal";
import EditBioModal from "../../../../modals/EditBioModal";
import EditDuesInformation from "../../../../modals/EditDuesInformation";
import { updateUser } from "../../../../store/auth/authSlice";
import classes from "./GymUserProfile.module.css";

const GymUserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: userData, access_token } = useSelector(
    (state) => state?.authReducer
  );
  const {
    publicFields: { associations: associationOptions },
  } = useSelector((state) => state.commonReducer);
  const [editModal, setEditModal] = useState(false);
  const [addFightLoading, setAddFightLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isAccoladesDeleting, setIsAccoladesDeleting] = useState(false);
  const [isAccolades, setIsAccolades] = useState(false);
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [allCancelRequest, setAllCancelRequest] = useState([]);
  const [isCancelRequest, setIsCancelRequest] = useState(false);
  const [isDeleteAddedUser, setIsDeleteAddedUser] = useState(false);
  const [selectType, setSelectType] = useState("owner");
  const [selectTypeForCancel, setSelectTypeForCancel] = useState("owner");

  // modals state------
  const [editBioModal, setEditBioModal] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [associationModal, setAssociationModal] = useState(false);
  const [disciplines, setDisciplines] = useState(false);
  const [amenitiesModal, setAmenitiesModal] = useState(false);
  const [duesInformationModal, setDuesInformationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [keyNameText, setKeyNameText] = useState(null);
  const [ownerModal, setOwnerModal] = useState(false);
  const [deleteAddedUserModal, setDeleteAddedUserModal] = useState(false);
  const [allCancelRequestGetModal, setAllCancelRequestGetModal] =
    useState(false);
  const [enableEdit, setEnableEdit] = useState(
    userData?.schoolDetails ? "submitted" : "blur-profile"
  );
  const [name, setName] = useState("");

  const handleSubmitFight = async (key, params, body) => {
    const apiUrl = BaseURL("profile/update?profile=school");
    let data = {
      schoolDetails: { ...userData?.schoolDetails, [key]: params },
    };

    if (body) {
      data = {
        ...data,
        schoolDetails: { ...data?.schoolDetails, ...body },
      };
    }

    setAddFightLoading(true);
    const response = await Patch(apiUrl, data, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Updated successfully");
      setEditBioModal(false);
      setDeleteModal(false);
      setAssociationModal(false);
      setDuesInformationModal(false);
      setDisciplines(false);
      setAmenitiesModal(false);
      if (enableEdit === "edit-name") {
        setEnableEdit("submitted");
      }
    }

    setAddFightLoading(false);
  };

  const handleAddEditAccolades = async (params) => {
    const apiUrl = BaseURL(
      selectedData === null
        ? "profile/addAccolades?profile=school"
        : `profile/updateAccolades?profile=school`
    );
    setIsAccolades(true);
    const response =
      selectedData === null
        ? await Post(apiUrl, params, apiHeader(access_token))
        : await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Accolade added successfully");
      setEditModal(false);
    }
    setIsAccolades(false);
  };

  const handleAccoladeDelete = async (id) => {
    const apiUrl = BaseURL(
      `profile/deleteAccolade?accoladeId=${id}&profile=school`
    );
    setIsAccoladesDeleting(true);
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Accolade deleted successfully");
      setAreYouSureModal(false);
    }
    setIsAccoladesDeleting(false);
  };

  const handleSendRequest = async (params) => {
    const apiUrl = BaseURL(`profile/sendRequest`);
    setIsSendRequest(true);
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success("Request sent successfully");
      if (params?.requested) {
        setAllCancelRequest((prev) => [...prev, response?.data?.data]);
      } else {
        setAllCancelRequest((prev) =>
          prev?.filter((ele) => ele?._id !== response?.data?.data?._id)
        );
      }
      setOwnerModal(false);
      setAllCancelRequestGetModal(false);
    }
    setIsSendRequest(false);
  };

  const getCancelRequest = async () => {
    const apiUrl = BaseURL(`profile/RequestedTo?type=${selectTypeForCancel}`);
    setIsCancelRequest(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setAllCancelRequest(response?.data?.data);
    }
    setIsCancelRequest(false);
  };
  const handleDeleteAddedUser = async (params) => {
    const apiUrl = BaseURL(`profile/removeAddeduser`);
    setIsDeleteAddedUser(true);
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success("User deleted successfully");
      dispatch(updateUser(response?.data?.data));
      setDeleteAddedUserModal(false);
    }
    setIsDeleteAddedUser(false);
  };

  useEffect(() => {
    getCancelRequest();
  }, [selectTypeForCancel]);
  return (
    <div className={classes.profilePage}>
      <Container>
        <div
          className={[
            classes.userProfile,
            ["blur-profile", "edit-name"].includes(enableEdit) &&
              classes.userBlurProfile,
          ].join(" ")}
        >
          <Row>
            <Col lg={12}>
              <div className={classes.leftContainer}>
                <Row className={classes.topDiv}>
                  <Col lg={8} className={classes.aboutRow}>
                    <div className={classes.aboutContainer}>
                      <div className={classes.header}>
                        <h3>
                          About Gym{" "}
                          <Tooltip
                            className={classes.tooltipDiv}
                            icon={
                              <RxInfoCircled className={classes.tooltipSvg} />
                            }
                          >
                            <span> {profileTooltTipData?.gym?.aboutGym}</span>
                          </Tooltip>
                        </h3>
                        <span
                          onClick={() => setEditBioModal(true)}
                          className={classes.editBtn}
                        >
                          <FaRegEdit title="Edit Bio" />
                        </span>
                      </div>
                      <p>
                        {userData?.schoolDetails?.bio ? (
                          userData?.schoolDetails?.bio
                        ) : (
                          <NoData text="No bio found" />
                        )}
                      </p>
                    </div>
                  </Col>
                  <Col lg={4} className={classes.aboutRow}>
                    <div className={classes.ownersContainer}>
                      <div className={classes.header}>
                        <h3>
                          Owners{" "}
                          <Tooltip
                            className={classes.tooltipDiv}
                            icon={
                              <RxInfoCircled className={classes.tooltipSvg} />
                            }
                          >
                            <span> {profileTooltTipData?.gym?.owners}</span>
                          </Tooltip>
                        </h3>
                        <div className={classes.actions}>
                          <span
                            onClick={() => {
                              setSelectTypeForCancel("owner");
                              setAllCancelRequestGetModal(true);
                            }}
                            className={classes.editBtn}
                            title="View Requested Owners"
                          >
                            <FaUser />
                          </span>
                          <span
                            onClick={() => {
                              setSelectedData(null);
                              setSelectType("owner");
                              setOwnerModal(true);
                            }}
                            className={classes.editBtn}
                            title="Add New Owner"
                          >
                            <HiPlus />
                          </span>
                        </div>
                      </div>
                      <div className={classes.owners}>
                        {userData?.schoolDetails?.owners?.length > 0 ? (
                          userData?.schoolDetails?.owners?.map((owner) => (
                            <>
                              <div className={classes.owners__wrapper}>
                                <div
                                  className={classes.ownerDetails}
                                  onClick={() =>
                                    navigate(`/profile/${owner?.slug}`)
                                  }
                                >
                                  <div className={classes.owner}>
                                    <ProfilePhoto
                                      photo={owner?.photo}
                                      profilePhotoDimensions={
                                        owner?.profilePhotoDimensions
                                      }
                                      className={classes.imgBox}
                                    />
                                  </div>
                                  <div>
                                    <p>
                                      {owner?.firstName} {owner?.lastName}
                                    </p>
                                  </div>
                                </div>
                                {userData?.schoolDetails?.owners?.find(
                                  (ele) => ele?._id !== userData?._id
                                ) && (
                                  <span
                                    onClick={() => {
                                      setSelectType("owner");
                                      setSelectedData(owner);
                                      setDeleteAddedUserModal(true);
                                    }}
                                  >
                                    <MdDelete />
                                  </span>
                                )}
                              </div>
                            </>
                          ))
                        ) : (
                          <NoData text="No Owners Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.fightingContainer}>
                      <div className={classes.header}>
                        <h3>
                          Discipline(s){" "}
                          <Tooltip
                            className={classes.tooltipDiv}
                            icon={
                              <RxInfoCircled className={classes.tooltipSvg} />
                            }
                          >
                            <span>
                              {" "}
                              {profileTooltTipData?.gym?.fightingDisipline}
                            </span>
                          </Tooltip>
                        </h3>
                        <span
                          onClick={() => {
                            setSelectedData(null);
                            setDisciplines(true);
                          }}
                          className={classes.editBtn}
                          title="Add New Discipline"
                        >
                          {userData?.schoolDetails?.disciplines?.length == 0 ? (
                            <HiPlus />
                          ) : (
                            <FaRegEdit />
                          )}
                        </span>
                      </div>
                      <div className={classes.types}>
                        {userData?.schoolDetails?.disciplines?.length > 0 ? (
                          userData?.schoolDetails?.disciplines?.map((ele) => {
                            return (
                              <div className={classes.skill}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.title}</h5>
                                </div>
                                <p>{ele?.disciplineDiscription}</p>
                              </div>
                            );
                          })
                        ) : (
                          <NoData text="No Discipline Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.rightContainer}>
                      <div className={classes.dues}>
                        <div className={classes.header}>
                          <h5>
                            Dues Information{" "}
                            <Tooltip
                              className={classes.tooltipDiv}
                              icon={
                                <RxInfoCircled className={classes.tooltipSvg} />
                              }
                            >
                              <span> {profileTooltTipData?.gym?.dues}</span>
                            </Tooltip>
                          </h5>
                          <span
                            onClick={() => setDuesInformationModal(true)}
                            className={classes.editBtn}
                            title="Edit Dues Fees, private lessons, drop ins, specials and additional information"
                          >
                            <FaRegEdit />
                          </span>
                        </div>
                        {userData?.schoolDetails?.duesInformation
                          ?.monthlyDueMin ? (
                          <>
                            <div className={classes.fee}>
                              <p>Monthly dues</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.monthlyDueMin
                                }{" "}
                                - $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.monthlyDueMax
                                }
                              </span>
                            </div>
                            <div className={classes.fee}>
                              <p>Private Lessons</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.privateMinFees
                                }{" "}
                                - $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.privateMaxFees
                                }
                              </span>
                            </div>{" "}
                            <div className={classes.fee}>
                              <p>Drop ins</p>
                              <span>
                                $
                                {
                                  userData?.schoolDetails?.duesInformation
                                    ?.dropin
                                }
                              </span>
                            </div>
                            <div className={classes.specials}>
                              <h5>Specials</h5>
                              <p>{userData?.schoolDetails?.special}</p>
                            </div>
                            <div className={classes.specials}>
                              <h5>Additional Information</h5>
                              <p>
                                {userData?.schoolDetails?.additionInformation}
                              </p>
                            </div>
                          </>
                        ) : (
                          <NoData text="No dues information found" />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className={classes.fightingContainer}>
                      <div className={classes.header}>
                        <h3>
                          Amenities{" "}
                          <Tooltip
                            className={classes.tooltipDiv}
                            icon={
                              <RxInfoCircled className={classes.tooltipSvg} />
                            }
                          >
                            <span> {profileTooltTipData?.gym?.amenities}</span>
                          </Tooltip>
                        </h3>
                        <span
                          onClick={() => {
                            setSelectedData(null);
                            setAmenitiesModal(true);
                          }}
                          className={classes.editBtn}
                          title="Add New Amenity"
                        >
                          <HiPlus />
                        </span>
                      </div>
                      <div className={classes.types}>
                        {userData?.schoolDetails?.equipments?.length > 0 ? (
                          userData?.schoolDetails?.equipments?.map((ele) => {
                            return (
                              <div className={classes.skill}>
                                <div className={classes.domainHeading}>
                                  <h5>{ele?.equipmentName}</h5>

                                  <MdDelete
                                    className={classes.delete}
                                    onClick={() => {
                                      setKeyNameText("equipments");
                                      setSelectedData(ele);
                                      setDeleteModal(true);
                                    }}
                                    cursor={"pointer"}
                                    title="Delete Amenity"
                                  />
                                </div>
                                <p>{ele?.description}</p>
                              </div>
                            );
                          })
                        ) : (
                          <NoData text="No Amenities Found" />
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Col lg={12}>
                  <div className={classes.awardsContainer}>
                    <div className={classes.header}>
                      <h3>
                        Accolades{" "}
                        <Tooltip
                          className={classes.tooltipDiv}
                          icon={
                            <RxInfoCircled className={classes.tooltipSvg} />
                          }
                        >
                          <span> {profileTooltTipData?.gym?.accolades}</span>
                        </Tooltip>
                      </h3>
                      <div className={classes.actions}>
                        <span
                          onClick={() => {
                            setSelectedData(null);
                            setEditModal(true);
                          }}
                          className={classes.editBtn}
                          title="Add New Accolade"
                        >
                          <HiPlus />
                        </span>
                      </div>
                    </div>{" "}
                    <div className={classes.awardImages}>
                      <Row>
                        {userData?.schoolDetails?.accolades?.length > 0 ? (
                          userData?.schoolDetails?.accolades?.map((award) => (
                            <Col
                              xs={12}
                              sm={6}
                              md={3}
                              lg={2}
                              className={classes.award}
                            >
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
                                    setEditModal(true);
                                  }}
                                  title="Edit Accolade"
                                >
                                  <FaRegEdit className={classes.edit} />
                                </span>

                                <span
                                  className={[
                                    classes.editBtn,
                                    classes.awardEdit,
                                  ].join(" ")}
                                  onClick={() => {
                                    setSelectedData(award);
                                    setAreYouSureModal(true);
                                  }}
                                  title="Delete Accolade"
                                >
                                  <MdDelete className={classes.delete} />
                                </span>
                              </div>
                            </Col>
                          ))
                        ) : (
                          <NoData text="No Accolades Found" />
                        )}
                      </Row>
                    </div>
                  </div>
                </Col>
                <div className={classes.instructorContainer}>
                  <div className={classes.header}>
                    <h3>
                      Associated Instructors{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {" "}
                          {profileTooltTipData?.gym?.associatedInstructors}
                        </span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        onClick={() => {
                          setSelectTypeForCancel("instructor");
                          setAllCancelRequestGetModal(true);
                        }}
                        className={classes.editBtn}
                        title="View Requested Instructors"
                      >
                        <FaUser />
                      </span>
                      <span
                        onClick={() => {
                          setSelectedData(null);
                          setSelectType("instructor");
                          setOwnerModal(true);
                        }}
                        className={classes.editBtn}
                        title="Add New Instructor"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.instructors?.length > 0 ? (
                        userData?.schoolDetails?.instructors?.map(
                          (instructor) => (
                            <Col
                              xs={6}
                              md={4}
                              lg={3}
                              xl={2}
                              className={classes.gym}
                            >
                              <span
                                className={classes.deleteIcon}
                                onClick={() => {
                                  setSelectType("instructor");
                                  setSelectedData(instructor);
                                  setDeleteAddedUserModal(true);
                                }}
                                title="Remove Instructor"
                              >
                                <MdDelete />
                              </span>
                              <img src={imageUrl(instructor?.photo)} alt="" />
                              <div className={classes.gymContent}>
                                <p>
                                  {instructor?.firstName} {instructor?.lastName}
                                </p>
                              </div>
                            </Col>
                          )
                        )
                      ) : (
                        <NoData text="No Instructors Found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.studentsContainer}>
                  <div className={classes.header}>
                    <h3>
                      Students{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span> {profileTooltTipData?.gym?.students}</span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        onClick={() => {
                          setSelectTypeForCancel("student");
                          setAllCancelRequestGetModal(true);
                        }}
                        className={classes.editBtn}
                        title="View Requested Students"
                      >
                        <FaUser />
                      </span>
                      <span
                        onClick={() => {
                          setSelectedData(null);
                          setSelectType("student");
                          setOwnerModal(true);
                        }}
                        className={classes.editBtn}
                        title="Add New Student"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.students?.length > 0 ? (
                        userData?.schoolDetails?.students?.map((instructor) => (
                          <Col
                            xs={6}
                            md={4}
                            lg={3}
                            xl={2}
                            className={classes.gym}
                          >
                            <span
                              className={classes.deleteIcon}
                              onClick={() => {
                                setSelectType("student");
                                setSelectedData(instructor);
                                setDeleteAddedUserModal(true);
                              }}
                              title="Remove Student"
                            >
                              <MdDelete />
                            </span>
                            <img src={imageUrl(instructor?.photo)} alt="" />
                            <div className={classes.gymContent}>
                              <p>
                                {instructor?.firstName} {instructor?.lastName}
                              </p>
                            </div>
                          </Col>
                        ))
                      ) : (
                        <NoData text="No Students Found" />
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
                        <span> {profileTooltTipData?.gym?.association}</span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        onClick={() => {
                          if (
                            associationOptions?.length ===
                            userData?.schoolDetails?.association?.length
                          ) {
                            return toast.error(
                              "You have already added all the existing sassociations"
                            );
                          }
                          setSelectedData(null);
                          setAssociationModal(true);
                        }}
                        className={classes.editBtn}
                        title="Add New Association"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.schoolDetails?.association?.length > 0 ? (
                        userData?.schoolDetails?.association?.map((club) => (
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
                                <div className={classes.editDlt__wrapper}>
                                  <FaRegEdit
                                    className={classes.edit}
                                    onClick={() => {
                                      setSelectedData(club);
                                      setAssociationModal(true);
                                    }}
                                    cursor={"pointer"}
                                    title="Edit Association"
                                  />
                                  <MdDelete
                                    className={classes.delete}
                                    onClick={() => {
                                      setKeyNameText("association");
                                      setSelectedData(club);
                                      setDeleteModal(true);
                                    }}
                                    cursor={"pointer"}
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
                        <NoData text="No Associations Found" />
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {editBioModal && (
            <EditBioModal
              show={editBioModal}
              setShow={setEditBioModal}
              onClick={handleSubmitFight}
              isLoading={addFightLoading}
              data={userData?.schoolDetails?.bio}
            />
          )}
          {duesInformationModal && (
            <EditDuesInformation
              show={duesInformationModal}
              setShow={setDuesInformationModal}
              onClick={handleSubmitFight}
              isLoading={addFightLoading}
              data={userData?.schoolDetails}
            />
          )}
          {associationModal && (
            <AddEditAssociation
              onclick={handleSubmitFight}
              modalLoading={addFightLoading}
              data={selectedData}
              setShow={setAssociationModal}
              show={associationModal}
              roleAffiliated={userData?.schoolDetails?.association}
            />
          )}
          {disciplines && (
            <AddEditGymDisciplineModal
              onClick={handleSubmitFight}
              apiLoading={addFightLoading}
              data={selectedData}
              setShow={setDisciplines}
              show={disciplines}
              roleAffiliated={userData?.schoolDetails?.disciplines}
            />
          )}
          {amenitiesModal && (
            <AddEditAmenities
              onClick={handleSubmitFight}
              modalLoading={addFightLoading}
              data={selectedData}
              setShow={setAmenitiesModal}
              show={amenitiesModal}
              roleAffiliated={userData?.schoolDetails?.equipments}
            />
          )}

          {editModal && (
            <AddEditAccolades
              show={editModal}
              setShow={setEditModal}
              data={selectedData}
              label={selectedData ? "Edit" : "Add"}
              onClick={handleAddEditAccolades}
              apiLoading={isAccolades}
            />
          )}

          {areYouSureModal && (
            <AreYouSureModal
              subTitle={"Are you sure you want to delete this accolade?"}
              show={areYouSureModal}
              setShow={setAreYouSureModal}
              onClick={() => handleAccoladeDelete(selectedData?._id)}
              isApiCall={isAccoladesDeleting}
            />
          )}
          {ownerModal && (
            <AddOwners
              selectType={selectType}
              setShow={setOwnerModal}
              show={ownerModal}
              selectedData={selectedData}
              onClick={handleSendRequest}
              isLoading={isSendRequest}
            />
          )}

          <AreYouSureModal
            subTitle={`Are you sure you want to delete this ${keyNameText
              ?.replace(formRegEx, formRegExReplacer)
              ?.toLowerCase()}?`}
            show={deleteModal}
            setShow={setDeleteModal}
            onClick={() =>
              handleSubmitFight(
                keyNameText,
                userData?.schoolDetails?.[keyNameText]?.filter(
                  (ele) => ele?._id !== selectedData?._id
                )
              )
            }
            isApiCall={addFightLoading}
          />
          {allCancelRequestGetModal && (
            <CancelRequestModal
              selectType={selectTypeForCancel}
              data={allCancelRequest}
              show={allCancelRequestGetModal}
              setShow={setAllCancelRequestGetModal}
              isGetting={isCancelRequest}
              onClick={handleSendRequest}
              isLoading={isSendRequest}
            />
          )}

          {deleteAddedUserModal && (
            <AreYouSureModal
              subTitle={"Are you sure you want to delete this user?"}
              show={deleteAddedUserModal}
              setShow={setDeleteAddedUserModal}
              onClick={() =>
                handleDeleteAddedUser({
                  userId: selectedData?._id,
                  type: selectType,
                })
              }
              isApiCall={isDeleteAddedUser}
            />
          )}
        </div>
      </Container>
      {["blur-profile", "edit-name"].includes(enableEdit) && (
        <div className={classes.allowEditDiv}>
          {enableEdit === "blur-profile" ? (
            <div className={classes.allowToEdit}>
              <h2>Are You A Gym Owner As Well?</h2>
              <Button
                label={"Fill In Your Information Now!"}
                onClick={() => setEnableEdit("edit-name")}
              />
            </div>
          ) : (
            // fill gym title to procees
            <div className={classes.allowToEdit}>
              <h2>Fill In Your Gym Title To Proceed</h2>
              <div className={classes.gym_title}>
                <Input
                  setter={setName}
                  value={name}
                  label={"Name Of School/GYM"}
                  placeholder={"Text Here"}
                  labelLeftIcon={<PiUsersThreeLight />}
                />{" "}
              </div>
              <Button
                label={addFightLoading ? "Submitting..." : "Submit"}
                onClick={() => handleSubmitFight("name", name)}
                disabled={addFightLoading}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GymUserProfile;
