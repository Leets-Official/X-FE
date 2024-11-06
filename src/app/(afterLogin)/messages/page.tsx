"use client"

import ChatRoom from "./_component/ChatRoom";

export default function Home() {
  return (
    <main className="w-[600px] min-h-screen border-x border-[#71767B] flex flex-col items-stretch">
      <div className="h-[53px] flex items-center px-4">
        <h3 className="font-bold text-[20px]">Messages</h3>
      </div>
      <ChatRoom />
      <ChatRoom />
      <ChatRoom />
      <ChatRoom />
    </main>
  );
}
