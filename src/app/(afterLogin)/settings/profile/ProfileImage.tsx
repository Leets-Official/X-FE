import Photo from "../../../../../public/photo.svg";
import { useRef } from "react";
import styled from "styled-components";

export default function EditProfileImage() {
  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <ProfileImageSection>
      <ProfileImage>
        <img src="/default_profile_img.svg" alt="Profile" />
        <Photo className="photo-icon" onClick={onClickButton} />
      </ProfileImage>
      <input
        type="file"
        accept="image/*"
        ref={imageRef}
        style={{ display: "none" }}
      />
    </ProfileImageSection>
  );
}

const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-bottom: 20px;
  margin-top: -17%;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 8px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-icon {
    position: absolute;
    padding: 3px;
    fill: white;
    top: 22px;
    left: 26px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: black;
      border-radius: 50%;
      opacity: 0.5;
    }
  }
`;
