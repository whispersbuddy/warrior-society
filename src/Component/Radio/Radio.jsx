import React from "react";
import classes from "./Radio.module.css";
import PropTypes from "prop-types";

export const Radio = ({
  value,
  setValue,
  label,
  disabled,
  singleValue = false,
}) => {
  return (
    <div className={`my-2 ${classes.radioWithLabel}`}>
      <input
        type="radio"
        id={`radio${label}`}
        checked={value === label ? "checked" : ""}
        disabled={disabled}
        onChange={(e) => {
          if (singleValue) {
            if (value !== label) {
              setValue(label);
            } else {
              setValue("");
            }
          } else {
            setValue(label);
          }
        }}
        className={`${[classes.radioInput].join(" ")}`}
      />
      {label && (
        <label htmlFor={`radio${label}`} className={` ${classes.label}`}>
          {label}
        </label>
      )}
    </div>
  );
};

Radio.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
Radio.defaultProps = {
  value: false,
  disabled: false,
  label: null,
};
