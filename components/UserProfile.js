import React, { useCallback } from "react";

import { Avatar, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <div key="twit">트윗</div>,
          <div key="followings">팔로잉</div>,
          <div key="follower">팔로우</div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>SY</Avatar>}
          title="SoYoung"
          description="This is the description"
        />
      </Card>
      <Button onClick={onLogOut}>로그아웃</Button>
    </>
  );
};

export default UserProfile;

// 어떤 타입을 써야 하나?
// UserProfile.propTypes = {
//   setIsLoggedIn: PropTypes.string.isRequired,
// };
