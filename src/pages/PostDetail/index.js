import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Delete, Get, Patch, Post } from "../../Axios/AxiosFunctions";
import Footer from "../../Component/Footer";
import { NewsFeedHeader } from "../../Component/Header/NewsFeedHeader";
import { Loader } from "../../Component/Loader";
import NoData from "../../Component/NoData/NoData";
import PostDetailCard from "../../Component/PostDetailsCard";
import {
  UploadImagesToAwsBySignedUrl,
  UploadVideosToAwsBySignedUrl,
} from "../../config/HelperFunction";
import { BaseURL, apiHeader, apiUrl } from "../../config/apiUrl";
import AddEditPostModal from "../../modals/AddEditPostModal";
import AreYouSureModal from "../../modals/AreYouSureModal";
import ReportModal from "../../modals/ReportModal";
import classes from "./PostDetail.module.css";
let socketConnectionRef = io(apiUrl, { transports: ["websocket"] });
const PostDetail = () => {
  const navigate = useNavigate();
  const { access_token, user } = useSelector((state) => state.authReducer);
  const id = useParams()?.id;
  const [post, setPost] = useState(null);
  const [postModal, setPostModal] = useState({
    show: false,
    loading: false,
  });
  const [actionsLoading, setActionsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    const apiUrl = BaseURL(`posts/${id}`);
    setIsLoading(true);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setPost(response?.data?.data);
    }
    setIsLoading(false);
  };
  const handleAddEditPost = async (params, videos, images) => {
    const apiUrl = BaseURL(post ? "posts/update" : "posts/create");
    setPostModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = post
      ? await Patch(apiUrl, params, apiHeader(access_token))
      : await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      response?.data?.imageUrls?.length > 0 &&
        (await UploadImagesToAwsBySignedUrl(response?.data?.imageUrls, images));
      response?.data?.uploadingUrls?.length > 0 &&
        (await UploadVideosToAwsBySignedUrl(
          response?.data?.uploadingUrls,
          videos
        ));
      setPost(response?.data?.data);
      setPostModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      toast.success(`Post ${post ? "Updated" : "Added"} Successfully!`);
    }
    setPostModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const handleDeletePost = async () => {
    const apiUrl = BaseURL(`posts/delete/${post?._id}`);
    setPostModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      setPostModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      navigate(`/news-feed`);
      toast.success(`Post Deleted Successfully!`);
    }
    setPostModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const handleReportPost = async (params) => {
    const apiUrl = BaseURL("reports");
    setPostModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPost(response?.data?.data);
      setPostModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      toast.success(`Post Reported Successfully!`);
    }
    setPostModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const addLikeBeforeApiCall = (temp) => {
    const { _id, firstName, lastName, photo, ...rest } = user;
    temp = {
      ...temp,
      likes: temp?.likes?.find((ele) => ele?._id == user?._id)
        ? temp?.likes?.filter((ele) => ele?._id !== user?._id)
        : [...temp?.likes, { _id, firstName, lastName, photo }],
    };
    setPost((prev) => {
      prev = JSON.parse(JSON.stringify(temp));
      return prev;
    });
    return temp;
  };
  const likePost = async (params) => {
    const temp = JSON.parse(JSON.stringify(post));
    const likedPost = addLikeBeforeApiCall(temp);
    const apiUrl = BaseURL("posts/like");
    setActionsLoading("likePost");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPost(response?.data?.data);
      toast.success(
        `Post ${
          response?.data?.data?.likes?.find((ele) => ele?._id == user?._id)
            ? "Liked"
            : "Unliked"
        } Successfully!`
      );
      setActionsLoading(false);
      return true;
    } else {
      addLikeBeforeApiCall(likedPost);
    }
    setActionsLoading(false);
  };
  const sharePost = async (params) => {
    const apiUrl = BaseURL("posts/share");
    setActionsLoading("sharePost");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPost(response?.data?.data?.originalPost);
      toast.success(`Post Shared Successfully!`);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const addEditComment = async (params) => {
    const apiUrl = params?.commentId
      ? BaseURL("posts/updateComment")
      : BaseURL(`posts/comment`);
    setActionsLoading("addComment");
    const response = params?.commentId
      ? await Patch(apiUrl, params, apiHeader(access_token))
      : await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(
        `Comment ${params?.commentId ? "Updated" : "Added"} Successfully!`
      );
      setPost(response?.data?.comment);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const deleteComment = async (params) => {
    const apiUrl = BaseURL(
      `posts/deleteComment?postId=${params?.postId}&commentId=${params?.commentId}`
    );
    setActionsLoading("deleteComment");
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`Comment Deleted Successfully!`);
      setPost(response?.data?.data);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const addEditReply = async (params) => {
    const apiUrl = params?.replyId
      ? BaseURL("posts/updateReply")
      : BaseURL(`posts/reply`);
    setActionsLoading("addReply");
    const response = params?.replyId
      ? await Patch(apiUrl, params, apiHeader(access_token))
      : await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(
        `Reply ${params?.replyId ? "Updated" : "Added"} Successfully!`
      );
      setPost(response?.data?.data);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const deleteReply = async (params) => {
    const apiUrl = BaseURL(
      `posts/deleteReply?postId=${params?.postId}&commentId=${params?.commentId}&replyId=${params?.replyId}`
    );
    setActionsLoading("deleteReply");
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`Reply Deleted Successfully!`);
      setPost(response?.data?.data);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const handleChangeStatus = async (params) => {
    const apiUrl = BaseURL(`posts/updatePrivacy`);
    setActionsLoading("changeStatus");
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`Post Status Changed Successfully!`);
      setPost(response?.data);
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    socketConnectionRef.on("new-comment", (comment) => {
      setPost(comment?.post);
    });
    return () => {
      socketConnectionRef?.off("new-comment");
    };
  }, []);
  return (
    <>
      <NewsFeedHeader />
      {/* <AfterLoginHeader /> */}
      <div className={classes.main}>
        <Container>
          {isLoading ? (
            <Loader className={"vh-100"} />
          ) : (
            <>
              {post ? (
                <PostDetailCard
                  post={post}
                  likePost={likePost}
                  sharePost={sharePost}
                  onEdit={() => {
                    setPostModal({
                      ...postModal,
                      show: "add",
                    });
                  }}
                  onDel={() => {
                    setPostModal({
                      ...postModal,
                      show: "delete",
                    });
                  }}
                  onReport={() => {
                    setPostModal({
                      ...postModal,
                      show: "report",
                    });
                  }}
                  handleChangeStatus={handleChangeStatus}
                  addEditComment={addEditComment}
                  deleteComment={deleteComment}
                  addEditReply={addEditReply}
                  deleteReply={deleteReply}
                  actionsLoading={actionsLoading}
                />
              ) : (
                <NoData text="No post found" />
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
      {postModal?.show == "add" && (
        <AddEditPostModal
          show={postModal?.show}
          setShow={() =>
            setPostModal({
              ...postModal,
              show: false,
            })
          }
          onClick={handleAddEditPost}
          data={post}
          isLoading={postModal?.loading}
          sharedPost={post?.originalPost}
        />
      )}

      {postModal?.show == "delete" && (
        <AreYouSureModal
          show={postModal?.show}
          setShow={() =>
            setPostModal({
              ...postModal,
              show: false,
            })
          }
          onClick={handleDeletePost}
          isApiCall={postModal?.loading}
          subTitle={"Are you sure you want to delete this post?"}
        />
      )}
      {postModal.show == "report" && (
        <ReportModal
          show={postModal.show}
          setShow={() => {
            setPostModal({
              ...postModal,
              show: false,
            });
          }}
          modalLoading={postModal?.loading}
          data={post}
          onClick={handleReportPost}
        />
      )}
    </>
  );
};

export default PostDetail;
