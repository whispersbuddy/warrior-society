import React from "react";
import { BiSearch } from "react-icons/bi";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import classes from "./SearchInput.module.css";

function SearchInput({
  value,
  setter,
  placeholder = "Search",
  customStyle = {
    height: "43px",
    border: "1px solid #2A353D",
    borderRadius: "3px",
    width: "280px",
    padding: "0px",
  },
  inputStyle = {
    padding: "8px 14px",
    fontSize: "14px",
  },
  customClass,
  btnClick,
  isBtn = true,
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Input
        customClass={customClass}
        setter={setter}
        value={value}
        customStyle={customStyle}
        inputStyle={inputStyle}
        placeholder={placeholder}
      />
      {isBtn && (
        <Button
          label={
            <div className={classes.searchDiv}>
              <span className={classes.searchBtnLabel}>Search</span>{" "}
              <BiSearch size={18} />
            </div>
          }
          className={classes.btnClass}
          onClick={btnClick}
        />
      )}
    </div>
  );
}

export default SearchInput;
