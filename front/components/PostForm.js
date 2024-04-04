import React, { useCallback, useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
  addPostRequestAction,
} from "../reducers/post";
import useInput from "../hooks/useInput";
import image from "../../back/models/image";

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, resetText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      resetText();
    }
  }, [addPostDone]);

  const onClickimageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert("게시글을 작성하세요");
    }
    const formData = new FormData();
    imagePaths.forEach((p) => formData.append("image", p));
    formData.append("content", text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const onRemoveImage = useCallback((index) => {
    console.log(index);
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <Form
      style={{ margin: "10px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickimageUpload}>이미지업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button onClick={() => onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
