import React, { useRef, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiRepost, BiSolidSend } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { LuReply } from "react-icons/lu";
import { PiWarningCircleBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  filterShared,
  formatTags,
  getTimeStamp,
} from "../../config/HelperFunction";
import { imageUrl } from "../../config/apiUrl";
import AreYouSureModal from "../../modals/AreYouSureModal";
import ImageSliderModal from "../../modals/ImageSliderModal";
import LikeShareModal from "../../modals/LikeShareModal";
import SharePostModal from "../../modals/SharePostModal";
import UsersViewModal from "../../modals/UsersViewModal";
import { Input } from "../Input/Input";
import PoperComponent from "../PopperComponent";
import ProfilePhoto from "../ProfilePhoto";
import ShowMoreShowLessText from "../ShowMoreShowLess";
import classes from "./PostDetailCard.module.css";
export const thousandToK = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num < 900) {
    return num;
  }
};

export default function PostDetailCard({
  post,
  likePost,
  sharePost,
  onEdit,
  onDel,
  onReport,
  addEditComment,
  deleteComment,
  addEditReply,
  deleteReply,
  actionsLoading,
  handleChangeStatus,
}) {
  const navigate = useNavigate();
  const { user: userData } = useSelector((state) => state.authReducer);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const postOwner = post?.user?._id === userData?._id;
  const sharedPostOwner = post?.originalPost?.user?._id === userData?._id;
  const [indexMap, setIndexMap] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [modalKey, setModalKey] = useState(null);
  const anchorRef = useRef(null);
  const [postActions, setPostActions] = useState({
    show: false,
    loading: false,
  });
  const [taggedUsers, setTaggedUsers] = useState(null);

  const handleActionClick = (flag) => {
    if (flag === "Edit") {
      onEdit();
    } else if (flag === "Delete") {
      onDel();
    } else if (flag === "Report") {
      onReport();
    } else {
      setPostActions({
        ...postActions,
        show: "changeStatus",
      });
    }
  };
  const handleToggle = () => {
    setOpenPopper((prevOpen) => !prevOpen);
  };
  const handleComment = async (comment, postId) => {
    if (actionsLoading === "addComment") return;
    const params = {
      text: comment,
      postId: postId,
      ...(commentId && { commentId }),
    };
    for (let key in params) {
      if (!params[key]) {
        toast.error("Comment cannot be empty");
        return;
      }
    }
    const response = await addEditComment(params);
    if (response) {
      setComment("");
      setCommentId(null);
      setSelectedReply(null);
    }
  };
  const handleReply = async (comment, postId) => {
    const params = {
      text: comment,
      postId,
      commentId,
      ...(replyId && { replyId }),
    };
    for (let key in params) {
      if (!params[key]) {
        toast.error("Comment cannot be empty");
        return;
      }
    }
    const response = await addEditReply(params);
    if (response) {
      setComment("");
      setCommentId(null);
      setReplyId(null);
      setSelectedReply(null);
    }
  };
  const handleDeleteComment = async () => {
    const params = {
      postId: post?._id,
      commentId,
    };
    const response = await deleteComment(params);
    if (response) {
      setCommentId(null);
      setReplyId(null);
      setPostActions({
        ...postActions,
        show: false,
      });
      setSelectedReply(null);
    }
  };
  const handleDeleteReply = async () => {
    const params = {
      postId: post?._id,
      commentId,
      replyId,
    };
    const response = await deleteReply(params);
    if (response) {
      setCommentId(null);
      setPostActions({
        ...postActions,
        show: false,
      });
      setReplyId(null);
      setSelectedReply(null);
    }
  };
  const handleUpdateStatus = async () => {
    const params = {
      postId: post?._id,
      privacy: post?.privacy == "private" ? "public" : "private",
    };
    const response = await handleChangeStatus(params);
    if (response) {
      setPostActions({
        ...postActions,
        show: false,
      });
    }
  };
  return (
    <>
      {" "}
      {post?.originalPost ? (
        <div className={classes.repostCard}>
          <div
            className={classes.headerDiv}
            onClick={() => navigate(`/post/${post?._id}`)}
          >
            <div className={classes.__header}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${post?.user?.slug}`);
                }}
              >
                <ProfilePhoto
                  photo={post?.user?.photo}
                  profilePhotoDimensions={post?.user?.profilePhotoDimensions}
                  className={classes.__avatar}
                />
              </div>
              <div className={classes.__user}>
                <p
                  className={classes.__name}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${post?.user?.slug}`);
                  }}
                >
                  {post?.user?.firstName} {post?.user?.lastName}
                </p>
                <p className={classes.__data}>
                  {getTimeStamp(post?.createdAt)}
                </p>
              </div>
            </div>
            {(postOwner || !post?.reported) && (
              <div className={classes.popperActions}>
                {postOwner ? (
                  <div
                    ref={post?._id == indexMap ? anchorRef : null}
                    id="composition-button"
                    aria-controls={openPopper ? "composition-menu" : undefined}
                    aria-expanded={openPopper ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndexMap(post?._id);
                      setTimeout(() => {
                        handleToggle();
                      }, 100);
                    }}
                    className={classes.threeDotsDiv}
                  >
                    <HiDotsVertical
                      cursor={"pointer"}
                      className={[classes.threeDots]}
                    />
                  </div>
                ) : (
                  <div className={classes.reportDiv}>
                    <FaRegFlag
                      cursor={"pointer"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick("Report");
                      }}
                    />
                    <p className={classes.reportText}>Report</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {post?.description && (
              <div className={classes.__text}>
                <ShowMoreShowLessText
                  text={post?.description}
                  visibility={160}
                />
              </div>
            )}
          </div>
          <Card
            {...post?.originalPost}
            originalPostToHide={
              !post?.originalPost?.isFollowing &&
              post?.originalPost?.privacy == "private" &&
              post?.originalPost?.user?._id !== userData?._id
            }
            userData={userData}
            sharedPostOwner={sharedPostOwner}
            postOwner={postOwner}
            comment={comment}
            setComment={setComment}
            setCommentId={setCommentId}
            setReplyId={setReplyId}
            logInUser={userData}
            likePost={likePost}
            actionsLoading={actionsLoading}
            handleComment={handleComment}
            handleReply={handleReply}
            handleToggle={handleToggle}
            handleActionClick={handleActionClick}
            anchorRef={anchorRef}
            openPopper={openPopper}
            setOpenPopper={setOpenPopper}
            indexMap={indexMap}
            setIndexMap={setIndexMap}
            toggleComment={toggleComment}
            setToggleComment={setToggleComment}
            setSelectedReply={setSelectedReply}
            selectedReply={selectedReply}
            postActions={postActions}
            setPostActions={setPostActions}
            showOriginalPost={true}
            navigate={navigate}
            setTaggedUsers={setTaggedUsers}
            taggedUsers={taggedUsers}
            postStyle={{
              borderTop: "1px solid #e4e4e4",
            }}
          />
          <div className={classes.comentLikesBox}>
            <div className={classes.commentCount}>
              <p
                onClick={() => {
                  setModalKey("like");
                  setPostActions({
                    ...postActions,
                    show: "viewLikes",
                  });
                }}
              >
                {thousandToK(post?.likes?.length)}{" "}
                <span>{post?.likes?.length > 1 ? "Likes" : "Like"}</span>
              </p>
              <div className={classes.commentShare}>
                <p>
                  {thousandToK(post?.comments?.length)}{" "}
                  <span>
                    {post?.comments?.length > 1 ? "Comments" : "Comment"}
                  </span>
                </p>
                <p
                  onClick={() => {
                    setModalKey("share");
                    setPostActions({
                      ...postActions,
                      show: "viewLikes",
                    });
                  }}
                >
                  {thousandToK(filterShared(post?.shares)?.length)}{" "}
                  <span>{post?.shares?.length > 1 ? "Shares" : "Share"}</span>
                </p>
              </div>
            </div>{" "}
            <div className={classes.__actions}>
              <div
                className={classes.__icon}
                onClick={() => likePost({ postId: post?._id })}
              >
                {post?.likes?.find((ele) => ele?._id == userData?._id) ? (
                  <AiFillLike size={20} color={"#0348B5"} />
                ) : (
                  <BiLike size={20} />
                )}
                <p>
                  <span>Like</span>
                </p>
              </div>
              <div className={classes.separator}></div>
              <div
                className={classes.__icon}
                onClick={() => {
                  setToggleComment((prev) => !prev);
                  setCommentId(null);
                  setComment("");
                  setSelectedReply(null);
                }}
              >
                <BsChat size={20} />{" "}
                <p>
                  <span>Comment</span>
                </p>
              </div>
              <div className={classes.separator}></div>
              <div className={classes.__icon}>
                <BiRepost
                  size={20}
                  onClick={() => {
                    setPostActions({ ...postActions, show: "sharePost" });
                  }}
                />{" "}
                <p>
                  <span>Share</span>
                </p>
              </div>
            </div>
            {toggleComment && (
              <div className={classes.commentToggle}>
                {post?.comments?.length > 0 && (
                  <div className={classes.comments}>
                    {post?.comments?.map((ele) => {
                      return (
                        <CommentsComponent
                          ele={ele}
                          logInUser={userData}
                          setCommentId={setCommentId}
                          setReplyId={setReplyId}
                          setComment={setComment}
                          setSelectedReply={setSelectedReply}
                          actionsLoading={actionsLoading}
                          setPostActions={setPostActions}
                          postActions={postActions}
                        />
                      );
                    })}
                  </div>
                )}
                <div className={classes.commentBox}>
                  {selectedReply && (
                    <div className={classes.commentTop}>
                      <p>
                        Replying to{" "}
                        <span>
                          {selectedReply?.user?.firstName}{" "}
                          {selectedReply?.user?.lastName}
                        </span>{" "}
                      </p>
                      <RxCross2
                        className={classes.crossReply}
                        onClick={() => {
                          setSelectedReply(null);
                          setReplyId(null);
                          setCommentId(null);
                        }}
                      />
                    </div>
                  )}
                  <div className={classes.__footer}>
                    <div>
                      <ProfilePhoto
                        photo={userData?.photo}
                        profilePhotoDimensions={
                          userData?.profilePhotoDimensions
                        }
                        className={classes.__avatar}
                      />
                    </div>
                    <Input
                      value={comment}
                      setter={setComment}
                      placeholder="Write a comment..."
                      inputStyle={{
                        border: "none",
                        padding: "0px",
                      }}
                      parentCustomStyle={{
                        flex: "2",
                        borderRadius: "10px",
                        padding: "10px",
                        border: "1px solid silver",
                      }}
                      enterClick={() => {
                        if (selectedReply) {
                          handleReply(comment, post?._id);
                          return;
                        }
                        handleComment(comment, post?._id);
                      }}
                    />
                  </div>
                  <div
                    className={classes.sendBtn}
                    onClick={() => {
                      if (selectedReply) {
                        handleReply(comment, post?._id);
                        return;
                      }
                      handleComment(comment, post?._id);
                    }}
                  >
                    <BiSolidSend />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Card
          {...post}
          userData={userData}
          postOwner={postOwner}
          comment={comment}
          setComment={setComment}
          setCommentId={setCommentId}
          setReplyId={setReplyId}
          logInUser={userData}
          likePost={likePost}
          actionsLoading={actionsLoading}
          handleComment={handleComment}
          handleReply={handleReply}
          handleToggle={handleToggle}
          handleActionClick={handleActionClick}
          anchorRef={anchorRef}
          openPopper={openPopper}
          setOpenPopper={setOpenPopper}
          indexMap={indexMap}
          setIndexMap={setIndexMap}
          toggleComment={toggleComment}
          setToggleComment={setToggleComment}
          setSelectedReply={setSelectedReply}
          selectedReply={selectedReply}
          postActions={postActions}
          setPostActions={setPostActions}
          modalKey={modalKey}
          setModalKey={setModalKey}
          navigate={navigate}
          setTaggedUsers={setTaggedUsers}
          taggedUsers={taggedUsers}
        />
      )}
      <PoperComponent
        handleClick={handleActionClick}
        open={openPopper}
        setOpen={setOpenPopper}
        anchorRef={anchorRef}
        data={
          postOwner
            ? [
                "Edit",
                "Delete",
                post?.privacy == "private" ? "Public" : "Private",
              ]
            : ["Report"]
        }
        placement={"bottom"}
      />
      {postActions?.show == "deleteComment" && (
        <AreYouSureModal
          show={postActions?.show}
          setShow={() =>
            setPostActions({
              ...postActions,
              show: false,
            })
          }
          onClick={handleDeleteComment}
          isApiCall={actionsLoading === "deleteComment"}
          subTitle={"Are you sure you want to delete this comment?"}
        />
      )}
      {postActions?.show == "deleteReply" && (
        <AreYouSureModal
          show={postActions?.show}
          setShow={() =>
            setPostActions({
              ...postActions,
              show: false,
            })
          }
          onClick={handleDeleteReply}
          isApiCall={actionsLoading === "deleteReply"}
          subTitle={"Are you sure you want to delete this reply?"}
        />
      )}
      {postActions.show == "sharePost" && (
        <SharePostModal
          show={postActions.show}
          setShow={() => {
            setPostActions({
              ...postActions,
              show: false,
            });
          }}
          modalLoading={actionsLoading === "sharePost"}
          postId={post?.originalPost?._id || post?._id}
          onClick={sharePost}
        />
      )}
      {postActions.show == "viewLikes" && (
        <LikeShareModal
          label={modalKey == "like" ? "People who like" : "People who share"}
          setShow={() => {
            setPostActions({
              ...postActions,
              show: false,
            });
          }}
          show={postActions.show}
          modalKey={modalKey}
          setModalKey={setModalKey}
          selectedData={modalKey == "like" ? post?.likes : post?.shares}
        />
      )}
      {postActions?.show == "changeStatus" && (
        <AreYouSureModal
          show={postActions?.show}
          setShow={() =>
            setPostActions({
              ...postActions,
              show: false,
            })
          }
          onClick={handleUpdateStatus}
          isApiCall={actionsLoading === "changeStatus"}
          subTitle={`Are you sure you want to change status to ${
            post?.privacy === "public" ? "Private" : "Public"
          }?`}
        />
      )}
      {taggedUsers && (
        <UsersViewModal
          show={taggedUsers}
          setShow={() => {
            setTaggedUsers(null);
          }}
          users={taggedUsers}
        />
      )}
    </>
  );
}

const Card = ({
  originalPostToHide = false,
  navigate,
  postOwner,
  comment,
  setComment,
  setCommentId,
  setReplyId,
  logInUser,
  likePost,
  actionsLoading,
  showOriginalPost = false,
  handleToggle,
  handleActionClick,
  anchorRef,
  openPopper,
  setOpenPopper,
  indexMap,
  setIndexMap,
  handleComment,
  handleReply,
  postActions,
  setPostActions,
  setToggleComment,
  toggleComment,
  selectedReply,
  setSelectedReply,
  setModalKey,
  postStyle,
  setTaggedUsers,
  user,
  _id,
  createdAt,
  description,
  likes,
  comments,
  shares,
  media,
  reported,
  privacy,
  activity,
  address,
  tags,
}) => {
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div>
      <div
        className={classes.postCard}
        style={{
          ...postStyle,
        }}
      >
        <div
          className={classes.headerDiv}
          onClick={() => navigate(`/post/${_id}`)}
          style={{
            zoom: showOriginalPost ? "0.8" : "1",
            paddingBlockStart: showOriginalPost ? "6px" : "10px",
          }}
        >
          <div className={classes.__header}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${user?.slug}`);
              }}
            >
              <ProfilePhoto
                photo={user?.photo}
                profilePhotoDimensions={user?.profilePhotoDimensions}
                className={classes.__avatar}
              />
            </div>
            <div className={classes.__user}>
              <div className={classes.feelingTag}>
                <p
                  className={classes.__name}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/profile/${user?.slug}`);
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </p>
                {!showOriginalPost && activity && (
                  <span className={classes.activitySpan}>--{activity}</span>
                )}

                {!showOriginalPost && tags?.length > 0 && (
                  <span
                    className={[classes.activitySpan, classes.tagsSpan].join(
                      " "
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaggedUsers(tags);
                    }}
                  >
                    {" "}
                    {formatTags(tags)}
                  </span>
                )}
              </div>
              <p className={classes.__data}>{getTimeStamp(createdAt)}</p>
              {!showOriginalPost && address && (
                <span className={classes.addressSpan}>{address}</span>
              )}
            </div>
          </div>
          {!showOriginalPost && (postOwner || !reported) && (
            <div className={classes.popperActions}>
              {postOwner ? (
                <div
                  ref={_id == indexMap ? anchorRef : null}
                  id="composition-button"
                  aria-controls={openPopper ? "composition-menu" : undefined}
                  aria-expanded={openPopper ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndexMap(_id);
                    setTimeout(() => {
                      handleToggle();
                    }, 100);
                  }}
                  className={classes.threeDotsDiv}
                >
                  <HiDotsVertical
                    cursor={"pointer"}
                    className={[classes.threeDots]}
                  />
                </div>
              ) : (
                <div className={classes.reportDiv}>
                  <FaRegFlag
                    cursor={"pointer"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick("Report");
                    }}
                  />
                  <p className={classes.reportText}>Report</p>
                </div>
              )}
            </div>
          )}
          {showOriginalPost && (
            <p className={classes.shareTag}>
              Shared <BiRepost />
            </p>
          )}
        </div>
        {originalPostToHide ? (
          <div className={classes.hidePost}>
            <PiWarningCircleBold />
            <div>
              <h2>Post unavailable</h2>
              <p>This post is unavailable for you</p>
            </div>
          </div>
        ) : (
          <div className={classes.__content}>
            {/* {body?.type === 'text' ? ( */}
            {description && (
              <div className={classes.__text}>
                <ShowMoreShowLessText text={description} visibility={160} />
              </div>
            )}
            {media?.length > 0 && (
              <div className={classes.__images}>
                {media?.slice(0, 4)?.map((item, index) => (
                  <div
                    className={[
                      classes.imgDiv,
                      "px-0",
                      media?.slice(0, 4)?.length % 2 === 0
                        ? classes.lastOne
                        : "",
                    ].join(" ")}
                    onClick={() => {
                      setShowMoreImages(true);
                      setImageIndex(index);
                    }}
                  >
                    <div className={classes.imageBox}>
                      {["jfif", "png", "jpeg", "jpg"]?.includes(
                        item?.split(".")[1]
                      ) ? (
                        <img src={imageUrl(item)} alt={`${user?.name} post`} />
                      ) : (
                        <video
                          src={imageUrl(item)}
                          controls
                          height={"100%"}
                          width={"100%"}
                        ></video>
                      )}
                    </div>
                    {index === 3 && media?.length > 4 && (
                      <div className={classes.showMoreImages}>
                        <p>+{media?.length - 4}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!showOriginalPost && (
          <div>
            <div className={classes.commentContainer}>
              <div className={classes.commentCount}>
                <p
                  onClick={() => {
                    setModalKey("like");
                    setPostActions({
                      ...postActions,
                      show: "viewLikes",
                    });
                  }}
                >
                  {thousandToK(likes?.length)}{" "}
                  <span>{likes?.length > 1 ? "Likes" : "Like"}</span>
                </p>
                <div className={classes.commentShare}>
                  <p>
                    {thousandToK(comments?.length)}{" "}
                    <span>{comments?.length > 1 ? "Comments" : "Comment"}</span>
                  </p>
                  <p
                    onClick={() => {
                      setModalKey("share");
                      setPostActions({
                        ...postActions,
                        show: "viewLikes",
                      });
                    }}
                  >
                    {thousandToK(filterShared(shares)?.length)}{" "}
                    <span>{shares?.length > 1 ? "Shares" : "Share"}</span>
                  </p>
                </div>
              </div>
              <div className={classes.__actions}>
                <div
                  className={classes.__icon}
                  onClick={() => likePost({ postId: _id })}
                >
                  {likes?.find((ele) => ele?._id == logInUser?._id) ? (
                    <AiFillLike size={20} color={"#0348B5"} />
                  ) : (
                    <BiLike size={20} />
                  )}
                  <p>
                    <span>Like</span>
                  </p>
                </div>
                <div className={classes.separator}></div>
                <div
                  className={classes.__icon}
                  onClick={() => {
                    setToggleComment((prev) => !prev);
                    setCommentId(null);
                    setComment("");
                    setSelectedReply(null);
                  }}
                >
                  <BsChat size={20} />{" "}
                  <p>
                    <span>Comment</span>
                  </p>
                </div>
                <div className={classes.separator}></div>
                <div
                  className={classes.__icon}
                  onClick={() => {
                    setPostActions({ ...postActions, show: "sharePost" });
                  }}
                >
                  <BiRepost size={20} />{" "}
                  <p>
                    <span>Share</span>
                  </p>
                </div>
              </div>
            </div>
            {toggleComment && (
              <div className={classes.commentToggle}>
                {comments?.length > 0 && (
                  <div className={classes.comments}>
                    {comments?.map((ele) => (
                      <CommentsComponent
                        ele={ele}
                        logInUser={logInUser}
                        setCommentId={setCommentId}
                        setReplyId={setReplyId}
                        setComment={setComment}
                        setSelectedReply={setSelectedReply}
                        actionsLoading={actionsLoading}
                        setPostActions={setPostActions}
                        postActions={postActions}
                      />
                    ))}
                  </div>
                )}
                <div className={classes.commentBox}>
                  {selectedReply && (
                    <div className={classes.commentTop}>
                      <p>
                        Replying to{" "}
                        <span>
                          {selectedReply?.user?.firstName}{" "}
                          {selectedReply?.user?.lastName}
                        </span>{" "}
                      </p>
                      <RxCross2
                        className={classes.crossReply}
                        onClick={() => {
                          setSelectedReply(null);
                          setReplyId(null);
                          setCommentId(null);
                        }}
                      />
                    </div>
                  )}
                  <div className={classes.__footer}>
                    <div>
                      <ProfilePhoto
                        photo={logInUser?.photo}
                        profilePhotoDimensions={
                          logInUser?.profilePhotoDimensions
                        }
                        className={classes.__avatar}
                      />
                    </div>
                    <Input
                      value={comment}
                      setter={setComment}
                      placeholder="Write a comment..."
                      inputStyle={{
                        border: "none",
                        padding: "0px",
                      }}
                      parentCustomStyle={{
                        flex: "2",
                        borderRadius: "10px",
                        padding: "10px",
                        border: "1px solid silver",
                      }}
                      enterClick={() => {
                        if (selectedReply) {
                          handleReply(comment, _id);
                          return;
                        }
                        handleComment(comment, _id);
                      }}
                    />
                  </div>
                  <div
                    className={classes.sendBtn}
                    onClick={() => {
                      if (selectedReply) {
                        handleReply(comment, _id);
                        return;
                      }
                      handleComment(comment, _id);
                    }}
                  >
                    <BiSolidSend />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <PoperComponent
        handleClick={handleActionClick}
        open={openPopper}
        setOpen={setOpenPopper}
        anchorRef={anchorRef}
        data={
          postOwner
            ? ["Edit", "Delete", privacy == "private" ? "Public" : "Private"]
            : ["Report"]
        }
        placement={"bottom"}
      />
      {showMoreImages && (
        <ImageSliderModal
          show={showMoreImages}
          setShow={setShowMoreImages}
          gallery={media}
          actions={false}
          title="Photos"
          imageIndex={imageIndex}
        />
      )}
    </div>
  );
};

const RepliesComponent = ({
  commentOwner,
  replies,
  logInUser,
  setCommentId,
  setReplyId,
  actionsLoading,
  setComment,
  setSelectedReply,
  setPostActions,
}) => {
  return (
    <div className={classes.repliesContainer}>
      {replies?.map((ele) => (
        <div className={classes.reply}>
          <div>
            <ProfilePhoto
              photo={ele?.user?.photo}
              profilePhotoDimensions={ele?.user?.profilePhotoDimensions}
              className={classes.imgBox}
            />
          </div>
          <div className={classes.textContent}>
            <div className={classes.content}>
              <h6>
                {ele?.user?.firstName} {ele?.user?.lastName}
              </h6>
              <p>{ele?.text}</p>
            </div>
            <div className={classes.bottomContent}>
              <p className={classes.date}>{getTimeStamp(ele?.createdAt)}</p>
              {ele?.user?._id == logInUser?._id && (
                <div className={classes.bottom_right}>
                  <p
                    className={classes.editComment}
                    onClick={() => {
                      if (actionsLoading) {
                        return;
                      }
                      setComment(ele?.text);
                      setCommentId(commentOwner?._id);
                      setReplyId(ele?._id);
                      setSelectedReply(commentOwner);
                    }}
                  >
                    Edit
                  </p>
                  <p
                    className={classes.deleteComment}
                    onClick={() => {
                      if (actionsLoading) {
                        return;
                      }
                      setCommentId(commentOwner?._id);
                      setReplyId(ele?._id);
                      setPostActions((prev) => {
                        return {
                          ...prev,
                          show: "deleteReply",
                        };
                      });
                    }}
                  >
                    Delete
                  </p>
                </div>
              )}{" "}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const CommentsComponent = ({
  ele,
  logInUser,
  setSelectedReply,
  setReplyId,
  setComment,
  setCommentId,
  postActions,
  setPostActions,
  actionsLoading,
}) => {
  const [openReplies, setOpenReplies] = useState(false);
  return (
    <div className={classes.comment}>
      <div>
        <ProfilePhoto
          photo={ele?.user?.photo}
          profilePhotoDimensions={ele?.user?.profilePhotoDimensions}
          className={classes.imgBox}
        />
      </div>
      <div className={classes.textContent}>
        <div className={classes.content}>
          <h6>
            {ele?.user?.firstName} {ele?.user?.lastName}
          </h6>
          <p>{ele?.text}</p>
        </div>
        <div className={classes.bottomContent}>
          <div className={classes.bottom_left}>
            <p className={classes.date}>{getTimeStamp(ele?.createdAt)}</p>
            {ele?.replies?.length > 0 && (
              <p
                className={classes.replies}
                onClick={() => {
                  setOpenReplies((prev) => !prev);
                }}
              >
                {ele?.replies?.length} Replies
              </p>
            )}
            <p
              className={classes.replyBtn}
              onClick={() => {
                if (actionsLoading) {
                  return;
                }
                setSelectedReply(ele);
                setReplyId(null);
                setCommentId(ele?._id);
              }}
            >
              <LuReply /> Reply
            </p>
          </div>
          {ele?.user?._id == logInUser?._id && (
            <div className={classes.bottom_right}>
              <p
                className={classes.editComment}
                onClick={() => {
                  if (actionsLoading) {
                    return;
                  }
                  setComment(ele?.text);
                  setCommentId(ele?._id);
                  setSelectedReply(null);
                }}
              >
                Edit
              </p>
              <p
                className={classes.deleteComment}
                onClick={() => {
                  if (actionsLoading) {
                    return;
                  }
                  setCommentId(ele?._id);
                  setPostActions({
                    ...postActions,
                    show: "deleteComment",
                  });
                }}
              >
                Delete
              </p>
            </div>
          )}
        </div>
        {openReplies && (
          <div className={classes.repliesRender}>
            <RepliesComponent
              setPostActions={setPostActions}
              replies={ele?.replies}
              logInUser={logInUser}
              setCommentId={setCommentId}
              setReplyId={setReplyId}
              setComment={setComment}
              setSelectedReply={setSelectedReply}
              commentOwner={ele}
            />
          </div>
        )}
      </div>
    </div>
  );
};
