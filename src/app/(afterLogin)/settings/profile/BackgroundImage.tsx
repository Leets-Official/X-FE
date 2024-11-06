import Photo from "../../../../../public/photo.svg";
import styled from "styled-components";
import { useRef } from "react";

export default function EditBackgroundImage() {
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <BackgroundImageSection>
      <BackgroundImage>
        <img src="/backgroundImage.jpg" alt="Background" />
        <Photo className="photo-icon" onClick={onClickButton} />
      </BackgroundImage>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        style={{ display: "none" }}
      />
    </BackgroundImageSection>
  );
}

export const BackgroundImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 5px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-icon {
    position: absolute;
    fill: white;
    top: 10px;
    right: 10px;
    padding: 3px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: black;
      opacity: 0.5;
      border-radius: 50%;
    }
  }
`;
