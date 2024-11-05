"use client";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import BackButton from "@/(afterLogin)/_component/BackButton";
import styled from "styled-components";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const MainContainer = styled.main`
  width: 600px;
  min-height: 100dvh;
  border-color: rgb(239, 243, 244);
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 16px;
`;

const Header = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h2`
  margin-left: 40px;
  font-size: 20px;
`;

const UserInfo = styled(Link)`
  padding: 20px 16px 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition-property: background-color;
  transition-duration: 0.2s;
  border-color: rgb(239, 243, 244);
  cursor: pointer;
  border-bottom: 1px solid rgb(239, 243, 244);
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const UserImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const MessageList = styled.div`
  padding-bottom: 24px;
`;

const MessageContent = styled.div<{ isMyMessage: boolean }>`
  line-height: 20px;
  padding: 12px 16px;
  font-size: 15px;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
  border-bottom-left-radius: 22px;
  color: ${({ isMyMessage }) => (isMyMessage ? "white" : "black")};
  background-color: ${({ isMyMessage}) =>
    isMyMessage ? "#0083eb" : "#eff3f4"};
`;

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMyMessage }) => (isMyMessage ? "flex-end" : "flex-start")};
`;

const MessageDate = styled.div`
  margin-top: 8px;
  color: #536471;
  font-size: 13px;
`;

export default function ChatRoom() {
  const user = {
    id: "hero",
    nickname: "영웅",
    image: faker.image.avatar(),
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "zerohch0",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <MainContainer>
      <Header>
        <BackButton />
        <HeaderTitle>{user.nickname}</HeaderTitle>
      </Header>
      <UserInfo href={user.nickname}>
        <UserImage src={user.image} alt={user.id} />
        <div>
          <b>{user.nickname}</b>
        </div>
        <div>@{user.id}</div>
      </UserInfo>
      <MessageList>
        {messages.map((m) => {
          const isMyMessage = m.id === "zerohch0"; // 내 메시지인지 확인
          return (
            <MessageWrapper key={m.messageId} isMyMessage={isMyMessage}>
              <MessageContent isMyMessage={isMyMessage}>
                {m.content}
              </MessageContent>
              <MessageDate>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </MessageDate>
            </MessageWrapper>
          );
        })}
      </MessageList>
    </MainContainer>
  );
}
