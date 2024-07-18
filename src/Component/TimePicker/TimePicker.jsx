import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { TbExclamationCircle } from "react-icons/tb";
import Tooltip from "../Tooltip";
import classes from "./TimePicker.module.css";

const today = dayjs();
const todayEndOfTheDay = today.endOf("day");

export default function CustomTimePicker({
  setter,
  value,
  dateLabel,
  disabled = false,
  tooltipText,
  tooltipClassName,
  toottipIcon = (
    <TbExclamationCircle size={18} color={"var(--primary-color)"} />
  ),
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
          border: 1.5px solid var(--main-color);
          overflow: hidden;
        }
        .MuiInputBase-root {
          height: 48px !important;
        }
        .MuiCalendarPicker-root,
        .MuiPickersPopper-root {
          z-index: 9999 !important;
        }
      `}</style>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <p className={classes.labelText}>
          {dateLabel}
          {tooltipText && (
            <Tooltip
              className={[tooltipClassName && tooltipClassName].join(" ")}
              icon={toottipIcon}
            >
              <span>{tooltipText}</span>
            </Tooltip>
          )}
        </p>
        <TimePicker
          defaultValue={todayEndOfTheDay}
          disableFuture
          placeholder={dateLabel}
          value={value}
          onChange={(newValue) => {
            setter(newValue);
          }}
          renderInput={(params) => (
            <TextField
              InputLabelProps={{ shrink: false }}
              onKeyDown={(e) => e.preventDefault()}
              placeholder={dateLabel}
              {...params}
            />
          )}
          disabled={disabled}
        />
      </LocalizationProvider>
    </>
  );
}
