"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    id: "",
    nickname: "",
    image: "/default_profile_img.svg",
  });
  // 사용자 프로필 정보 불러오기 함수
  const fetchUserProfile = async () => {
    try {
      if (typeof window === "undefined") {
        console.log("서버 환경에서는 localStorage에 접근할 수 없습니다.");
        return;
      }

      const accessToken = localStorage.getItem("accesstoken");
      const customId = localStorage.getItem("customId");

      if (!accessToken || !customId) {
        console.log("accessToken 또는 customId 없습니다.");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${customId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const imageUrl =
        response.data.data.profileImage?.url || "/default_profile_img.svg";
      const nickname = response.data.data.name || "Unknown User";
      const id = response.data.data.customId || "";

      localStorage.setItem("customId", id);

      console.log("로그아웃 버튼", response.data);

      setUserProfile({
        id,
        nickname,
        image: imageUrl,
      });

      console.log("User profile fetched: ", response.data);
    } catch (error) {
      console.error("유저 프로필 조회에 실패했습니다: ", error);
    }
  };

  // 컴포넌트 마운트 시 사용자 프로필 정보 불러오기
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onLogout = () => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      // 로그아웃 로직
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("customId");
      localStorage.removeItem("userId");

      router.push(`/`);
    } else {
      console.error(
        "브라우저 환경이 아니어서 localStorage에 접근할 수 없습니다."
      );
    }
  };

  return (
    <StyledLogoutButton onClick={onLogout}>
      <UserImage>
        <img
          src={userProfile.image}
          width={40}
          height={40}
          alt="프로필 이미지"
        />
      </UserImage>
      <UserName>
        <div>{userProfile.nickname}</div>
        <div>@{userProfile.id}</div>
      </UserName>
    </StyledLogoutButton>
  );
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
    background-color: rgba(255, 255, 255, 0.1);
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
    height: 40px;
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
