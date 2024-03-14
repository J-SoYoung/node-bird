import React from "react";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((c, idx) => (
        <div key={idx}>
          <span>{c.User.nickname} , </span>
          <span>{c.contents}</span>
        </div>
      ))}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.object.isRequired,
};

export default CommentList;
