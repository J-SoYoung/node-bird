import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addCommentDone) {
      resetComment();
    }
  }, [addCommentDone]);

  const [commentText, onChangeCommentText, resetComment] = useInput("");
  const onSubmitComment = useCallback(() => {
    console.log(id, post.id, commentText);

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: id,
      },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
