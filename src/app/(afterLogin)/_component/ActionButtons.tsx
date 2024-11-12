"use client";
import styled from "styled-components";
import CommentButton from "../../../../public/ic_comment.svg";
import Retweet from "../../../../public/ic_retweet.svg";
import Heart from "../../../../public/ic_heart.svg";
import { useState, useEffect } from "react";

// props 인터페이스 정의
interface ActionButtonsProps {
  reply: number;
  repost: number;
  like: number;
}

export default function ActionButtons({
  reply,
  repost,
  like,
}: ActionButtonsProps) {

  const [commentCount, setCommentCount] = useState<number>(reply || 0);
  const [repostCount, setRepostCount] = useState<number>(repost || 0);
  const [likeCount, setLikeCount] = useState<number>(like || 0);
  const [likeStatus, setLikeStatus] = useState<string>("default");
  const [repostStatus, setRepostStatus] = useState<string>("default");
  const [commented, setCommented] = useState(false);


  useEffect(() => {
    setCommentCount(reply);
    setRepostCount(repost);
    setLikeCount(like);
  }, [reply, repost, like]); 

  const onClickComment = () => {
    setCommentCount((prev) => prev + 1);
    setCommented(!commented);
  };

  const onClickRepost = () => {
    if (repostStatus === "default") {
      setRepostCount((prev) => prev + 1);
      setRepostStatus("reposted");
    } else {
      setRepostCount((prev) => prev - 1);
      setRepostStatus("default");
    }
  };

  const onClickHeart = () => {
    if (likeStatus === "default") {
      setLikeCount((prev) => prev + 1);
      setLikeStatus("liked");
    } else {
      setLikeCount((prev) => prev - 1);
      setLikeStatus("default");
    }
  };

  return (
    <ActionButtonsWrapper>
      <ButtonWrapper
        buttonType={commented ? "commented" : "default"}
        onClick={onClickComment}
      >
        <CommentButton className="w-[24px] h-[24px]" />
        <Count>{commentCount}</Count>
      </ButtonWrapper>

      <ButtonWrapper buttonType={repostStatus} onClick={onClickRepost}>
        <Retweet className="w-[24px] h-[24px]" />
        <Count>{repostCount}</Count>
      </ButtonWrapper>

      <ButtonWrapper buttonType={likeStatus} onClick={onClickHeart}>
        <Heart className="w-[24px] h-[24px]" />
        <Count>{likeCount}</Count>
      </ButtonWrapper>
    </ActionButtonsWrapper>
  );
}

const ActionButtonsWrapper = styled.div`
  width: 505px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  column-gap: 4px;
  margin-left: 5px;
  margin-top: 3%;
`;

const ButtonWrapper = styled.div<{ buttonType: string }>`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  background-color: ${({ buttonType }) =>
    buttonType === "commented"
      ? "rgba(29, 155, 240, 0.1)"
      : buttonType === "reposted"
      ? "rgba(0, 186, 124, 0.1)"
      : buttonType === "liked"
      ? "rgba(249, 24, 128, 0.1)"
      : "transparent"};

  &:hover {
    background-color: ${({ buttonType }) =>
      buttonType === "commented"
        ? "rgba(29, 155, 240, 0.2)"
        : buttonType === "reposted"
        ? "rgba(0, 186, 124, 0.2)"
        : buttonType === "liked"
        ? "rgba(249, 24, 128, 0.2)"
        : "rgba(83, 100, 113, 0.1)"};
  }

  svg {
    fill: ${({ buttonType }) =>
      buttonType === "commented"
        ? "rgb(29, 155, 240)"
        : buttonType === "reposted"
        ? "rgb(0, 186, 124)"
        : buttonType === "liked"
        ? "rgb(249, 24, 128)"
        : "rgb(83, 100, 113)"};
  }
`;

const Count = styled.div`
  margin-left: 5px;
  color: rgb(83, 100, 113);
`;
