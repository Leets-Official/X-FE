"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Loading() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const redirectTo = (responseCode: 200 | 201) => {
    const routes = {
      200: "/home",
      201: "/birthModal",
    };

    const route = routes[responseCode];
    if (route) {
      router.push(route);
    } else {
      console.error(`Unexpected response code: ${responseCode}`);
    }
  };

  const params = useSearchParams();
  const authCode = params.get("code");
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
      localStorage.setItem("accesstoken", accessToken);

      const responseCode = res.data.code;
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

  useEffect(() => {
    if (authCode) {
      handleLoginPost();
    } else {
      console.error("Google authorization code not found.");
      setErrorMessage("Google authorization code를 찾을 수 없습니다.");
      setLoading(false);
    }
  }, [authCode]);

  return (
    <div>
      {loading ? (
        <h2>로그인중입니다.</h2>
      ) : errorMessage ? (
        <div>
          <h2>로그인 실패</h2>
          <p>{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
}
