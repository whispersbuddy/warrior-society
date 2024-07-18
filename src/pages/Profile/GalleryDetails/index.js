import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiArrowBack, BiShare } from "react-icons/bi";
import { FaTrash, FaUpload } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Delete, Get, Patch, Post } from "../../../Axios/AxiosFunctions";
import AlbumCard from "../../../Component/AlbumCard";
import { Button } from "../../../Component/Button/Button";
import { Checkbox } from "../../../Component/Checkbox/Checkbox";
import ImageCard from "../../../Component/ImageCard";
import { Loader } from "../../../Component/Loader";
import NoData from "../../../Component/NoData/NoData";
import {
  UploadImagesToAwsBySignedUrl,
  UploadVideosToAwsBySignedUrl,
  filterImagesVideos,
} from "../../../config/HelperFunction";
import { BaseURL, apiHeader, imageUrl } from "../../../config/apiUrl";
import AddEditAlbumsModal from "../../../modals/AddEditAlbumsModal";
import AreYouSureModal from "../../../modals/AreYouSureModal";
import MoveToAlbum from "../../../modals/MoveToAlbum";
import classes from "./GalleryDetails.module.css";
const GalleryDetails = () => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [isAlbum, setIsAlbum] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [viewAllToggle, setViewAllToggle] = useState({
    images: false,
    videos: false,
  });
  const [modal, setModal] = useState({
    show: false,
    loading: false,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageOpen, setImageOpen] = useState(null);
  const handleAlbumDetail = async (id) => {
    setIsAlbum(true);
    setSelectedFiles([]);
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
  const handleAddEditAlbum = async (params, videos, images) => {
    const apiUrl = BaseURL(
      selectedData ? `profile/updateAlbum` : "profile/createAlbum"
    );
    setModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = selectedData
      ? await Patch(apiUrl, params, apiHeader(access_token))
      : await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      response?.data?.imageUrls?.length > 0 &&
        (await UploadImagesToAwsBySignedUrl(response?.data?.imageUrls, images));
      response?.data?.uploadingUrls?.length > 0 &&
        (await UploadVideosToAwsBySignedUrl(
          response?.data?.uploadingUrls,
          videos
        ));
      if (selectedData) {
        const index = albums?.albums?.findIndex(
          (ele) => ele?._id === selectedData?._id
        );
        const temp = [...albums?.albums];
        temp.splice(index, 1, response?.data?.data?.album);
        setAlbums({
          ...albums,
          albums: temp,
          recentMedia: response?.data?.data?.recentMedia,
        });
      } else {
        const { images, videos } = filterImagesVideos(
          response?.data?.recentMedia
        );
        setAlbums({
          images,
          videos,
          albums: [response?.data?.album, ...albums?.albums],
        });
      }
      toast.success(`${selectedData ? "Album Updated" : "Album Created"}`);
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
    setModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
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
  const handleDeleteImages = async (image) => {
    const deleteAll = modal.show === "deleteFromAll" ? `&type=all` : "";
    const apiUrl = BaseURL(
      `profile/deleteAlbum?albumId=${singleAlbum?._id}&imageName=${image?.join(
        ","
      )}${deleteAll}`
    );
    setModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      toast.success("Media deleted successfully!");

      if (modal.show === "deleteFromAll") {
        let allMedia = [...albums?.images, ...albums?.videos];
        allMedia = allMedia?.filter((ele) => {
          return !image.includes(ele);
        });
        setSelectedFiles([]);

        const { images, videos } = filterImagesVideos(allMedia);
        setAlbums({
          albums: albums?.albums?.map((ele) => {
            if (ele?._id === singleAlbum?._id) {
              return {
                ...singleAlbum,
                media: allMedia,
              };
            }
            return {
              ...ele,
              media: ele?.media?.filter((ele) => !image.includes(ele)),
            };
          }),
          images,
          videos,
        });
      } else {
        let allMedia = [...singleAlbum?.media];
        allMedia = allMedia?.filter((ele) => {
          return !image.includes(ele);
        });
        setSingleAlbum({
          ...singleAlbum,
          media: allMedia,
        });
      }
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
    setModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const uploadImageToAlbum = async (params, videos, images) => {
    const apiUrl = BaseURL(`profile/updateAlbum`);
    setModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      response?.data?.imageUrls?.length > 0 &&
        (await UploadImagesToAwsBySignedUrl(response?.data?.imageUrls, images));
      response?.data?.uploadingUrls?.length > 0 &&
        (await UploadVideosToAwsBySignedUrl(
          response?.data?.uploadingUrls,
          videos
        ));
      toast.success("Media uploaded successfully!");
      if (modal.show === "imageUpload") {
        const { media } = response?.data?.data?.album;
        const { images, videos } = filterImagesVideos(media);
        setAlbums({
          albums: albums?.albums?.map((ele) => {
            if (ele?._id === response?.data?.data?.album?._id) {
              return response?.data?.data?.album;
            }
            return ele;
          }),
          images,
          videos,
        });
      } else {
        setSingleAlbum({
          ...singleAlbum,
          media: response?.data?.data?.album?.media,
        });
      }
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
    setModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const handleDeleteAlbum = async () => {
    const apiUrl = BaseURL(`profile/deleteAlbum/${selectedData?._id}`);
    setModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      toast.success("Album deleted successfully!");
      const index = albums?.albums?.findIndex(
        (ele) => ele?._id === selectedData?._id
      );
      const temp = [...albums?.albums];
      temp.splice(index, 1);
      setAlbums({
        ...albums,
        albums: temp,
        recentMedia: response?.data?.data?.recentMedia,
      });
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
    setModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const handleMoveImages = async (params) => {
    const body = {
      ...params,
      images: selectedFiles,
    };
    const apiUrl = BaseURL(`profile/moveMedia`);
    setModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Patch(apiUrl, body, apiHeader(access_token));
    if (response) {
      toast.success("Media moved successfully!");
      if (isAlbum) {
        setSingleAlbum(response?.data?.data);
      } else {
        setAlbums({
          ...albums,
          albums: albums?.albums?.map((ele) => {
            if (ele?._id === params?.to) {
              return {
                ...ele,
                media: [...ele?.media, ...selectedFiles],
              };
            }
            return ele;
          }),
        });
      }
      setModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      setSelectedFiles([]);
    }
    setModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
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
                  <div className={classes.actions}>
                    <Button
                      label={"Upload"}
                      onClick={() => {
                        const default_album = albums?.albums?.find(
                          (ele) => ele?.isDefault
                        );
                        setSelectedData(default_album);
                        setModal({
                          ...modal,
                          show: "imageUpload",
                        });
                      }}
                      className={classes.upload_media}
                      title={"Upload Images/Videos"}
                      leftIcon={<FaUpload />}
                    />
                    {selectedFiles?.length > 0 && (
                      <>
                        <Button
                          onClick={() => {
                            const default_album = albums?.albums?.find(
                              (ele) => ele?.isDefault
                            );
                            setSelectedData(default_album);
                            setModal({
                              ...modal,
                              show: "moveTo",
                            });
                          }}
                          className={classes.upload_media}
                          title={"Move Images/Videos to albums"}
                        >
                          <BiShare color="var(--main-color)" size={20} /> Move
                          To Album
                        </Button>
                        <Button
                          // label={"Delete Media"}
                          onClick={() => {
                            const default_album = albums?.albums?.find(
                              (ele) => ele?.isDefault
                            );
                            setSelectedData(default_album);
                            setModal({
                              ...modal,
                              show: "deleteFromAll",
                            });
                          }}
                          className={classes.flex_btn}
                          title={"Delete Images/Videos from gallery"}
                        >
                          <FaTrash color="var(--main-color)" size={16} /> Delete
                          Media
                        </Button>
                      </>
                    )}
                  </div>
                  <div className={classes.recentHeader}>
                    <h1>Images</h1>

                    {albums?.images?.length > 0 && (
                      <div className={classes.check_div}>
                        <Checkbox
                          label={"Select All"}
                          value={
                            albums?.images?.filter((file) =>
                              selectedFiles?.includes(file)
                            )?.length === albums?.images?.length
                              ? "Select All"
                              : ""
                          }
                          setValue={(value) => {
                            if (value) {
                              setSelectedFiles((prev) => [
                                ...prev,
                                ...albums?.images?.filter(
                                  (file) => !selectedFiles?.includes(file)
                                ),
                              ]);
                              if (albums?.images?.length > 10) {
                                setViewAllToggle((prev) => ({
                                  ...prev,
                                  images: true,
                                }));
                              }
                            } else {
                              setSelectedFiles([]);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <Row className="gy-4">
                    {albums?.images?.length > 0 ? (
                      albums?.images
                        ?.slice(
                          0,
                          viewAllToggle?.images ? albums?.images?.length : 10
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
                              <ImageCard
                                item={ele}
                                onDelete={() => {
                                  const default_album = albums?.albums?.find(
                                    (ele) => ele?.isDefault
                                  );
                                  setSingleAlbum(default_album);
                                  setSelectedData(ele);
                                  setModal({
                                    ...modal,
                                    show: "deleteFromAll",
                                  });
                                }}
                                onSelect={() => {
                                  setSelectedFiles((prev) => {
                                    if (prev.includes(ele))
                                      return prev.filter(
                                        (item) => item !== ele
                                      );
                                    return [...prev, ele];
                                  });
                                }}
                                selectedFiles={selectedFiles}
                              />
                            </Col>
                          );
                        })
                    ) : (
                      <NoData
                        text="No images found"
                        className={classes.no_media}
                      />
                    )}
                    {albums?.images?.length > 10 && (
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
                    {albums?.videos?.length > 0 && (
                      <div className={classes.check_div}>
                        <Checkbox
                          label={"Select All"}
                          value={
                            albums?.videos?.filter((file) =>
                              selectedFiles?.includes(file)
                            )?.length === albums?.videos?.length
                              ? "Select All"
                              : ""
                          }
                          setValue={(value) => {
                            if (value) {
                              setSelectedFiles((prev) => [
                                ...prev,
                                ...albums?.videos?.filter(
                                  (file) => !selectedFiles?.includes(file)
                                ),
                              ]);
                              if (albums?.videos?.length > 10) {
                                setViewAllToggle((prev) => ({
                                  ...prev,
                                  videos: true,
                                }));
                              }
                            } else {
                              setSelectedFiles([]);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <Row className="gy-4">
                    {albums?.videos?.length > 0 ? (
                      albums?.videos
                        ?.slice(
                          0,
                          viewAllToggle?.videos ? albums?.videos?.length : 10
                        )
                        ?.map((ele) => {
                          return (
                            <Col
                              md={6}
                              xl={4}
                              xxl={3}
                              className={classes.albumCard}
                            >
                              <ImageCard
                                item={ele}
                                onDelete={() => {
                                  const default_album = albums?.albums?.find(
                                    (ele) => ele?.isDefault
                                  );
                                  setSingleAlbum(default_album);
                                  setSelectedData(ele);
                                  setModal({
                                    ...modal,
                                    show: "deleteFromAll",
                                  });
                                }}
                                onSelect={() => {
                                  setSelectedFiles((prev) => {
                                    if (prev.includes(ele))
                                      return prev.filter(
                                        (item) => item !== ele
                                      );
                                    return [...prev, ele];
                                  });
                                }}
                                selectedFiles={selectedFiles}
                              />
                            </Col>
                          );
                        })
                    ) : (
                      <NoData
                        text="No videos found"
                        className={classes.no_media}
                      />
                    )}
                    {albums?.videos?.length > 10 && (
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
                    <Button
                      label={"Create Album"}
                      onClick={() => {
                        setSelectedData(null);
                        setModal({
                          ...modal,
                          show: "add",
                        });
                      }}
                    />
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
                            <AlbumCard
                              album={ele}
                              onEditClick={
                                ele?.isDefault
                                  ? undefined
                                  : (e) => {
                                      e.stopPropagation();
                                      setSelectedData(ele);
                                      setModal({
                                        ...modal,
                                        show: "add",
                                      });
                                    }
                              }
                              onDelClick={
                                ele?.isDefault
                                  ? undefined
                                  : (e) => {
                                      e.stopPropagation();
                                      setSelectedData(ele);
                                      setModal({
                                        ...modal,
                                        show: "delete",
                                      });
                                    }
                              }
                            />
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
              <div className={classes.main}>
                <Container>
                  <div className={classes.detailheader}>
                    <h1>
                      <span
                        onClick={() => {
                          setSelectedFiles([]);
                          setIsAlbum(false);
                        }}
                      >
                        <BiArrowBack cursor={"pointer"} />
                      </span>{" "}
                      {singleAlbum?.name}
                    </h1>
                    <div className={classes.actions}>
                      <Button
                        // label={"Upload Media"}
                        onClick={() => {
                          setSelectedData(singleAlbum);
                          setModal({
                            ...modal,
                            show: "addImage",
                          });
                        }}
                        title={
                          "Upload Images/Videos to album (These will be added to gallery as well)"
                        }
                        className={classes.upload_media}
                      >
                        <FaUpload /> Upload
                      </Button>
                      {selectedFiles?.length > 0 && (
                        <>
                          <Button
                            onClick={() => {
                              setSelectedData(singleAlbum);
                              setModal({
                                ...modal,
                                show: "moveTo",
                              });
                            }}
                            className={classes.flex_btn}
                            title={"Move Images/Videos to albums"}
                          >
                            <BiShare color="var(--main-color)" size={16} /> Move
                            To Album
                          </Button>
                          <Button
                            // label={"Delete Media"}
                            onClick={() => {
                              setModal({
                                ...modal,
                                show: "deleteImage",
                              });
                            }}
                            className={classes.flex_btn}
                            title={"Delete Images/Videos from album"}
                          >
                            <FaTrash color="var(--main-color)" size={16} />{" "}
                            Delete Media
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <Row className="gy-4">
                    {singleAlbum?.media?.length > 0 ? (
                      singleAlbum?.media?.map((ele) => {
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
                            <ImageCard
                              onDelete={() => {
                                setSelectedData(ele);
                                setModal({
                                  ...modal,
                                  show: "deleteImage",
                                });
                              }}
                              onSelect={() => {
                                setSelectedFiles((prev) => {
                                  if (prev.includes(ele))
                                    return prev.filter((item) => item !== ele);
                                  return [...prev, ele];
                                });
                              }}
                              selectedFiles={selectedFiles}
                              item={ele}
                            />
                          </Col>
                        );
                      })
                    ) : (
                      <NoData
                        text="No media found"
                        className={classes.no_media}
                      />
                    )}
                  </Row>
                </Container>
              </div>
            </>
          )}
        </div>
      )}
      {modal.show == "add" && (
        <AddEditAlbumsModal
          isLoading={modal.loading}
          onClick={handleAddEditAlbum}
          data={selectedData}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          show={modal.show}
          label={selectedData ? "Edit Album" : "Add Album"}
        />
      )}
      {modal.show == "delete" && (
        <AreYouSureModal
          show={modal.show}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          isApiCall={modal.loading}
          subTitle={"Are you sure you want to delete this album?"}
          onClick={handleDeleteAlbum}
        />
      )}
      {modal.show == "deleteImage" && (
        <AreYouSureModal
          show={modal.show}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          isApiCall={modal.loading}
          subTitle={"Are you sure you want to delete this media from Album?"}
          onClick={() => handleDeleteImages(selectedFiles)}
        />
      )}
      {modal.show == "deleteFromAll" && (
        <AreYouSureModal
          show={modal.show}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          isApiCall={modal.loading}
          subTitle={"Are you sure you want to delete this media?"}
          onClick={() => handleDeleteImages(selectedFiles)}
        />
      )}
      {["addImage", "imageUpload"].includes(modal.show) && (
        <AddEditAlbumsModal
          isLoading={modal.loading}
          onClick={uploadImageToAlbum}
          data={selectedData}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          show={modal.show}
          imagesOnly={true}
          label={"Upload Images/Videos"}
        />
      )}
      {modal.show === "moveTo" && (
        <MoveToAlbum
          show={modal.show}
          setShow={() => {
            setModal({
              ...modal,
              show: false,
            });
          }}
          data={selectedData}
          albums={albums?.albums}
          loading={modal.loading}
          handleSubmit={handleMoveImages}
        />
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
