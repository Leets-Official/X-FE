"use client";

import styled from "styled-components";
import DefaultImpage from "../../../../public/default_profile_img.svg";
import Trump from "../../../../public/Trump.png";
import Netflix from "../../../../public/netflix.png";

export default function FollowRecommend() {
  const onFollow = (userId: string) => {
    console.log(`${userId}을(를) 팔로우합니다.`);
  };

  const users = [
    {
      id: "elonmusk",
      nickname: "Elon_Musk",
      image: DefaultImpage,
    },
    {
      id: "넷플릭스",
      nickname: "Netflix",
      image: Trump,
    },
    {
      id: "Donald Trump",
      nickname: "Trump_Trump",
      image: Netflix,
    },
  ];

  return (
    <div>
      {users.map((user) => (
        <Container key={user.id}>
          <UserLogoSection>
            <UserLogo>
              <img src={user.image} alt={user.id} />
            </UserLogo>
          </UserLogoSection>
          <UserInfo>
            <Title>{user.nickname}</Title>
            <Count>@{user.id}</Count>
          </UserInfo>
          <FollowButtonSection>
            <FollowButton onClick={() => onFollow(user.id)}>
              팔로우
            </FollowButton>
          </FollowButtonSection>
        </Container>
      ))}
    </div>
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
