//[username]의 개별 게시물 확인 시
"use client";

import BackButton from "@/(afterLogin)/_component/BackButton";
import Post from "@/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";
import styled from "styled-components";

export default function SinglePost() {
  return (
    <Main>
      <Header>
        <BackButton />
        <HeaderTitle>게시하기</HeaderTitle>
      </Header>
      <Post />
      <CommentForm />
    </Main>
  );
}

const Main = styled.div`
  width: 600px;
  border-color: rgb(239, 243, 244);
  border-right: 1px solid;
  border-left: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  display: flex;
  height: 53px;
  align-items: center;
`;

const HeaderTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
`;
