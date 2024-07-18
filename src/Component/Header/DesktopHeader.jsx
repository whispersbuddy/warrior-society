import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { Container, Nav, Navbar, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Get } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { BaseURL } from "../../config/apiUrl";
import { beforeLogo } from "../../constant/imagePath";
import { signOutRequest } from "../../store/auth/authSlice";
import ProfilePhoto from "../ProfilePhoto";
import {
  default as Style,
  default as classes,
} from "./DesktopHeader.module.css";
const DesktopHeader = ({
  backgroundColor,
  containerClass,
  className,
  isSticky,
}) => {
  const { access_token } = useSelector((state) => state?.authReducer);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { user, isLogin } = useSelector((state) => state?.authReducer);
  const logout = async () => {
    if (deleteLoading) return;
    const apiUrl = BaseURL("auth/logout");
    setDeleteLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      dispatch(signOutRequest());
      navigate("/");
    }
    setDeleteLoading(false);
  };
  const profilePhotoDimensions = user?.profilePhotoDimensions;
  const scale = 100 / profilePhotoDimensions?.width;
  return (
    <section className={classes.mainSection}>
      <Container
        className={`${[Style.navbarContainer, containerClass].join(
          " "
        )} mainContainer`}
      >
        <Navbar
          collapseOnSelect
          expand="lg"
          className={`${[
            Style.header,
            className,
            isSticky && Style.headerSticky,
          ].join(" ")}`}
          style={{ backgroundColor: backgroundColor }}
          id={"navDesktopHeader"}
        >
          <div className={Style.main_logo_main} onClick={() => navigate("/")}>
            <img
              className={classes["brand-logo"]}
              src={beforeLogo}
              alt="Logo"
            />
          </div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className={Style.navbarCollapse}
            id="responsive-navbar-nav"
          >
            <Nav
              className={`mx-auto ${[Style.navbarCustom__style].join(" ")}`}
              gap={5}
            >
              <>
                <h4 className={classes.heading__uppercase}>
                  TRAIN-ADVANCE-REPEAT
                </h4>
              </>
            </Nav>

            <ClickAwayListener onClickAway={() => setShow(false)}>
              <div className={Style.dflex}>
                {isLogin ? (
                  <OverlayTrigger
                    trigger={["click"]}
                    placement={"bottom-end"}
                    overlay={
                      <div className={Style.profileOverlay}>
                        <div>
                          <NavLink
                            to={"/profile"}
                            className={[Style.overlayLink].join(" ")}
                          >
                            Profile
                          </NavLink>

                          <p
                            className={[Style.overlayLink]}
                            onClick={() => {
                              if (deleteLoading) {
                                return;
                              }
                              logout();
                            }}
                          >
                            {deleteLoading ? "Wait..." : "Logout"}
                          </p>
                        </div>
                      </div>
                    }
                    show={show}
                    onToggle={() => setShow(!show)}
                  >
                    <div className={[Style.profileDiv]}>
                      <ProfilePhoto
                        photo={user?.photo}
                        profilePhotoDimensions={user?.profilePhotoDimensions}
                        className={classes.profileImg}
                      />
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div>
                    <div className={Style.btnMain}>
                      <Button
                        onClick={() => navigate("/sign-up")}
                        label={"Sign up"}
                      />
                      <Button
                        onClick={() => navigate("/login")}
                        label={"Login"}
                      />
                    </div>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
};

export default DesktopHeader;
