import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, Comment, Popover } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from "../reducers/post";
import FollowButton from "./FollowButton";

const PostCard = ({ post }) => {
  console.log(post);
  const dispatch = useDispatch();
  const { removePostLoaing } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const onToggleCommentOpen = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers?.find((v) => v.id === id);
  return (
    <div>
      <Card
        cover={post.Images && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              key="heart2"
              twoToneColor="#eb2f96"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),

          <MessageOutlined key="message" onClick={onToggleCommentOpen} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && Number(id) === Number(post?.User?.id) ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={removePostLoaing}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images && <PostImages images={post.Retweet.Images} />
            }
          >
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User?.nickname[0]}</Avatar>}
              title={post.Retweet.User?.nickname}
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                ></PostCardContent>
              }
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User?.nickname[0]}</Avatar>}
            title={post.User?.nickname}
            description={
              <PostCardContent postData={post.content}></PostCardContent>
            }
          />
        )}
      </Card>
      {commentFormOpen && (
        <div>
          {id && <CommentForm post={post} />}
          <div>{`${post.Comments.length}개의 댓글`}</div>
          {post.Comments.map((c) => {
            return (
              <Comment
                key={c.id}
                author={c.User.nickname}
                avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                content={c.content}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    contents: PropTypes.string,
    createAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  Likers: PropTypes.arrayOf(PropTypes.object),
  RetweetId: PropTypes.number,
  Retweet: PropTypes.object,
};

export default PostCard;
