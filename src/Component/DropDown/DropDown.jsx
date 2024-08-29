import React from "react";
import ReactSelect, { components } from "react-select";
import classes from "./DropDown.module.css";
import PropTypes from "prop-types";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { imageUrl } from "../../config/apiUrl";
import ProfilePhoto from "../ProfilePhoto";
import { IoLocationOutline } from "react-icons/io5";
import { extractTextFromElement } from "../../config/HelperFunction";
import Creatable from "react-select/creatable";

export const DropDown = ({
  options,
  label,
  labelTwo,
  customStyle,
  disabled,
  value,
  setter,
  noBorder,
  isCustomAllow,
  placeholder,
  placeholderColor = "var(--placeholder-color)",
  isMulti,
  style,
  leftIcon,
  Components,
  labelClassName,
  indicatorColor = "var(--black-color)",
  optionLabel,
  optionValue,
  singleValueColor = "var(--black-color)",
  customeClassName = "DropdownOptionContainer",
  labelLeftIcon,
  labelRightIcon,
  isSearchable = true,
  closeMenuOnSelect = true,
  indicatorClass,
  affilatedAllow,
  errorText,
  showIndicatorAtTop = false,
  error,
  ...props
}) => {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator
        className={indicatorClass && indicatorClass}
        {...props}
      >
        <MdOutlineArrowDropDown size={30} color={indicatorColor} />
        {/* {props.isFocused ? (
          <MdOutlineArrowDropUp
            size={30}
            color={indicatorColor}
          />
        ) : (
          <MdOutlineArrowDropDown
            size={30}
            color={indicatorColor}
          />
        )} */}
      </components.DropdownIndicator>
    );
  };

  const dropDownStyle = {
    control: (styles, { isFocused, isDisabled, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled ? "var(--disabled-input-color)" : "#fff",
      padding: `${isCustomAllow ? "4px" : "4px 0px 4px 4px"}`,
      color: "var(--white-color)",
      boxShadow: "none",
      fontFamily: "rajdhani-regular",
      fontSize: "16px",
      letterSpacing: "1.4px",
      scrollBehavior: "smooth",
      cursor: "pointer",
      border: `1.5px solid ${error ? "red" : "var(--main-color)"}`,
      borderRadius: "8px",
      textTransform: "capitalize", // Corrected spelling from "capitialize"
      ...customStyle,

      ":hover": {
        ...styles[":hover"],
        borderColor: "#707070",
      },
      ":placeholder": {
        ...styles[":placeholder"],
        color: "var(--text-color-black)",
      },
      ":active": {
        ...styles[":active"],
        borderColor: error ? "red" : "var(--main-color)",
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: placeholderColor,
      };
    },

    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected && "var(--main-color)",
        color: isSelected && "var(--white-color)",
        padding: "8px 12px",
        fontFamily: "rajdhani-regular",
        textTransform: "capitialize",

        ":active": {
          ...styles[":active"],
          color: "#fff",
        },
        ":hover": {
          ...styles[":hover"],
          color: "#fff",
          backgroundColor: "#a924306e",
          cursor: "pointer",
        },
      };
    },

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "var(--main-color)",
        borderRadius: "14px",
        padding: "1px 10px",
        fontFamily: "rajdhani-regular",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "#fff",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      fontSize: 12,
      color: "#fff",
      ":hover": {
        color: "#fff",
      },
    }),
  };
  return (
    <div className={`${[classes.Container].join(" ")}`}>
      <style jsx>{`
        .DropdownOptionContainer__menu {
          margin: 0px;
          z-index: 1100 !important;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
          border: 1px solid #79747e;
          border-radius: 10px;
        }
        .DropdownOptionContainer__indicator svg {
          color: var(--secondary-color) !important;
        }
        .DropdownOptionContainer__single-value {
          color: ${singleValueColor};
        }
      `}</style>
      {label && (
        <label
          htmlFor={`dropdown${label}`}
          className={`${[
            classes.label,
            labelClassName && labelClassName,
            disabled && classes.disabled,
          ].join(" ")}`}
        >
          {labelLeftIcon && labelLeftIcon}
          {label}
          {/* {labelTwo && (
            <span style={{ color: Colors.neutralShadesOfDimGray }}>
              {" " + labelTwo}
            </span>
          )} */}
          {labelRightIcon}
        </label>
      )}

      <div className={`${[classes.dropdownContainer].join(" ")}`}>
        {isCustomAllow ? (
          <Creatable
            options={options}
            className={`${[classes.reactSelect].join(" ")} `}
            placeholder={placeholder}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (e) => DropdownIndicator(e),
              ...Components,
            }}
            onChange={(e) => {
              setter(e);
            }}
            styles={{ ...dropDownStyle, ...style }}
            isDisabled={disabled}
          />
        ) : (
          <ReactSelect
            inputId={`dropdown${label}`}
            value={value}
            onChange={(e) => {
              setter(e);
            }}
            className={`${[classes.reactSelect].join(" ")} `}
            isMulti={isMulti}
            isDisabled={disabled}
            placeholder={placeholder}
            options={options}
            styles={{ ...dropDownStyle, ...style,
              indicatorsContainer: (base) => ({
                ...base,
                ...(showIndicatorAtTop
                  ? { 
                      position: "absolute",
                      right: "0px",
                    }
                  : {}),
              }),
              valueContainer: (base) => ({
                ...base,
                maxHeight: "250px",
                overflowY: "auto",
              }),
          }}
            isClearable={false}
            closeMenuOnSelect={!isMulti}
            classNamePrefix={customeClassName}
            isSearchable={isSearchable}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (e) => DropdownIndicator(e),
              ...Components,
            }}
            getOptionLabel={(option) => {
              const label = optionLabel ? option[optionLabel] : option.label;
              return (
                <>
                  {option?.image && affilatedAllow ? (
                    <div className={classes.optionSelect}>
                      <div>
                        <ProfilePhoto
                          photo={option?.image}
                          profilePhotoDimensions={
                            option?.profilePhotoDimensions
                          }
                          className={classes.profileImage}
                        />
                      </div>
                      <div>
                        <p className={classes.name}>{label}</p>

                        <p className={classes.location}>
                          <IoLocationOutline /> {option?.address || "N/A"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    label
                  )}
                </>
              );
            }}
            getOptionValue={(option) =>
              optionValue ? option[optionValue] : option.value
            }
            filterOption={(option, input) => {
              if (!input) return true;
              // let labelText = option[optionLabel] || option.label || "";
              // if (React.isValidElement(labelText)) {
              //   labelText = labelText.props.children;
              // }
              let labelText = extractTextFromElement(
                option.label || option[optionLabel] || ""
              );
              return labelText
                ?.trim()
                ?.toLowerCase()
                ?.startsWith(input.toLowerCase());
            }}
            // filterOption={({ label, value, data }, input) => {
            //   if (!input) return true;
            //   // Assuming labels are strings, compare the first character of the label and input, case-insensitive
            //   return label.toLowerCase().startsWith(input.toLowerCase());
            // }}
            {...props}
          />
        )}
        {leftIcon && <div className={classes.leftIconBox}>{leftIcon}</div>}
        {error && (
          <p className={`mt-1 ${[classes.errorText].join(" ")}`}>
            {errorText ? errorText : label + " is required"}
          </p>
        )}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  labelTwo: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.object.isRequired,
  setter: PropTypes.object,
  disabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  customStyle: PropTypes.object,
  style: PropTypes.object,
  Components: PropTypes.object,
  labelClassName: PropTypes.string,
};

DropDown.defaultProps = {
  placeholder: "sdsad",
  isCustomAllow: false,
  value: "aaaa",
  disabled: false,
  isMulti: false,
  options: [],
  Components: {},
};
