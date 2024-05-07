import React from "react";
import Head from "next/head";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../reducers/user";
import { Avatar, Card } from "antd";

import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import axios from "axios";

const About = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  
  return (
    <AppLayout>
      <Head>
        <title> 유저정보 </title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_USER_REQUEST,
      data: 3,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default About;
