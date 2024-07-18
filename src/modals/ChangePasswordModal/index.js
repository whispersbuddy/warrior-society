import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from '../../Component/Button/Button';
import { Input } from '../../Component/Input/Input';
import ModalSkeleton from '../ModalSkeleton';
import classes from './ChangePasswordModal.module.css';

const ChangePasswordModal = ({ show, setShow, isLoading, handleUpdate }) => {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async () => {
    let body = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    if (
      password !== passwordConfirm ||
      password == '' ||
      passwordConfirm == ''
    ) {
      return toast.error('Please type the passwords correctly');
    }
    if (passwordCurrent === password) {
      return toast.error('You entered an old password');
    }
    if (password < 8) {
      toast.error('Password must contain more than 8 characters');
      return;
    }

    await handleUpdate(body);
  };
  return (
    <>
      <ModalSkeleton
        header={'Change Password'}
        borderRadius={'10px'}
        width={'600px'}
        setShow={setShow}
        show={show}
      >
        <div className={classes.main}>
          <Row className="gy-4">
            <Col lg={12}>
              <Input
                type={'password'}
                setter={setPasswordCurrent}
                value={passwordCurrent}
                label={'Current Password'}
                placeholder={'Current Password'}
              />
            </Col>
            <Col lg={12}>
              <Input
                type={'password'}
                setter={setPassword}
                value={password}
                label={'New Password'}
                placeholder={'New Password'}
              />
            </Col>
            <Col lg={12}>
              <Input
                type={'password'}
                setter={setPasswordConfirm}
                value={passwordConfirm}
                label={'Confirm New Password'}
                placeholder={'Confirm New Password'}
              />
            </Col>

            <Col md={12}>
              <div className={classes.btnMain}>
                <Button
                  disabled={isLoading}
                  onClick={handleSubmit}
                  label={isLoading ? 'Please wait...' : 'Submit'}
                />
              </div>
            </Col>
          </Row>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default ChangePasswordModal;
