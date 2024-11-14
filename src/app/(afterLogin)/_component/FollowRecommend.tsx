"use client";

import styled from "styled-components";

export default function FollowRecommend() {
  const onFollow = () => {};

  const user = {
    id: "elonmusk",
    nickname: "Elon Musk",
    image: "/default_profile_img.svg",
  };

  return (
    <Container>
      <UserLogoSection>
        <UserLogo>
          <img src="/default_profile_img.svg" alt={user.id} />
        </UserLogo>
      </UserLogoSection>
      <UserInfo>
        <Title>{user.nickname}</Title>
        <Count>@{user.id}</Count>
      </UserInfo>
      <FollowButtonSection>
        <FollowButton onClick={onFollow}>팔로우</FollowButton>
      </FollowButtonSection>
    </Container>
  );
}

const Container = styled.div`
  padding: 12px 0;
  height: 66px;
  display: flex;
`;

const UserLogoSection = styled.div`
  margin-right: 12px;
`;

const UserLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 20px;
`;

const Count = styled.div`
  color: rgb(83, 100, 113);
  font-size: 13px;
  line-height: 16px;
`;

const FollowButtonSection = styled.div`
  width: 76px;
`;

const FollowButton = styled.button`
  border: none;
  cursor: pointer;
  width: 100%;
  color: white;
  background: #000;
  font-size: 14px;
  font-weight: bold;
  height: 32px;
  border-radius: 16px;

  &:hover {
    background-color: rgb(39, 44, 48);
  }
`;
