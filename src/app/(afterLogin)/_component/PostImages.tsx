import Link from "next/link";
import styled from "styled-components";

type Image = {
  link: string;
  imageId: number;
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
  if (!post.Images || !post.Images.length) return null;

  const renderImages = () => {
    switch (post.Images.length) {
      case 1:
        return (
          <SingleImage
            style={{ backgroundImage: `url(${post.Images[0]?.link})` }}
          >
            <img src={post.Images[0]?.link} alt="" />
          </SingleImage>
        );
      case 2:
        return (
          <DoubleImage>
            {post.Images.map((image) => (
              <ImageLink
                key={image.imageId}
                href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
                style={{ backgroundImage: `url(${image.link})` }}
              />
            ))}
          </DoubleImage>
        );
      default:
        return null;
    }
  };

  return <ImageSection>{renderImages()}</ImageSection>;
}

const ImageSection = styled.div`
  margin-top: 12px;
  width: 100%;
  border-radius: 16px;
`;

const SingleImage = styled.div`
  max-height: 510px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  border-radius: 16px;

  img {
    width: 100%;
    border-radius: 16px;
  }
`;

const DoubleImage = styled.div`
  display: flex;
  height: 272px;
  gap: 2px;
`;

const ImageLink = styled(Link)`
  flex: 1;
  background-size: cover;

  &:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;
