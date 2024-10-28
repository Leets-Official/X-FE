"use client"

import styled from "styled-components";
import DefaultProfileImg from "@/app/_asset/default_profile_img.svg";

export default function LogoutButton() {
  const me = { // Temporary user info
    id: 'jini',
    nickname: '이유진',
    image: DefaultProfileImg,
  }

  const onLogout = () => {};

  return (
    <StyledLogoutButton onClick={onLogout}>
      <UserImage>
        <img src={me.image} alt={me.id} />
      </UserImage>
      <UserName>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </UserName>
    </StyledLogoutButton>
  )
}

const StyledLogoutButton = styled.button`
  width: 66px;
  height: 66px;
  padding: 12px;
  display: flex;
  margin: 12px 0;
  cursor: pointer;
  border: none;
  align-items: center;
  background-color: black;
  text-align: left;
  border-radius: 33px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(15, 20, 25, 0.1);
  }

  @media (min-width: 1300px) {
    width: 258px;
  }
`;

const UserImage = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    border-radius: 50%;
  }
`;

const UserName = styled.div`
  display: none;
  margin: 0 12px;

  @media (min-width: 1300px) {
    display: inline-block;

    & > div:first-child {
      font-weight: bold;
    }
  }
`;
