"use client";

import styled from "styled-components";

export default function Page() {
  const imageUrl = `/default_profile_img.svg`;

  return (
    <ImageViewer>
      <LargeImage src={imageUrl} alt="Selected photo" />
    </ImageViewer>
  );
}

const ImageViewer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LargeImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
`;
