"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Loading() {
  const router = useRouter();

  //이미 가입한 유저일 시: Home으로 이동
  const handleHome = () => {
    router.push("/home");
  };

  //처음 가입한 유저일 시: 회원가입 모달 페이지로 이동
  const handleSignup = () => {
    router.push("/SignupModal");
  };

  const params = useSearchParams();
  console.log(params.get("code"));
  const authCode = params.get("code");
  console.log("authCode: ", authCode);

  const handleLoginPost = async () => {
    if (!authCode) {
      console.error("Authorization code is missing");
      return;
    }

    // const encodedCode = encodeURIComponent(authCode);
    const data = { authCode };
    console.log("Sending data:", data);

    try {
      const res = await axios.post(
        "http://43.203.226.98:8080/api/v1/users/login",
        data
      );
      console.log("res: ", res);

      const accessToken = res.data.data.jwtToken.accessToken;
      localStorage.setItem("accesstoken", accessToken);

      const responseCode = res.data.code;
      console.log("responseCode: ", responseCode);

      if (responseCode === 200) {
        handleHome();
      } else if (responseCode === 201) {
        handleSignup();
      } else {
        console.error(`Unexpected response code: ${responseCode}`);
      }
    } catch (error) {
      console.error("Login failed: ", error);
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
