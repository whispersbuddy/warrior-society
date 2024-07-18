import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import classes from "./Calender.module.css";
export default function Calender({
  setter,
  placeholder = "date",
  calenderLabel,
  value,
  disabled,
  labelIcon,
  minValue = false,
  maxValue = false,
  error,
  errorText,
}) {
  return (
    <>
      <style jsx>{`
        .MuiOutlinedInput-notchedOutline {
          border: none !important;
        }
        .MuiFormControl-root {
          width: 100% !important;
          position: relative;
          border-radius: 8px;
          border: 1.5px solid ${error ? "red" : "var(--main-color)"};
          overflow: hidden;
        }
        .MuiInputBase-root {
          height: 51px !important;
        }
        .MuiCalendarPicker-root,
        .MuiPickersPopper-root {
          z-index: 9999 !important;
        }
      `}</style>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className={classes.calenderLabel}>
          {labelIcon} {calenderLabel}
        </p>
        <DatePicker
          minDate={minValue ? dayjs() : undefined}
          maxDate={maxValue ? dayjs() : undefined}
          disabled={disabled}
          placeholder={calenderLabel}
          value={value ? dayjs(value) : null}
          className={classes.calender}
          onChange={(newValue) => {
            setter(newValue);
          }}
          inputRef={(e) => {
            if (e) {
              e.placeholder = placeholder;
            }
          }}
        />
        {error && (
          <p className={`mt-1 ${[classes.errorText].join(" ")}`}>
            {errorText ? errorText : calenderLabel + " is required"}
          </p>
        )}
      </LocalizationProvider>
    </>
  );
}
