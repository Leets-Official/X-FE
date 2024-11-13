"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Home from "../../../../public/ic_home.svg";
import Message from "../../../../public/ic_message.svg";
import Profile from "../../../../public/ic_profile.svg";
import FillHome from "../../../../public/ic_fill_home.svg";
import FillMessage from "../../../../public/ic_fill_message.svg";
import FillProfile from "../../../../public/ic_fill_profile.svg";
import { useEffect } from "react";
import axios from "axios";

const NavPill = styled.div`
  display: inline-flex;
  height: 50px;
  padding: 12px;
  align-items: center;
  border-radius: 29px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  & > div {
    display: none;
  }

  @media (min-width: 1300px) {
    & > div {
      margin-left: 20px;
      margin-right: 16px;
      font-size: 20px;
      display: inline-block;
    }
  }
`;

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  const customId = localStorage.getItem("customId");
  const accessToken = localStorage.getItem("accesstoken");

  useEffect(() => {
    // API 요청 함수
    const fetchUserProfile = async () => {
      try {
        if (!customId || !accessToken) {
          console.log("customId 또는 accessToken이 없습니다.");
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

        const { data } = response.data;
        console.log("API 응답 데이터:", data);
      } catch (error) {
        console.error("API 요청 중 오류가 발생했습니다:", error);
      }
    };

    fetchUserProfile();
  }, [customId, accessToken]);

  return (
    <>
      <li>
        <Link href="/home">
          <NavPill>
            {segment === "home" ? (
              <>
                <Home
                  alt="홈 이미지"
                  className="w-[24px] h-[24px]"
                  fill="currentColor"
                />
                <div style={{ fontWeight: "bold" }}>Home</div>
              </>
            ) : (
              <>
                <FillHome
                  alt="선택된 홈 이미지"
                  className="w-[24px] h-[24px]"
                  fill="currentColor"
                />
                <div>Home</div>
              </>
            )}
          </NavPill>
        </Link>
      </li>
      <li>
        <Link href="/messages">
          <NavPill>
            {segment === "messages" ? (
              <>
                <Message
                  alt="메세지 이미지"
                  className="w-[24px] h-[24px]"
                  fill="currentColor"
                />
                <div style={{ fontWeight: "bold" }}>Messages</div>
              </>
            ) : (
              <>
                <FillMessage
                  alt="선택된 메시지 이미지"
                  className="w-[24px] h-[24px]"
                  fill="currentColor"
                />
                <div>Messages</div>
              </>
            )}
          </NavPill>
        </Link>
      </li>
      {customId && (
        <li>
          <Link href={`/${customId}`}>
            <NavPill>
              {segment === customId ? (
                <>
                  <Profile
                    alt="프로필 이미지"
                    className="w-[24px] h-[24px]"
                    fill="currentColor"
                  />
                  <div style={{ fontWeight: "bold" }}>Profile</div>
                </>
              ) : (
                <>
                  <FillProfile
                    alt="선택된 프로필 이미지"
                    className="w-[24px] h-[24px]"
                    fill="currentColor"
                  />
                  <div>Profile</div>
                </>
              )}
            </NavPill>
          </Link>
        </li>
      )}
    </>
  );
}
