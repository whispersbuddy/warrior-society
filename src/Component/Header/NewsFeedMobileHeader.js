import PropTypes from "prop-types";
import React, { useState } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { FaCog, FaNewspaper } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Get } from "../../Axios/AxiosFunctions";
import { BaseURL } from "../../config/apiUrl";
import { Logo, newsFeedHeader } from "../../constant/imagePath";
import { signOutRequest } from "../../store/auth/authSlice";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import ProfilePhoto from "../ProfilePhoto";
import classes from "./NewsFeedMobileHeader.module.css";

export const NewsFeedMobileHeader = ({
  customStyle,
  logo = Logo,
  isSticky,
  onSignupHandler,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationObj = useLocation();
  const { user, fcmToken, isLogin, access_token } = useSelector(
    (state) => state?.authReducer
  );
  const [search, setSearch] = useState("");
  const currentPage = window.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const RenderListItem = ({ icon, text, customClass, path, href }) => {
    return (
      <div
        className={[classes.listItem, customClass].join(" ")}
        onClick={() => {
          if (!path) {
            if (deleteLoading) {
              return;
            }
            logout();
          } else {
            navigate(path);
          }
        }}
      >
        {icon}
        <span className={classes.listItemText}>{text}</span>
      </div>
    );
  };

  return (
    <>
      <div
        className={[
          classes.headerMainDiv,
          isSticky && classes.headerSticky,
        ].join(" ")}
        id={"navMobileHeader"}
      >
        <div className={classes.header} style={{ ...customStyle }}>
          <div className={classes.logoDiv} onClick={() => navigate("/")}>
            <img src={newsFeedHeader} alt="logo" />
          </div>
          {locationObj.pathname !== "/users" && (
            <div className={classes.searchBarDiv}>
              <Input
                customClass={classes.inputContainer}
                value={search}
                setter={setSearch}
                placeholder={"Search"}
                enterClick={() => {
                  navigate(`/users`, {
                    state: { search: search },
                  });
                }}
              />
              <Button
                label={"Search"}
                onClick={() =>
                  navigate(`/users`, {
                    state: { search: search },
                  })
                }
              />
            </div>
          )}
          <GiHamburgerMenu
            className={classes.hamburger}
            onClick={() => {
              toggleDrawer();
            }}
            fill={"#000"}
          />
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="bla bla bla"
        >
          <div className={classes.drawerContainer}>
            <div className={classes.drawerUserSection}>
              <ProfilePhoto
                photo={user?.photo}
                profilePhotoDimensions={user?.profilePhotoDimensions}
                className={classes.drawerLogo}
              />
            </div>
            <div className={classes.drawerList}>
              <>
                <RenderListItem
                  icon={<FaNewspaper size={16} />}
                  text={"News Feed"}
                  customClass={
                    currentPage == "/news-feed" && classes.activeItem
                  }
                  path={"/news-feed"}
                />
                <RenderListItem
                  icon={<BsChatLeftText size={16} />}
                  text={"Messaging"}
                  customClass={
                    currentPage == "/messaging" && classes.activeItem
                  }
                  path={"/messaging"}
                />
                <RenderListItem
                  icon={<IoMdNotificationsOutline size={16} />}
                  text={"Notifications"}
                  customClass={
                    currentPage == "/notifications" && classes.activeItem
                  }
                  path={"/notifications"}
                />
                <RenderListItem
                  icon={<FaRegCircleUser size={16} />}
                  text={"Profile"}
                  customClass={currentPage == "/profile" && classes.activeItem}
                  path={"/profile"}
                />
                <RenderListItem
                  icon={<FaCog size={16} />}
                  text={"Settings"}
                  customClass={currentPage == "/settings" && classes.activeItem}
                  path={"/settings"}
                />
                <hr
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                  }}
                />
                <RenderListItem
                  icon={<IoLogOut size={18} />}
                  text={deleteLoading ? "Logging out..." : "Logout"}
                />
              </>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

NewsFeedMobileHeader.propTypes = {
  customStyle: PropTypes.object,
};

NewsFeedMobileHeader.defaulProps = {};
