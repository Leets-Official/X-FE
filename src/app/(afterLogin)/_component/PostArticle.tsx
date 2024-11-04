"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return <PostContainer onClickCapture={onClick}>{children}</PostContainer>;
}

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(239, 243, 244);
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
