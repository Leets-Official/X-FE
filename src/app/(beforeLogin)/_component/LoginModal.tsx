"use client";

import { useRouter } from "next/navigation";
import Google from "../../../../public/Google.svg";
import Line from "../../../../public/Line.svg";
import X from "../../../../public/X.svg";

export default function LoginModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const onClickLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = String(
      process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI
    );

    const href = `https://accounts.google.com/o/oauth2/v2/auth?&response_type=code
		&client_id=${clientId}
		&redirect_uri=${redirectUri}
		&scope=email profile
        &access_type=offline`;

    console.log("Client ID: ", clientId);
    console.log("Redirect URI:", redirectUri);
    console.log("URL: ", href);

    window.location.href = href;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
      <div className="relative max-w-[80vw] min-w-[550px] h-[500px] bg-black rounded-lg">
        <div className="flex">
          <button
            className="w-8 h-8 flex justify-center items-center"
            onClick={onClickClose}
          >
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="text-black dark:text-white fill-white"
            >
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
            </svg>
          </button>
          <X className="ml-[42%] mb-[15px] w-8 h-8 fill-white" />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow space-y-6">
          <h1 className="text-3xl font-bold mb-12">X 가입하기</h1>
          <div className="flex flex-col justify-center items-center space-y-12">
            <button
              onClick={onClickLogin}
              className="bg-white text-black font-bold text-center rounded-full py-2 px-6 flex items-center"
            >
              <Google className="mr-2" />
              Google 계정으로 가입하기
            </button>
            <Line className="w-[300px] h-[10px]" />
            <button
              onClick={onClickLogin}
              className="bg-white text-black font-bold text-center rounded-full py-2 px-6 flex items-center"
            >
              <Google className="mr-2" />
              Google 계정으로 로그인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
