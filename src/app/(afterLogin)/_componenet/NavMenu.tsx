"use client"; 
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Home from "@/app/_asset/ic_home.svg";
import Message from "@/app/_asset/ic_message.svg";
import Profile from "@/app/_asset/ic_profile.svg";
import FillHome from "@/app/_asset/ic_fill_home.svg";
import FillMessage from "@/app/_asset/ic_fill_message.svg";
import FillProfile from "@/app/_asset/ic_fill_profile.svg";

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
  const me = { id: "jini" }; // Temporary user info

  return (
    <>
      <li>
        <Link href="/home">
          <NavPill>
            {segment === "home" ? (
              <>
                <Home alt="홈 이미지" className="w-[24px] h-[24px]" fill="currentColor"  />
                <div style={{ fontWeight: "bold" }}>Home</div>
              </>
            ) : (
              <>
                <FillHome alt="선택된 홈 이미지" className="w-[24px] h-[24px]" fill="currentColor"  />
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
                <Message alt="메세지 이미지" className="w-[24px] h-[24px]" fill="currentColor"  />
                <div style={{ fontWeight: "bold" }}>Messages</div>
              </>
            ) : (
              <>
                <FillMessage alt="선택된 메시지 이미지" className="w-[24px] h-[24px]" fill="currentColor"  />
                <div>Messages</div>
              </>
            )}
          </NavPill>
        </Link>
      </li>
      {me?.id && (
        <li>
          <Link href={`/${me?.id}`}>
            <NavPill>
              {segment === me.id ? (
                <>
                  <Profile alt="프로필 이미지" className="w-[24px] h-[24px]" fill="currentColor"  />
                  <div style={{ fontWeight: "bold" }}>Profile</div>
                </>
              ) : (
                <>
                  <FillProfile alt="선택된 프로필 이미지" className="w-[24px] h-[24px]" fill="currentColor" />
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
