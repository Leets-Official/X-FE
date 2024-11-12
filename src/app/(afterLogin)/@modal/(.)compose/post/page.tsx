"use client";
import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import Gallery from '../../../../../../public/ic_gallery.svg';
import Close from '../../../../../../public/ic_close.svg';
import { useRouter } from "next/navigation";
import { createPost } from "@/_service/post";

export default function TweetModal() {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 모달이 열리면 스크롤 막기
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content && imageFile) {
      try {
        await createPost(content, imageFile);
        // post 생성 성공시 home으로 이동
        router.push("/home");
      } catch (error) {
        console.error("게시물 생성 중 오류 발생:", error);
      }
    } else {
      console.log("게시물 내용 또는 이미지가 없습니다.");
    }
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickClose = () => {
    router.back();
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

  const me = {
    id: "jini",
    image: "/default_profile_img.svg",
  };

  return (
    <ModalBackground>
      <Modal imagePreview={imagePreview}>
        <CloseButton onClick={onClickClose}>
          <Close className="w-[20px] h-[20px]" fill="currentColor" />
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
          {imagePreview && ( 
            <ImagePreviewWrapper>
              <img src={imagePreview} alt="Preview" />
              <RemoveImageButton onClick={removeImage}>X</RemoveImageButton> 
            </ImagePreviewWrapper>
          )}
          <ModalFooter>
            <ModalDivider />
            <FooterButtons>
              <FooterButtonLeft>
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  hidden
                  ref={imageRef}
                  onChange={onFileChange} 
                />
                <UploadButton type="button" onClick={onClickButton}>
                  <Gallery className="w-[20px] h-[20px]" fill="currentColor" />
                </UploadButton>
              </FooterButtonLeft>
              <PostButton disabled={!content}>Post</PostButton>
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

const Modal = styled.div<{ imagePreview: string | null }>`
  background: black;
  position: relative;
  top: 5%;
  max-width: 500px;
  min-width: 500px;
  height: ${({ imagePreview }) => (imagePreview ? '500px' : '240px')};
  max-height: 500px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  resize: none;
  outline: none;
  font-size: 18px;
  background: black;
  &::placeholder {
    color: ${(props) => props.theme.linecolor};
  }
`;

const ModalFooter = styled.div`
  padding: 0 16px;
  margin-top: 20px;
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

const PostButton = styled.button`
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
