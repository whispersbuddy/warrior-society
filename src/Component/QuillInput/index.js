import React from "react";
import ReactQuill from "react-quill";
import classes from "./QuillInput.module.css";

function QuillInput({
  value,
  setter,
  quillClass = "",
  placeholder = "",
  label,
}) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <>
      {label && <label className={classes.label}>{label}</label>}
      <div className={classes.quillInput}>
        <ReactQuill
          className={`${classes.quill} ${quillClass}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setter(e)}
          modules={modules}
        />
      </div>
    </>
  );
}

export default QuillInput;
