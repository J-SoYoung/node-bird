import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Router from "next/router";
import Head from "next/head";
import { END } from "redux-saga";

import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  console.log(me);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) return null;

  return (
    <AppLayout>
      <Head>
        <title>내 프로필</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉" data={me.Followings} />
      <FollowList header="팔로워" data={me.Followers} />
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;
