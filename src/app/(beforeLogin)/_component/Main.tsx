import Link from "next/link";

import X from "../../../../public/X.svg";
import Google from "../../../../public/Google.svg";

export default function Home() {
  return (
    <div className="text-white flex h-screen">
      <div className="flex justify-center items-center w-1/2">
        <X className="fill-white w-96 h-96" />
      </div>
      <div className="flex flex-col justify-center items-start w-1/2 p-10">
        <h1 className="text-7xl font-bold">지금 일어나고 있는 일</h1>
        <div className="py-11"></div>
        <h1 className="text-3xl font-bold">지금 가입하세요.</h1>
        <div className="py-4"></div>
        <Link href="/login">
          <div className="bg-white text-black font-bold text-center rounded-full py-2 px-6 flex items-center">
            <Google className="mr-2" />
            Google 계정으로 가입하기
          </div>
        </Link>
        <div className="py-8"></div>
        <h3 className="text-1xl font-bold">이미 트위터에 가입하셨나요?</h3>
        <div className="py-4"></div>
        <Link href="/login">
          <div className="bg-black font-bold text-blue-500 border border-blue-500 text-center rounded-full py-2 px-6 w-60 items-center">
            로그인
          </div>
        </Link>
      </div>
    </div>
  );
}
