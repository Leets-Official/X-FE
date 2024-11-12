import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styled from "styled-components";
import Link from "next/link";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import ActionButtons from "./ActionButtons";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({ post }: { post: any }) {

 // console.log(post);

  // 이미지 유효하지 않은 경우 디폴트 이미지 적용
  const profileImageUrl = post?.user?.profileImage?.link || "/default_profile_img.svg";

  return (
    <PostArticle postUserId={post?.user?.customId} postId={post?.id}>
      <PostWrapper>
        <PostUserSection>
          <Link href={`/${post?.user?.customId}`} passHref>
            <PostUserImage>
              <img src={profileImageUrl} alt={post?.user?.name || 'User'} />
              <PostShade />
            </PostUserImage>
          </Link>
        </PostUserSection>
        <PostBody>
          <PostMeta>
            <Link href={`/${post?.user?.customId}`} passHref>
              <span>{post?.user?.name}</span>
              &nbsp;
              <span>{post?.user?.customId}</span>
              &nbsp;·&nbsp;
            </Link>
            <PostDate>{post?.createdAt}</PostDate>
          </PostMeta>
          <div>{post?.content}</div>
          <PostImages post={post} />
          <ActionButtons />
        </PostBody>
      </PostWrapper>
    </PostArticle>
  );
}

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
