import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Get, Patch, Post } from "../../Axios/AxiosFunctions";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import ProfileHeader from "../../Component/ProfileHeader";
import { BaseURL, apiHeader } from "../../config/apiUrl";
import CreateRoomModal from "../../modals/CreateRoomModal";
import EditCoverModal from "../../modals/EditCoverModal";
import { updateUser } from "../../store/auth/authSlice";
import FollowerDetails from "./FollowerDetails";
import GalleryDetails from "./GalleryDetails";
import classes from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails";
import Timeline from "./Timeline";
import { filterImagesVideos } from "../../config/HelperFunction";
import AddCardModal from "../../modals/AddCardModal";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slug = useParams()?.slug;
  const { user, access_token } = useSelector((state) => state.authReducer);
  const [pageName, setPageName] = useState("Profile");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [updatePhoto, setUpdatePhoto] = useState({
    modal: false,
    loading: false,
  });
  const [currentRole, setCurrentRole] = useState(null);
  const [amount, setAmount] = useState(null);
  const [acceptedSponsorRequests, setAcceptedSponsorRequests] = useState([]);
  const [addCardModal, setAddCardModal] = useState(false);

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

  const getProfileData = async () => {
    const profileUrl = BaseURL(`profile?slug=${slug}`);
    const meUrl = BaseURL(`profile`);

    setIsLoading(true);
    const [profileRes, meRes] = await Promise.allSettled([
      Get(profileUrl, access_token),
      Get(meUrl, access_token),
    ]);
    if (profileRes?.value !== undefined || meRes?.value !== undefined) {
      const { recentMedia, ...rest } = profileRes?.value?.data?.data;
      const { images, videos } = filterImagesVideos(recentMedia);
      setProfileData({
        images,
        videos,
        ...rest,
      });
      dispatch(updateUser(meRes?.value.data.data));
      const requestsUrl = BaseURL(
        `sponsors/request/${profileRes?.value?.data?.data?._id}?status=accepted`
      );
      const requests = await Get(requestsUrl, access_token);
      setAcceptedSponsorRequests(requests?.data);
    }
    setIsLoading(false);
  };

  const handleCreateRoom = async (body) => {
    body = {
      ...body,
      userIds: [profileData?._id],
    };
    const url = BaseURL("chats/start");
    setIsUpdating(true);
    const response = await Post(url, body, apiHeader(access_token));
    if (response !== undefined) {
      toast.success("Room created successfully!");
      setCreateRoomModal(false);
      navigate(`/messaging`, { state: response?.data?.data });
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    getProfileData();
  }, [slug]);

  const handleSponsorAmount = async () => {
    if (amount <= 100 || !amount)
      return toast.warning("Amount should be greater than $100");
    setAddCardModal(true);
    // const url = BaseURL("sponsors");
    // let data = {
    //   amount,
    //   receiver: profileData?._id,
    //   status: "accepted",
    // };
    // const response = await Post(url, data, apiHeader(access_token));
    // if (response) {
    //   toast.success("Sponsor amount sent successfully!");
    //   setAmount(0);
    // }
  };

  return (
    <>
      {/* <AfterLoginHeader /> */}
      <NewsFeedHeader />
      {isLoading ? (
        <Loader className={"vh-100"} />
      ) : (
        <div className={classes.profilePage}>
          <ProfileHeader
            isFollowBtn={true}
            user={profileData}
            setUser={setProfileData}
            setProfileData={setProfileData}
            viewOnlyUser={true}
            activeGym={[currentRole, currentRole?.name]?.includes("GYM")}
          />
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
                  Followers ({profileData?.followers?.length})
                </h3>
              </div>
            </Container>
          </div>
          <div className={classes.profileContainer}>
            {pageName === "Profile" ? (
              <ProfileDetails
                profileData={profileData}
                isLoading={isLoading}
                setCreateRoomModal={setCreateRoomModal}
                setCurrentRole={setCurrentRole}
                currentRole={currentRole}
                amount={amount}
                setAmount={setAmount}
                handleSponsorAmount={handleSponsorAmount}
                acceptedSponsorRequests={acceptedSponsorRequests}
              />
            ) : pageName === "Gallery" ? (
              <GalleryDetails profileData={profileData} isLoading={isLoading} />
            ) : pageName === "Followers" ? (
              <FollowerDetails
                profileData={profileData}
                isLoading={isLoading}
              />
            ) : (
              <Timeline profileData={profileData} isLoading={isLoading} />
            )}
          </div>
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

      {createRoomModal && (
        <CreateRoomModal
          isLoading={isUpdating}
          onClick={handleCreateRoom}
          setShow={setCreateRoomModal}
          show={createRoomModal}
        />
      )}
      {addCardModal && (
        <AddCardModal
          isLoading={isUpdating}
          setShow={setAddCardModal}
          show={addCardModal}
          amount={amount}
          setAmount={setAmount}
          userId={profileData?._id}
          onClick={getProfileData}
        />
      )}
    </>
  );
};

export default Profile;
