"use client";

import { useRouter } from "next/navigation";
import X from "../../../../public/X.svg";

export default function LoginModal() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  const onClickLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI;

    const href = `https://accounts.google.com/o/oauth2/v2/auth?
        response_type=code
		&client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile
        &access_type=offline`;

    console.log("Client ID: ", clientId);
    console.log("Redirect URI:", redirectUri);
    console.log("URL: ", href);

    window.location.href = href;
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center fixed inset-0 bg-gray-400 bg-opacity-40 dark:bg-opacity-40">
      <div className="bg-black dark:bg-black relative max-w-[80vw] min-w-[600px] top-5 rounded-lg flex flex-col h-[450px] shadow-lg">
        <div className="p-9 pb-5 text-2xl font-bold">
          <div>
            <button
              className="w-8 h-8 rounded-full bg-white dark:bg-black absolute left-4 top-4 flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClickClose}
            >
              <svg
                width={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="text-black dark:text-white"
              >
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" />
              </svg>
            </button>
            <X w-8 h-8 fill-white />
          </div>
          <h1>X 가입하기</h1>
          <button onClick={onClickLogin}>google로 로그인</button>
        </div>
      </div>
    </div>
  );
}
