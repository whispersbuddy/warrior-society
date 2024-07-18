import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../Component/Button/Button";
import { DropDown } from "../../Component/DropDown/DropDown";
import ModalSkeleton from "../ModalSkeleton";
import classes from "./MoveToAlbum.module.css";
const MoveToAlbum = ({
  show,
  setShow,
  data,
  loading,
  handleSubmit,
  albums,
}) => {
  const [toAlbum, setToAlbum] = useState(null);
  const handleClick = async () => {
    if (!toAlbum) {
      return toast.error("Please select album");
    }
    const params = {
      from: data?._id,
      to: toAlbum?._id,
    };
    await handleSubmit(params);
  };
  return (
    <>
      <ModalSkeleton
        show={show}
        setShow={setShow}
        header={"Move To Album"}
        width={"700px"}
      >
        <div className={classes.album_field}>
          <DropDown
            setter={setToAlbum}
            value={toAlbum}
            placeholder={"Select Album"}
            label={"Album"}
            options={albums?.filter((ele) => {
                if(ele?._id == data?._id){
                    return false;
                } else if (ele?.isDefault){
                    return false;
                }
                return true;
            })}
            optionLabel={"name"}
            optionValue={"_id"}
          />
        </div>
        <div className={classes.submitBtn}>
          <Button
            label={loading ? "Submitting..." : "Submit"}
            onClick={handleClick}
            disabled={loading}
          />
        </div>
      </ModalSkeleton>
    </>
  );
};

export default MoveToAlbum;
