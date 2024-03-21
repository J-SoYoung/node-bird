import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          style={{ maxHeight: "400px", objectFit: "cover" }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <img
            role="presentation"
            style={{ margin: "4px", width: "48%", objectFit: "cover" }}
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
          />
          <img
            role="presentation"
            width="48%"
            src={images[1].src}
            alt={images[1].src}
            onClick={onZoom}
          />
        </div>
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length > 2) {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%", height: "400px" }}>
            <img
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
              role="presentation"
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
              border: "1px solid lightgray",
              textAlign: "center",
            }}
            onClick={onZoom}
          >
            <PlusOutlined />
            <br />
            {images.length - 1} 개의 사진 더보기
          </div>
        </div>
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return <div>...구현중...</div>;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
export default PostImages;
