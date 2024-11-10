//username의 page
"use client";

import styled from "styled-components";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import Post from "../_component/Post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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
};

export default function Profile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${userId}`,
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
    //id: "jiwon",
    //nickname: "지원",
    image: "/default_profile_img.svg",
    backgroundImage: "/backgroundImage.jpg",
    //message: "welcome to my profile!",
  };

  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const onClickFollow = () => {
    console.log("Follow button clicked");
  };

  const onClickFollowing = () => {
    router.push(`/${userId}/following`);
  };

  const onClickFollowers = () => {
    router.push(`/${userId}/followers`);
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
              <img src={user.image} alt={user.image} />
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
            <UserId>{userProfile?.customId}</UserId>
          </UserName>
          <Message>{userProfile?.introduce}</Message>
          <UserStats>
            <StatButton onClick={onClickFollowing}>
              <BoldText>{userProfile?.followingCount || 0}</BoldText> Following
            </StatButton>
            <StatButton onClick={onClickFollowers}>
              <BoldText>{userProfile?.followerCount || 0}</BoldText> Followers
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

const Main = styled.main`
  width: 600px;
  border-color: #71767b;
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  height: 53px;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
`;

const UserZone = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  z-index: 2;
  background-color: #000;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const UserImage = styled.div`
  display: flex;
  margin-right: 12px;
  width: 134px;
  height: 134px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;
  margin-top: -90px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const UserName = styled.div`
  margin: 0 12px;
  flex-direction: column;
  margin-bottom: 10px;

  > div:first-child {
    font-weight: bold;
    font-size: 20px;
  }

  > div:last-child {
    font-size: 15px;
    color: #71767b;
  }
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const UserId = styled.div`
  font-size: 15px;
  color: #71767b;
`;

const Message = styled.div`
  margin: 0 12px;
  margin-top: 8px;
  font-size: 14px;
  color: white;
`;

const FollowButton = styled.button`
  border: 1px solid rgb(207, 217, 222);
  padding: 0 16px;
  border-radius: 17px;
  height: 34px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  cursor: pointer;
  margin-left: 50%;

  &:hover {
    background-color: rgb(39, 44, 48);
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserStats = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin: 12px;
`;

const EditProfileButton = styled.button`
  border: 1px solid rgb(207, 217, 222);
  padding: 0 16px;
  border-radius: 17px;
  height: 34px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  cursor: pointer;
  margin-left: 50%;

  &:hover {
    background-color: rgb(39, 44, 48);
  }
`;

const StatButton = styled.button`
  color: #71767b;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    text-decoration: none;
  }
`;

const BoldText = styled.span`
  font-weight: bold;
  color: white;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #71767b;
  margin-top: 8px;
  margin-bottom: 8px;
`;
