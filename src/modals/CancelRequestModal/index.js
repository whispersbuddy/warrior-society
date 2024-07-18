import React from 'react';
import { Button } from '../../Component/Button/Button';
import { Loader } from '../../Component/Loader';
import NoData from '../../Component/NoData/NoData';
import { imageUrl } from '../../config/apiUrl';
import ModalSkeleton from '../ModalSkeleton';
import classes from './CancelRequestModal.module.css';
const CancelRequestModal = ({
  show,
  setShow,
  onClick,
  isLoading,
  data,
  isGetting,
  selectType,
}) => {
  const handleClick = (id) => {
    const params = {
      userId: id,
      type: selectType,
      accepted: false,
    };
    onClick(params);
  };
  return (
    <>
      <ModalSkeleton
        width={'600px'}
        setShow={setShow}
        show={show}
        header={'Requested Users'}
      >
        {isGetting ? (
          <Loader />
        ) : data?.length === 0 ? (
          <NoData />
        ) : (
          data?.map((ele) => {
            return (
              <div className={classes.main}>
                <div className={classes.left__wrapper}>
                  <img src={imageUrl(ele?.photo)} />
                  <p>
                    {ele?.firstName} {ele?.lastName}
                  </p>
                </div>

                <div>
                  <Button
                    disabled={isLoading}
                    onClick={() => handleClick(ele?._id)}
                    label={'Cancel Request'}
                  />
                </div>
              </div>
            );
          })
        )}
      </ModalSkeleton>
    </>
  );
};

export default CancelRequestModal;
