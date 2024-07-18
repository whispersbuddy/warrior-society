import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Get } from "../../../Axios/AxiosFunctions";
import AlbumCard from "../../../Component/AlbumCard";
import ImageCard from "../../../Component/ImageCard";
import { Loader } from "../../../Component/Loader";
import NoData from "../../../Component/NoData/NoData";
import { BaseURL, imageUrl } from "../../../config/apiUrl";
import classes from "./GalleryDetails.module.css";
import { Button } from "../../../Component/Button/Button";
import Lightbox from "react-image-lightbox";
const GalleryDetails = ({ profileData, isLoading }) => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [isAlbum, setIsAlbum] = useState(false);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [viewAllToggle, setViewAllToggle] = useState({
    images: false,
    videos: false,
  });
  const [isApiCall, setIsApiCall] = useState(false);
  const [imageOpen, setImageOpen] = useState(null);

  const handleAlbumDetail = async (id) => {
    setIsAlbum(true);
    await getSingleAlbum(id);
  };

  const getSingleAlbum = async (id) => {
    const apiUrl = BaseURL(
      `profile/getAlbum?albumId=${id}&userId=${profileData?._id}`
    );
    setIsApiCall(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setSingleAlbum(response?.data?.data?.album);
    }
    setIsApiCall(false);
  };

  return (
    <>
      {isLoading || isApiCall ? (
        <Loader className={"vh-100"} />
      ) : (
        <div className={classes.galleryPage}>
          {!isAlbum ? (
            <>
              <div className={classes.main}>
                <Container>
                  <div className={classes.recentHeader}>
                    <h1>Images</h1>
                    {profileData?.images?.length > 9 && (
                      <p
                        onClick={() =>
                          setViewAllToggle((prev) => ({
                            ...prev,
                            images: !prev?.images,
                          }))
                        }
                      >
                        {viewAllToggle?.images ? "View Less" : "View All"}
                      </p>
                    )}
                  </div>
                  <Row className="gy-4">
                    {profileData?.images?.length > 0 ? (
                      profileData?.images
                        ?.slice(
                          0,
                          viewAllToggle?.images
                            ? profileData?.images?.length
                            : 10
                        )
                        ?.map((ele) => {
                          return (
                            <Col
                              md={6}
                              xl={4}
                              xxl={3}
                              className={classes.albumCard}
                              onClick={() => setImageOpen(ele)}
                            >
                              <ImageCard item={ele} />
                            </Col>
                          );
                        })
                    ) : (
                      <NoData
                        text="No recent images found"
                        className={classes.no_media}
                      />
                    )}
                    {profileData?.images?.length > 10 && (
                      <div className={classes.view_All}>
                        <Button
                          onClick={() =>
                            setViewAllToggle((prev) => ({
                              ...prev,
                              images: !prev?.images,
                            }))
                          }
                        >
                          {viewAllToggle?.images ? "View Less" : "View All"}
                        </Button>
                      </div>
                    )}
                  </Row>
                  <div className={classes.recentHeader}>
                    <h1>Videos</h1>
                  </div>
                  <Row className="gy-4">
                    {profileData?.videos?.length > 0 ? (
                      profileData?.videos
                        ?.slice(
                          0,
                          viewAllToggle?.videos
                            ? profileData?.videos?.length
                            : 10
                        )
                        ?.map((ele) => {
                          return (
                            <Col
                              md={6}
                              xl={4}
                              xxl={3}
                              className={classes.albumCard}
                            >
                              <ImageCard item={ele} />
                            </Col>
                          );
                        })
                    ) : (
                      <NoData
                        text="No recent videos found"
                        className={classes.no_media}
                      />
                    )}
                    {profileData?.videos?.length > 10 && (
                      <div className={classes.view_All}>
                        <Button
                          onClick={() =>
                            setViewAllToggle((prev) => ({
                              ...prev,
                              videos: !prev?.videos,
                            }))
                          }
                        >
                          {viewAllToggle?.videos ? "View Less" : "View All"}
                        </Button>
                      </div>
                    )}
                  </Row>
                  <div className={classes.recentHeader}>
                    <h1>Albums</h1>
                  </div>
                  <Row>
                    {profileData?.albums?.length > 0 ? (
                      profileData?.albums?.map((ele) => {
                        return (
                          <Col
                            onClick={() => handleAlbumDetail(ele?._id)}
                            md={6}
                            xl={4}
                            xxl={3}
                            className={classes.albumCard}
                          >
                            <AlbumCard album={ele} />
                          </Col>
                        );
                      })
                    ) : (
                      <NoData text="No albums found" />
                    )}
                  </Row>
                </Container>
              </div>
            </>
          ) : (
            <>
              <Container>
                <div className={classes.detailheader}>
                  <h1>
                    <span onClick={() => setIsAlbum(false)}>
                      <BiArrowBack cursor={"pointer"} />
                    </span>{" "}
                    {singleAlbum?.name}
                  </h1>
                </div>
                <Row className="gy-4">
                  {singleAlbum?.media?.map((ele) => {
                    return (
                      <Col
                        md={4}
                        className={classes.albumCard}
                        onClick={() => {
                          const extension = ele?.split(".");
                          if (
                            ["jfif", "png", "jpg", "jpeg", "avif"].includes(
                              extension[extension.length - 1]
                            )
                          ) {
                            setImageOpen(ele);
                          }
                        }}
                      >
                        <ImageCard item={ele} />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </>
          )}
        </div>
      )}

      {imageOpen && (
        <Lightbox
          mainSrc={imageUrl(imageOpen)}
          onCloseRequest={() => {
            setImageOpen(false);
          }}
        />
      )}
    </>
  );
};

export default GalleryDetails;
