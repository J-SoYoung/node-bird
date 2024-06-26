import { Form, Input } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");

  const onSubmit = useCallback(() => {
    console.log(nickname);
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px",
      }}
    >
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
};
export default NicknameEditForm;
