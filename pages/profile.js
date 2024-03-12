import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followList = [
    { nickname: "thdud" },
    { nickname: "young" },
    { nickname: "wwntml" },
  ];
  const followingList = [
    { nickname: "thdud222" },
    { nickname: "young222" },
    { nickname: "wwntml222" },
  ];

  return (
    <AppLayout>
      <Head>
        <title>내 프로필</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followList} />
      <FollowList header="팔로워 목록" data={followingList} />
    </AppLayout>
  );
};

export default Profile;
