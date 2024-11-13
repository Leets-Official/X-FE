"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  postId: number;
  postUserId: string;
};

export default function PostArticle({ children, postUserId, postId }: Props) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${postUserId}/status/${postId}`);
  };

  return <PostContainer onClickCapture={onClick}>{children}</PostContainer>;
}

const PostContainer = styled.article`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  border-bottom-width: 1px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
