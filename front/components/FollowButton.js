import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "antd";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unFollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
  console.log(me);
  console.log(post);
  console.log(isFollowing);

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      console.log("v언팔로우감");
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: { id: post.User.id, nickname: post.User.nickname },
      });
    } else {
      console.log("v팔로우감");
      dispatch({
        type: FOLLOW_REQUEST,
        data: { id: post.User.id, nickname: post.User.nickname },
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unFollowLoading} onClick={onClickFollow}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes,
};

export default FollowButton;
