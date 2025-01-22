import { ClickAwayListener } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, OverlayTrigger } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { BsChatLeftText } from "react-icons/bs";
import { FaCog, FaNewspaper } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Get } from "../../Axios/AxiosFunctions";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import { BaseURL } from "../../config/apiUrl";
import { newsFeedHeader } from "../../constant/imagePath";
import { signOutRequest } from "../../store/auth/authSlice";
import { Button } from "../Button/Button";
import HeaderNotification from "../HeaderNotification/HeaderNotification";
import { Input } from "../Input/Input";
import ProfilePhoto from "../ProfilePhoto";
import Style from "./NewsFeedHeader.module.css";
import { NewsFeedMobileHeader } from "./NewsFeedMobileHeader";
export const NewsFeedHeader = ({ className }) => {
  const { user, access_token } = useSelector((state) => state?.authReducer);
  const { newNotifications } = useSelector((state) => state?.commonReducer);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showProfileOverlay, setShowProfileOverlay] = useState(false);
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const locationObj = useLocation();
  const logout = async () => {
    const apiUrl = BaseURL("auth/logout");
    setDeleteLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      dispatch(signOutRequest());
      navigate("/");
    }
    setDeleteLoading(false);
  };
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position >= 102);
  };

  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.innerWidth]);
  return (
    <header
      style={{
        position: scrollPosition ? "sticky" : "relative",
        top: "0",
        animation: scrollPosition ? "header_in 0.2s ease-in forwards" : "",
        zIndex: "20",
        backgroundColor: scrollPosition
          ? "var(--white-color)"
          : "var(--white-color)",
        overflowX: "clip",
      }}
    >
      {isMobile ? (
        <NewsFeedMobileHeader />
      ) : (
        <Container
          className={`${[Style.navbarContainer, className].join(" ")}`}
          fluid
        >
          <div className={Style.leftHeader + " flex-1 items-center"}>
            <div className={Style.logoDiv} onClick={() => navigate("/")}>
              <img src={newsFeedHeader} alt="" />
            </div>
            {locationObj.pathname !== "/users" && (
              <div className={`${Style.searchBarDiv} h-max `}>
                <Input
                  extraClass={'p-2'}
                  customClass={`${Style.inputContainer} `}
                  value={search}
                  setter={setSearch}
                  placeholder={"Search Users"}
                  enterClick={() => {
                    navigate(`/users`, {
                      state: { search: search },
                    });
                  }}
                />
                <Button
                  extraclass={'p-0'}
                  label={"Search"}
                  onClick={() =>
                    navigate(`/users`, {
                      state: { search: search },
                    })
                  }
                />
              </div>
            )}

          </div>

          <div className={Style["profile-container"]}>
            <div className={Style["navigationLinks"] + " gap-3"}>
              <div className={[Style.navigationLinks + " m-0"]}>
                <Link to="/news-feed" >
                  <span>
                    <FaNewspaper className="hover:bg-red-500 hover:text-white rounded-full border-red-500 border-2 p-2 !text-[2.5rem]" />
                  </span>
                  {/* <span className={Style["navigationItem"]}>News Feed</span> */}
                </Link>
              </div>
              <Link to="/messaging">
                <span>
                  <BsChatLeftText className="hover:bg-red-500 hover:text-white rounded-full border-red-500 border-2 p-2 !text-[2.5rem]" />
                </span>
                {/* <span className={Style["navigationItem"]}>Messaging</span> */}
              </Link>

              <ClickAwayListener
                onClickAway={() => setShowNotificationOverlay(false)}
              >
                <div>
                  <OverlayTrigger
                    placement={"bottom"}
                    show={showNotificationOverlay}
                    trigger={["click"]}
                    overlay={
                      <div className={`${[Style.notifyoverlayDiv]}`}>
                        <HeaderNotification />
                      </div>
                    }
                    onToggle={() =>
                      setShowNotificationOverlay(!showNotificationOverlay)
                    }
                  >
                    <div className={Style.notification__main}>
                      <span
                        style={{
                          position: "relative",
                        }}
                      >
                        {newNotifications?.length !== 0 && (
                          <div className={[Style.notifyCountDiv]}>
                            {newNotifications?.length}
                          </div>
                        )}
                        <IoMdNotificationsOutline className="hover:bg-red-500 hover:text-white rounded-full border-red-500 border-2 p-2 !text-[2.5rem]" />
                      </span>
                      {/* <p className={Style["notificationClick"]}>
                        Notifications
                      </p> */}
                    </div>
                  </OverlayTrigger>
                </div>
              </ClickAwayListener>
            </div>
            {/* <div className={Style["profile-info"]}>
              <p className={Style["profile-name"]}>
                {user?.firstName} {user?.lastName}
              </p>
            </div> */}
            <ClickAwayListener onClickAway={() => setShowProfileOverlay(false)}>
              <div
                className={`${[Style.iconDiv].join(" ")} ${Style["profile-header"]
                  }`}
              >
                <OverlayTrigger
                  placement={"bottom"}
                  show={showProfileOverlay}
                  trigger={["click"]}
                  overlay={
                    <div className={`${[Style.profileOverlay]}`}>
                      <ul>
                        <li><p className={Style["profile-name"]}>
                          {user?.firstName} {user?.lastName}
                        </p></li>
                        <li onClick={() => navigate("/profile")}>
                          <FaRegCircleUser />
                          Profile
                        </li>
                        <li onClick={() => navigate("/profile?tab=Wallet")}>
                          <LuWallet />
                          Wallet
                        </li>
                        <li onClick={() => navigate("/settings")}>
                          <FaCog />
                          Settings
                        </li>
                        <li
                          onClick={() => {
                            if (deleteLoading) {
                              return;
                            }
                            logout();
                          }}
                        >
                          <BiLogOut />
                          {deleteLoading ? "Wait..." : "Logout"}
                        </li>
                      </ul>
                    </div>
                  }
                  onToggle={() => setShowProfileOverlay(!showProfileOverlay)}
                >
                  <div>
                    {/* <img src={`${imageUrl}${user?.photo}`} alt="..." /> */}
                    <ProfilePhoto
                      photo={user?.photo}
                      profilePhotoDimensions={user?.profilePhotoDimensions}
                      className={Style.profileImg}
                    />
                    {/* <img
                  src={imageUrl(user?.photo)}
                  alt='profile'
                /> */}
                  </div>
                </OverlayTrigger>
              </div>
            </ClickAwayListener>
          </div>
        </Container>
      )}
    </header>
  );
};
