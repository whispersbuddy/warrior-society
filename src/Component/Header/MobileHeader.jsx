import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaMagnifyingGlass, FaRegCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHome, IoLogIn, IoLogOut } from "react-icons/io5";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get } from "../../Axios/AxiosFunctions";
import { BaseURL } from "../../config/apiUrl";
import { Logo, beforeLogo } from "../../constant/imagePath";
import { signOutRequest } from "../../store/auth/authSlice";
import classes from "./MobileHeader.module.css";

export const MobileHeader = ({ customStyle, isSticky }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, fcmToken, isLogin, access_token } = useSelector(
    (state) => state?.authReducer
  );
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
          if (path.toLowerCase() == "logout") {
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
          <div className={classes.imageContainer} onClick={() => navigate("/")}>
            <img src={beforeLogo} className={classes.logo} alt="logo" />
          </div>
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
              <>
                <img
                  src={beforeLogo}
                  className={classes.drawerLogo}
                  alt="logo"
                />
              </>
            </div>
            <div className={classes.drawerList}>
              <>
                <RenderListItem
                  icon={<IoHome size={18} />}
                  text={"Home"}
                  customClass={currentPage == "/" && classes.activeItem}
                  path={"/"}
                />
                <RenderListItem
                  icon={<FaMagnifyingGlass size={18} />}
                  text={"Search"}
                  customClass={currentPage == "/users" && classes.activeItem}
                  path={"/users"}
                />
                <hr
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                  }}
                />
                {isLogin ? (
                  <>
                    <RenderListItem
                      icon={<FaRegCircleUser size={18} />}
                      text={"Profile"}
                      customClass={
                        currentPage == "/profile" && classes.activeItem
                      }
                      path={"/profile"}
                    />
                    <RenderListItem
                      icon={<IoLogOut size={18} />}
                      text={deleteLoading ? "Logging out..." : "Logout"}
                    />
                  </>
                ) : (
                  <>
                    {/* <RenderListItem */}
                    {/*   icon={<IoLogIn size={20} />} */}
                    {/*   text={"Sign Up"} */}
                    {/*   customClass={ */}
                    {/*     currentPage == "/sign-up" && classes.activeItem */}
                    {/*   } */}
                    {/*   path={"/sign-up"} */}
                    {/* /> */}
                    <RenderListItem
                      icon={<IoLogIn size={18} />}
                      text={"Signup"}
                      customClass={
                        currentPage == "/sign-up" && classes.activeItem
                      }
                      path={"/sign-up"}
                    />
                    <RenderListItem
                      icon={<IoLogIn size={18} />}
                      text={"Login"}
                      customClass={
                        currentPage == "/login" && classes.activeItem
                      }
                      path={"/login"}
                    />
                  </>
                )}
              </>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

MobileHeader.propTypes = {
  customStyle: PropTypes.object,
};

MobileHeader.defaulProps = {};
