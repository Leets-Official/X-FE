"use client";

import styled from "styled-components";
import { useRef, useState } from "react";
import Gallery from '../../../../../../public/ic_gallery.svg';
import Close from '../../../../../../public/ic_close.svg';
import { useRouter } from "next/navigation";

export default function TweetModal() {
  const [content, setContent] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const onSubmit = () => {};
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickClose = () => {
    router.back();
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const me = {
    id: "jini",
    image: "/default_profile_img.svg",
  };

  return (
    <ModalBackground>
      <Modal>
        <CloseButton onClick={onClickClose}>
          <Close className="w-[20px] h=[20px]" fill="currentColor"/>
        </CloseButton>
        <ModalForm onSubmit={onSubmit}>
          <ModalBody>
            <PostUserSection>
              <PostUserImage src={me.image} alt={me.id} />
            </PostUserSection>
            <InputDiv>
              <Input
                placeholder="What is happening?"
                value={content}
                onChange={onChangeContent}
              />
            </InputDiv>
          </ModalBody>
          <ModalFooter>
            <ModalDivider />
            <FooterButtons>
              <FooterButtonLeft>
                <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
                <UploadButton type="button" onClick={onClickButton}>
                  <Gallery className="w-[20px] h-[20px]" fill="currentColor" />
                </UploadButton>
              </FooterButtonLeft>
              <ActionButton disabled={!content}>Post</ActionButton>
            </FooterButtons>
          </ModalFooter>
        </ModalForm>
      </Modal>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(180, 200, 235, 0.25);
`;

const Modal = styled.div`
  background: black;
  position: relative;
  top: 5%;
  max-width: 500px;
  min-width: 500px;
  max-height: 240px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ModalBody = styled.div`
  padding: 0 16px;
  flex: 1;
  margin-top: 54px;
  display: flex;
  flex-direction: row;
`;

const PostUserSection = styled.div`
  margin-right: 12px;
  width: 40px;
`;

const PostUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const InputDiv = styled.div`
  flex: 1;
`;

const Input = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  background: black;
  &::placeholder {
    color: ${(props) => props.theme.linecolor};
  }
`;

const ModalFooter = styled.div`
  padding: 0 16px;
`;

const ModalDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.linecolor};
`;

const FooterButtons = styled.div`
  display: flex;
  flex-direction: row;
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
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(29, 155, 240, 0.1);
  }

`;

const ActionButton = styled.button`
  cursor: pointer;
  width: 60px;
  height: 36px;
  border-radius: 17px;
  border: none;
  margin: 8px 0;
  font-weight: bold;
  background-color: ${(props) => props.theme.maincolor};
  color: white;
  font-size: 13px;

  &:disabled {
    opacity: 0.5;
  }
`;
