"use client";

import { useRouter } from "next/navigation";

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
    <div className="w-screen h-screen bg-gray-700 flex justify-center items-center">
      <div className="max-w-[80vw] min-w-[600px] h-[500px] bg-black rounded-lg">
        <div>
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
        </div>
        <h1 className="text-3xl font-bold">X 가입하기</h1>
        <button onClick={onClickLogin}>google로 로그인</button>
      </div>
    </div>
  );
}
