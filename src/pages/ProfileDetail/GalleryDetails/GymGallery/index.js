import React, { useState } from 'react';
import classes from './GymGallery.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import ImageCard from '../../../../Component/ImageCard';
import { Button } from '../../../../Component/Button/Button';
import { postImageOne } from '../../../../constant/imagePath';
import AlbumCard from '../../../../Component/AlbumCard';
import { BiArrowBack } from 'react-icons/bi';
import AreYouSureModal from '../../../../modals/AreYouSureModal';
import { BaseURL } from '../../../../config/apiUrl';
import { Get } from '../../../../Axios/AxiosFunctions';
const GymGallery = () => {
  const [isAlbum, setIsAlbum] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [SingleAlbum, setSingleAlbum] = useState([]);
  const handleAlbumDetail = async () => {
    setIsAlbum(true);
    const apiUrl = BaseURL('');
    return;
    const response = await Get(apiUrl);
    if (response !== undefined) {
      setSingleAlbum(response?.data?.data);
    }
  };
  return (
    <>
      {!isAlbum ? (
        <>
          <div className={classes.main}>
            <div className={classes.recentHeader}>
              <h1>Albums</h1>
              <Button label={'Add New'} />
            </div>
            <Row className='gy-4'>
              {[1, 1, 1, 1]?.map((ele) => {
                return (
                  <Col
                    onClick={handleAlbumDetail}
                    xl={3}
                    lg={4}
                    md={6}
                  >
                    <AlbumCard img={postImageOne} />
                  </Col>
                );
              })}
            </Row>

            <div className={classes.recentHeader}>
              <h1>Recent</h1>
              <p>View All</p>
            </div>
            <Row className='gy-4'>
              {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((ele) => {
                return (
                  <Col
                    lg={4}
                    md={6}
                    sm={6}
                  >
                    <ImageCard img={postImageOne} />
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      ) : (
        <>
          <div className={classes.detailheader}>
            <h1>
              <span onClick={() => setIsAlbum(false)}>
                <BiArrowBack cursor={'pointer'} />
              </span>{' '}
              Training Session 3
            </h1>

            <Button label={'Upload Image'} />
          </div>
          <Row className='gy-4'>
            {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((ele) => {
              return (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                >
                  <ImageCard
                    onDelete={() => setModalOpen(true)}
                    img={postImageOne}
                  />
                </Col>
              );
            })}
          </Row>
        </>
      )}
      {modalOpen && (
        <AreYouSureModal
          subTitle={
            "Are yu sure you want to delete Image 'Training Session 2.3.png'?"
          }
          setShow={setModalOpen}
          show={modalOpen}
        />
      )}
    </>
  );
};

export default GymGallery;
