import React, { useCallback, useState } from "react";
import useInput from "../hooks/useInput";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail, resetEmail] = useInput("");
  const [nickname, onChangeNickname, resetNickname] = useInput("");
  const [password, onChangePassword, resetPassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password, passwordCheck]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
  };

  const onSumbit = useCallback(() => {
    if (password !== passwordCheck) return setPasswordError(true);
    if (!term) return setTermError(true);
    console.log(email, nickname, password, term);

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    });

    resetEmail();
    resetNickname();
    resetPassword();
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSumbit}>
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
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            type="text"
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
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
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            type="password"
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
        </div>
        {passwordError && (
          <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
        )}
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            Young와 프로그래밍 공부 하시겠습니까?
          </Checkbox>
          {termError && (
            <ErrorMessage>이용약관에 동의하셔야 합니다</ErrorMessage>
          )}
        </div>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            loading={signUpLoading}
            style={{ margin: "20px 0" }}
          >
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
