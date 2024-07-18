import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Get } from "../../../Axios/AxiosFunctions";
import { Input } from "../../../Component/Input/Input";
import NoData from "../../../Component/NoData/NoData";
import ProfilePhoto from "../../../Component/ProfilePhoto";
import UserSkeleton from "../../../Component/UserSkeleton";
import useDebounce from "../../../CustomHooks/useDebounce";
import { BaseURL } from "../../../config/apiUrl";
import classes from "./TagPeople.module.css";
const records = 2000;
const filterInitialObject = {
  discipline: [],
  amenities: [],
  location: [],
  distance: null,
};
const TagPeople = ({ tags, setTags, setTagsModal }) => {
  const { access_token } = useSelector((state) => state.authReducer);
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const apiUrl = BaseURL(
      `profile/getFollowersAndFollowing?type=followers&limit=${records}&search=${debounceValue}`
    );
    setIsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response) {
      setUsers(response?.data?.data?.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, [debounceValue]);

  return (
    <>
      <div className={classes.tagsPeople}>
        <div className={classes.backIcon}>
          <FaArrowLeft onClick={() => setTagsModal(false)} />
        </div>
        <div className={classes.tagSearch}>
          <Input value={search} setter={setSearch} placeholder={"Search"} />
        </div>
        {tags?.length > 0 && (
          <div className={classes.tagsContainer}>
            {tags?.map((user) => (
              <div className={classes.tagUser}>
                <ProfilePhoto
                  photo={user?.photo}
                  profilePhotoDimensions={user?.profilePhotoDimensions}
                  className={classes.tagProfile}
                />
                <span
                  className={classes.crossIcon}
                  onClick={() => {
                    setTags(tags.filter((tag) => tag?._id !== user?._id));
                  }}
                >
                  <RxCross2 />
                </span>
              </div>
            ))}
          </div>
        )}
        <div className={classes.usersContainer}>
          {isLoading ? (
            <UserSkeleton records={10} />
          ) : users?.length > 0 ? (
            users?.map((user) => {
              const alreadyTagged = tags.find((item) => item?._id === user._id);
              return (
                <div className={classes.user}>
                  <div
                    className={[
                      classes.checkBox,
                      alreadyTagged && classes.active,
                    ].join(" ")}
                    onClick={() => {
                      if (alreadyTagged) {
                        setTags(tags.filter((tag) => tag?._id !== user._id));
                      } else {
                        setTags([...tags, user]);
                      }
                    }}
                  >
                    <FaCheck />
                  </div>
                  <div className={classes.userContent}>
                    <div>
                      <ProfilePhoto
                        photo={user?.photo}
                        profilePhotoDimensions={user?.profilePhotoDimensions}
                        className={classes.profileImg}
                      />
                    </div>
                    <p className={classes.userName}>
                      {user?.firstName + " " + user?.lastName}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <NoData text="No results found" />
          )}
        </div>
      </div>
    </>
  );
};

export default TagPeople;
