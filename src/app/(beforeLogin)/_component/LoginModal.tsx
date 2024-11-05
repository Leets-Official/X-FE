"use client";

import { useRouter } from "next/navigation";
import Google from "../../../../public/Google.svg";
import Line from "../../../../public/Line.svg";

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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="absolute inset-0 opacity-50"></div>
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
          <div className="ml-50">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-8 h-8 fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </g>
            </svg>
          </div>
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
            <Line className="rounded-full" />
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
