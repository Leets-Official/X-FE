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
  imageId: number;
  link: string;
};

type Props = {
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: Image[];
  };
};

export default function PostImages({ post }: Props) {
  if (!post.Images || post.Images.length === 0) return null;

  if (post.Images.length === 1) {
    const image = post.Images[0];
    return (
      <PostImageSection>
        <SingleImageLink
          href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
          style={{ backgroundImage: `url(${image.link})` }}
        >
          <img src={image.link} alt={`image-${image.imageId}`} />
        </SingleImageLink>
      </PostImageSection>
    );
  }

  if (post.Images.length === 2) {
    return (
      <PostImageSection>
        <TwoImageWrapper>
          {post.Images.map((image) => (
            <ImageLink
              key={image.imageId}
              href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
              style={{ backgroundImage: `url(${image.link})` }}
            />
          ))}
        </TwoImageWrapper>
      </PostImageSection>
    );
  }

  if (post.Images.length === 3) {
    return (
      <PostImageSection>
        <ThreeImageWrapper>
          <ImageLink
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
            style={{ backgroundImage: `url(${post.Images[0]?.link})` }}
          />
          <ThreeImageColumn>
            <ImageLink
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
              style={{ backgroundImage: `url(${post.Images[1]?.link})` }}
            />
            <ImageLink
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
              style={{ backgroundImage: `url(${post.Images[2]?.link})` }}
            />
          </ThreeImageColumn>
        </ThreeImageWrapper>
      </PostImageSection>
    );
  }

  if (post.Images.length === 4) {
    return (
      <PostImageSection>
        <FourImageWrapper>
          {post.Images.map((image) => (
            <FourImageLink
              key={image.imageId}
              href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
              style={{ backgroundImage: `url(${image.link})` }}
            />
          ))}
        </FourImageWrapper>
      </PostImageSection>
    );
  }

  return null;
}
