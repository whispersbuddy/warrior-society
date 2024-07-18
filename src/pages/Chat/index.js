import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft, BsChevronLeft } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Get, Patch } from "../../Axios/AxiosFunctions";
import { Button } from "../../Component/Button/Button";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import NoData from "../../Component/NoData/NoData";
import PaginationComponent from "../../Component/PaginationComponent";
import ProfilePhoto from "../../Component/ProfilePhoto";
import SearchInput from "../../Component/SearchInput";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import useDebounce from "../../CustomHooks/useDebounce";
import { BaseURL, apiHeader, apiUrl, imageUrl } from "../../config/apiUrl";
import classes from "./Chat.module.css";

let recordsLimit = 30;

const SendInput = ({ sendMsg, scrollToBottom }) => {
  const [messageText, setMessageText] = useState("");
  return (
    <div className={classes.chatInput_box}>
      <input
        onKeyDown={async (e) => {
          if (e.key == "Enter") {
            await sendMsg(messageText);
            await scrollToBottom();
            setMessageText("");
          }
        }}
        type="text"
        placeholder="Type Your Message Here..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className={classes.__input}
      />
      <div className={classes.input_icon}>
        <span
          onClick={async () => {
            await sendMsg(messageText);
            await scrollToBottom();
            setMessageText("");
          }}
          className={classes.snd_btn}
        >
          <RiSendPlaneFill
            className={classes.send_icon}
            size={24}
            color={"var(--white-color)"}
          />
        </span>
      </div>
    </div>
  );
};

const RenderChat = ({ item, userData }) => {
  const decideChatUser = item?.message?.user?._id == userData?._id;
  return (
    <>
      {decideChatUser ? (
        <div className={[classes.chatBoxMe].join(" ")}>
          <div className={classes.chatStyling}>
            <p>{item?.message?.text}</p>
          </div>
          <ProfilePhoto
            photo={item?.message?.user?.avatar}
            profilePhotoDimensions={item?.message?.user?.profilePhotoDimensions}
            className={classes.imgBox}
          />
          <p className={classes.dateTime}>
            <span>{moment(item?.createdAt)?.fromNow()}</span>
          </p>
          <p className={classes.name}>{item?.message?.user?.userName}</p>
        </div>
      ) : (
        <div className={[classes.chatBox].join(" ")}>
          <ProfilePhoto
            photo={item?.message?.user?.avatar}
            profilePhotoDimensions={item?.message?.user?.profilePhotoDimensions}
            className={classes.imgBox}
          />
          <div className={classes.chatStyling}>
            <p>{item?.message?.text}</p>
          </div>
          <p className={classes.dateTime}>
            <span>{moment(item?.createdAt)?.fromNow()}</span>
          </p>
          <p className={classes.name}>{item?.message?.user?.username}</p>
        </div>
      )}
    </>
  );
};

