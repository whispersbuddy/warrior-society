import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../Component/Button/Button';
import { DropDown } from '../../Component/DropDown/DropDown';
import { TextArea } from '../../Component/TextArea';
import { reportOptions } from '../../config/Data';
import ModalSkeleton from '../ModalSkeleton';
import classes from './ReportModal.module.css';
const ReportModal = ({ show, setShow, data, modalLoading, onClick }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const handleClick = async () => {
    const params = {
      description,
      post: data?._id,
      subject: subject?.value,
    };
    for (let key in params) {
      if (params[key] == '' || params[key] == null) {
        return toast.error(`Please fill ${key} field!`);
      }
    }
    const response = await onClick(params);
    if (response) {
      setSubject('');
      setDescription('');
      setShow({
        ...show,
        show: false,
      });
    }
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`Report Post`}
        width={'800px'}
      >
        <div className={classes.modalContainer}>
          <div className={classes.inputField}>
            <DropDown
              placeholder={'Subject'}
              value={subject}
              setter={setSubject}
              options={reportOptions}
            />
          </div>
          <div className={classes.inputField}>
            <TextArea
              value={description}
              setter={setDescription}
              placeholder={'Reason'}
            />
          </div>
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={modalLoading ? `Reporting...` : `Report`}
              disabled={modalLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ReportModal;
