import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

import Head from "next/head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

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
      <FollowList header="팔로잉" data={me.Followings ? me.Followings : "0"} />
      <FollowList header="팔로워" data={me.Followers ? me.Followers : "0"} />
    </AppLayout>
  );
};

export default Profile;