const RoomBox = ({
  item,
  selectedRoom,
  setSelectedRoom,
  setChatsPage,
  setChatsData,
  setRoomsData,
}) => {
  const userData = useSelector((state) => state?.authReducer?.user);
  const decideRoomUser = item?.users?.find(
    (e) => e?.userId?._id !== userData?._id
  )?.userId;
  const { unreadCount } = item?.users?.find(
    (e) => e?.userId?._id == userData?._id
  ) ?? { unreadCount: 0 };
  let upadatedUsers = JSON.parse(JSON.stringify(item?.users));
  upadatedUsers?.forEach((item) => {
    if (item?.userId?._id === userData?._id) {
      item.unreadCount = 0;
    }
  });

  return (
    <div
      className={[
        classes.roomBox,
        selectedRoom?._id == item?._id && classes.activeRoomBox,
      ].join(" ")}
      onClick={() => {
        if (selectedRoom?._id !== item?._id) {
          setChatsPage(1);
          setChatsData([]);
          setSelectedRoom(item);
        }
        setRoomsData((prev) => {
          const updatedRoomLastMessage = prev?.map((innerItem) => {
            if (innerItem?._id == item?._id) {
              return {
                ...innerItem,
                users: upadatedUsers,
              };
            }
            return innerItem;
          });

          return updatedRoomLastMessage;
        });
      }}
      style={{
        background: selectedRoom?._id == item?._id && "var(--secondary-color)",
      }}
    >
      <div>
        <ProfilePhoto
          photo={decideRoomUser?.photo}
          profilePhotoDimensions={decideRoomUser?.profilePhotoDimensions}
          className={classes.img}
        />
      </div>
      <div className={classes.details}>
        <p className={classes.name}>
          {decideRoomUser?.firstName} {decideRoomUser?.lastName}
        </p>
        <p className={classes.text}>
          {item?.lastMessage
            ? `${item?.lastMessage?.text?.slice(0, 20)}...`
            : "No Message"}
        </p>
      </div>
      {item?.lastMessage && (
        <div className={classes.date}>
          <p>{moment(item?.lastMessage?.updatedAt).format("hh:mm a")}</p>
        </div>
      )}
      {unreadCount > 0 && (
        <div className={classes.unreadCount}>{unreadCount}</div>
      )}
    </div>
  );
};

