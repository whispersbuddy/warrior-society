import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button } from '../../Component/Button/Button';
import { Checkbox } from '../../Component/Checkbox/Checkbox';
import ModalSkeleton from '../../modals/ModalSkeleton';
import styles from './EditLessonModal.module.css';

export default function EditLessonModal({
  show,
  setShow,
  modalLoading,
  roles = [],
  onclick,
  data,
}) {
  const [selectFees, setSelectFees] = useState([]);
  const handleSubmit = async () => {
    const params = {
      availableForSparring: selectFees?.includes('Available For Sparring'),
      ...(roles?.includes('Available For Fights') && {
        availableForFight: selectFees?.includes('Available For Fights'),
      }),
      ...(roles?.includes('Available For Private Lessons') && {
        availableForLesson: selectFees?.includes(
          'Available For Private Lessons'
        ),
      }),
    };
    await onclick(params);
  };
  useEffect(() => {
    if (data?.availableForLesson) {
      setSelectFees((prev) => [...prev, 'Available For Private Lessons']);
    }
    if (data?.availableForSparring) {
      setSelectFees((prev) => [...prev, 'Available For Sparring']);
    }
    if (data?.availableForFight) {
      setSelectFees((prev) => [...prev, 'Available For Fights']);
    }
  }, []);

  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Update Details`}
      width={'900px'}
      modalClass={styles.modalBody}
    >
      <div className={styles.container}>
        <Row>
          {roles?.map((ele) => (
            <Col xl={12}>
              <Checkbox
                value={selectFees}
                setValue={setSelectFees}
                label={ele}
              />
            </Col>
          ))}
          <div className={styles.submitBtn}>
            <Button
              label={modalLoading ? 'Submitting...' : 'Submit'}
              disabled={modalLoading}
              onClick={handleSubmit}
            />
          </div>
        </Row>
      </div>
    </ModalSkeleton>
  );
}
