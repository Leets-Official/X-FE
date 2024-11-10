"use client";
import styled from "styled-components";
import BackButton from "@/(afterLogin)/_component/BackButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

interface TabItemProps {
  active: boolean;
}

type Following = {
  id: number;
  name: string;
  customId: string;
  introduce: string;
  image: string;
};

export default function Following() {
  const [following, setFollowing] = useState<Following[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

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

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/follows/following/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      const data = response.data.data;
      if (Array.isArray(data)) {
        setFollowing(data);
      } else {
        setFollowing([]);
      }
    } catch (error) {
      console.log("팔로워 목록 조회 오류 발생", error);
      setError("팔로워 목록을 불러올 수 없습니다.");
      setFollowing([]);
    }

    if (error) return <div>{error}</div>;
  };

  useEffect(() => {
    fetchFollowing();
  }, [userId]);

  const router = useRouter();

  const onClickFollowers = () => {
    router.push(`/${userId}/followers`);
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Title>{userId}</Title>
      </Header>
      <TabMenu>
        <TabItem onClick={onClickFollowers} active={false}>
          Followers
        </TabItem>
        <TabItem active={true}>Following</TabItem>
      </TabMenu>
      <Divider />
      <FollowingList>
        {following && following.length > 0 ? (
          following.map((user) => (
            <FollowingItem key={user.customId}>
              <ProfileImage src={user.image} alt={user.name} />
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserHandle>{user.customId}</UserHandle>
              </UserInfo>
              <FollowButton>Following</FollowButton>
            </FollowingItem>
          ))
        ) : (
          <NoFollowing>팔로잉 하는 사람이 없습니다.</NoFollowing>
        )}
      </FollowingList>
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  width: 600px;
  border-color: #71767b;
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
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

const NoFollowing = styled.div`
  text-align: center;
  color: white;
  padding: 16px 0;
`;
