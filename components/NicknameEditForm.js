import { Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

const NicknameEditForm = () => {
  const FormWrapper = styled(Form)`
    marign: 20px 0;
    border: 1px solid #d9d9d9;
    padding: 20px;
  `;

  return (
    <FormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </FormWrapper>
  );
};
export default NicknameEditForm;
