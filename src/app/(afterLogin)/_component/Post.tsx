import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styled from "styled-components";
import Link from "next/link";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
};
export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "jiwon",
      nickname: "지원",
      image: "/jiwon.jpg",
    },
    content: "X 클론코딩 하는 중",
    createdAt: new Date(),
    Images: [
      {
        imageId: 1,
        link: "/jiwon.jpg",
      },
    ],
  };
  return (
    <PostArticle post={target}>
      <PostWrapper>
        <PostUserSection>
          <Link href={`/${target.User.id}`} passHref>
            <PostUserImage>
              <img src={target.User.image} alt={target.User.nickname} />
              <PostShade />
            </PostUserImage>
          </Link>
        </PostUserSection>
        <PostBody>
          <PostMeta>
            <Link href={`/${target.User.id}`} passHref>
              <span>{target.User.nickname}</span>
              &nbsp;
              <span>@{target.User.id}</span>
              &nbsp;·&nbsp;
            </Link>
            <PostDate>{dayjs(target.createdAt).fromNow(true)}</PostDate>
          </PostMeta>
          <div>{target.content}</div>
          <PostImages post={target} />
          <ActionButtons />
        </PostBody>
      </PostWrapper>
    </PostArticle>
  );
}

// Styled Components
const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostUserSection = styled.div`
  margin-right: 12px;
  width: 40px;
`;

const PostUserImage = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`;

const PostShade = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;

  &:hover {
    background-color: rgba(26, 26, 26, 0.15);
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostDate = styled.span`
  color: rgb(83, 100, 113);

  &:hover {
    text-decoration: underline;
  }
`;
