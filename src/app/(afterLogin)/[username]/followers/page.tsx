"use client";
import styled from "styled-components";
import BackButton from "@/(afterLogin)/_component/BackButton";
import { useRouter } from "next/navigation";

interface TabItemProps {
  active: boolean;
}

export default function Followers() {
  const user = {
    id: "@jiwon",
    nickname: "지원",
    image: "/default_profile_img.svg",
  };

  const followingList = [
    {
      id: "JzunyY123",
      name: "문석준/기계·스마트·산업공학부(산업공학전공)",
      profileImage: "/default_profile_img.svg",
    },
    {
      id: "NetflixKR",
      name: "Netflix Korea | 넷플릭스 코리아",
      profileImage: "/default_profile_img.svg",
    },
  ];

  const router = useRouter();

  const onClickFollowing = () => {
    router.push(`/${user.id}/following`);
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Title>{user.id}</Title>
      </Header>
      <TabMenu>
        <TabItem active={true}>Followers</TabItem>
        <TabItem onClick={onClickFollowing} active={false}>
          Following
        </TabItem>
      </TabMenu>
      <Divider />
      <FollowingList>
        {followingList.map((user) => (
          <FollowingItem key={user.id}>
            <ProfileImage src={user.profileImage} alt={user.name} />
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserHandle>@{user.id}</UserHandle>
            </UserInfo>
            <FollowButton>Following</FollowButton>
          </FollowingItem>
        ))}
      </FollowingList>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #71767b;
`;

const TabItem = styled.div<TabItemProps>`
  font-size: 16px;
  color: white;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #1da1f2" : "none")};
`;

const FollowingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FollowingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-top: 1px solid #333;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const UserHandle = styled.div`
  color: #999;
  font-size: 14px;
`;

const FollowButton = styled.button`
  border: 1px solid #333;
  border-radius: 20px;
  padding: 6px 12px;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
