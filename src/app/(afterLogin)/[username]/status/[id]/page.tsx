"use client"; // 클라이언트 전용 코드로 명시

import BackButton from "@/(afterLogin)/_component/BackButton";
import Post from "@/(afterLogin)/_component/Post";
import CommentForm from "./_component/CommentForm";
import styled from "styled-components";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostDetails } from "@/_service/post";

export default function SinglePost() {
  const [postId, setPostId] = useState<number | undefined>(undefined);
  const [posts, setPosts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  // id를 숫자로 변환(params에서 가져올 때는 string으로 가져와서)
  useEffect(() => {
    if (id) {
      const numericPostId = parseInt(id, 10);
      if (!isNaN(numericPostId)) {
        setPostId(numericPostId);
      } else {
        console.error("Invalid postId");
      }
    }
  }, [id]);

  // postId 변경시 api 재실행
  useEffect(() => {
    const getDetails = async () => {
      try {
        if (postId) {
          const data = await getPostDetails(postId);
          setPosts(data);
        } else {
          console.error("Invalid postId");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <Header>
        <BackButton />
        <HeaderTitle>게시하기</HeaderTitle>
      </Header>
      <Post post={posts} />
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
