import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Get, Patch } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import NoData from "../../Component/NoData/NoData";
import NotificationCard from "../../Component/NotificationCard";
import PaginationComponent from "../../Component/PaginationComponent";
import { BaseURL, apiHeader, recordsLimit } from "../../config/apiUrl";
import { saveNewNotification } from "../../store/common/commonSlice";
import classes from "./Notification.module.css";
const Notification = () => {
  const dispatch = useDispatch();
  const { access_token: accessToken } = useSelector(
    (state) => state?.authReducer
  );
  const { newNotifications } = useSelector((state) => state?.commonReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageTotalCount, setPageTotalCount] = useState("");
  const [getNotifications, setNotifications] = useState([]);

  const getAllNotifications = async (pgNo = page) => {
    const apiUrl = BaseURL(`notifications?page=${pgNo}&limit=${recordsLimit}`);
    setIsLoading(true);
    const response = await Get(apiUrl, accessToken);
    if (response !== undefined) {
      setNotifications(response?.data?.data);
      setPageTotalCount(response?.data?.results);
    }
    setIsLoading(false);
  };

  const updateSingleNotification = async (notifyId) => {
    const url = BaseURL(`notifications/${notifyId}`);
    let response = await Patch(url, {}, apiHeader(accessToken));
    if (response !== undefined) {
      const updatedNotifications = newNotifications.filter(
        (ele) => ele._id !== notifyId
      );
      dispatch(saveNewNotification(updatedNotifications));
    }
  };
  const [notifyLoading, setNotifyLoading] = useState(false);
  const updateAllNotificationAsSeen = async () => {
    const url = BaseURL(`notifications/seenAll`);
    setNotifyLoading(true);
    const response = await Patch(url, {}, apiHeader(accessToken));
    if (response !== undefined) {
      dispatch(saveNewNotification([]));
      setNotifications(response?.data);
    }
    setNotifyLoading(false);
  };
  useEffect(() => {
    getAllNotifications(page);
  }, [page]);

  return (
    <div className={classes.notificationPage}>
      <NewsFeedHeader />

      <div className={classes.notificationMain}>
        <Container>
          <div className={classes.inner}>
            <div className={classes.header}>
              <h3>Notifications</h3>
              <div className={classes.rightDiv}>
                <p>
                  New: <span>{getNotifications?.counts}</span>
                </p>
                {getNotifications?.counts > 0 && (
                  <Button
                    label={notifyLoading ? "Loading..." : "Mark All Read"}
                    onClick={updateAllNotificationAsSeen}
                    disabled={notifyLoading}
                    title="Mark all notifications as read"
                  />
                )}
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {getNotifications?.notifications?.length > 0 ? (
                  getNotifications?.notifications?.map((ele) => {
                    return (
                      <div className={classes.notificationWrapper}>
                        <NotificationCard
                          data={ele}
                          onClick={updateSingleNotification}
                        />
                      </div>
                    );
                  })
                ) : (
                  <NoData text="No Notifications" />
                )}
                <div className={classes.paginationDiv}>
                  <PaginationComponent
                    totalPages={Math.ceil(pageTotalCount / recordsLimit)}
                    setCurrentPage={setPage}
                    currentPage={page}
                  />
                </div>
              </>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Notification;
