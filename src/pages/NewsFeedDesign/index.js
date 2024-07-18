import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get, Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import CropImage from "../../Component/CropImage";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import ProfilePhoto from "../../Component/ProfilePhoto";
import SliderComponent from "../../Component/SliderComponent";
import { userRoles } from "../../config/DummyData";
import { calculateBirthdayMessage } from "../../config/HelperFunction";
import { BaseURL, apiHeader } from "../../config/apiUrl";
import UsersViewModal from "../../modals/UsersViewModal";
import ViewUpcomingFights from "../../modals/ViewUpcomingFIghts";
import { updateUser } from "../../store/auth/authSlice";
import classes from "./NewsFeedDesign.module.css";
import PostSection from "./PostSection";
let initialDimensions = {
  x: 0,
  y: 6.231578947368419,
  width: 100,
  height: 87.53684210526316,
};
const UserComponent = ({ user, role }) => {
  const navigate = useNavigate();
  const [path, setPath] = useState(null);

  useEffect(() => {
    switch (user?.role) {
      case "Followers":
        setPath("Followers");
        break;
      case "Student":
        setPath("Student");
        break;
      case "Trainer":
        setPath("Trainer");
        break;
      case "Gym":
        setPath("GYM");
        break;
      case "Fighter":
        setPath("Fighter");
        break;
      default:
        break;
    }
  }, []);
  return (
    <>
      {!role ? (
        <div className={classes.userDiv} title="View Warrior User">
          <div
            onClick={() => {
              navigate(`/profile/${user?.slug}`);
            }}
          >
            <ProfilePhoto
              photo={user?.photo}
              profilePhotoDimensions={user?.profilePhotoDimensions}
              className={classes.userProfile}
            />
          </div>
          <div
            className={classes.userName}
            onClick={() => {
              navigate(`/profile/${user?.slug}`);
            }}
          >
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={classes.userDiv}
          title={`View Your ${user?.role} ${
            user?.role !== "Followers" ? "Profile" : ""
          }`}
        >
          <div
            className={classes.imageBox}
            onClick={() => navigate("/profile", { state: path })}
          >
            <img src={user?.photo} alt="" />
          </div>
          <div
            className={classes.userName}
            onClick={() => navigate("/profile", { state: path })}
          >
            <p>{user?.role}</p>
          </div>
        </div>
      )}
    </>
  );
};
const UserRequest = ({ request, children }) => {
  const navigate = useNavigate();
  return (
    <div
      className={classes.requestDiv}
      onClick={() => navigate(`/profile/${request?.slug}`)}
    >
      <div className={classes.user_data} title="View User Profile">
        <ProfilePhoto
          photo={request?.photo}
          profilePhotoDimensions={request?.profilePhotoDimensions}
          className={classes.requestImg}
        />
        <div className={classes.requestContent}>
          <p className={classes.userName}>
            {request.firstName} {request.lastName}
          </p>
          {request?.DOB && (
            <p className={classes.message}>
              {calculateBirthdayMessage(request?.DOB)}
            </p>
          )}
        </div>
      </div>
      <div className={classes.actions}>{children}</div>
    </div>
  );
};

const SchoolComponent = ({ school, join = true, onView }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.gymDiv}>
      <div className={classes.coverDiv}>
        <CropImage
          state={school?.bgPhoto}
          edit={false}
          coverPhotoDimensions={
            school?.coverPhotoDimensions || initialDimensions
          }
          defaultImageSelected={school?.coverPhotoDimensions}
          uploadClass={classes.uploadClass}
        />
      </div>
      <div className={classes.schoolContent}>
        <div className={classes.contentDiv}>
          <div onClick={() => navigate(`/profile/${school.slug}`)}>
            <ProfilePhoto
              photo={school.photo}
              profilePhotoDimensions={school.profilePhotoDimensions}
              className={classes.profile}
            />
          </div>
          <h4>
            {school.firstName} {school.lastName}
          </h4>
          {school?.country && school?.state && (
            <p className={classes.location}>
              <IoLocationOutline /> {school.state}, {school?.country}
            </p>
          )}
        </div>
        {join && (
          <div
            className={classes.joinBtn}
            onClick={() => {
              if (onView) {
                onView();
              }
            }}
            title="View User Upcoming Fights"
          >
            <Button label={"View"} />
          </div>
        )}
      </div>
    </div>
  );
};

