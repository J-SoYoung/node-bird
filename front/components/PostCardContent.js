import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => (
  <div>
    {postData?.split(/(#[^\s#]+)/g).map((v, idx) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link key={idx} href={`/hashtag/${v.slice(1)}`}>
            {v}
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
