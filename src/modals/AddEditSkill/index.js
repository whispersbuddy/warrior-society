import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../Component/Button/Button';
import { DropDown } from '../../Component/DropDown/DropDown';
import { Input } from '../../Component/Input/Input';
import { TextArea } from '../../Component/TextArea';
import { skillOptions } from '../../config/Data';
import { formRegEx, formRegExReplacer } from '../../config/apiUrl';
import ModalSkeleton from '../ModalSkeleton';
import classes from './AddEditSkill.module.css';
const AddEditSkill = ({
  show,
  setShow,
  data,
  modalLoading,
  onClick,
  fieldArray,
  role,
}) => {
  const [name, setName] = useState(data?.name || null);
  const [description, setDescription] = useState(data?.description || null);
  const [level, setLevel] = useState(
    skillOptions?.find((skill) => skill?.value === data?.level) || null
  );
  const handleClick = async () => {
    const params = {
      name,
      description,
      ...(role !== 'trainer' && { level: level?.value }),
    };
    for (let key in params) {
      if (params[key] == null || params[key] == '') {
        return toast.error(
          `Please fill ${key.replace(formRegEx, formRegExReplacer)} field!`
        );
      }
    }
    let dataArr = [...fieldArray];
    if (data) {
      dataArr = dataArr?.map((ele) => (ele?._id === data?._id ? params : ele));
    } else {
      dataArr?.push(params);
    }
    await onClick('skills', dataArr);
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={`${data ? 'Update' : 'Add'} Skill`}
        width={'800px'}
      >
        <div className={classes.modalContainer}>
          {role !== 'trainer' && (
            <div className={classes.inputField}>
              <DropDown
                value={level}
                setter={setLevel}
                label={'Skill Level'}
                placeholder={'Skill Level'}
                options={skillOptions}
              />
            </div>
          )}
          <div className={classes.inputField}>
            <Input
              value={name}
              setter={setName}
              label={'Skill Title'}
              placeholder={'Skill Title'}
            />
          </div>
          <div className={classes.inputField}>
            <TextArea
              value={description}
              setter={setDescription}
              label={'Skill Description'}
              placeholder={'Skill Description'}
            />
          </div>
          <div className={classes.submitBtn}>
            <Button
              onClick={handleClick}
              label={modalLoading ? `Submiting...` : `Submit`}
              disabled={modalLoading}
            />
          </div>
        </div>
      </ModalSkeleton>
    </>
  );
};

export default AddEditSkill;
