import React, { useEffect } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { DropDown } from "../DropDown/DropDown";
import classes from "./MultiTextDropDown.module.css";
const options = [
  {
    label: "Karate",
    value: "karate",
  },
  {
    label: "Judo",
    value: "judo",
  },
  {
    label: "Taekwondo",
    value: "taekwondo",
  },
  {
    label: "Boxing",
    value: "boxing",
  },
];
const weightOptions = [
  {
    label: "50Kgs",
    value: 50,
  },
  {
    label: "60Kgs",
    value: 60,
  },
  {
    label: "70Kgs",
    value: 70,
  },
];
const MultiTextDropDown = ({ value, setter, firstLabel, secondIcon }) => {
  // add
  const handleAdd = () => {
    for (let i = 0; i < value?.length; i++) {
      for (let key in value[i]) {
        if (value[i][key] === "") {
          return toast.error(
            `Please fill the ${key?.toLowerCase()} field at index ${i + 1}`
          );
        }
      }
    }
    setter((prev) => [
      ...prev,
      {
        discipline: "",
        weight: "",
      },
    ]);
  };
  // delete
  const handleDelete = (index) => {
    if (value.length === 1)
      return toast.error(`Please fill at least one discipline field`);
    let temp = [...value];
    temp.splice(index, 1);
    setter(temp);
  };
  useEffect(() => {
    if (value?.length > 0 && value[0]?.discipline) {
      let temp = [...value];
      temp = temp?.map((ele) => {
        return {
          discipline: options?.find((item) => item?.value === ele?.discipline),
          weight: weightOptions?.find((item) => item?.value === ele?.weight),
        };
      });
      setter(temp);
    }
  }, []);

  return (
    <div>
      <div className={classes.inputHeading}>
        <p>
          {secondIcon} {firstLabel}
        </p>
        <MdOutlineAddBox className={classes.addBtn} onClick={handleAdd} />
      </div>
      {value?.map((ele, index) => (
        <div className={value?.length !== 1 && classes.divBox}>
          <div
            className={classes.ownerInput}
            key={index}
            style={{
              marginTop: value?.length !== 1 ? "30px" : "0px",
            }}
          >
            <div className={classes.owner}>
              <DropDown
                setter={(e) => {
                  let temp = [...value];
                  temp[index]["discipline"] = e;
                  setter(temp);
                }}
                options={options.filter(
                  (option) =>
                    !value.find(
                      (ele) => ele?.discipline?.value === option.value
                    )
                )}
                value={ele?.discipline}
                placeholder={"Discipline"}
              />
            </div>
            {value?.length !== 1 && (
              <div className={classes.deleteBtn}>
                <RxCross2
                  cursor={"pointer"}
                  onClick={() => handleDelete(index)}
                />
              </div>
            )}
          </div>
          <div className={classes.owner}>
            <DropDown
              setter={(e) => {
                let temp = [...value];
                temp[index]["weight"] = e;
                setter(temp);
              }}
              value={ele?.weight}
              options={weightOptions}
              placeholder={`Weight`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiTextDropDown;
