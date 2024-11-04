//username의 page
"use client";

import styled from "styled-components";
import BackButton from "../_component/BackButton";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";

export default function Profile() {
  const user = {
    id: "jiwon",
    nickname: "지원",
    image: "/jiwon.jpg",
  };

  return (
    <TabProvider>
      <Main>
        <Header>
          <BackButton />
          <HeaderTitle>{user.nickname}</HeaderTitle>
        </Header>
        <Tab />
        <UserZone>
          <UserImage>
            <img src={user.image} alt={user.id} />
          </UserImage>
          <UserName>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </UserName>
          <FollowButton>팔로우</FollowButton>
        </UserZone>
        <PostList></PostList>
      </Main>
    </TabProvider>
  );
}

const Main = styled.main`
  width: 600px;
  border-color: rgb(239, 243, 244);
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  align-items: center;
  border-bottom: 1px solid rgb(239, 243, 244);
  padding: 12px 16px;
`;

const UserImage = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  border-radius: 50%;

  img {
    width: 134px;
    border-radius: 50%;
  }
`;

const UserName = styled.div`
  margin: 0 12px;
  flex: 1;

  > div:first-child {
    font-weight: bold;
    font-size: 20px;
  }

  > div:last-child {
    font-size: 15px;
  }
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

  &:hover {
    background-color: rgb(39, 44, 48);
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;
