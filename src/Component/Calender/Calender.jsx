import * as React from "react";
import { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import classes from "./Calender.module.css";
import DateFnsUtils from "@date-io/date-fns";
import { InputAdornment } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

export default function Calender({
  setter,
  placeholder = "date",
  calenderLabel,
  value,
  disabled,
  labelIcon,
  minValue = null,
  maxValue = new Date(),
  error,
  errorText,
  disablePast = false,
}) {
  const [localError, setLocalError] = useState(false);
  const [localErrorText, setLocalErrorText] = useState("");

  const handleDateChange = (newValue) => {
    if (newValue && newValue.toString() === "Invalid Date") {
      setLocalError(true);
      setLocalErrorText("Invalid date selected");
    } else {
      setLocalError(false);
      setLocalErrorText("");
      setter(newValue);
    }
  };

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
          border: 1.5px solid
            ${error || localError ? "red" : "var(--main-color)"};
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <p className={classes.calenderLabel}>
          {labelIcon} {calenderLabel}
        </p>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          placeholder="MM/dd/yyyy"
          margin="none"
          id="date-picker-dialog"
          value={value || null}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          disablePast={disablePast}
          disabled={disabled}
          minDate={new Date('1970-11-11')}
          maxDate={maxValue === true ? new Date() : maxValue}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          inputVariant="outlined"
          error={!!error || localError}
          helperText={
            error || localError
              ? errorText || localErrorText || `${calenderLabel} is required`
              : ""
          }
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
