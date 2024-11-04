"use client";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import Gallery from '../../../../../public/ic_gallery.svg';

const Form = styled.form`
  margin-top: 101px;
  display: flex;
  padding: 16px; /* Adjust padding as needed */
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
  border-radius: 9999px; /* Full rounding */
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

export default function PostForm() {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const me = {
    id: "jini",
    image: "/default_profile_img.svg",
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  const onClickButton = () => {
    imageRef.current?.click();
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
        <Line />
        <ActionContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FileInput
              type="file"
              name="imageFiles"
              multiple
              ref={imageRef}
            />
            <UploadButton onClick={onClickButton}>
              <Gallery className="w-[15px] h-[15px]" fill="currentColor" />
            </UploadButton>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Button disabled={!content}>
              Post
            </Button>
          </div>
        </ActionContainer>
      </div>
    </Form>
  );
}
