import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiPlus } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxInfoCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Delete, Get, Patch, Post } from "../../../../Axios/AxiosFunctions";
import { Button } from "../../../../Component/Button/Button";
import NoData from "../../../../Component/NoData/NoData";
import Tooltip from "../../../../Component/Tooltip";
import ProfilePhoto from "../../../../Component/ProfilePhoto";
import { profileTooltTipData } from "../../../../config/DummyData";
import {
  BaseURL,
  apiHeader,
  formRegEx,
  formRegExReplacer,
  imageUrl,
} from "../../../../config/apiUrl";
import AddEditAccolades from "../../../../modals/AddEditAccolades";
import AddEditAssociation from "../../../../modals/AddEditAssociation";
import AddEditDiscipline from "../../../../modals/AddEditDiscipline";
import AddEditUpcomingFightingModal from "../../../../modals/AddEditUpcomingFightingModal";
import AddFightingModal from "../../../../modals/AddFightingModal";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
import EditAffiliatedModal from "../../../../modals/EditAffiliatedModal";
import EditBioModal from "../../../../modals/EditBioModal";
import EditLessonModal from "../../../../modals/SponsorRequestsModal";
import EditNicknameModal from "../../../../modals/AddEditNickNameModal/EditNiceNameModal";
import SponsorRequestsModal from "../../../../modals/SponsorRequestsModal";
import { updateUser } from "../../../../store/auth/authSlice";
import classes from "./FighterUserProfile.module.css";

const FighterUserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { user: userData, access_token } = useSelector(
    (state) => state?.authReducer
  );
  const {
    publicFields: { associations: associationOptions, gyms: gymOptions },
  } = useSelector((state) => state.commonReducer);
  const showAvailabilityBorder =
    userData?.fighterDetails?.availableForFight ||
    userData?.fighterDetails?.availableForSparring;
  const [addFightLoading, setAddFightLoading] = useState(false);
  const [isAccolades, setIsAccolades] = useState(false);
  const [isAccoladesDeleting, setIsAccoladesDeleting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  // modals state------
  const [editModal, setEditModal] = useState(false);
  const [editBioModal, setEditBioModal] = useState(false);
  const [editNickNameModal, setEditNickNameModal] = useState(false);
  const [addFightingModal, setAddFightingModal] = useState(false);
  const [upComingModal, setUpComingModal] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [affiliatedModal, setAffiliatedModal] = useState(false);
  const [associationModal, setAssociationModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [disciplineModal, setDisciplineModal] = useState(false);
  const [keyNameText, setKeyNameText] = useState(null);
  const [selectFeesModal, setSelectFeesModal] = useState(false);
  const [selectFeesLoading, setSelectFeesLoading] = useState(false);
  const [enableEdit, setEnableEdit] = useState(
    userData?.fighterDetails || false
  );
  const [sponsorRequests, setSponsorRequests] = useState([]);
  const [acceptedSponsorRequests, setAcceptedSponsorRequests] = useState([]);
  const [requestModal, setRequestModal] = useState(false);

  const getSponsorRequests = async () => {
    const apiUrl = BaseURL(`sponsors/request/${userData?._id}?status=pending`);
    const apiUrl2 = BaseURL(
      `sponsors/request/${userData?._id}?status=accepted`
    );
    const response = await Get(apiUrl, access_token);
    const response2 = await Get(apiUrl2, access_token);

    if (response) {
      setSponsorRequests(response?.data);
      setAcceptedSponsorRequests(response2?.data);
    }
  };

  useEffect(() => {
    getSponsorRequests();
  }, [userData]);

  const handleSubmitFight = async (key, params) => {
    const apiUrl = BaseURL("profile/update?profile=fighter");
    let data = {
      fighterDetails: { ...userData?.fighterDetails, [key]: params },
    };
    setAddFightLoading(true);
    const response = await Patch(apiUrl, data, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Updated successfully");
      setEditBioModal(false);
      setAddFightingModal(false);
      setAffiliatedModal(false);
      setUpComingModal(false);
      setDeleteModal(false);
      setAssociationModal(false);
      setDisciplineModal(false);
      setEditNickNameModal(false);
    }

    setAddFightLoading(false);
  };

  const handleAddEditAccolades = async (params) => {
    const apiUrl = BaseURL(
      selectedData === null
        ? "profile/addAccolades?profile=fighter"
        : `profile/updateAccolades?profile=fighter`
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
    const apiUrl = BaseURL(`profile/deleteAccolade/${id}`);
    setIsAccoladesDeleting(true);
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      toast.success("Accolade deleted successfully");
      setAreYouSureModal(false);
    }
    setIsAccoladesDeleting(false);
  };

  const updateSelectedFees = async (body) => {
    const params = {
      fighterDetails: { ...userData?.fighterDetails, ...body },
    };
    const apiUrl = BaseURL(`profile/update?profile=fighter`);
    setSelectFeesLoading(true);
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
      setSelectFeesModal(false);
    }
    setSelectFeesLoading(false);
  };

  const handleUpdateRequest = async (id, type) => {
    setSelectFeesLoading(true);
    const params = {
      status: type,
    };
    const apiUrl = BaseURL(`sponsors/${id}`);
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    console.log(response);
    setSelectFeesLoading(false);

    if (response) {
      getSponsorRequests();
      toast.success("Request updated successfully");
    }
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
                      Nick Name{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.fighter?.nickName}</span>
                      </Tooltip>
                    </h3>
                    <span
                      onClick={() => setEditNickNameModal(true)}
                      className={classes.editBtn}
                      title="Edit About"
                    >
                      <FaRegEdit />
                    </span>
                  </div>
                  <h5>
                    {userData?.fighterDetails?.nickName ? (
                      userData?.fighterDetails?.nickName
                    ) : (
                      <NoData text="No Nick Name found" />
                    )}
                  </h5>
                </div>
                <div className={classes.aboutContainer}>
                  <div className={classes.header}>
                    <h3>
                      About Me{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>{profileTooltTipData?.fighter?.aboutMe}</span>
                      </Tooltip>
                    </h3>
                    <span
                      onClick={() => setEditBioModal(true)}
                      className={classes.editBtn}
                      title="Edit About"
                    >
                      <FaRegEdit />
                    </span>
                  </div>
                  <p>
                    {userData?.fighterDetails?.bio ? (
                      userData?.fighterDetails?.bio
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
                          {profileTooltTipData?.fighter?.fightingDisipline}
                        </span>
                      </Tooltip>
                    </h3>
                    <span
                      onClick={() => {
                        if (
                          userData?.fighterDetails?.disciplines?.length >= 3
                        ) {
                          return toast.error(
                            "You can not add more than 3 disciplines"
                          );
                        }
                        setSelectedData(null);
                        setDisciplineModal(true);
                      }}
                      className={classes.editBtn}
                      title="Add New Discipline"
                    >
                      <HiPlus />
                    </span>
                  </div>
                  <div className={classes.types}>
                    {userData?.fighterDetails?.disciplines?.length > 0 ? (
                      userData?.fighterDetails?.disciplines?.map(
                        (discipline) => {
                          return (
                            <div className={classes.disciplineeBox}>
                              <div>
                                <div className={classes.skill}>
                                  <div className={classes.domainHeading}>
                                    <h5>{discipline?.domain}</h5>
                                    <div className={classes.editDiscipline}>
                                      <FaRegEdit
                                        className={classes.edit}
                                        onClick={() => {
                                          setSelectedData(discipline);
                                          setDisciplineModal(true);
                                        }}
                                        title="Edit Discipline"
                                      />
                                      <MdDelete
                                        className={classes.delete}
                                        onClick={() => {
                                          setKeyNameText("disciplines");
                                          setSelectedData(discipline);
                                          setDeleteModal(true);
                                        }}
                                        title="Delete Discipline"
                                      />
                                    </div>
                                  </div>
                                  <p>{discipline?.journey}</p>
                                </div>
                                <div className={classes.skillLevelTypes}>
                                  {discipline?.martialArtType?.length && (
                                    <p>
                                      <span className={classes.skillHeading}>
                                        Martial Art Type:
                                      </span>
                                      <span>
                                        {discipline?.martialArtType?.join(
                                          " | "
                                        )}
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
                                    <span>
                                      {discipline?.physicalSkillLevel}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )
                    ) : (
                      <NoData text="No Discipline found" />
                    )}
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>
                      Fighting Record{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        position="right"
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.fighter?.fightingRecord}
                        </span>
                      </Tooltip>
                    </h3>
                    <div className={classes.fightingRecord__icons}>
                      <span
                        className={classes.editBtn}
                        onClick={() => {
                          setSelectedData(null);
                          setAddFightingModal(true);
                        }}
                        title="Add New Fighting Record"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>
                  <div className={classes.content}>
                    <div className={classes.gridWrapper}>
                      {user?.fighterStats?.map((e, i) => (
                        <p key={i}>
                          {e?.type}
                          <span>{e?.value}</span>
                        </p>
                      ))}
                    </div>
                    <div className={classes.tableWrapper}>
                      {userData?.fighterDetails?.fightingRecord?.length > 0 ? (
                        <>
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Discipline</th>
                                <th>Result</th>
                                <th>Venue</th>
                                <th>#</th>
                              </tr>
                            </thead>

                            <tbody>
                              {userData?.fighterDetails?.fightingRecord
                                ?.slice() // create a shallow copy to avoid mutating the original array
                                ?.sort(
                                  (a, b) => new Date(b.date) - new Date(a.date)
                                ) // sort in descending order by date
                                ?.map((e, i) => (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{e?.category}</td>
                                    <td>
                                      {moment(e?.date)?.format("MM/DD/YYYY")}
                                    </td>
                                    <td>{e?.discipline}</td>
                                    <td>{e?.result}</td>
                                    <td>{e?.via}</td>
                                    <td>
                                      <FaRegEdit
                                        className={classes.edit}
                                        onClick={() => {
                                          setSelectedData(e);
                                          setAddFightingModal(true);
                                        }}
                                        cursor={"pointer"}
                                        title="Edit Fighting Record"
                                      />
                                      <MdDelete
                                        className={classes.delete}
                                        onClick={() => {
                                          setKeyNameText("fightingRecord");
                                          setSelectedData(e);
                                          setDeleteModal(true);
                                        }}
                                        cursor={"pointer"}
                                        title="Delete Fighting Record"
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <NoData text="No Fighting Record found" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.fightingContainer}>
                  <div className={classes.header}>
                    <h3>
                      Upcoming Fights{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.fighter?.upcomingFights}
                        </span>
                      </Tooltip>
                    </h3>
                    <span
                      onClick={() => {
                        setSelectedData(null);
                        setUpComingModal(true);
                      }}
                      className={classes.editBtn}
                      title="Add New Upcoming Fight"
                    >
                      <HiPlus />
                    </span>
                  </div>
                  <div className={classes.content}>
                    <div className={classes.tableWrapper}>
                      {userData?.fighterDetails?.upcomingFight?.length > 0 ? (
                        <>
                          <table>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Event</th>
                                <th>Venue</th>
                                <th>#</th>
                              </tr>
                            </thead>

                            <tbody>
                              {userData?.fighterDetails?.upcomingFight?.map(
                                (e, i) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{e?.time}</td>
                                    <td>
                                      {moment(e?.date)?.format("MM/DD/YYYY")}
                                    </td>
                                    <td>{e?.event || "-"}</td>
                                    <td>{e?.venue}</td>
                                    <td>
                                      <FaRegEdit
                                        className={classes.edit}
                                        onClick={() => {
                                          setSelectedData(e);
                                          setUpComingModal(true);
                                        }}
                                        cursor={"pointer"}
                                        title="Edit Upcoming Fight"
                                      />
                                      <MdDelete
                                        className={classes.delete}
                                        onClick={() => {
                                          setKeyNameText("upcomingFight");
                                          setSelectedData(e);
                                          setDeleteModal(true);
                                        }}
                                        cursor={"pointer"}
                                        title="Delete Upcoming Fight"
                                      />
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <NoData text="No Upcoming Fights found" />
                      )}
                    </div>
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
                        <span>{profileTooltTipData?.fighter?.accolades}</span>
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
                      {userData?.fighterDetails?.accolades?.length > 0 ? (
                        userData?.fighterDetails?.accolades?.map((award) => (
                          <Col xs={6} sm={4} lg={3} className={classes.award}>
                            <div className={classes.imageBox}>
                              <img src={imageUrl(award?.image)} alt="" />
                            </div>
                            <div className={classes.domainHeading}>
                              <p>{award?.accoladeName}</p>
                            </div>
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
                        <NoData text="No Accolades found" />
                      )}
                    </Row>
                  </div>
                </div>
                <div className={classes.gymsContainer}>
                  <div className={classes.header}>
                    <h3>
                      Affiliated Gyms{" "}
                      <Tooltip
                        className={classes.tooltipDiv}
                        icon={<RxInfoCircled className={classes.tooltipSvg} />}
                      >
                        <span>
                          {profileTooltTipData?.fighter?.affiliatedGyms}
                        </span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        onClick={() => {
                          if (
                            gymOptions?.filter((ele) => ele?.name)?.length ===
                            userData?.fighterDetails?.affiliatedGyms?.length
                          ) {
                            return toast.error(
                              "You have already added all the existing gyms"
                            );
                          }
                          setSelectedData(null);
                          setAffiliatedModal(true);
                        }}
                        className={classes.editBtn}
                        title="Add New Gym"
                      >
                        <HiPlus />
                      </span>
                    </div>
                  </div>{" "}
                  <div className={classes.gymContent}>
                    <Row>
                      {userData?.fighterDetails?.affiliatedGyms?.length > 0 ? (
                        userData?.fighterDetails?.affiliatedGyms?.map(
                          (club) => (
                            <Col sm={6} className={classes.gym}>
                              <img src={imageUrl(club?.gym?.image)} alt="" />
                              <div className={classes.gymContent}>
                                <div className={classes.domainHeading}>
                                  <p>{club?.gym?.name}</p>
                                  <div className={classes.editDiscipline}>
                                    <FaRegEdit
                                      className={classes.edit}
                                      onClick={() => {
                                        setSelectedData(club);
                                        setAffiliatedModal(true);
                                      }}
                                      cursor={"pointer"}
                                      title="Edit Gym"
                                    />
                                    <MdDelete
                                      className={classes.delete}
                                      onClick={() => {
                                        setKeyNameText("affiliatedGyms");
                                        setSelectedData(club);
                                        setDeleteModal(true);
                                      }}
                                      cursor={"pointer"}
                                      title="Delete Gym"
                                    />
                                  </div>
                                </div>
                                {club?.startDate && (
                                  <span>
                                    {moment(club?.startDate).format(
                                      "MM/DD/YYYY"
                                    )}
                                    {club?.endDate &&
                                      ` - ${moment(club?.endDate).format(
                                        "MM/DD/YYYY"
                                      )}`}
                                  </span>
                                )}
                                {club?.grade && (
                                  <span>Grade: {club?.grade}</span>
                                )}
                              </div>
                            </Col>
                          )
                        )
                      ) : (
                        <NoData text="No Affiliated Gyms found" />
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
                        <span>{profileTooltTipData?.fighter?.association}</span>
                      </Tooltip>
                    </h3>
                    <div className={classes.actions}>
                      <span
                        onClick={() => {
                          if (
                            associationOptions?.length ===
                            userData?.fighterDetails?.association?.length
                          ) {
                            return toast.error(
                              "You have already added all the existing associations"
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
                      {userData?.fighterDetails?.association?.length > 0 ? (
                        userData?.fighterDetails?.association?.map((club) => (
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
                                <div className={classes.editDiscipline}>
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
                        <NoData text="No Associations found" />
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div
                className={[
                  classes.availability_container,
                  showAvailabilityBorder && classes.border_container,
                ].join(" ")}
              >
                {userData?.fighterDetails?.availableForFight && (
                  <div className={classes.chattingBox}>
                    <h3>Available at 155 LBS for MMA</h3>
                  </div>
                )}
                {userData?.fighterDetails?.availableForSparring && (
                  <div className={classes.chattingBox}>
                    <h3>Available as a Sparring Partner</h3>
                  </div>
                )}
                <div className={classes.editBtnDiv}>
                  <Button
                    label={"Edit Availability"}
                    onClick={() => {
                      setSelectFeesModal(true);
                    }}
                    title="Edit your availability for MMA and Sparring Partner"
                  />
                  {/* <Button
                    className="mt-4"
                    label="Sponsor Requests"
                    onClick={() => {
                      setRequestModal(true);
                    }}
                    title="Edit your availability for MMA and Sparring Partner"
                  /> */}
                </div>
                {acceptedSponsorRequests?.length ? (
                  <div className={classes.sponsorRequests}>
                    <h3 className="mt-4">Your Sponsors</h3>
                    <div className="mt-2">
                      {acceptedSponsorRequests?.map((sponsor, ind) => {
                        let sponsorshipLevel = "";
                        let sponsorshipClass = "";
                        if (ind === 0) {
                          sponsorshipLevel = "Gold";
                          sponsorshipClass = classes.gold;
                        } else if (ind === 1) {
                          sponsorshipLevel = "Silver";
                          sponsorshipClass = classes.silver;
                        } else if (ind === 2) {
                          sponsorshipLevel = "Bronze";
                          sponsorshipClass = classes.bronze;
                        }
                        return (
                          <div
                            key={sponsor?._id}
                            className={`card p-4 d-flex align-items-center mt-2`}
                          >
                            <div className={classes.sponsorRequests__header}>
                              <ProfilePhoto
                                photo={sponsor?.receiver?.logo}
                                profilePhotoDimensions={
                                  sponsor?.receiver?.logoDimensions
                                }
                                className={classes.profileImg}
                              />
                            </div>

                            {/* {sponsorshipLevel && (
                              <p className={sponsorshipClass}>
                                {sponsorshipLevel}
                              </p>
                            )} */}

                            <h5 className="mt-1">
                              {sponsor?.sender?.firstName}{" "}
                              {sponsor?.sender?.lastName}
                            </h5>
                            <div className={classes.sponsorRequests__amount}>
                              <h6>${sponsor?.amount}</h6>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
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
          {addFightingModal && (
            <AddFightingModal
              show={addFightingModal}
              setShow={setAddFightingModal}
              onclick={handleSubmitFight}
              modalLoading={addFightLoading}
              data={selectedData}
              roleAffiliated={userData?.fighterDetails?.fightingRecord || []}
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
          {editBioModal && (
            <EditBioModal
              show={editBioModal}
              setShow={setEditBioModal}
              onClick={handleSubmitFight}
              isLoading={addFightLoading}
              data={userData?.fighterDetails?.bio}
            />
          )}
          {editNickNameModal && (
            <EditNicknameModal
              show={editNickNameModal}
              setShow={setEditNickNameModal}
              onClick={handleSubmitFight}
              isLoading={addFightLoading}
              data={userData?.fighterDetails?.nickName}
            />
          )}
          {upComingModal && (
            <AddEditUpcomingFightingModal
              show={upComingModal}
              setShow={setUpComingModal}
              onclick={handleSubmitFight}
              isLoading={addFightLoading}
              data={selectedData}
              roleAffiliated={userData?.fighterDetails?.upcomingFight || []}
            />
          )}
          {affiliatedModal && (
            <EditAffiliatedModal
              setShow={setAffiliatedModal}
              show={affiliatedModal}
              onClick={handleSubmitFight}
              isLoading={addFightLoading}
              data={selectedData}
              roleAffiliated={userData?.fighterDetails?.affiliatedGyms || []}
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
                userData?.fighterDetails?.[keyNameText]?.filter(
                  (ele) => ele?._id !== selectedData?._id
                )
              )
            }
            isApiCall={addFightLoading}
          />
          {associationModal && (
            <AddEditAssociation
              onclick={handleSubmitFight}
              modalLoading={addFightLoading}
              data={selectedData}
              setShow={setAssociationModal}
              show={associationModal}
              roleAffiliated={userData?.fighterDetails?.association || []}
            />
          )}

          {disciplineModal && (
            <AddEditDiscipline
              setShow={setDisciplineModal}
              show={disciplineModal}
              onClick={handleSubmitFight}
              apiLoading={addFightLoading}
              data={selectedData}
              roleDiscipline={userData?.fighterDetails?.disciplines || []}
            />
          )}
          {selectFeesModal && (
            <EditLessonModal
              show={selectFeesModal}
              setShow={setSelectFeesModal}
              roles={["Available For Fights", "Available For Sparring"]}
              data={userData?.fighterDetails}
              onclick={updateSelectedFees}
              modalLoading={selectFeesLoading}
            />
          )}
          {requestModal && (
            <SponsorRequestsModal
              show={requestModal}
              setShow={setRequestModal}
              data={sponsorRequests}
              onClick={handleUpdateRequest}
              loading={selectFeesLoading}
            />
          )}
        </div>
      </Container>
      {!enableEdit && (
        <div className={classes.allowEditDiv}>
          <div className={classes.allowToEdit}>
            <h2>Are You A Fighter As Well?</h2>
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

export default FighterUserProfile;
