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
import { useEffect, useState } from "react";

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
  const [customId, setCustomId] = useState("");

  const navMenucustomId = localStorage.getItem("customId");

  useEffect(() => {
    console.log("customIdddddddd", navMenucustomId);

    if (customId) {
      setCustomId(customId);
    }
  }, [navMenucustomId]);

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
