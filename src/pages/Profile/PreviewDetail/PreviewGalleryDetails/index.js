import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Get } from "../../../../Axios/AxiosFunctions";
import AlbumCard from "../../../../Component/AlbumCard";
import ImageCard from "../../../../Component/ImageCard";
import { Loader } from "../../../../Component/Loader";
import NoData from "../../../../Component/NoData/NoData";
import { BaseURL } from "../../../../config/apiUrl";
import classes from "./GalleryDetails.module.css";
import { filterImagesVideos } from "../../../../config/HelperFunction";
const GalleryDetails = () => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [isAlbum, setIsAlbum] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [viewAllToggle, setViewAllToggle] = useState({
    images: false,
    videos: false,
  });
  const handleAlbumDetail = async (id) => {
    setIsAlbum(true);
    await getSingleAlbum(id);
  };
  const getAllGalleries = async () => {
    const apiUrl = BaseURL(`profile/gallery?profile=student`);
    setIsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      const { recentMedia, albums } = response?.data?.data;
      const { images, videos } = filterImagesVideos(recentMedia);
      setAlbums({
        images,
        videos,
        albums,
      });
    }
    setIsLoading(false);
  };

  const getSingleAlbum = async (id) => {
    const apiUrl = BaseURL(`profile/getAlbum?albumId=${id}`);
    setIsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setSingleAlbum(response?.data?.data?.album);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isAlbum) {
      getAllGalleries();
    }
  }, [isAlbum]);
  return (
    <>
      {isLoading ? (
        <Loader className={"vh-100"} />
      ) : (
        <div className={classes.galleryPage}>
          {!isAlbum ? (
            <>
              <div className={classes.main}>
                <Container>
                  <div className={classes.recentHeader}>
                    <h1>Images</h1>
                    {albums?.images?.length > 9 && (
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
                    {albums?.images?.length > 0 ? (
                      albums?.images
                        ?.slice(0, viewAllToggle ? albums?.images?.length : 9)
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
                        text="No recent images found"
                        className={classes.no_media}
                      />
                    )}
                  </Row>
                  <div className={classes.recentHeader}>
                    <h1>Videos</h1>
                    {albums?.videos?.length > 9 && (
                      <p
                        onClick={() =>
                          setViewAllToggle((prev) => ({
                            ...prev,
                            videos: !prev?.videos,
                          }))
                        }
                      >
                        {viewAllToggle?.videos ? "View Less" : "View All"}
                      </p>
                    )}
                  </div>
                  <Row className="gy-4">
                    {albums?.videos?.length > 0 ? (
                      albums?.videos
                        ?.slice(0, viewAllToggle ? albums?.videos?.length : 9)
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
                  </Row>
                  <div className={classes.recentHeader}>
                    <h1>Albums</h1>
                  </div>
                  <Row>
                    {albums?.albums?.length > 0 ? (
                      albums?.albums?.map((ele) => {
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
                      <Col md={4} className={classes.albumCard}>
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
    </>
  );
};

export default GalleryDetails;
