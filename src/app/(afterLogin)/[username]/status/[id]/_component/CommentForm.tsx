"use client";

import { useRef, useState } from "react";
import styled from "styled-components";

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
    image: "/jiwon.jpg",
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
          placeholder="답글 게시하기"
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
              <UploadButton type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </UploadButton>
            </FooterButtonLeft>
            <ActionButton type="submit" disabled={!content}>
              답글
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

  &::placeholder {
    font-family: "Malgun Gothic", sans-serif;
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

const UploadButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  cursor: pointer;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(29, 155, 240, 0.01);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }

  svg {
    fill: rgb(29, 155, 240);
  }
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
