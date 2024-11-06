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
          <SingleImage>
            <img
              src={post.Images[0].link}
              alt={`image-${post.Images[0].imageId}`}
            />
          </SingleImage>
        );
      case 2:
        return (
          <DoubleImage>
            {post.Images.map((image) => (
              <ImageLink
                key={image.imageId}
                href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
              >
                <img src={image.link} alt={`image-${image.imageId}`} />
              </ImageLink>
            ))}
          </DoubleImage>
        );
      case 3:
        return (
          <TripleImage>
            <ImageLink
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
            >
              <img
                src={post.Images[0].link}
                alt={`image-${post.Images[0].imageId}`}
              />
            </ImageLink>
            <ImageGrid>
              {post.Images.slice(1).map((image) => (
                <ImageLink
                  key={image.imageId}
                  href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
                >
                  <img src={image.link} alt={`image-${image.imageId}`} />
                </ImageLink>
              ))}
            </ImageGrid>
          </TripleImage>
        );
      case 4:
        return (
          <QuadrupleImage>
            {post.Images.map((image) => (
              <ImageLink
                key={image.imageId}
                href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
              >
                <img src={image.link} alt={`image-${image.imageId}`} />
              </ImageLink>
            ))}
          </QuadrupleImage>
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const ImageLink = styled(Link)`
  flex: 1;
  background-size: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }

  &:last-child {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const TripleImage = styled.div`
  display: flex;
  gap: 2px;

  > div:first-child {
    width: 50%;
    background-size: cover;
    border-radius: 16px 0 0 16px;
  }
`;

const QuadrupleImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  height: 272px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const ImageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 50%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;
