"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

export default function Loading() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  console.log("접근");
  const redirectTo = (responseCode: 200 | 201) => {
    const routes = {
      200: "/home",
      201: "/i/flow/single_sign_on",
    };

    const route = routes[responseCode];
    if (route) {
      router.push(route);
    } else {
      console.error(`Unexpected response code: ${responseCode}`);
    }
  };

  // const [authCode, setAuthCode] = useState<string | null>(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const code = new URLSearchParams(window.location.search).get("code");
  //     setAuthCode(code);
  //     console.log("1111authCode: ", code);
  //   }
  // }, []);

  let authCode = null;
  if (typeof window !== "undefined") {
    authCode = new URLSearchParams(window.location.search).get("code");
  }

  console.log("authCode: ", authCode);

  const handleLoginPost = async () => {
    if (!authCode) {
      console.error("Authorization code is missing");
      setErrorMessage("Authorization code is missing");
      setLoading(false);
      return;
    }

    const data = { authCode };
    console.log("Sending data:", data);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
        data
      );
      console.log("res: ", res);

      const accessToken = res.data.data.jwtToken.accessToken;
      const userId = res.data.data.id;
      const customId = res.data.data.customId;

      if (typeof window !== "undefined") {
        localStorage.setItem("accesstoken", accessToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("customId", customId);
      }

      // console.log("login accesstoken", accessToken);
      // //const accessToken = `${process.env.NEXT_PUBLIC_API_MASTER_TOKEN}`;
      // localStorage.setItem("accesstoken", accessToken);

      // localStorage.setItem("userId", userId);
      // console.log("login userId:", userId);

      // localStorage.setItem("customId", customId);
      // console.log("login customId", customId);

      const responseCode = res.data.code;
      //const responseCode = 201;
      console.log("responseCode: ", responseCode);

      redirectTo(responseCode);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Login failed with response: ", error.response);
          setErrorMessage("로그인 실패: 서버에서 응답이 없습니다.");
        } else if (error.request) {
          console.error("No response received: ", error.request);
          setErrorMessage("로그인 실패: 응답을 받지 못했습니다.");
        } else {
          console.error("Error setting up request: ", error.message);
          setErrorMessage(`로그인 실패: ${error.message}`);
        }
      } else {
        console.error("An unexpected error occurred: ", error);
        setErrorMessage("예기치 않은 오류가 발생했습니다.");
      }
    }
  };

  console.log("진짜진짜", authCode);

  useEffect(() => {
    //handleLoginPost();
    console.log(authCode);
    console.log(loading);
    if (authCode && loading) {
      handleLoginPost();
    } else if (!authCode) {
      console.error("Google authorization code not found.");
      setErrorMessage("Google authorization code를 찾을 수 없습니다.");
      setLoading(false);
    }
    setAuthChecked(true);
  }, [authCode, loading]);

  return (
    <Suspense>
      <div className="justify-center">
        {loading && authChecked ? (
          <h2>로그인중입니다.</h2>
        ) : errorMessage ? (
          <div>
            <h2>로그인 실패</h2>
            <p>{errorMessage}</p>
          </div>
        ) : null}
      </div>
    </Suspense>
  );
}
