import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./input.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { numberRegEx } from "../../config/apiUrl";
import Tooltip from "../Tooltip";

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  type,
  label,
  label2, // sub label
  value, // input value
  setter, //setValue
  noBorder,
  placeholder,
  disabled,
  parentCustomStyle, //Main Div Inline Style
  customStyle, //Input Container inline Style
  inputStyle, //Input inline Style
  labelStyle, //Label inline Style
  error, // Show Error Boolean
  errorText, // Error Text
  leftIcon, // Icon For Input
  rightIcon,
  regexType,
  labelLeftIcon,
  enterClick,
  customClass,
  isEvent = false,
  tooltipText,
  tooltipIcon,
  ...props
}) => {
  const [passToggle, setPassToggle] = useState(false);
  let inputContainerStyleObject = Object.assign(
    {},
    error && { border: `1.5px solid red ` },
    leftIcon && { paddingLeft: "56px" }
  );
  return (
    <>
      <div
        className={`${[classes.Container, customClass && customClass].join(
          " "
        )}`}
        style={{ ...parentCustomStyle }}
      >
        <div className="d-flex">
          {label && (
            <label
              htmlFor={`input${label}`}
              className={`${[
                classes.labelText,
                disabled && classes.disabled,
              ].join(" ")}`}
              style={{ ...labelStyle }}
            >
              {labelLeftIcon && labelLeftIcon}
              {label} {label2 && label2}
            </label>
          )}
          {tooltipText && (
            <Tooltip className={classes.tooltipDiv} icon={tooltipIcon}> 
              <span>{tooltipText}</span>
            </Tooltip>
          )}
        </div>
        <div
          className={`${[classes.inputPassContainer].join(" ")}`}
          style={{ ...customStyle }}
        >
          {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
          <input
            value={value}
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                if (enterClick) enterClick();
              }
            }}
            onChange={(e) => {
              if (regexType == "number" || type == "number") {
                setter(e?.target?.value?.replace(numberRegEx, ""));
              } else {
                if (isEvent) {
                  const urlRegex =
                    /^(https?:\/\/)?([\w\d\-_]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
                  if (e.target.value.match(urlRegex)) {
                    setter(e.target.value);
                  }
                } else {
                  setter(e.target.value);
                }
              }
            }}
            disabled={disabled}
            placeholder={placeholder}
            type={passToggle == true ? "text" : type}
            id={`input${label}`}
            className={` ${[
              classes.inputBox,
              noBorder && classes.noBorder,
            ].join(" ")}`}
            style={{ ...inputContainerStyleObject, ...inputStyle }}
            onBlur={() => {
              setter(value?.trim());
            }}
            {...props}
          />
          {rightIcon && <div className={classes.rightIcon}>{rightIcon}</div>}

          {type == "password" && passToggle == false && (
            <VisibilityOffIcon
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
          {type == "password" && passToggle && (
            <VisibilityIcon
              className={classes.passwordIcon}
              onClick={(e) => setPassToggle(!passToggle)}
            />
          )}
        </div>
        {error && (
          <p className={`mt-1 ${[classes.errorText].join(" ")}`}>
            {errorText ? errorText : label + " is required"}
          </p>
        )}
      </div>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setter: PropTypes.string,
  noBorder: PropTypes.bool,
  disabled: PropTypes.bool,
  customStyle: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  label2: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "enter text",
  value: "",
  noBorder: false,
  disabled: false,
  error: false,
  errorText: "",
};
