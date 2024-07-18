import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../../Axios/AxiosFunctions";
import { Loader } from "../../../Component/Loader";
import { BaseURL, apiHeader } from "../../../config/apiUrl";
import classes from "./PreiviewDetail.module.css";
import FollowerDetails from "./PreviewFollowerDetails";
import GalleryDetails from "./PreviewGalleryDetails";
import ProfileDetails from "./PreviewProfileDetails";
import Timeline from "./PreviewTimeline";
const filterInitialObject = {
  discipline: [],
  amenities: [],
  location: [],
  distance: null,
};
function PreviewDetail({ currentRole, setCurrentRole }) {
  const navigate = useNavigate();

  const redirected = useLocation()?.state;
  const { user, access_token } = useSelector((state) => state.authReducer);
  const [pageName, setPageName] = useState(
    redirected === "Followers" ? "Followers" : "Profile"
  );
  const allRoles = [
    user?.studentDetails && { name: "Student", data: user?.studentDetails },
    user?.trainerDetails && { name: "Trainer", data: user?.trainerDetails },
    user?.schoolDetails && { name: "GYM", data: user?.schoolDetails },
    user?.fighterDetails && { name: "Fighter", data: user?.fighterDetails },
  ].filter(Boolean);
  const [newWarriorUsers, setNewWarriorUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getNewUsers = async () => {
    const newUsers = BaseURL(`users/getAllUser?limit=4&page=1&search=`);
    setIsLoading(true);
    const newUsersRes = await Post(
      newUsers,
      filterInitialObject,
      apiHeader(access_token)
    );
    if (newUsersRes !== undefined) {
      setNewWarriorUsers(newUsersRes?.data?.data?.user);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigate("/profile", { state: null });
    };
    setCurrentRole(allRoles[0]);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  // useEffect(() => {
  //   getNewUsers();
  // }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.profile_container}>
            <Container className={classes.profileTabs}>
              <div
                className={[
                  classes.tab,
                  pageName === "Profile" && classes.active,
                ].join(" ")}
              >
                <h3 onClick={() => setPageName("Profile")}>Profile</h3>
              </div>
              <div
                className={[
                  classes.tab,
                  pageName === "Timeline" && classes.active,
                ].join(" ")}
              >
                <h3 onClick={() => setPageName("Timeline")}>Timeline</h3>
              </div>
              <div
                className={[
                  classes.tab,
                  pageName === "Gallery" && classes.active,
                ].join(" ")}
              >
                {" "}
                <h3 onClick={() => setPageName("Gallery")}>Gallery</h3>
              </div>
              <div
                className={[
                  classes.tab,
                  pageName === "Followers" && classes.active,
                ].join(" ")}
              >
                <h3 onClick={() => setPageName("Followers")}>
                  Followers ({user?.followers?.length})
                </h3>
              </div>
            </Container>
          </div>
          <div className={classes.profileContainer}>
            {/* {pageName === "Profile" ? (
          <ProfileDetails newWarriorUsers={newWarriorUsers} role={redirected} />
        ) : (
          <GalleryDetails />
        )} */}
            {pageName === "Profile" ? (
              <ProfileDetails
                currentRole={currentRole}
                setCurrentRole={setCurrentRole}
                allRoles={allRoles}
              />
            ) : pageName === "Gallery" ? (
              <GalleryDetails />
            ) : pageName === "Followers" ? (
              <FollowerDetails />
            ) : (
              <Timeline />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PreviewDetail;
