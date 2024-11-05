//username의 page
"use client";

import styled from "styled-components";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import Post from "../_component/Post";
import { useRouter } from "next/navigation";

export default function Profile() {
  const user = {
    id: "jiwon",
    nickname: "지원",
    image: "/default_profile_img.svg",
    backgroundImage: "/backgroundImage.jpg",
    message: "welcome to my profile!",
  };

  const followingList = [
    { id: "JzunyY123", name: "문석준", profileImage: "/jiwon.jpg" },
    { id: "NetflixKR", name: "Netflix Korea", profileImage: "/jiwon.jpg" },
  ];

  const followerList = [
    { id: "JzunyY123", name: "문석준", profileImage: "/jiwon.jpg" },
    { id: "NetflixKR", name: "Netflix Korea", profileImage: "/jiwon.jpg" },
  ];

  const currentUserId = "jiwon";
  const isOwnProfile = user.id === currentUserId;

  const router = useRouter();

  const onClickFollowing = () => {
    router.push(`/${user.id}/following`);
  };

  const onClickFollowers = () => {
    router.push(`/${user.id}/followers`);
  };

  return (
    <TabProvider>
      <Main>
        <Header>
          <BackButton />
          <HeaderTitle>{user.nickname}</HeaderTitle>
        </Header>
        <BackgroundImage src={user.backgroundImage} alt="Background Image" />
        <UserZone>
          <ProfileHeader>
            <UserImage>
              <img src={user.image} alt={user.id} />
            </UserImage>
            {isOwnProfile ? (
              <EditProfileButton>Edit profile</EditProfileButton>
            ) : (
              <FollowButton>Follow</FollowButton>
            )}
          </ProfileHeader>
          <UserName>
            <Nickname>{user.nickname}</Nickname>
            <UserId>@{user.id}</UserId>
          </UserName>
          <Message>{user.message}</Message>
          <UserStats>
            <StatButton onClick={onClickFollowing}>
              <BoldText>{followingList.length}</BoldText> Following
            </StatButton>
            <StatButton onClick={onClickFollowers}>
              <BoldText>{followerList.length}</BoldText> Followers
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