const NewsFeedDesign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token, user } = useSelector((state) => state?.authReducer);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewActive, setViewActive] = useState(false);
  const [data, setData] = useState(null);
  const [fightingModal, setFightingModal] = useState(false);
  const [selectedFights, setSelectedFights] = useState(null);
  const [birthdayModal, setBirthdayModal] = useState(null);
  const getData = async () => {
    const apiUrl = BaseURL("posts/news-feed/data");
    setIsLoading("mainLoading");
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setData(response?.data);
    }
    setIsLoading(false);
  };
  const addRequestBeforeApiCall = (temp) => {
    setData((prev) => {
      return {
        ...prev,
        request: {
          request: prev?.request?.request?.filter(
            (ele) => ele?._id !== temp?._id
          ),
        },
      };
    });
    return temp;
  };
  const handleRequest = async (item, val) => {
    const index = data?.request?.request?.findIndex(
      (ele) => ele?._id === item?._id
    );
    const saveRequest = addRequestBeforeApiCall(item);
    const apiUrl = BaseURL(`profile/acceptFollowRequest`);
    const response = await Post(
      apiUrl,
      { userId: item?._id, accepted: val },
      apiHeader(access_token)
    );
    if (response !== undefined) {
      dispatch(updateUser(response?.data?.data));
    } else {
      setData((prev) => {
        const temp = structuredClone(prev);
        temp?.request?.request?.splice(index, 0, saveRequest);
        return temp;
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <NewsFeedHeader />
      {isLoading === "mainLoading" ? (
        <Loader className={"vh-100"} />
      ) : (
        <div className={classes.newsFeedPage}>
          <div className={classes.newsFeedGrid}>
            <>
              <div
                className={classes.hamMenu}
                onClick={() => setShowMenu(true)}
              >
                <FaArrowRight />
              </div>
              <span
                className={[
                  classes.menu_open,
                  showMenu && classes.menu_open_bg,
                ].join(" ")}
                onClick={() => setShowMenu(false)}
              ></span>
              <div
                className={[classes.subMenu, showMenu && classes.showMenu].join(
                  " "
                )}
              >
                <div
                  className={classes.leftDiv}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={classes.userContent}>
                    <div className={classes.responsive_user}>
                      <div className={classes.profileDiv}>
                        <ProfilePhoto
                          photo={user?.photo}
                          profilePhotoDimensions={user?.profilePhotoDimensions}
                          className={classes.profileImg}
                        />
                      </div>
                      <p>
                        {user?.firstName} {user?.lastName}{" "}
                      </p>
                    </div>
                    <div className={classes.rolesContainer}>
                      {userRoles
                        ?.filter((ele) => user[ele?.value])
                        ?.map((role) => (
                          <div className={classes.roles__wrapper}>
                            <UserComponent
                              user={role}
                              key={role?.role}
                              role={true}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className={classes.recentlyJoined}>
                    <div className={classes.header}>
                      <h5>joined warrior society</h5>
                    </div>
                    <div className={classes.recentlyJoined__content}>
                      {data?.recentUsers?.slice(0, 5)?.map((user) => (
                        <div
                          className={classes.recentlyJoined__content__wrapper}
                        >
                          <UserComponent user={user} key={user?._id} />
                        </div>
                      ))}
                      {data?.recentUsers?.length > 5 && (
                        <div className={classes.viewUsers}>
                          <span
                            onClick={() => {
                              navigate("/users");
                            }}
                          >
                            View All
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
            <div className={classes.post_section}>
              <PostSection />
            </div>
            <div className={classes.userLeftContent}>
              <div className={classes.rightDiv}>
                {data?.request?.request?.length > 0 && (
                  <div className={classes.associationRequests}>
                    <div className={classes.request__Wrapper}>
                      <div className={classes.header}>
                        <h5>Follow Requests</h5>
                        {data?.request?.request?.length > 4 && (
                          <span
                            className={classes.viewAll}
                            onClick={() => setViewActive((prev) => !prev)}
                          >
                            {viewActive ? "View Less" : "View All"}
                          </span>
                        )}
                      </div>
                      <div className={classes.request__content}>
                        {data?.request?.request
                          ?.slice(
                            0,
                            viewActive ? data?.request?.request?.length : 4
                          )
                          ?.map((user) => (
                            <div className={classes.request__content__wrapper}>
                              <UserRequest request={user} key={user?._id}>
                                <div className={classes.actions}>
                                  <div
                                    className={classes.accept}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRequest(user, true);
                                    }}
                                  >
                                    <FaCheck />
                                  </div>
                                  <div
                                    className={classes.reject}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRequest(user, false);
                                    }}
                                  >
                                    <RxCross2 />
                                  </div>
                                </div>
                              </UserRequest>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {data?.schools?.length > 0 && (
                  <div className={classes.gym_wrapper}>
                    <div className={classes.header}>
                      <h5>Schools in your Area</h5>
                      <span className={classes.viewAll}>View All</span>
                    </div>
                    <div className={classes.schoolsContainer}>
                      <SliderComponent>
                        {data?.schools?.map((request) => (
                          <SchoolComponent school={request} join={false} />
                        ))}
                      </SliderComponent>
                    </div>
                  </div>
                )}
                {data?.upComingFight?.length > 0 && (
                  <div className={classes.gym_wrapper}>
                    <div className={classes.header}>
                      <h5>upcoming fights</h5>
                    </div>
                    <div className={classes.schoolsContainer}>
                      <SliderComponent>
                        {data?.upComingFight?.map((request) => (
                          <SchoolComponent
                            school={request}
                            join={true}
                            onView={() => {
                              setSelectedFights(request);
                              setFightingModal(true);
                            }}
                          />
                        ))}
                      </SliderComponent>
                    </div>
                  </div>
                )}
                {data?.birthday?.length > 0 && (
                  <div className={classes.request__Wrapper}>
                    <div className={classes.header}>
                      <h5>birthdays</h5>
                      <span
                        className={classes.viewAll}
                        onClick={() => setBirthdayModal(true)}
                      >
                        View All
                      </span>
                    </div>
                    <div className={classes.request__content}>
                      {data?.birthday?.slice(0, 5)?.map((user) => (
                        <div className={classes.request__content__wrapper}>
                          <UserRequest request={user} key={user?._id}>
                            <div className={classes.messageReq}>
                              {user?.icon}
                            </div>
                          </UserRequest>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {birthdayModal && (
        <UsersViewModal
          show={birthdayModal}
          setShow={setBirthdayModal}
          users={data?.birthday}
          heading={"Birthdays"}
          type={"birthday"}
        />
      )}
      {fightingModal && (
        <ViewUpcomingFights
          show={fightingModal}
          setShow={setFightingModal}
          data={selectedFights}
        />
      )}
    </>
  );
};

export default NewsFeedDesign;
