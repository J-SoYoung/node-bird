import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input,  Row, Col } from "antd";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6} gutter={8}>
          왼쪽메뉴
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
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
