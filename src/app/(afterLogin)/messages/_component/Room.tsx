"use client";

import styled from "styled-components";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Room() {
  const router = useRouter();
  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      { roomId: 1, content: "안녕하세요.", createdAt: new Date() },
      { roomId: 2, content: "안녕히가세요.", createdAt: new Date() },
    ],
  };

  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };

  return (
    <RoomContainer onClickCapture={onClick}>
      <RoomUserImage>
        {/* 일단 랜덤 이미지 넣어놓고 나중에 서버에서 가져오는 이미지로 변경할 예정 */}
        <img src={faker.image.avatar()} alt="" />
      </RoomUserImage>
      <RoomChatInfo>
        <RoomUserInfo>
          <UserName>{user.nickname}</UserName>
          &nbsp;
          <span>@{user.id}&nbsp;·&nbsp;</span>
          <PostDate>{dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}</PostDate>
        </RoomUserInfo>
        <div>{user.Messages?.at(-1)?.content}</div>
      </RoomChatInfo>
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  transition: background-color 0.2s;
  border-color: rgb(239, 243, 244);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const RoomUserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const RoomChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.linecolor};
  font-size: 15px;

  b {
    color: black;
  }
`;

const UserName = styled.div`
  color: #ffff;
  font-weight: bold;
`

const RoomUserInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
  span {
    color: ${(props) => props.theme.linecolor};
  }
`;

const PostDate = styled.span`
  color: ${(props) => props.theme.linecolor};
`;
