import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Delete, Get, Patch, Post } from "../../../Axios/AxiosFunctions";
import { Button } from "../../../Component/Button/Button";
import CreatePost from "../../../Component/CreatePost";
import NoData from "../../../Component/NoData/NoData";
import PostCardLoading from "../../../Component/PostCardLoading";
import PostCardNew from "../../../Component/PostCardNew";
import Switch from "../../../Component/Switch/Switch";
import {
  UploadImagesToAwsBySignedUrl,
  UploadVideosToAwsBySignedUrl,
} from "../../../config/HelperFunction";
import {
  BaseURL,
  apiHeader,
  apiUrl,
  recordsLimit,
} from "../../../config/apiUrl";
import AddEditPostModal from "../../../modals/AddEditPostModal";
import AreYouSureModal from "../../../modals/AreYouSureModal";
import ReportModal from "../../../modals/ReportModal";
import classes from "./PostSection.module.css";
let socketConnectionRef = io(apiUrl, { transports: ["websocket"] });

const PostSection = () => {
  const { access_token, user } = useSelector((state) => state?.authReducer);
  const [isPublicPosts, setIsPublicPosts] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [postModal, setPostModal] = useState({
    show: false,
    loading: false,
  });
  const [actionsLoading, setActionsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const getPosts = async (
    pgNo = page,
    prev = [],
    loader = "mainLoading",
    postStatus = "private"
  ) => {
    const apiUrl = BaseURL(
      `posts?status=${postStatus}&limit=${recordsLimit}&page=${pgNo}`
    );
    setIsLoading(loader);
    const response = await Get(apiUrl, access_token);
    if (response !== undefined) {
      setPosts([...prev, ...response?.data?.data]);
      setTotalCount(response?.data?.count);
    }
    setIsLoading(false);
  };
  const handleAddEditPost = async (params, videos, images) => {
    const apiUrl = BaseURL(selectedItem ? "posts/update" : "posts/create");
    setPostModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = selectedItem
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
      setPosts((prev) => {
        const temp = [...prev];
        if (selectedItem) {
          const index = temp.findIndex((ele) => ele?._id === selectedItem?._id);
          temp.splice(index, 1, response?.data?.data);
          return temp;
        }
        const newPostPrivacy = response?.data?.data?.privacy;
        if (
          (newPostPrivacy === "private" && isPublicPosts) ||
          (newPostPrivacy === "public" && !isPublicPosts)
        ) {
          return [response?.data?.data, ...prev];
        }
        return prev;
      });
      setPostModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
      toast.success(`Post ${selectedItem ? "Updated" : "Added"} Successfully!`);
    }
    setPostModal((prev) => {
      return {
        ...prev,
        loading: false,
      };
    });
  };
  const handleDeletePost = async () => {
    const apiUrl = BaseURL(`posts/delete/${selectedItem?._id}`);
    setPostModal((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const response = await Delete(apiUrl, apiHeader(access_token));
    if (response !== undefined) {
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === selectedItem?._id);
        temp.splice(index, 1);
        return temp;
      });
      setPostModal((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
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
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === params?.post);
        temp.splice(index, 1, response?.data?.data);
        return temp;
      });
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
  const addLikeBeforeApiCall = (params, temp) => {
    const { _id, firstName, lastName, photo, ...rest } = user;
    const index = temp.findIndex((ele) => ele?._id === params?.postId);
    temp[index] = {
      ...temp[index],
      likes: temp[index]?.likes?.find((ele) => ele?._id == user?._id)
        ? temp[index]?.likes?.filter((ele) => ele?._id !== user?._id)
        : [...temp[index]?.likes, { _id, firstName, lastName, photo }],
    };
    setPosts((prev) => {
      prev = JSON.parse(JSON.stringify(temp));
      return prev;
    });
    return temp;
  };
  const likePost = async (params) => {
    const temp = JSON.parse(JSON.stringify(posts));
    const likedPost = addLikeBeforeApiCall(params, temp);
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
      setActionsLoading(false);
      return true;
    } else {
      addLikeBeforeApiCall(params, likedPost);
    }
    setActionsLoading(false);
  };
  const sharePost = async (params) => {
    const apiUrl = BaseURL("posts/share");
    setActionsLoading("sharePost");
    const response = await Post(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      setPosts((prev) => {
        const newPostPrivacy = response?.data?.data?.privacy;
        if (
          (newPostPrivacy === "private" && isPublicPosts) ||
          (newPostPrivacy === "public" && !isPublicPosts)
        ) {
          return [response?.data?.data, ...prev];
        }
        return prev;
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
  const handleChangeStatus = async (params) => {
    const apiUrl = BaseURL(`posts/updatePrivacy`);
    setActionsLoading("changeStatus");
    const response = await Patch(apiUrl, params, apiHeader(access_token));
    if (response !== undefined) {
      toast.success(`Post Status Changed Successfully!`);
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === params?.postId);
        temp.splice(index, 1);
        return temp;
      });
      setActionsLoading(false);
      return true;
    }
    setActionsLoading(false);
  };
  useEffect(() => {
    getPosts(1, [], "mainLoading", isPublicPosts ? "private" : "public");
    setPage(1);
  }, []);
  useEffect(() => {
    socketConnectionRef.on("new-comment", (comment) => {
      setPosts((prev) => {
        const temp = [...prev];
        const index = temp.findIndex((ele) => ele?._id === comment?.postId);
        temp.splice(index, 1, comment?.post);
        return temp;
      });
    });
    return () => {
      socketConnectionRef?.off("new-comment");
    };
  }, []);
  return (
    <>
      <div className={classes.mainDiv}>
        <div className={classes.postContainer} title="Create a new post">
          <CreatePost
            onClick={() => {
              setSelectedItem(null);
              setPostModal({
                ...postModal,
                show: "add",
              });
            }}
          />
        </div>
        <div className={classes.switchContainer}>
          <div className={classes.switchComponent}>
            <p>Public</p>
            <Switch
              setter={(e) => {
                setIsPublicPosts(e);
                getPosts(1, [], "mainLoading", e ? "private" : "public");
                setPage(1);
              }}
              value={isPublicPosts}
            />
            <p>Private</p>
          </div>
        </div>
        <div className={classes.postsContainer}>
          <Row>
            {isLoading === "mainLoading" ? (
              Array(6)
                .fill()
                .map((_, index) => <PostCardLoading className="vh-100" />)
            ) : (
              <>
                {posts?.length > 0 ? (
                  posts?.map((post) => (
                    <Col lg={12} className={"mb-3"} key={post?._id}>
                      <PostCardNew
                        post={post}
                        likePost={likePost}
                        sharePost={sharePost}
                        onEdit={() => {
                          setSelectedItem(post);
                          setPostModal({
                            ...postModal,
                            show: "add",
                          });
                        }}
                        onDel={() => {
                          setSelectedItem(post);
                          setPostModal({
                            ...postModal,
                            show: "delete",
                          });
                        }}
                        onReport={() => {
                          setSelectedItem(post);
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
                    </Col>
                  ))
                ) : (
                  <NoData text="No posts found" className={classes.noData} />
                )}
                <Col lg={12}>
                  {page < Math.ceil(totalCount / recordsLimit) && (
                    <div className={classes.btnWrapper}>
                      <Button
                        onClick={() => {
                          getPosts(page + 1, posts, "moreLoading");
                          setPage(page + 1);
                        }}
                      >
                        {isLoading == "moreLoading"
                          ? "Loading..."
                          : "Load More"}
                      </Button>
                    </div>
                  )}
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
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
          data={selectedItem}
          isLoading={postModal?.loading}
          sharedPost={selectedItem?.originalPost}
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
          data={selectedItem}
          onClick={handleReportPost}
        />
      )}
    </>
  );
};

export default PostSection;
