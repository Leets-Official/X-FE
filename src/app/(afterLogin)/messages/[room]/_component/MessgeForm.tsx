/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
// import useSocket from "@/app/(afterLogin)/messages/[room]/_lib/useSocket";
// import { useSession } from "next-auth/react";
// import { InfiniteData, useQueryClient } from "@tanstack/react-query";
// import { Message } from "@/model/Message";
// import { useMessageStore } from "@/store/message";
import Send from '../../../../../../public/ic_send.svg';

interface Props {
  id: string;
}

export default function MessageForm() {
  const [content, setContent] = useState('');
  // const setGoDown = useMessageStore().setGoDown;
  // const [socket] = useSocket();
  // const { data: session } = useSession();
  // const queryClient = useQueryClient();

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    console.log("전송됨");
    // if (!session?.user?.email) {
    //   return;
    // }
    // const ids = [session?.user?.email, id];
    // ids.sort();

    // socket.io
    // socket?.emit('sendMessage', {
    //   senderId: session?.user?.email,
    //   receiverId: id,
    //   content,
    // });

    // 리액트 쿼리 데이터에 추가
  //   const exMessages = queryClient.getQueryData(['rooms', {
  //     senderId: session?.user?.email,
  //     receiverId: id
  //   }, 'messages']) as InfiniteData<Message[]>;

  //   if (exMessages && typeof exMessages === 'object') {
  //     const newMessages = {
  //       ...exMessages,
  //       pages: [
  //         ...exMessages.pages
  //       ],
  //     };
  //     const lastPage = newMessages.pages.at(-1);
  //     const newLastPage = lastPage ? [...lastPage] : [];
  //     let lastMessageId = lastPage?.at(-1)?.messageId;

  //     newLastPage.push({
  //       senderId: session.user.email,
  //       receiverId: id,
  //       content,
  //       room: ids.join('-'),
  //       messageId: lastMessageId ? lastMessageId + 1 : 1,
  //       createdAt: new Date(),
  //     });

  //     newMessages.pages[newMessages.pages.length - 1] = newLastPage;
  //     queryClient.setQueryData(['rooms', { senderId: session?.user?.email, receiverId: id }, 'messages'], newMessages);
  //     setGoDown(true);
  //   }
  //   setContent('');
  };

  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      if (!content?.trim()) {
        return;
      }
      onSubmit();
      setContent('');
    }
  };

  return (
    <FormZone>
      <Form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <Textarea
          value={content}
          onChange={onChangeContent}
          onKeyDown={onEnter}
          placeholder="Start a new message"
        />
        <SubmitButton type="submit" disabled={!content?.trim()}>
          <Send alt="전송 이미지" className="w-[24px] h-[24px] " fill="currentColor" />
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
  justify-content: center;
`;

const Form = styled.form`
  background: #303336;
  margin: 4px 12px;
  border-radius: 16px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  padding: 5px 10px 5px 5px;
  background: transparent;
  font-size: 15px;
  line-height: 20px;
  flex: 1;
  outline: none;
  ::placeholder {
    color: ${(props) => props.theme.linecolor};
  }
`;


const SubmitButton = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
