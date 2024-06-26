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

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unFollowLoading} onClick={onClickFollow}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object,
};

export default FollowButton;
