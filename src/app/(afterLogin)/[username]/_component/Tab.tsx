"use client";

import { useState } from "react";
import styled from "styled-components";

export default function Tab() {
  const [tab, setTab] = useState("post");

  const onClickPost = () => {
    setTab("post");
  };
  const onClickLike = () => {
    setTab("like");
  };

  return (
    <Main>
      <HomeTab>
        <TabOption onClick={onClickPost}>
          게시물
          <TabIndicator hidden={tab === "like"} />
        </TabOption>
        <TabOption onClick={onClickLike}>
          마음에 들어요
          <TabIndicator hidden={tab === "post"} />
        </TabOption>
      </HomeTab>
    </Main>
  );
}

const Main = styled.main`
  width: 600px;
  border-color: rgb(239, 243, 244);
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const HomeTab = styled.div`
  height: 53px;
  display: flex;
`;

const TabOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgba(15, 20, 25, 0.1);
  }
`;

const TabIndicator = styled.div`
  height: 4px;
  align-self: center;
  background-color: rgb(29, 155, 240);
  min-width: 56px;
  width: 56px;
  position: absolute;
  bottom: 0px;
  border-radius: 9999px;
`;
