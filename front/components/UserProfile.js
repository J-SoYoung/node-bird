import React, { useCallback, useEffect } from "react";

import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestsAction } from "../reducers/user";
import Link from "next/link";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestsAction());
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
          <div key="twit">
            <Link href={`/user/${me.id}`}>
              포스트 <br />
              {me.Posts.length}
            </Link>
          </div>,
          <div key="followings">
            <Link href={`/profile`}>
              팔로잉 <br />
              {me.Followings.length}
            </Link>
          </div>,
          <div key="follower">
            <Link href={`/profile`}>
              팔로우 <br />
              {me.Followers.length}
            </Link>
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me?.nickname}
        />
      </Card>
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </>
  );
};

export default UserProfile;
