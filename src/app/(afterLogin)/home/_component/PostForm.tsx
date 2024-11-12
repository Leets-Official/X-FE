"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import Gallery from "../../../../../public/ic_gallery.svg";
import { createPost } from "@/_service/post";

const Form = styled.form`
  margin-top: 101px;
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.linecolor};
  background-color: black;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 10px 0;
  font-size: 20px;
  resize: none;
  line-height: 24px;
  outline: none;
  background-color: black;
  color: white;
  
  &::placeholder{
  color: #72767a }
`;

const ActionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 8px;
  justify-content: space-between;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 94px;
  height: 36px;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 9999px;
  background-color: ${({ disabled, theme }) => (disabled ? theme.darkerblue : theme.maincolor)};
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.5;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background-color: rgba(59, 130, 246, 0.01);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

const Line = styled.div`
  border: 1px solid rgb(47, 51, 54);
`;

const ImagePreviewWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 10px;

  img {
    width: 80%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 9px;
  right: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export default function PostForm({ refreshPosts }: { refreshPosts: () => void }) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const me = {
    id: "jini",
    image: "/default_profile_img.svg",
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (content && imageFile) {
      try {
        await createPost(content, imageFile);
        refreshPosts();
      } catch (error) {
        console.error("게시물 생성 중 오류 발생:", error);
      }
    } else {
      console.log("게시물 내용 또는 이미지가 없습니다.");
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result as string);
          setImageFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 미리보기 삭제
  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null); 
  };

  return (
    <Form onSubmit={onSubmit}>
      <ProfileImage src={me.image} alt={me.id} />
      <div style={{ flex: 1 }}>
        <TextArea
          value={content}
          onChange={onChange}
          placeholder="What is happening?!"
        />
        {imagePreview && (
          <ImagePreviewWrapper>
            <img src={imagePreview} alt="Preview" />
            <RemoveImageButton onClick={removeImage}>X</RemoveImageButton>
          </ImagePreviewWrapper>
        )}
        <Line />
        <ActionContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FileInput
              type="file"
              name="imageFiles"
              multiple
              ref={imageRef}
              onChange={onFileChange}
            />
            <UploadButton type="button" onClick={onClickButton}>
              <Gallery className="w-[15px] h-[15px]" fill="currentColor" />
            </UploadButton>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Button disabled={!content || !imageFile}>Post</Button>
          </div>
        </ActionContainer>
      </div>
    </Form>
  );
}
