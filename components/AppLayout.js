import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Menu, Input, Row, Col } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const MainWrapper = styled(Col)`
  min-height: 500px;
  background-color: #eee;
`;
const InputSearch = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      <Head>
        <title>NodeBird</title>
      </Head>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <InputSearch enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} gutter={8}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <MainWrapper xs={24} md={12}>
          {children}
        </MainWrapper>
        <Col xs={24} md={6}>
          <a
            href="https://j-soyoung.github.io/"
            target="blank"
            rel="noreferrer noopener"
          >
            made by SoYoung
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
