import React, { useCallback, useEffect } from "react";

import { Avatar, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestsAction } from "../reducers/user";
import Link from "next/link";

const UserProfile = ({ me }) => {
  const dispatch = useDispatch();
  const { logOutLoading } = useSelector((state) => state.user);

  // useEffect(() => {}, [me]);
  // console.log(me);

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
          // <Link key={idx} href={`/hashtag/${v.slice(1)}`}>
          //   {v}
          // </Link>
          <Link key="twit" href={`/user/${me.id}`}>
            포스트 <br /> {me.Posts.length}
          </Link>,
          <div key="followings">
            팔로잉 <br />
            {me.Followings.length}
          </div>,
          <div key="follower">
            팔로우 <br />
            {me.Followers.length}
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

// 어떤 타입을 써야 하나?
// UserProfile.propTypes = {
//   setIsLoggedIn: PropTypes.string.isRequired,
// };
