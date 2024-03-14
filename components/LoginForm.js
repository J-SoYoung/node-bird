import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useCallback } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { loginAction } from "../reducers/user";
import { useDispatch } from "react-redux";

const ButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
`;
const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  
  const onSumbitForm = useCallback(() => {
    console.log(id, password, "로그인");
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <>
      <LoginFormWrapper>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input
            name="user-id"
            value={"thdud@aaa.aaa"}
            onChange={onChangeId}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            value={"thdud"}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button
            type="primary"
            onClick={onSumbitForm}
            htmlType="submit"
            loading={false}
          >
            로그인
          </Button>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </ButtonWrapper>
      </LoginFormWrapper>
    </>
  );
};

export default LoginForm;

// 어떤 타입을 써야 하나?
// LoginForm.propTypes = {
//   setIsLoggedIn: PropTypes.string.isRequired,
// };
