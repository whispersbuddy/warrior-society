import React from "react";
import classes from "./CustomPhoneInput.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomPhoneInput = ({
  value,
  setter,
  placeholder = "Phone",
  disabled,
  label,
  customClass,
  labelLeftIcon,
  error,
  errorText,
}) => {
  return (
    <>
      <style>{`
    .react-tel-input .flag-dropdown{
      border: ${
        error ? "1.5px solid red" : "1.5px solid var(--main-color)"
      } !important;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
   
    `}</style>
      <div className={customClass && customClass}>
        {label && (
          <p
            className={[
              classes.phoneLabel,
              disabled && classes.labelDisabled,
            ].join(" ")}
          >
            {labelLeftIcon && labelLeftIcon}
            {label}
          </p>
        )}
        <PhoneInput
          inputClass={[classes.phoneInput, error && classes.errorInput].join(
            " "
          )}
          containerClass={[classes.phoneInputContainer]}
          placeholder={placeholder}
          enableSearch={true}
          country={"us"}
          value={value}
          onChange={(phone) => {
            setter(phone);
          }}
          disabled={disabled}
          inputStyle={{
            ...(disabled && { background: "var(--disabled-input-color)" }),
          }}
        />
        {error && (
          <p className={`mt-1 ${[classes.errorText].join(" ")}`}>
            {errorText ? errorText : label + " is required"}
          </p>
        )}
      </div>
    </>
  );
};

export default CustomPhoneInput;