const RenderRoom = ({
  roomsData,
  roomsLoading,
  selectedRoom,
  setSelectedRoom,
  roomsPage,
  roomsTotalCount,
  setRoomsPage,
  search,
  setSearch,
  setChatsPage,
  setChatsData,
  setRoomsData,
  setMessageRequestToggle,
  messageRequestToggle,
  onReqeust,
  allRequest,
  messageRequestLoader,
  getAllRooms,
}) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.authReducer?.user);
  return (
    <div className={classes.roomWrapper}>
      <div className={classes.roomHeader}>
        <h4>{messageRequestToggle ? "Requests" : "Messages"}</h4>
        <p onClick={() => setMessageRequestToggle(!messageRequestToggle)}>
          Message Requests
        </p>
      </div>

      {!messageRequestToggle ? (
        <>
          <div className={classes.searchInputDiv}>
            <SearchInput
              isBtn={false}
              value={search}
              setter={setSearch}
              placeholder={"Search"}
              customStyle={{ width: "100%", boxShadow: "none" }}
              inputStyle={{
                border: "1px solid var(--main-color)",
                padding: "8px",
              }}
            />
          </div>
          <div className={classes.__list}>
            {roomsLoading ? (
              <Loader />
            ) : roomsData?.length > 0 ? (
              roomsData?.map((item, i) => {
                return (
                  <RoomBox
                    item={item}
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    setChatsPage={setChatsPage}
                    setChatsData={setChatsData}
                    setRoomsData={setRoomsData}
                    key={i}
                  />
                );
              })
            ) : (
              <NoData text="No Chats Found" />
            )}
          </div>
          {roomsData?.length > 0 && (
            <div className={classes.pagination}>
              <PaginationComponent
                totalPages={Math.ceil(roomsTotalCount / recordsLimit)}
                setCurrentPage={setRoomsPage}
                currentPage={roomsPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className={classes.request__wrapper}>
          <p
            onClick={() => {
              setMessageRequestToggle(false);
              getAllRooms();
            }}
          >
            <BsArrowLeft cursor={"pointer"} size={20} />
          </p>
          {allRequest?.length == 0 ? (
            <NoData text="No request found!" />
          ) : (
            allRequest?.map((ele) => {
              return (
                <div className={classes.request__wrapper__inner}>
                  <img
                    src={imageUrl(ele?.lastMessage?.user?.avatar)}
                    className={classes.reqImg}
                    onClick={() => {
                      let findUser =
                        ele?.users?.find(
                          (e) => e?.userId?._id !== userData?._id
                        )?.userId?.slug || "";
                      if (findUser !== "") navigate(`/profile/${findUser}`);
                    }}
                  />
                  <p>
                    <span>
                      <span>{ele?.lastMessage?.user?.username}</span> has sent
                      you a message request
                    </span>
                  </p>
                  <div>
                    <span
                      style={
                        messageRequestLoader ? { pointerEvents: "none" } : {}
                      }
                      onClick={() => onReqeust("rejected", ele?._id)}
                    >
                      <RxCross2 />
                    </span>
                    <span
                      style={
                        messageRequestLoader ? { pointerEvents: "none" } : {}
                      }
                      onClick={() => onReqeust("accepted", ele?._id)}
                    >
                      <FaCheck />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

const RenderChats = ({
  selectedRoom,
  chatsData,
  chatsLoading,
  chatsPage,
  chatsTotalCount,
  setChatsPage,
  isMobile,
  scrollToBottom,
  sendMsg,
  msgEndRef,
  getAllChats,
  setSelectedRoom,
}) => {
  const userData = useSelector((state) => state?.authReducer?.user);
  const decideRoomUser = selectedRoom?.users?.find(
    (e) => e?.userId?._id !== userData?._id
  )?.userId;
  return (
    <div className={classes.chatWrapper}>
      <div className={classes.chatHeader}>
        {isMobile && (
          <BsChevronLeft
            onClick={() => setSelectedRoom(null)}
            size={30}
            color={"var(--white-color)"}
          />
        )}
        <div className={classes.userDetails}>
          <ProfilePhoto
            photo={decideRoomUser?.photo}
            profilePhotoDimensions={decideRoomUser?.profilePhotoDimensions}
            className={classes.img}
          />
          <div>
            <p className={classes.product}>
              {decideRoomUser?.firstName} {decideRoomUser?.lastName}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.chatBody}>
        {!chatsLoading &&
          chatsTotalCount > 1 &&
          chatsTotalCount >= chatsPage && (
            <div className={classes.loadMoreBtnDiv}>
              <Button
                label={"Load More"}
                className={classes.loadMoreBtn}
                onClick={() => {
                  const incPage = ++chatsPage;
                  getAllChats(incPage);
                  setChatsPage(incPage);
                }}
              />
            </div>
          )}
        {chatsLoading ? (
          <Loader />
        ) : chatsData?.length > 0 ? (
          chatsData?.map((item, i) => {
            return <RenderChat item={item} userData={userData} key={i} />;
          })
        ) : (
          <NoData text={"No Messages"} />
        )}
      </div>
      <div className={classes.chatFooter}>
        <SendInput sendMsg={sendMsg} scrollToBottom={scrollToBottom} />
      </div>
      <div ref={msgEndRef} />
    </div>
  );
};

export default function Chat() {
  const { access_token, user } = useSelector((state) => state?.authReducer);
  const roomDataFromLocation = useLocation()?.state;
  const socket = useRef(null);
  const msgEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  // room and chat data state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomsData, setRoomsData] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [chatsData, setChatsData] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messageRequestToggle, setMessageRequestToggle] = useState(false);
  const [messageRequestLoader, setMessageRequestLoader] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  // pagination state
  const [roomsPage, setRoomsPage] = useState(1);
  const [roomsTotalCount, setRoomsTotalCount] = useState(1);
  const [chatsPage, setChatsPage] = useState(1);
  const [chatsTotalCount, setChatsTotalCount] = useState(1);

  // search for room
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 500);

  function scrollToBottom() {
    msgEndRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  const getAllRooms = async (page = roomsPage) => {
    const apiUrl = BaseURL(
      `chats?page=${page}&limit=${recordsLimit}&search=${debounceSearchTerm}&privacy=all`
    );
    setRoomsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setRoomsData(response?.data?.data);
      setRoomsTotalCount(response?.data?.totalCount);
    }
    setRoomsLoading(false);
  };

  const getAllChats = async (page = chatsPage) => {
    const apiUrl = BaseURL(
      `chats/messages/${selectedRoom?._id}?page=${page}&limit=${recordsLimit}`
    );
    page == 1 && setChatsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setChatsData([...chatsData, ...response?.data?.data]);
      setChatsTotalCount(Math.ceil(response?.data?.count / recordsLimit));
    }
    page == 1 && setChatsLoading(false);
    page == 1 && scrollToBottom();
  };

  const getAllRequests = async () => {
    const apiUrl = BaseURL(`chats?privacy=none`);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setAllRequest(response?.data?.data);
    }
  };
  useEffect(() => {
    getAllRequests();
  }, []);

  const handleRequest = async (status, roomId) => {
    const apiUrl = BaseURL(`chats/request`);
    setMessageRequestLoader(true);
    const response = await Patch(
      apiUrl,
      { roomId: roomId, privacy: status },
      apiHeader(access_token)
    );
    if (response !== undefined) {
      toast.success("Request Accepted Successfully");
      if (status == "accepted") {
        setSelectedRoom(response?.data?.data);
      }
      setAllRequest(
        allRequest?.filter((e) => e?._id !== response?.data?.data?._id)
      );
      setMessageRequestToggle(false);
      getAllRooms();
    }
    setMessageRequestLoader(false);
  };

  const sendMsg = (e) => {
    if (e == "") {
      return;
    }

    const msg = {
      from: user?._id,
      message: {
        text: e,
        user: {
          _id: user?._id,
          avatar: user?.photo,
          userName: `${user.firstName} ${user.lastName}`,
          profilePhotoDimensions: user?.profilePhotoDimensions,
        },
      },
      createdAt: moment().format(),
    };
    const newData = [...chatsData];
    newData.unshift({ ...msg, roomId: selectedRoom?._id });
    setChatsData(newData);
    socket.current?.emit("msg", {
      ...msg,
      roomId: selectedRoom?._id,
    });
    setRoomsData((pre) => {
      const roomIndex = pre?.findIndex(
        (innerItem) => innerItem?._id === selectedRoom?._id
      );
      if (roomIndex !== -1) {
        const updatedRoom = {
          ...pre[roomIndex],
          lastMessage: msg.message,
          createdAt: msg.createdAt,
        };
        const updatedRoomsData = [
          updatedRoom,
          ...pre.slice(0, roomIndex),
          ...pre.slice(roomIndex + 1),
        ];
        return updatedRoomsData;
      } else {
        return [...pre];
      }
    });

    return;
  };

  useEffect(() => {
    isMobileViewHook(setIsMobile, 1024);
    socket.current = io(apiUrl, { transports: ["websocket"] });
  }, []);

  useEffect(() => {
    getAllRooms(1);
  }, [debounceSearchTerm]);

  useEffect(() => {
    if (selectedRoom !== null) {
      getAllChats();
      socket.current?.emit("chatJoin", {
        userId: user?._id,
        roomId: selectedRoom?._id,
      });
      socket.current?.emit("mark-as-read", {
        roomId: selectedRoom?._id,
        userId: user?._id,
      });
      socket.current?.on("msg", (msg, room, wholeRoom) => {
        if (
          selectedRoom?._id == room &&
          msg?.message?.user?._id !== user?._id
        ) {
          setChatsData((prev) => [msg, ...prev]);
          socket.current?.emit("mark-as-read", {
            roomId: selectedRoom?._id,
            userId: user?._id,
          });
          scrollToBottom();
        }
        if (wholeRoom) {
          setRoomsData((pre) => {
            // Check if the room is already in the roomsData array
            const roomIndex = pre?.findIndex(
              (innerItem) => innerItem?._id === wholeRoom?._id
            );
            if (roomIndex !== -1) {
              // Room found, update the last message and users
              const updatedRoom = {
                ...pre[roomIndex],
                lastMessage: wholeRoom?.lastMessage,
                users: wholeRoom?.users,
              };
              // Move the updated room to the beginning of the array
              const updatedRoomsData = [
                updatedRoom,
                ...pre.slice(0, roomIndex),
                ...pre.slice(roomIndex + 1),
              ];
              return updatedRoomsData;
            } else {
              // Room not found, return the original array
              return [...pre];
            }
          });
        }
      });
    }

    return () => {
      socket?.current?.off("msg");
    };
  }, [selectedRoom]);

  // For Location Room
  useEffect(() => {
    if (roomDataFromLocation) {
      setSelectedRoom(roomDataFromLocation);
    }
  }, [roomDataFromLocation]);

  return (
    <>
      <NewsFeedHeader />
      <main className={classes.main}>
        <div className={classes.content}>
          <Container fluid>
            <Row>
              {isMobile ? (
                selectedRoom == null ? (
                  <Col>
                    <RenderRoom
                      roomsData={roomsData}
                      roomsLoading={roomsLoading}
                      setSelectedRoom={setSelectedRoom}
                      selectedRoom={selectedRoom}
                      roomsPage={roomsPage}
                      roomsTotalCount={roomsTotalCount}
                      setRoomsPage={setRoomsPage}
                      setSearch={setSearch}
                      search={search}
                      setChatsPage={setChatsPage}
                      setChatsData={setChatsData}
                      setRoomsData={setRoomsData}
                      setMessageRequestToggle={setMessageRequestToggle}
                      messageRequestToggle={messageRequestToggle}
                      onReqeust={handleRequest}
                      allRequest={allRequest}
                      messageRequestLoader={messageRequestLoader}
                      getAllRooms={getAllRooms}
                    />
                  </Col>
                ) : (
                  <Col>
                    <RenderChats
                      selectedRoom={selectedRoom}
                      chatsData={chatsData}
                      chatsLoading={chatsLoading}
                      chatsPage={chatsPage}
                      chatsTotalCount={chatsTotalCount}
                      setChatsPage={setChatsPage}
                      isMobile={isMobile}
                      sendMsg={sendMsg}
                      scrollToBottom={scrollToBottom}
                      msgEndRef={msgEndRef}
                      getAllChats={getAllChats}
                      setSelectedRoom={setSelectedRoom}
                    />
                  </Col>
                )
              ) : (
                <>
                  <Col lg={4}>
                    <RenderRoom
                      roomsData={roomsData}
                      roomsLoading={roomsLoading}
                      setSelectedRoom={setSelectedRoom}
                      selectedRoom={selectedRoom}
                      roomsPage={roomsPage}
                      roomsTotalCount={roomsTotalCount}
                      setRoomsPage={setRoomsPage}
                      setSearch={setSearch}
                      search={search}
                      setChatsPage={setChatsPage}
                      setChatsData={setChatsData}
                      setRoomsData={setRoomsData}
                      setMessageRequestToggle={setMessageRequestToggle}
                      messageRequestToggle={messageRequestToggle}
                      onReqeust={handleRequest}
                      allRequest={allRequest}
                      messageRequestLoader={messageRequestLoader}
                      getAllRooms={getAllRooms}
                    />
                  </Col>
                  <Col lg={8}>
                    {selectedRoom ? (
                      <RenderChats
                        selectedRoom={selectedRoom}
                        chatsData={chatsData}
                        chatsLoading={chatsLoading}
                        chatsPage={chatsPage}
                        chatsTotalCount={chatsTotalCount}
                        setChatsPage={setChatsPage}
                        isMobile={isMobile}
                        sendMsg={sendMsg}
                        scrollToBottom={scrollToBottom}
                        msgEndRef={msgEndRef}
                        getAllChats={getAllChats}
                      />
                    ) : (
                      <div className={classes.chat_main}>
                        <NoData text="No Chats Selected" />
                      </div>
                    )}
                  </Col>
                </>
              )}
            </Row>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
