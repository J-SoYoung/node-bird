import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { loginRequestsAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const ButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
`;
const LoginFormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginDone, me, loginError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (loginDone) {
      resetEmail();
      resetPassword();
    }
  }, [loginDone]);

  const [email, onChangeEmail, resetEmail] = useInput("");
  const [password, onChangePassword, resetPassword] = useInput("");

  const onSumbitForm = useCallback(() => {
    dispatch(loginRequestsAction({ email, password }));
  }, [email, password]);

  return (
    <>
      <LoginFormWrapper>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            type="email"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <ButtonWrapper>
          <Button
            type="primary"
            onClick={onSumbitForm}
            htmlType="submit"
            loading={loginLoading}
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
