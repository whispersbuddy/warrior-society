import PropTypes from "prop-types";
import React from "react";
import classes from "./TextArea.module.css";

export function TextArea({
  value,
  setter,
  label,
  labelLeftIcon,
  placeholder,
  customStyle,
  labelStyle,
  rows = 5,
  className,
  parentClass,
  disabled,
  ref,
  error,
  errorText,
}) {
  let inputContainerStyleObject = Object.assign(
    {},
    error && { border: `1.5px solid red ` }
  );
  return (
    <div
      className={[classes.textAreaBox, parentClass && parentClass].join(" ")}
    >
      {label && (
        <label
          style={{ ...labelStyle }}
          className={`${[disabled && classes.labelDisabled, classes.label].join(
            " "
          )}`}
        >
          {labelLeftIcon && labelLeftIcon}
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        style={{ ...inputContainerStyleObject, ...customStyle }}
        onChange={(e) => {
          setter(e.target.value);
        }}
        onBlur={() => {
          setter(value?.trim());
        }}
        className={className}
        rows={rows}
        disabled={disabled}
        ref={ref}
      />
      {error && (
        <p className={`${[classes.errorText].join(" ")}`}>
          {errorText ? errorText : label + " is required"}
        </p>
      )}
    </div>
  );
}
TextArea.propTypes = {
  value: PropTypes.string,
  setter: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};
