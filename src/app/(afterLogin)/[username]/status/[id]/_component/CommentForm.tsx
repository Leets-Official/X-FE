"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import Gallery from "../../../../../../../public/ic_gallery.svg";

export default function CommentForm() {
  const [content, setContent] = useState("");

  const imageRef = useRef<HTMLInputElement>(null);

  const onClickButton = () => {};

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const me = {
    id: "jiwon",
    image: "/default_profile_img.svg",
  };

  return (
    <PostForm onSubmit={onSubmit}>
      <PostUserSection>
        <PostUserImage>
          <img src={me.image} alt={me.id} />
        </PostUserImage>
      </PostUserSection>
      <PostInputSection>
        <StyledTextarea
          value={content}
          onChange={onChange}
          placeholder="Post your reply"
        />
        <PostButtonSection>
          <FooterButtons>
            <FooterButtonLeft>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
              />
              <Gallery
                className="w-[20px] h-[20px]"
                type="button"
                fill="currentColor"
                onClick={onClickButton}
              />
            </FooterButtonLeft>
            <ActionButton type="submit" disabled={!content}>
              Reply
            </ActionButton>
          </FooterButtons>
        </PostButtonSection>
      </PostInputSection>
    </PostForm>
  );
}

const PostForm = styled.form`
  display: flex;
  padding: 16px 16px 8px;
  border-bottom: 1px solid rgb(239, 243, 244);
  background-color: #000;
`;

const PostUserSection = styled.div`
  margin-right: 12px;
  width: 40px;
`;

const PostUserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const PostInputSection = styled.div`
  flex: 1;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  padding: 12px 0;
  font-size: 20px;
  line-height: 24px;
  outline: none;
  background-color: black;
  resize: none;

  &::placeholder {
    text: white;
    resize: none;
  }
`;

const PostButtonSection = styled.div`
  width: 100%;
`;

const FooterButtons = styled.div`
  display: flex;
  align-items: center;
`;

const FooterButtonLeft = styled.div`
  flex: 1;
`;

const ActionButton = styled.button`
  width: 94px;
  height: 36px;
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  border-radius: 18px;
  background-color: rgb(29, 155, 240);
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "rgb(29, 155, 240)" : "rgb(26, 140, 216)"};
  }
`;
