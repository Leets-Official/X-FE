import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import styled from "styled-components";
import Link from "next/link";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import ActionButtons from "./ActionButtons";

dayjs.extend(relativeTime);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Post({ post }: { post: any }) {
  const createdAt = dayjs(post?.createdAt);
  const now = dayjs(); // 현재 시간

  const timeDifference = now.diff(createdAt, "hour");

  let formattedTime;
  if (timeDifference < 24) {
    // 24시간 이내면 'nh'와 같은 형식으로 표시
    formattedTime = `${timeDifference}h`;
  } else {
    // 하루 이상 차이가 나면 'Nov 9'과 같은 날짜 형식으로 표시
    formattedTime = createdAt.format("MMM D");
  }

  // 이미지 유효하지 않은 경우 디폴트 이미지 적용
 const profileImageUrl = post?.user?.profileImage?.url || "/default_profile_img.svg";

  return (
    <Main>
      <PostArticle postUserId={post?.user?.customId} postId={post?.id}>
        <PostWrapper>
          <PostUserSection>
            <Link href={`/${post?.user?.customId}`} passHref>
              <PostUserImage>
                <img src={profileImageUrl} alt={post?.user?.name || "User"} />
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
              <PostDate>{formattedTime}</PostDate>
            </PostMeta>
            <div>{post?.content}</div>
            <PostImages post={post} />
          </PostBody>
        </PostWrapper>
      </PostArticle>
      <ActionButtons
        reply={post?.replyCount}
        repost={post?.repostCount}
        like={post?.likeCount}
        postId={post?.id}
        isLikedByUser={post?.isLikedByUser}
      />
    </Main>
  );
}

const Main = styled.div`
  border-bottom: 1px solid rgb(239, 243, 244);
`;

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
