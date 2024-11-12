//username의 page
"use client";

import {
  Main,
  BackgroundImage,
  Header,
  HeaderTitle,
  UserZone,
  ProfileHeader,
  UserImage,
  UserName,
  Nickname,
  UserId,
  Message,
  FollowButton,
  PostList,
  UserStats,
  EditProfileButton,
  StatButton,
  BoldText,
  Divider,
} from "./styles";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import Post from "../_component/Post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { followUser, unfollowUser } from "./api/follow";

type UserProfile = {
  userId: number;
  isMyProfile: boolean;
  name: string;
  customId: string;
  followerCount: number | null;
  followingCount: number | null;
  isFollowing: boolean;
  createdAt: string;
  introduce: string;
  image: string;
};

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    isMyProfile: false,
    name: "",
    customId: "",
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
    createdAt: "",
    introduce: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [myCustomId, setMyCustomId] = useState("");

  const params = useParams();
  const customId = params.username;
  console.log("customId", customId);

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const myId = localStorage.getItem("customId"); //kimjiwon
    const myUserId = localStorage.getItem("userId"); //19 -> 김지원
    const id = sessionStorage.getItem("userId"); //4 -> 이강혁

    console.log(myUserId, myId, id);
    console.log(accessToken);

    if (accessToken) setAccessToken(accessToken);
    if (myId) setMyCustomId(myId); //kimjiwon
    if (id) setUserId(id); //4
  }, []);

  const fetchUserProfile = async () => {
    try {
      const isMyProfile = customId === myCustomId;
      console.log("customId: ", customId);
      console.log("myCustomId: ", myCustomId);
      console.log(isMyProfile);

      const targetUserId = isMyProfile
        ? localStorage.getItem("userId")
        : userId;

      console.log(targetUserId);

      if (!targetUserId || !accessToken) {
        console.log("userId 또는 accessToken이 없습니다.");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);

      const { data } = response.data;

      setUserProfile(data);
    } catch (error) {
      console.log("유저 기본 프로필 조회에 오류가 생겼습니다.", error);
      setError("유저 기본 프로필 조회에 오류가 발생하였습니다.");
    }

    if (error) return <div>{error}</div>;
  };

  const user = {
    // image: "/default_profile_img.svg",
    backgroundImage: "/backgroundImage.jpg",
  };

  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const onClickFollow = async () => {
    if (!userProfile || !userProfile.userId) {
      console.log("userProfile 또는 userProfile.userId가 없습니다.");
      return;
    }

    const result = userProfile.isFollowing
      ? await unfollowUser(userProfile.userId.toString(), accessToken)
      : await followUser(userProfile.userId.toString(), accessToken);

    if (result.success) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        isFollowing: !prevProfile.isFollowing,
        followerCount: prevProfile.isFollowing
          ? (prevProfile.followerCount ?? 0) - 1
          : (prevProfile.followerCount ?? 0) + 1,
      }));
      alert(result.message);
    } else {
      const { errorCode, errorMessage } = result;
      if (errorCode === 404) {
        alert("존재하지 않는 유저입니다.");
      } else if (errorCode === 400) {
        alert(errorMessage || "요청에 오류가 발생했습니다.");
      } else {
        alert(errorMessage || "알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const onClickFollowing = () => {
    router.push(`/${userProfile.customId}/following`);
  };

  const onClickFollowers = () => {
    router.push(`/${userProfile.customId}/followers`);
  };

  const onEditProfile = () => {
    router.push(`/settings/profile`);
  };

  return (
    <TabProvider>
      <Main>
        <Header>
          <BackButton />
          <HeaderTitle>{userProfile?.name}</HeaderTitle>
        </Header>
        <BackgroundImage src={user.backgroundImage} alt="Background Image" />
        <UserZone>
          <ProfileHeader>
            <UserImage>
              <img src={userProfile?.image} alt={userProfile?.image} />
            </UserImage>
            {userProfile?.isMyProfile ? (
              <EditProfileButton onClick={onEditProfile}>
                Edit profile
              </EditProfileButton>
            ) : (
              <FollowButton onClick={onClickFollow}>
                {userProfile?.isFollowing ? "Unfollow" : "Follow"}
              </FollowButton>
            )}
          </ProfileHeader>
          <UserName>
            <Nickname>{userProfile?.name}</Nickname>
            <UserId>@{userProfile?.customId}</UserId>
          </UserName>
          <Message>{userProfile?.introduce}</Message>
          <UserStats>
            <StatButton onClick={onClickFollowing}>
              <BoldText>{userProfile?.followingCount}</BoldText> Following
            </StatButton>
            <StatButton onClick={onClickFollowers}>
              <BoldText>{userProfile?.followerCount}</BoldText> Followers
            </StatButton>
          </UserStats>
        </UserZone>
        <Tab />
        <Divider />
        <PostList>
          <Post />
        </PostList>
      </Main>
    </TabProvider>
  );
}
