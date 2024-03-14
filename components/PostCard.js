import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, Comment, Popover } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post }) => {
  console.log(post);
  const id = useSelector((state) => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked(!liked);
  }, [liked]);

  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const onToggleCommentOpen = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
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
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
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
      >
        {/* <Image /> */}
        {/* <Content /> */}
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
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
