import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  console.log(images);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          width="50%"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          width="50%"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  }
  if (images.length > 2) {
    return (
      <>
        <div>
          <img
            role="presentation"
            width="50%"
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
          />
        </div>
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </div>
      </>
    );
  }
  return <div>...구현중...</div>;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
