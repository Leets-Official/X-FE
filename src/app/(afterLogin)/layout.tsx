"use client";

import { ReactNode } from "react";
import Link from "next/link";
import XLogo from "../../../public/X.svg";
import PostLogo from "../../../public/ic_small_post.svg";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "./_component/LogoutButton";
import FollowRecommend from "./_component/FollowRecommend";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

type Props = { children: ReactNode; modal: ReactNode; settings: ReactNode };

export default function AfterLoginLayout({ children, modal, settings }: Props) {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <LeftSectionWrapper>
          <LeftSection>
            <LeftSectionFixed>
              <Logo href="/home">
                <LogoPill>
                  <XLogo
                    alt="X.com 로고"
                    className="w-[24px] h-[24px]"
                    fill="currentColor"
                  />
                </LogoPill>
              </Logo>
              <nav>
                <ul>
                  <NavMenu />
                </ul>
                <PostButton href="/compose/post">
                  <span>게시하기</span>
                  <PostLogo
                    className="w-[24px] h-[24px]"
                    fill="currentColor"
                    alt="게시 이미지"
                  />
                </PostButton>
              </nav>
              <LogoutButton />
            </LeftSectionFixed>
          </LeftSection>
        </LeftSectionWrapper>
        <RightSectionWrapper>
          <RightSectionInner>
            <Main>{children}</Main>
            <RightSection>
              <FollowRecommendContainer>
                <h3>Follow Recommend</h3>
                <FollowRecommend />
              </FollowRecommendContainer>
            </RightSection>
          </RightSectionInner>
        </RightSectionWrapper>
        {modal}
        {settings && <SettingsOverlay>{settings}</SettingsOverlay>}
      </ThemeProvider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
  background-color: black;
`;

const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const LeftSectionWrapper = styled.header`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  flex-grow: 1;
`;

const LeftSection = styled.section`
  width: 72px;
  height: 100dvh;

  @media (min-width: 1300px) {
    width: 275px;
  }
`;

const LeftSectionFixed = styled.div`
  position: fixed;
  width: inherit;
  padding: 0 8px;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;

  nav {
    flex: 1;
  }

  @media (min-width: 1300px) {
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  display: inline-block;
  height: 56px;
  margin-top: 2px;
`;

const LogoPill = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const PostButton = styled(Link)`
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
  background-color: rgb(29, 155, 240);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 17px;

  &:hover {
    background-color: rgb(29, 155, 240, 0.9);
  }

  span {
    display: none;
  }

  svg {
    display: inline-block;
    fill: white;
    width: 24px;
  }

  @media (min-width: 1300px) {
    height: 52px;
    width: 234px;
    border-radius: 26px;

    span {
      display: inline-block;
    }

    svg {
      display: none;
    }
  }
`;

const RightSectionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100dvh;
  flex-direction: column;
  flex-grow: 1;
`;

const RightSectionInner = styled.div`
  height: 100%;
  width: 600px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    width: 990px;
  }
`;

const Main = styled.main`
  width: 600px;
  height: 200dvh;
`;

const RightSection = styled.section`
  display: none;

  @media (min-width: 1024px) {
    display: inline-block;
    width: 350px;
    height: 100%;
  }
`;

const FollowRecommendContainer = styled.div`
  font-size: 20px;
  font-weight: bold;
  background-color: black;
  border-radius: 16px;
  margin: 12px 0;
  padding: 12px 16px;

  h3 {
    padding-bottom: 12px;
  }
`;
