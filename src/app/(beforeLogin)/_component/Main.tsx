import Link from "next/link";

import X from "../../../../public/X.svg";

export default function Home() {
  return (
    <div className="text-white flex h-screen">
      <div className="flex justify-center items-center w-1/2">
        <X className="fill-white w-1/4 h-auto max-w-xs" />
      </div>
      <div className="flex flex-col justify-center items-start w-1/2 p-10">
        <h1>지금 일어나고 있는 일</h1>
        <h1>지금 가입하세요.</h1>
        <Link href="/i/flow/signup">google 계정으로 가입하기</Link>
        <h3>이미 트위터에 가입하셨나요?</h3>
        <Link href="/login">로그인</Link>
      </div>
    </div>
  );
}
