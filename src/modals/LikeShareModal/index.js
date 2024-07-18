import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoData from "../../Component/NoData/NoData";
import ProfilePhoto from "../../Component/ProfilePhoto";
import { filterShared } from "../../config/HelperFunction";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./LikeShareModal.module.css";
const LikeShareModal = ({
  show,
  setShow,
  label,
  selectedData,
  modalKey,
  setModalKey,
}) => {
  const navigate = useNavigate();
  const [tabText, setTabText] = useState("like");
  useEffect(() => {
    setTabText(modalKey);
  }, [modalKey]);

  return (
    <ModalSkeleton
      width={"600px"}
      borderRadius={"10px"}
      header={label}
      show={show}
      setShow={setShow}
    >
      <div className={classes.main}>
        <div className={classes.tabs__wrapper}>
          <p
            style={{
              borderBottom:
                tabText === "like" ? "1px solid var(--main-color)" : "none",
            }}
            onClick={() => {
              setTabText("like");
              setModalKey("like");
            }}
          >
            Likes
          </p>
          <p
            style={{
              borderBottom:
                tabText === "share" ? "1px solid var(--main-color)" : "none",
            }}
            onClick={() => {
              setTabText("share");
              setModalKey("share");
            }}
          >
            Shares
          </p>
        </div>
        <Row className="gy-4">
          {selectedData?.length === 0 ? (
            <NoData
              text={`
              No ${modalKey == "like" ? "likes" : "shares"} on this post yet.
                        `}
            />
          ) : (
            filterShared(selectedData)?.map((ele) => {
              return (
                <Col lg={6}>
                  <div
                    className={classes.profile__wrapper}
                    onClick={() => navigate(`/profile/${ele?.slug}`)}
                  >
                    <ProfilePhoto
                      photo={ele?.photo || ele?.user?.photo}
                      profilePhotoDimensions={
                        ele?.profilePhotoDimensions ||
                        ele?.user?.profilePhotoDimensions
                      }
                      className={classes.profileImg}
                    />
                    <p>
                      {modalKey == "like"
                        ? ele?.firstName
                        : ele?.user?.firstName}{" "}
                      {modalKey == "like" ? ele?.lastName : ele?.user?.lastName}
                    </p>
                  </div>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    </ModalSkeleton>
  );
};

export default LikeShareModal;
