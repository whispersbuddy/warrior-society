import React from 'react';
import classes from './MultiTextInput.module.css';
import { Input } from '../Input/Input';
import { MdOutlineAddBox } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const MultiTextInput = ({ value, setter, icon, label='Text...', awards = false }) => {
  // add
  const handleAdd = () => {
    for (let i = 0; i < value?.length; i++) {
      if (value[i] === '') {
        return toast.error(
          `Please fill the ${label?.toLowerCase()} field at index ${i + 1}`
        );
      }
    }
    setter((prev) => [...prev, '']);
  };
  // delete
  const handleDelete = (index) => {
    if (value.length === 1)
      return toast.error(`Please fill at least one ${label} field`);
    let temp = [...value];
    temp.splice(index, 1);
    setter(temp);
  };

  return (
    <div>
      <div className={classes.inputHeading}>
        <p>
          {icon} {label}
        </p>
        <MdOutlineAddBox
          className={classes.addBtn}
          onClick={handleAdd}
        />
      </div>
      {value?.map((ele, index) => (
        <div
          className={classes.ownerInput}
          key={index}
        >
          <div className={classes.owner}>
            <Input
              setter={(e) => {
                let temp = [...value];
                temp[index] = e;
                setter(temp);
              }}
              value={ele}
              placeholder={label}
            />
          </div>
          {value?.length !== 1 && (
            <div className={classes.deleteBtn}>
              <AiFillDelete
                cursor={'pointer'}
                onClick={() => handleDelete(index)}
              />
            </div>
          )}
          {awards && value?.length !== 1 && (
            <span className={classes.bullet}></span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiTextInput;
