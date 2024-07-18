import React, { useEffect, useState } from "react";
import classes from "./FighterGallery.module.css";
import { Col, Container, Row } from "react-bootstrap";
import ImageCard from "../../../../Component/ImageCard";
import { Button } from "../../../../Component/Button/Button";
import { postImageOne } from "../../../../constant/imagePath";
import AlbumCard from "../../../../Component/AlbumCard";
import { BiArrowBack } from "react-icons/bi";
import { BaseURL, apiHeader } from "../../../../config/apiUrl";
import { Get, Patch, Post } from "../../../../Axios/AxiosFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddEditAlbumsModal from "../../../../modals/AddEditAlbumsModal";
import AreYouSureModal from "../../../../modals/AreYouSureModal";
const FighterGallery = () => {
  const { access_token } = useSelector((state) => state?.authReducer);
  const [isAlbum, setIsAlbum] = useState(false);
  const [allAlbums, setAllAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleAlbumDetail = () => {
    setIsAlbum(true);
  };

  const handleGetAlbum = async () => {
    const apiUrl = BaseURL("profile/gallery?profile=fighter");
    setIsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setAllAlbums(response?.data?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAlbum();
  }, []);

  const handleAddEditAlbum = async (params) => {
    const apiUrl = BaseURL(
      selectedData ? "profile/gallery?profile=fighter" : `profile/updateAlbum`
    );
    setIsApiCall(true);
    const response = selectedData
      ? await Patch(apiUrl, params, apiHeader(access_token))
      : await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`${selectedData ? "Album Updated" : "Album Created"}`);
      if (selectedData) {
        const index = allAlbums?.findIndex(
          (ele) => ele?.id === selectedData?.id
        );
        const temp = [...allAlbums];
        temp[index] = response?.data?.data;
        setAllAlbums(temp);
      } else {
        setAllAlbums([...allAlbums, response?.data?.data]);
      }
    }
    setIsApiCall(false);
  };

  const handleDeleteAlbum = async (id) => {
    const apiUrl = BaseURL(`profile/gallery/${id}`);
    setIsDeleting(true);
    const response = await Patch(apiUrl, null, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`Album deleted successfully`);
      const temp = allAlbums?.filter((ele) => ele?.id !== id);
      setAllAlbums(temp);
    }
    setIsDeleting(false);
  };

  return (
    <>
      {!isAlbum ? (
        <>
          <div className={classes.main}>
            <Container>
              <div className={classes.recentHeader}>
                <h1>Albums</h1>
                <Button
                  onClick={() => {
                    setSelectedData(null);
                    setModalOpen(true);
                  }}
                  label={"Add New"}
                />
              </div>
              <Row>
                {[1, 1, 1, 1]?.map((ele) => {
                  return (
                    <Col onClick={handleAlbumDetail} md={3}>
                      <AlbumCard img={postImageOne} />
                    </Col>
                  );
                })}
              </Row>

              <div className={classes.recentHeader}>
                <h1>Recent</h1>
                <p>View All</p>
              </div>
              <Row className="gy-4">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((ele) => {
                  return (
                    <Col md={4}>
                      <ImageCard img={postImageOne} />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <>
          <div className={classes.detailheader}>
            <h1>
              <span onClick={() => setIsAlbum(false)}>
                <BiArrowBack cursor={"pointer"} />
              </span>{" "}
              Training Session 3
            </h1>

            <Button label={"Upload Image"} />
          </div>
          <Row className="gy-4">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((ele) => {
              return (
                <Col md={4}>
                  <ImageCard onDelete={() => {}} img={postImageOne} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
      {modalOpen && (
        <AddEditAlbumsModal
          isLoading={isApiCall}
          onClick={handleAddEditAlbum}
          data={selectedData}
          setShow={setModalOpen}
          show={modalOpen}
        />
      )}
      {deleteModal && (
        <AreYouSureModal
          subTitle={"Are you sure you want to delete this album?"}
          onClick={() => handleDeleteAlbum(selectedData?.id)}
          isApiCall={isDeleting}
          setShow={setDeleteModal}
          show={deleteModal}
        />
      )}
    </>
  );
};

export default FighterGallery;
