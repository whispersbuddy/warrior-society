import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Patch, Post } from "../../Axios/AxiosFunctions";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import ProfileHeader from "../../Component/ProfileHeader";
import { BaseURL, apiHeader } from "../../config/apiUrl";
import EditCoverModal from "../../modals/EditCoverModal";
import { updateUser } from "../../store/auth/authSlice";
import FollowerDetails from "./FollowerDetails";
import GalleryDetails from "./GalleryDetails";
import PreviewDetail from "./PreviewDetail";
import classes from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails";
import Timeline from "./Timeline";
import Wallet from "./Wallet";
const filterInitialObject = {
  discipline: [],
  amenities: [],
  location: [],
  distance: null,
};
export const allRoles = ["Student", "Trainer", "GYM", "Fighter"];

const Profile = () => {
  const redirected = useLocation()?.state;
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { user, access_token } = useSelector((state) => state.authReducer);
  const [pageName, setPageName] = useState(
    redirected === "Followers" ? "Followers" : "Profile"
  );
  const [newWarriorUsers, setNewWarriorUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatePhoto, setUpdatePhoto] = useState({
    modal: false,
    loading: false,
  });
  const [currentRole, setCurrentRole] = useState(allRoles[0]);

  // preiview
  const [preiview, setPreview] = useState(false);
  const updateImage = async (params) => {
    const apiUrl = BaseURL(`profile/updatePicture`);
    setUpdatePhoto((prev) => ({ ...prev, loading: true }));
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateUser(response.data.data));
      setUpdatePhoto((prev) => {
        return { ...prev, modal: false };
      });
    }
    setUpdatePhoto((prev) => {
      return { ...prev, loading: false };
    });
  };
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
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    getNewUsers();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params) {
      setPageName(params.get("tab") || "Profile");
    }
  }, [location]);

  return (
    <>
      <NewsFeedHeader />

      {isLoading ? (
        <Loader className={"vh-100"} />
      ) : (
        <div className={classes.profilePage}>
          <ProfileHeader
            user={user}
            previewShow={true}
            preview={preiview}
            setPreview={setPreview}
            loggedInUser={true}
            activeGym={[currentRole, currentRole?.name]?.includes("GYM")}
          />
          {preiview ? (
            <PreviewDetail
              setCurrentRole={setCurrentRole}
              currentRole={currentRole}
            />
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
                  <div
                    className={[
                      classes.tab,
                      pageName === "Wallet" && classes.active,
                    ].join(" ")}
                  >
                    <h3 onClick={() => setPageName("Wallet")}>Wallet</h3>
                  </div>
                </Container>
              </div>
              <div className={classes.profileContainer}>
                {pageName === "Profile" ? (
                  <ProfileDetails
                    setCurrentRole={setCurrentRole}
                    currentRole={currentRole}
                    newWarriorUsers={newWarriorUsers}
                  />
                ) : pageName === "Gallery" ? (
                  <GalleryDetails />
                ) : pageName === "Followers" ? (
                  <FollowerDetails />
                ) : pageName === "Wallet" ? (
                  <Wallet />
                ) : (
                  <Timeline />
                )}
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
      {updatePhoto?.modal && (
        <EditCoverModal
          show={updatePhoto?.modal}
          setShow={(e) => {
            setUpdatePhoto({ ...updatePhoto, modal: false });
          }}
          label={updatePhoto?.modal}
          selectedItem={
            updatePhoto?.modal === "Profile" ? user?.photo : user?.bgPhoto
          }
          onClick={updateImage}
          modalLoading={updatePhoto?.loading}
        />
      )}
    </>
  );
};

export default Profile;
