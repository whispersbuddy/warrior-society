import React, { useState } from "react";
import classes from "./TrainerGallery.module.css";
import { Col, Container, Row } from "react-bootstrap";
import ImageCard from "../../../../Component/ImageCard";
import { Button } from "../../../../Component/Button/Button";
import { postImageOne } from "../../../../constant/imagePath";
import AlbumCard from "../../../../Component/AlbumCard";
import { BiArrowBack } from "react-icons/bi";
const TrainerGallery = () => {
  const [isAlbum, setIsAlbum] = useState(false);
  const handleAlbumDetail = () => {
    setIsAlbum(true);
  };
  return (
    <>
      {!isAlbum ? (
        <>
          <div className={classes.main}>
            <Container>
              <div className={classes.recentHeader}>
                <h1>Albums</h1>
                <Button label={"Add New"} />
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
                  <ImageCard onDelete={() => { }} img={postImageOne} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default TrainerGallery;
