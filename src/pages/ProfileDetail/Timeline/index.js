import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Delete, Get, Patch, Post } from "../../../Axios/AxiosFunctions";
import { Button } from "../../../Component/Button/Button";
import { Loader } from "../../../Component/Loader";
import NoData from "../../../Component/NoData/NoData";
import PostCardNew from "../../../Component/PostCardNew";
import {
  BaseURL,
  apiHeader,
  apiUrl,
  recordsLimit,
} from "../../../config/apiUrl";
import classes from "./Timeline.module.css";
import PostCardLoading from "../../../Component/PostCardLoading";
let socketConnectionRef = io(apiUrl, { transports: ["websocket"] });
export default function Timeline({ profileData, isLoading }) {
  // const socket = useRef(null);
  const { access_token, user } = useSelector((state) => state.authReducer);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isApiCall, setIsApiCall] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [actionsLoading, setActionsLoading] = useState(false);
  const getData = async (pgNo = page, prev = [], loader = "mainLoading") => {
    const apiUrl = BaseURL(
      `posts?status=&userId=${profileData?._id}&limit=${recordsLimit}&page=${pgNo}`
    );
    setIsApiCall(loader);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setPosts([...prev, ...response?.data?.data]);
      setTotalCount(response?.data?.count);
    }
    setIsApiCall(false);
  };
  const likePost = async (params) => {
    const apiUrl = BaseURL("posts/like");
    setActionsLoading("likePost");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1, response?.data?.data);
        return temp;
      });
      toast.success(
        `Post ${
          response?.data?.data?.likes?.find((ele) => ele?._id == user?._id)
            ? "Liked"
            : "Unliked"
        } Successfully!`
      );
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  const sharePost = async (params) => {
    const apiUrl = BaseURL("posts/share");
    setActionsLoading("sharePost");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex(
          (ele) => ele?._id === params?.originalPost
        );
        temp.splice(index, 1, response?.data?.data?.originalPost);
        return [response?.data?.data, ...temp];
      });
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
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1, response?.data?.comment);
        return temp;
      });
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
      setPosts((prev) => {
        const temp = JSON.parse(JSON.stringify([...prev]));
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1, response?.data?.data);
        return temp;
      });
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
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1, response?.data?.data);
        return temp;
      });
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
      setPosts((prev) => {
        const temp = JSON.parse(JSON.stringify([...prev]));
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1, response?.data?.data);
        return temp;
      });
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  useEffect(() => {
    getData(1, []);
  }, []);
  useEffect(() => {
    // socketConnectionRef.emit("join", { id: user?._id });
    socketConnectionRef.on("new-comment", (comment) => {
      const index = posts.findIndex((ele) => ele?._id == comment?.postId);
      if (index !== -1) {
        const temp = [...posts];
        temp.splice(index, 1, comment?.post);
        setPosts(temp);
      }
    });
    return () => {
      socketConnectionRef?.off("new-comment");
      // socketConnectionRef?.disconnect();
    };
  }, []);

  return (
    <>
      <section className={classes.postFeed}>
        <Container>
          {isLoading === "mainLoading" ? (
            Array(6)
              .fill()
              .map((_, index) => <PostCardLoading className="vh-100" />)
          ) : (
            <Row>
              {posts?.length > 0 ? (
                posts?.map((post) => (
                  <Col lg={6} className={"mb-3"} key={post?._id}>
                    <PostCardNew
                      post={post}
                      likePost={likePost}
                      sharePost={sharePost}
                      addEditComment={addEditComment}
                      deleteComment={deleteComment}
                      addEditReply={addEditReply}
                      deleteReply={deleteReply}
                      actionsLoading={actionsLoading}
                    />
                  </Col>
                ))
              ) : (
                <NoData
                  text="No posts on timeline"
                  className={classes.timeline_nodata}
                />
              )}
              <Col lg={12}>
                {page < Math.ceil(totalCount / recordsLimit) && (
                  <div className={classes.btnWrapper}>
                    <Button
                      onClick={() => getData(page + 1, posts, "moreLoading")}
                    >
                      {isApiCall == "moreLoading" ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}
