import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Post } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import { Checkbox } from "../../Component/Checkbox/Checkbox";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Input } from "../../Component/Input/Input";
import { Loader } from "../../Component/Loader";
import Maps from "../../Component/MapAndPlaces";
import NoData from "../../Component/NoData/NoData";
import PaginationComponent from "../../Component/PaginationComponent";
import RangeInput from "../../Component/RangeInput";
import UserCard from "../../Component/UserCard";
import useDebounce from "../../CustomHooks/useDebounce";
import { disciplineOptions } from "../../config/Data";
import { BaseURL, apiHeader, recordsLimit } from "../../config/apiUrl";
import classes from "./SearchUsers.module.css";
const filterInitialObject = {
  discipline: [],
  amenities: [],
  location: [],
  distance: null,
};
const SearchUsers = () => {
  const navigate = useNavigate();
  const { access_token: accessToken } = useSelector(
    (state) => state.authReducer
  );
  const {
    publicFields: { equipment: equipmentOptions },
  } = useSelector((state) => state.commonReducer);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState(filterInitialObject);
  const searchText = useLocation()?.state?.search;

  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [search, setSearch] = useState(searchText || "");
  const [loading, setLoading] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [page, setPage] = useState(1);
  const debounceValue = useDebounce(search, 300);
  const getUsers = async (pgNo = page, filterData = filter) => {
    const apiUrl = BaseURL(
      `users/getAllUser?page=${pgNo}&limit=${recordsLimit}&search=${search}`
    );
    const params =
      filterData?.location?.length == 0
        ? { ...filterData, distance: null }
        : filterData;
    setLoading(true);
    const response = await Post(apiUrl, params, apiHeader(accessToken));
    if (response !== undefined) {
      setUsers(response?.data?.data?.user);
      setTotalCount(response?.data?.data?.totalCount?.value);
    }
    setLoading(false);
  };
  useEffect(() => {
    setPage(1);
    getUsers(1, filter);
  }, [debounceValue]);
  const followBeforeApiCall = (item) => {};

  const handleFollow = async (item) => {
    setUsers((prev) => {
      return prev?.map((ele) =>
        ele?._id === item?._id ? { ...ele, requested: !ele?.requested } : ele
      );
    });
    const apiUrl = BaseURL(`profile/followUser`);
    setIsApiCall(true);
    const response = await Post(
      apiUrl,
      { followerID: item?._id, requested: !item?.requested },
      apiHeader(accessToken)
    );
    if (response !== undefined) {
      setUsers((prev) => {
        return prev?.map((ele) =>
          ele?._id === item?._id ? response?.data?.data : ele
        );
      });
    } else {
      setUsers((prev) => {
        return prev?.map((ele) =>
          ele?._id === item?._id ? { ...ele, requested: !ele?.requested } : ele
        );
      });
    }
    setIsApiCall(false);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (window.innerWidth < 768) {
      if (isFilterOpen) html.style.overflow = "hidden";
      else html.style.overflow = "visible";
    }
    return () => {
      html.style.overflow = "";
    };
  }, [isFilterOpen, window.innerWidth]);

  // clear filter
  const clearFilter = () => {
    setFilter(filterInitialObject);
    setAddressDetail("");
    setLocation("");
    setCoordinates("");
    setPage(1);
    getUsers(1, filterInitialObject);
  };
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      navigate("/users", { state: null });
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        navigate("/users", { state: null });
      });
    };
  }, []);

  return (
    <>
      {/* <Header /> */}
      {/* <AfterLoginHeader /> */}
      <NewsFeedHeader />
      <div className={classes.usersContainer}>
        <Container>
          <div className={classes.header}>
            <Input
              leftIcon={
                <HiMiniMagnifyingGlass size={24} className={classes.search} />
              }
              value={search}
              setter={setSearch}
              placeholder="Search by Name"
              inputStyle={{
                border: "1px solid #19275D",
              }}
            />
          </div>
          <div
            className={`${classes.search__wrapper} ${
              isFilterOpen ? classes.open : ""
            }`}
          >
            {!isFilterOpen && (
              <div
                className={classes.backBtn}
                onClick={() => setFilterOpen((prev) => !prev)}
                title="Open Filters"
              >
                <GoSidebarExpand size={26} />
              </div>
            )}
            <div className={classes.cards__wrapper}>
              {loading ? (
                <Loader />
              ) : (
                <Row>
                  {users?.length === 0 ? (
                    <NoData />
                  ) : (
                    <Col lg={12}>
                      <div className={classes.__cards}>
                        {users?.map((item, index) => (
                          <UserCard
                            isApiCall={isApiCall}
                            onFollow={() => handleFollow(item)}
                            user={item}
                          />
                        ))}
                      </div>
                    </Col>
                  )}
                </Row>
              )}
            </div>
            <div
              className={`${classes.filter__wrapper} ${
                isFilterOpen ? classes.open : ""
              }`}
            >
              {isFilterOpen && (
                <span
                  className={classes.backdrop}
                  onClick={() => setFilterOpen((prev) => !prev)}
                ></span>
              )}
              <div className={classes.filterWrapper}>
                <div className={classes.btnWrappper}>
                  <div className={classes.filterHeaderWrapper}>
                    <p>Filters</p>{" "}
                    <div
                      className={classes.backBtn}
                      onClick={() => setFilterOpen((prev) => !prev)}
                      title="Close Filters"
                    >
                      <GoSidebarCollapse size={26} />
                    </div>
                  </div>
                </div>
                <div className={classes.filterContent}>
                  <style>
                    {`
                        .accordion{
                          --bs-accordion-bg: transparent !important;
                          --bs-accordion-border-color: transparent !important;
                          --bs-accordion-active-bg: transparent !important;
                          --bs-accordion-active-color: var(--white-color) !important;
                          --bs-accordion-border-color: none !important;
                          --bs-accordion-color:var(--white-color);
                          --bs-accordion-btn-color: var(--white-color);
                          --bs-accordion-btn-padding-x: 0;
                          --bs-accordion-btn-padding-y: 0;
                          --bs-accordion-btn-focus-border-color: transparent !imporatant;
                          --bs-accordion-btn-focus-box-shadow: none !important;
                          --bs-accordion-body-padding-y:0;
                          --bs-accordion-body-padding-x:0;
                        }
                        .accordion-button{
                          font-family:var(--ff-kanit-med);
                        }
                        `}
                  </style>
                  <Accordion className={classes.accordianBody}>
                    <Accordion.Item eventKey={"location"}>
                      <Accordion.Header className={classes.accordianHeader}>
                        Location
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className={classes.location__dropdowns}>
                          <Maps
                            address={location}
                            setAddress={setLocation}
                            setCoordinates={(e) => {
                              setCoordinates(e);
                              setFilter((prev) => ({
                                ...prev,
                                location: e ? [e?.lng, e?.lat] : [],
                              }));
                            }}
                            setPlaceDetail={(e) => {
                              setAddressDetail(e);
                            }}
                            type="Places"
                            placeholder="Select Location"
                            className={classes["map-container"]}
                            loader={
                              <Input
                                placeholder={"Select Location"}
                                type={"text"}
                                className={classes.mapContainer}
                              />
                            }
                            placeClass={classes.placeInput}
                          />
                        </div>
                        {addressDetail && (
                          <div className={classes.city__count}>
                            <div>
                              <label>Country</label>
                              <p>{addressDetail?.country}</p>
                            </div>
                            <div>
                              <label>City</label>
                              <p>{addressDetail?.city}</p>
                            </div>
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey={"Distance"}>
                      <Accordion.Header className={classes.accordianHeader}>
                        Distance
                      </Accordion.Header>
                      <Accordion.Body>
                        <div
                          className={`${classes.white_box} ${classes.__distance}`}
                        >
                          <p>Distance</p>
                          <RangeInput
                            value={filter["distance"]}
                            onChange={(e) => {
                              setFilter((prev) => ({
                                ...prev,
                                distance: e,
                              }));
                            }}
                            min="0"
                            max="200"
                          />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="Discipline">
                      <Accordion.Header className={classes.accordianHeader}>
                        Discipline
                      </Accordion.Header>
                      <Accordion.Body className={classes.accordianBody}>
                        <ul>
                          {disciplineOptions?.map((e) => (
                            <li>
                              <Checkbox
                                label={e?.value}
                                setValue={(e) => {
                                  setFilter((prev) => ({
                                    ...prev,
                                    discipline: e,
                                  }));
                                }}
                                value={filter["discipline"]}
                                labelStyle={{
                                  textTransform: "capitalize",
                                }}
                                customClass={classes.checkbox}
                              />
                            </li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="Amenities">
                      <Accordion.Header className={classes.accordianHeader}>
                        Amenities
                      </Accordion.Header>
                      <Accordion.Body className={classes.accordianBody}>
                        <ul>
                          {equipmentOptions?.map((e) => (
                            <li>
                              <Checkbox
                                key={e?._id}
                                label={e?.equipmentName}
                                labelStyle={{
                                  color: "#fff",
                                  textTransform: "capitalize",
                                }}
                                isSetId={e?._id}
                                setValue={(e) => {
                                  setFilter((prev) => ({
                                    ...prev,
                                    amenities: e,
                                  }));
                                }}
                                value={filter["amenities"]}
                              />
                            </li>
                          ))}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className={classes.applyFilterBtnDiv}>
                  <Button
                    disabled={loading}
                    customStyle={{
                      backgroundColor: "transparent",
                      color: "var(--main-color)",
                      border: "2px solid var(--main-color)",
                      borderRadius: "100px",
                    }}
                    label={"Clear All"}
                    onClick={() => clearFilter()}
                  />
                  <Button
                    disabled={loading}
                    customStyle={{
                      backgroundColor: "var(--main-color)",
                      color: "#fff",
                      border: "2px solid var(--main-color)",
                      borderRadius: "100px",
                    }}
                    label={"Apply"}
                    onClick={() => {
                      setPage(1);
                      getUsers(1, filter);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.paginationDiv}>
            <PaginationComponent
              totalPages={Math.ceil(totalCount / recordsLimit)}
              currentPage={page}
              setCurrentPage={(e) => {
                setPage(e);
                getUsers(e, filter);
              }}
            />
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SearchUsers;
