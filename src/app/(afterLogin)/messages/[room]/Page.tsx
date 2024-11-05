"use client";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import BackButton from "@/(afterLogin)/_component/BackButton";
import styled from "styled-components";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import MessageForm from "./_component/MessgeForm";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const MainContainer = styled.main`
  width: 600px;
  min-height: 100dvh;
  border-color: ${(props) => props.theme.linecolor};
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
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
  border-color: ${(props) => props.theme.linecolor};
  cursor: pointer;
  border-bottom: 1px solid ${(props) => props.theme.linecolor};;
  margin-bottom: 20px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const UserId = styled.div`
  color: ${(props) => props.theme.linecolor};
  font-size: 13px;
`;

const UserImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const MessageList = styled.div`
  padding-bottom: 24px;
  flex: 1;
  overflow-y: auto; 
`;

const StyledMessageForm = styled(MessageForm)`
  position: sticky;
  bottom: 0;
  background-color: #303336;
  width: 100%;
  padding: 8px;
  border-top: 1px solid ${(props) => props.theme.linecolor};
`;

const MessageContent = styled.div<{ isMyMessage: boolean }>`
  line-height: 20px;
  padding: 12px 16px;
  font-size: 15px;
  border-radius: ${(props) => (props.isMyMessage ? '22px 22px 0 22px' : '22px 22px 22px 0')};
  background-color: ${(props) => (props.isMyMessage ? 'rgb(29, 155, 240)' : '#303336')};
  color: white;
`;


const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMyMessage }) => (isMyMessage ? "flex-end" : "flex-start")};
`;

const MessageDate = styled.div`
  margin-top: 8px;
  color: ${(props) => props.theme.linecolor};
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
          <UserId>@{user.id}</UserId>
        </UserInfo>
        <MessageList>
          {messages.map((m) => {
            const isMyMessage = m.id === "zerohch0";
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
        <StyledMessageForm />
      </MainContainer>
    );
}