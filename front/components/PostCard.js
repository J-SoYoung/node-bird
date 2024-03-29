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
import { REMOVE_POST_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { removePostLoaing } = useSelector((state) => state.post);

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked(!liked);
  }, [liked]);

  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const onToggleCommentOpen = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div>
      <Card
        cover={post.Images && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              key="heart2"
              twoToneColor="#eb2f96"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
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
        extra={id && <FollowButton post={post} />}
      >
        {/* <Image /> */}
        {/* <Content /> */}
        <Card.Meta
          avatar={<Avatar>{post.User?.nickname[0]}</Avatar>}
          title={post.User?.nickname}
          description={
            <PostCardContent postData={post.contents}></PostCardContent>
          }
        />
      </Card>
      {commentFormOpen && (
        <div>
          <CommentForm post={post} />
          <div>{`${post.Comments.length}개의 댓글`}</div>
          {post.Comments.map((c, idx) => {
            return (
              <Comment
                key={idx}
                author={c.User.nickname}
                avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                content={c.contents}
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
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
