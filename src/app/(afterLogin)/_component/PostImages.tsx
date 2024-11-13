import {
  PostImageSection,
  SingleImageLink,
  TwoImageWrapper,
  ImageLink,
  ThreeImageWrapper,
  ThreeImageColumn,
  FourImageWrapper,
  FourImageLink,
} from "./PostStyle";

type Image = {
  id: number;
  url: string;
};

type Props = {
  post: {
    postId: number;
    content: string;
    user: {
      userId: number;
      name: string;
      customId: string;
      profileImage: {
        name: string;
        url: string;
      };
    };
    createdAt: string;
    images: Image[];
  };
};

export default function PostImages({ post }: Props) {
  if (!post?.images || post?.images.length === 0) return null;

  console.log(post.images); // post.images가 제대로 출력되는지 확인

  if (post.images.length === 1) {
    const image = post.images[0];
    return (
      <PostImageSection>
        <SingleImageLink
          href={`/${post.user.customId}/status/${post.postId}/photo/${image.id}`}
          style={{ backgroundImage: `url(${image.url})` }}
        >
          <img src={image.url} alt={`image-${image.id}`} />
        </SingleImageLink>
      </PostImageSection>
    );
  }

  if (post.images.length === 2) {
    return (
      <PostImageSection>
        <TwoImageWrapper>
          {post.images.map((image) => (
            <ImageLink
              key={image.id}
              href={`/${post.user.customId}/status/${post.postId}/photo/${image.id}`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          ))}
        </TwoImageWrapper>
      </PostImageSection>
    );
  }

  if (post.images.length === 3) {
    return (
      <PostImageSection>
        <ThreeImageWrapper>
          <ImageLink
            href={`/${post.user.customId}/status/${post.postId}/photo/${post.images[0].id}`}
            style={{ backgroundImage: `url(${post.images[0]?.url})` }}
          />
          <ThreeImageColumn>
            <ImageLink
              href={`/${post.user.customId}/status/${post.postId}/photo/${post.images[1].id}`}
              style={{ backgroundImage: `url(${post.images[1]?.url})` }}
            />
            <ImageLink
              href={`/${post.user.customId}/status/${post.postId}/photo/${post.images[2].id}`}
              style={{ backgroundImage: `url(${post.images[2]?.url})` }}
            />
          </ThreeImageColumn>
        </ThreeImageWrapper>
      </PostImageSection>
    );
  }

  if (post.images.length === 4) {
    return (
      <PostImageSection>
        <FourImageWrapper>
          {post.images.map((image) => (
            <FourImageLink
              key={image.id}
              href={`/${post.user.customId}/status/${post.postId}/photo/${image.id}`}
              style={{ backgroundImage: `url(${image.url})` }}
            />
          ))}
        </FourImageWrapper>
      </PostImageSection>
    );
  }

  return null;
}
