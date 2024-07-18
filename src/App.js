import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-image-lightbox/style.css";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./assets/Styles/style.css";
import "./assets/Styles/table.css";
// Import Swiper styles
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Get } from "./Axios/AxiosFunctions";
import { Loader } from "./Component/Loader";
import BeforeLoginRoute from "./Helper/BeforeLoginRoute";
import ProtectedRouter from "./Helper/ProtectedRoute";
import ScrollToTop from "./Helper/ScrollToTop";
import { BaseURL, apiUrl } from "./config/apiUrl";
import { updateUser } from "./store/auth/authSlice";
import {
  saveNewNotification,
  setAllCmsData,
  setAllPublicFields,
} from "./store/common/commonSlice";

const NewsFeedDesign = lazy(() => import("./pages/NewsFeedDesign"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const Landing = lazy(() => import("./pages/Landing"));
const Search = lazy(() => import("./pages/Search"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileDetail = lazy(() => import("./pages/ProfileDetail"));
const SearchUsers = lazy(() => import("./pages/SearchUsers"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Notification = lazy(() => import("./pages/Notification"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, access_token, user } = useSelector(
    (state) => state.authReducer
  );
  const { newNotifications } = useSelector((state) => state?.commonReducer);
  const dispatch = useDispatch();
  const socket = useRef(null);
  const getPublicFields = async () => {
    const associationUrl = BaseURL("association/dropDown");
    const cmsUrl = BaseURL("cms/page/all/new?all=true");
    setIsLoading(true);
    const [associationRes, cmsResponse] = await Promise.allSettled([
      Get(associationUrl, null, false),
      Get(cmsUrl, null, false),
    ]);
    if (associationRes?.value !== undefined || cmsResponse !== undefined) {
      const {
        value: {
          data: {
            data: { association: associations, gyms, equipment } = {},
          } = {},
        } = {},
      } = associationRes;

      dispatch(
        setAllPublicFields({
          associations,
          gyms,
          equipment,
        })
      );
      dispatch(setAllCmsData(cmsResponse?.value?.data?.data));
    }
    setIsLoading(false);
  };
  const getUser = async () => {
    const apiUrl = BaseURL(`profile`);
    setIsLoading(true);
    const response = await Get(apiUrl, access_token, false, dispatch);
    if (response !== undefined) {
      dispatch(updateUser(response.data.data));
    }
    setIsLoading(false);
  };
  // notification
  const getNotificationFromSocket = async () => {
    const responseData = await Get(
      BaseURL("notifications"),
      access_token,
      false,
      dispatch
    );
    if (responseData !== undefined) {
      const unreadNotifications =
        responseData?.data?.data?.notifications?.filter(
          (item) => item?.seen == false
        );
      dispatch(saveNewNotification(unreadNotifications));
    }
  };
  useEffect(() => {
    getPublicFields();
  }, []);
  useEffect(() => {
    if (isLogin) {
      getUser();
      getNotificationFromSocket();
      socket.current = io(apiUrl, { transports: ["websocket"] });
      socket.current.emit("join", { id: user?._id });
      socket.current.on("new-notification", ({ notification }) => {
        dispatch(saveNewNotification([...newNotifications, notification]));
      });
    }
    return () => {
      socket.current?.off("new-notification");
      socket.current?.disconnect();
    };
  }, [isLogin]);
  if (isLoading) {
    return <Loader className="vh-100" />;
  }

  return (
    <>
      <style>
        {`
        .Toastify__progress-bar--success{
          background: var(--primary-color) !important;
        }
        .Toastify__toast--success svg{
          fill: var(--primary-color) !important;
        }
        `}
      </style>
      <ToastContainer />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loader className={"vh-100"} />}>
          <Routes>
            <Route
              path="/"
              exact
              element={<BeforeLoginRoute element={<Landing />} />}
            />
            <Route path="/public-search" exact element={<Search />} />
            <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              exact
              element={<TermsAndConditions />}
            />
            <Route
              path="/login"
              exact
              element={<BeforeLoginRoute element={<Login />} />}
            />
            <Route
              path="/sign-up"
              exact
              element={<BeforeLoginRoute element={<Signup />} />}
            />
            <Route
              path="/forgot-password"
              exact
              element={<BeforeLoginRoute element={<ForgotPassword />} />}
            />
            <Route
              path="/notifications"
              exact
              element={<ProtectedRouter element={<Notification />} />}
            />
            <Route
              path="/users"
              exact
              element={<ProtectedRouter element={<SearchUsers />} />}
            />
            <Route
              path="/messaging"
              exact
              element={<ProtectedRouter element={<Chat />} />}
            />
            <Route
              path="/profile"
              exact
              element={<ProtectedRouter element={<Profile />} />}
            />
            <Route
              path="/profile/:slug"
              exact
              element={<ProtectedRouter element={<ProfileDetail />} />}
            />
            <Route
              path="/post/:id"
              exact
              element={<ProtectedRouter element={<PostDetail />} />}
            />
            <Route
              path="/settings"
              exact
              element={<ProtectedRouter element={<ProfileSettings />} />}
            />
            <Route
              path="/news-feed"
              exact
              element={<ProtectedRouter element={<NewsFeedDesign />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
