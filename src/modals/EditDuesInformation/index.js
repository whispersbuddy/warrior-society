import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Button } from '../../Component/Button/Button';
import { Input } from '../../Component/Input/Input';
import { TextArea } from '../../Component/TextArea';
import { formRegEx, formRegExReplacer } from '../../config/apiUrl';
import ModalSkeleton from '../ModalSkeleton';
import classes from './EditDuesInformation.module.css';
const EditDuesInformation = ({ setShow, show, isLoading, onClick, data }) => {
  const [monthlyDueMax, setMonthlyDueMax] = useState('');
  const [monthlyDueMin, setMonthlyDueMin] = useState('');
  const [privateLessonMin, setPrivateLessonMin] = useState('');
  const [privateLessonMax, setPrivateLessonMax] = useState('');
  const [dropinFees, setDropinFees] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [special, setSpecial] = useState('');

  useEffect(() => {
    if (data?.duesInformation) {
      setMonthlyDueMax(data?.duesInformation?.monthlyDueMax);
      setMonthlyDueMin(data?.duesInformation?.monthlyDueMin);
      setPrivateLessonMin(data?.duesInformation?.privateMinFees);
      setPrivateLessonMax(data?.duesInformation?.privateMaxFees);
      setDropinFees(data?.duesInformation?.dropin);
      setAdditionalInformation(data?.additionInformation);
      setSpecial(data?.special);
    }
  }, []);
  const handleClick = async () => {
    const params = {
      monthlyDueMax,
      monthlyDueMin,
      privateMinFees: privateLessonMin,
      privateMaxFees: privateLessonMax,
      dropin: dropinFees,
      additionInformation: additionalInformation,
      special,
    };
    for (let key in params) {
      if (!params[key]) {
        return toast.error(
          `Please select ${key
            .replace(formRegEx, formRegExReplacer)
            .toLowerCase()}`
        );
      }
    }

    delete params['additionInformation'];
    delete params['special'];
    let body = {
      additionInformation: additionalInformation,
      special: special,
    };

    await onClick('duesInformation', params, body);
  };
  return (
    <ModalSkeleton
      width={'700px'}
      header={'Dues Information'}
      show={show}
      setShow={setShow}
      modalClass={classes.modal}
    >
      <Row>
        <Col
          md={6}
          className={classes.inputField}
        >
          <Input
            regexType={'number'}
            setter={setMonthlyDueMin}
            value={monthlyDueMin}
            label={'Monthly Due Min Fees ($)'}
            placeholder={'Monthly Due Min Fees ($)'}
          />
        </Col>
        <Col
          md={6}
          className={classes.inputField}
        >
          <Input
            regexType={'number'}
            setter={setMonthlyDueMax}
            value={monthlyDueMax}
            label={'Monthly Due Max Fees ($)'}
            placeholder={'Monthly Due Max Fees ($)'}
          />
        </Col>
        <Col
          md={6}
          className={classes.inputField}
        >
          <Input
            regexType={'number'}
            setter={setPrivateLessonMin}
            value={privateLessonMin}
            label={'Private Lesson Min Fees ($)'}
            placeholder={'Private Lesson Min Fees ($)'}
          />
        </Col>
        <Col
          md={6}
          className={classes.inputField}
        >
          <Input
            regexType={'number'}
            setter={setPrivateLessonMax}
            value={privateLessonMax}
            label={'Private Lesson Max Fees ($)'}
            placeholder={'Private Lesson Max Fees ($)'}
          />
        </Col>
        <Col
          md={12}
          className={classes.inputField}
        >
          <Input
            setter={setDropinFees}
            value={dropinFees}
            label={'Dropin Fees ($)'}
            placeholder={'Dropin Fees ($)'}
          />
        </Col>
        <Col
          md={12}
          className={classes.inputField}
        >
          <TextArea
            setter={setAdditionalInformation}
            value={additionalInformation}
            label={'Additional Information'}
            placeholder={'Additional Information'}
          />
        </Col>
        <Col
          md={12}
          className={classes.inputField}
        >
          <TextArea
            setter={setSpecial}
            value={special}
            label={'Special'}
            placeholder={'Special'}
          />
        </Col>
        <Col md={12}>
          <Button
            disabled={isLoading}
            onClick={handleClick}
            className={classes.submitBtn}
            label={isLoading ? 'Please wait...' : 'Submit'}
          />
        </Col>
      </Row>
    </ModalSkeleton>
  );
};

export default EditDuesInformation;
