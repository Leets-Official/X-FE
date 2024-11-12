"use client"

import styled from "styled-components";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import Post from "../_component/Post";
import { getAllPosts } from "@/_service/post";
import { useEffect, useState } from "react";

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
  const [posts, setPosts] = useState<any[]>([]); // 게시물 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getAllPosts(); // fetchPosts 함수 실행
        setPosts(data); // 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  return (
    <StyledMain>
      <TabProvider>
        <Tab />
        <PostForm />
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        ) : (
          // 게시물 없음
          <div> </div>
        )}
      </TabProvider>
    </StyledMain>
  );
}