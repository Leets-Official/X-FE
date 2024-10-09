"use client";

import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Loading() {
  const router = useRouter();

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
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Login failed with response: ", error.response);
        } else if (error.request) {
          console.error("No response received: ", error.request);
        } else {
          console.error("Error setting up request: ", error.message);
        }
      } else {
        console.error("An unexpected error occurred: ", error);
      }
    }
  };

  useEffect(() => {
    if (authCode) {
      handleLoginPost();
    } else {
      console.error("Google authorization code not found.");
    }
  }, [authCode]);

  return (
    <div>
      <h2>로그인중입니다.</h2>
    </div>
  );
}
