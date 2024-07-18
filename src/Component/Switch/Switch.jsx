import React from "react";
import classes from "./Switch.module.css";
import PropTypes from "prop-types";

const Switch = ({ value, setter }) => {
  return (
    <>
      <style jsx>
        {`
          input:checked + .${classes.slider} {
            background-color: #e81c24 !important;
          }
          .${classes.slider} {
            background-color: var(--text-dark-gray);
          }
        `}
      </style>
      <label className={classes.switch}>
        <input type="checkbox" checked={value} />
        <span
          className={`${[classes.slider, classes.round].join(" ")}`}
          onClick={() => {
            setter(!value);
          }}
        ></span>
      </label>
    </>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  setter: PropTypes.func,
};
Switch.defaultProps = {
  value: false,
};

export default Switch;
