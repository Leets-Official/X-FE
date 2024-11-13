"use client";

import { faker } from "@faker-js/faker";
import Link from "next/link";
import BackButton from "@/(afterLogin)/_component/BackButton";
import styled from "styled-components";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import MessageForm from "./_component/MessgeForm";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Message {
  roomId: number;
  senderId: number;
  senderName: string;
  content: string;
}

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
  border-bottom: 1px solid ${(props) => props.theme.linecolor};
  margin-bottom: 20px;
  cursor: pointer;

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
  padding: 12px 16px;
  font-size: 15px;
  border-radius: ${(props) =>
    props.isMyMessage ? "22px 22px 0 22px" : "22px 22px 22px 0"};
  background-color: ${(props) =>
    props.isMyMessage ? "rgb(29, 155, 240)" : "#303336"};
  color: white;
`;

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMyMessage }) =>
    isMyMessage ? "flex-end" : "flex-start"};
  margin-bottom: 8px;
`;

export default function ChatRoom() {
  const user = {
    id: "hero",
    nickname: "영웅",
    image: faker.image.avatar(),
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const roomId = 6;
  const currentUserId = 4;
  const currentUserName = "testtest";

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_CHAT_API_BASE_URL}/ws`
    );
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      debug: (str) => console.log("[STOMP Debug]:", str),
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("[Connected]:", frame);

        client.subscribe(`/sub/chats/${roomId}`, (message) => {
          const messageData: Message = JSON.parse(message.body);

          setMessages((prevMessages) => [...prevMessages, messageData]);
        });
      },
      onStompError: (frame) => {
        console.error("[STOMP Error]:", frame.headers["message"]);
        console.error("[Error Details]:", frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (message: {
    roomId: number;
    senderId: number;
    senderName: string;
    content: string;
  }) => {
    if (stompClient && stompClient.connected) {
      // 메시지를 바로 로컬 상태에 추가
      setMessages((prevMessages) => [...prevMessages, message]);
      stompClient.publish({
        destination: "/pub/chats/messages",
        body: JSON.stringify(message),
      });
      console.log("[메시지 전송]:", message);
    } else {
      console.error("[STOMP 클라이언트가 연결되지 않았습니다]");
    }
  };

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
      <MessageList id="message-list">
        {messages.map((message, index) => {
          const isMyMessage = message.senderId === currentUserId;
          return (
            <MessageWrapper key={index} isMyMessage={isMyMessage}>
              <MessageContent isMyMessage={isMyMessage}>
                {message.content}
              </MessageContent>
            </MessageWrapper>
          );
        })}
      </MessageList>
      <StyledMessageForm
        onSend={sendMessage}
        roomId={roomId}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
      />
    </MainContainer>
  );
}
