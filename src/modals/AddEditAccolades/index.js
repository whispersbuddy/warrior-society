import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../Component/Button/Button';
import { Input } from '../../Component/Input/Input';
import UploadImageBox from '../../Component/UploadImageBox';
import ModalSkeleton from '../ModalSkeleton';
import classes from './AddEditAccolades.module.css';
const AddEditAccolades = ({
  show,
  setShow,
  label,
  data,
  apiLoading,
  onClick,
}) => {
  const [award, setAward] = useState(data?.image || null);
  const [title, setTitle] = useState(data?.accoladeName || null);

  const handleClick = async () => {
    const params = {
      ...(data !== null && { accoladeID: data._id }),
      name: title,
      image: award,
    };
    for (let key in params) {
      if (params[key] == null || params[key] == '') {
        return toast.error('Please fill all the fields');
      }
    }
    const formData = new FormData();
    for (let key in params) {
      formData.append(key, params[key]);
    }
    await onClick(formData);
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`${label} Accolade`}
        width={'800px'}
      >
        <div className={classes.modalContainer}>
          <div className={classes.uploadImage}>
            <UploadImageBox
              state={award}
              setter={setAward}
              label={'Upload Award'}
            />
          </div>
          <div className={classes.inputField}>
            <Input
              value={title}
              setter={setTitle}
              label={'Award Name'}
              placeholder={'Award Name'}
            />
          </div>
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={apiLoading ? `${label}ing...` : `${label}`}
              disabled={apiLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AddEditAccolades;
