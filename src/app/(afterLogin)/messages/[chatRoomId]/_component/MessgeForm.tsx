"use client";

import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import Send from "../../../../../../public/ic_send.svg";

interface Props {
  onSend: (message: {
    roomId: number;
    senderId: number;
    senderName: string;
    content: string;
  }) => void;
  roomId: number;
  currentUserId: number;
  currentUserName: string;
}

export default function MessageForm({
  onSend,
  roomId,
  currentUserId,
  currentUserName,
}: Props) {
  const [content, setContent] = useState("");

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setContent(e.target.value);

  const onSubmit = () => {
    if (content.trim()) {
      onSend({
        roomId,
        senderId: currentUserId,
        senderName: currentUserName,
        content,
      });
      setContent("");
    }
  };

  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <FormZone>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Textarea
          value={content}
          onChange={onChangeContent}
          onKeyDown={onEnter}
          placeholder="Start a new message"
        />
        <SubmitButton type="submit" disabled={!content.trim()}>
          <Send className="w-[24px] h-[24px]" fill="currentColor" />
        </SubmitButton>
      </Form>
    </FormZone>
  );
}

const FormZone = styled.div`
  border-top: 1px solid ${(props) => props.theme.linecolor};
  height: 56px;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 4px;
`;

const Textarea = styled(TextareaAutosize)`
  flex: 1;
  padding: 5px;
  resize: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 34px;
  height: 34px;
`;
