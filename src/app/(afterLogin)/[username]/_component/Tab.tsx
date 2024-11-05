"use client";

import { useContext } from "react";
import styled from "styled-components";
import { TabContext } from "./TabProvider";

export default function Tab() {
  const tabContext = useContext(TabContext);

  const { tab, setTab } = tabContext;

  const onClickPost = () => {
    setTab("post");
  };
  const onClickLike = () => {
    setTab("like");
  };

  return (
    <Main>
      <HomeTab>
        <TabOption onClick={onClickPost} isSelected={tab === "post"}>
          게시물
          {tab === "post" && <TabIndicator />}
        </TabOption>
        <TabOption onClick={onClickLike} isSelected={tab === "like"}>
          마음에 들어요
          {tab === "like" && <TabIndicator />}
        </TabOption>
      </HomeTab>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: none;
`;

const HomeTab = styled.div`
  height: 53px;
  display: flex;
  border: none;
`;

interface TabOptionProps {
  isSelected: boolean;
}

const TabOption = styled.div<TabOptionProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.isSelected ? "white" : "#71767b")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  border: none;

  &:hover {
    background-color: rgba(15, 20, 25, 0.1);
  }
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  height: 3px;
  width: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(29, 155, 240);
  border-radius: 9999px;
`;
