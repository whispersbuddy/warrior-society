import React, { useEffect, useRef, useState } from "react";
import classes from "./RangeInput.module.css";

function RangeInput({ value, onChange, min = "0", max = "1000", step = "1" }) {
  const rangeRef = useRef(null);
  const [isOnEnd, setIsOnEnd] = useState(false);
  const [onStart, setOnStart] = useState(false);

  useEffect(() => {
    const range = rangeRef.current;
    const rangeWidth = range.offsetWidth;
    const rangeValue = range.value;
    const thumbWidth = 18; // This is the default width of the thumb in Chrome
    const percent = (rangeValue / range.max) * 100;
    const thumbPosition = percent * (rangeWidth / 100) - thumbWidth / 2;

    const text = range.nextElementSibling;
    text.style.left = `${thumbPosition}px`;

    if (value > 150) {
      setIsOnEnd(true);
    }
    if (value < 10) {
      setOnStart(true);
    }
    if (value > 10) {
      setOnStart(false);
    }
    if (value < 150) {
      setIsOnEnd(false);
    }
  }, [value]);

  return (
    <div className={classes.__wrapper}>
      <div
        className={[
          classes.rangeInputDiv,
          isOnEnd && classes.toEnd,
          onStart && classes.onStart,
        ].join(" ")}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={rangeRef}
          className={classes.rangeInput}
        />
        <span className={classes.rangeInputValue}>{value}Km</span>
      </div>
      <div className={classes.minMaxDiv}>
        <span>{min}Km</span>
        <span>{max}Km</span>
      </div>
    </div>
  );
}

export default RangeInput;
