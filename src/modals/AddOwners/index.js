import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Get } from '../../Axios/AxiosFunctions';
import { Button } from '../../Component/Button/Button';
import { DropDown } from '../../Component/DropDown/DropDown';
import { BaseURL } from '../../config/apiUrl';
import ModalSkeleton from '../ModalSkeleton';
import classes from './AddOwners.module.css';
const AddOwners = ({
  show,
  setShow,
  onClick,
  isLoading,
  selectType,
  selectedData,
}) => {
  const { user: userData, access_token } = useSelector(
    (state) => state?.authReducer
  );
  const [selectUser, setSelectUser] = useState('');
  const [isGettingUser, setIsGettingUser] = useState(false);
  const [UserData, setGetUserData] = useState([]);
  const getUserData = async () => {
    const apiUrl = BaseURL(`profile/getUserForRequest?type=${selectType}`);
    setIsGettingUser(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setGetUserData(response?.data?.data);
    }
    setIsGettingUser(false);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const handleClick = async () => {
    const params = {
      type: selectType,
      userId: selectUser?.id,
      requested: true,
    };
    if (!selectUser) {
      return toast.error('Please select user');
    }

    if (
      UserData?.filter((ele) => ele?.requested === true)
        ?.map((ele) => ele?._id)
        ?.includes(selectUser?.id)
    ) {
      return toast.error('User already requested');
    }

    await onClick(params);
  };

  return (
    <>
      <ModalSkeleton
        width={'600px'}
        header={'Send Request'}
        setShow={setShow}
        show={show}
      >
        {isGettingUser ? (
          <Skeleton
            height={'100px'}
            style={{
              borderRadius: '15px',
            }}
          />
        ) : (
          <div className={classes.main}>
            <DropDown
              setter={setSelectUser}
              value={selectUser}
              placeholder={'Select'}
              isSearchable={true}
              options={UserData?.map((ele) => ({
                name: ele?.firstName + ' ' + ele?.lastName,
                id: ele?._id,
              }))}
              optionLabel={'name'}
              optionValue={'id'}
            />
          </div>
        )}

        <Button
          onClick={handleClick}
          className={classes.btn__wrapper}
          disabled={isLoading || isGettingUser}
          label={isLoading ? 'Please wait...' : 'Submit'}
        />
      </ModalSkeleton>
    </>
  );
};

export default AddOwners;
