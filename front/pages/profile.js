import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { END } from "redux-saga";

import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";


const Profile = () => {
  const dispatch = useDispatch();
  const {
    me,
    followersInfo,
    followingsInfo,
    loadFollowersError,
    loadFollowingsError,
  } = useSelector((state) => state.user);

  console.log(followersInfo, followingsInfo);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }

    if (!me) return <div>내 정보 로딩중</div>;

    if (loadFollowersError || loadFollowingsError) {
      return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>;
    }
  }, [
    me && me.id,
    followersInfo,
    followingsInfo,
    loadFollowersError,
    loadFollowingsError,
  ]);

  return (
    <AppLayout>
      <Head>
        <title>내 프로필</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={followingsInfo} />
      <FollowList header="팔로워" data={followersInfo} />
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
      type: LOAD_FOLLOWERS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
