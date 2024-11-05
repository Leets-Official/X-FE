"use client"

import styled from "styled-components";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";

const StyledMain = styled.main`
  width: 600px;
  border-color: ${(props) => props.theme.linecolor};
  border-right-width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-right-style: solid;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (min-width: 687px) {
    width: 600px;
  }

  @media (prefers-color-scheme: dark) {
    border-color: rgb(47, 51, 54);
  }
`;

export default function Home() {
  return (
    <StyledMain>
      <TabProvider>
        <Tab />
        <PostForm />
      </TabProvider>
    </StyledMain>
  );
}
