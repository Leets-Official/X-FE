"use client";
import { useState } from "react";

export default function Tab() {
  const [tab, setTab] = useState("rec");

  const onClickRec = () => {
    setTab("rec");
  };
  const onClickFol = () => {
    setTab("fol");
  };

  return (
    <div className="fixed z-10 w-[598px] bg-black backdrop-blur-md border-b border-[#71767b] dark:bg-black/65">
      <div className="text-xl font-bold p-3.5">Home</div>
      <div className="flex h-[53px]">
        <div
          onClick={onClickRec}
          className={`flex-1 flex items-center justify-center text-[15px] cursor-pointer relative ${
            tab === "rec" ? "text-[#e7e9ea] font-bold" : "text-[#71767b]"
          }`}
        >
          For you
          <div
            className={`h-1 w-[56px] bottom-0 rounded-full ${
              tab === "fol" ? "hidden" : "absolute bg-blue-500"
            }`}
          ></div>
        </div>
        <div
          onClick={onClickFol}
          className={`flex-1 flex items-center justify-center text-[15px] cursor-pointer relative ${
            tab === "fol" ? "text-[#e7e9ea] font-bold" : "text-[#71767b]"
          }`}
        >
          Following
          <div
            className={`h-1 w-[56px] bottom-0 rounded-full ${
              tab === "rec" ? "hidden" : "absolute bg-blue-500"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
