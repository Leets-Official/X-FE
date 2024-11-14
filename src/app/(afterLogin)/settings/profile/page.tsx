"use client";

import { useRouter } from "next/navigation";
import CloseButton from "../../../../../public/closeButton.svg";
import { useState, useEffect } from "react";
import BackgroundImage from "./BackgroundImage";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import { ModalOverlay, ModalContent, Head, Title, SaveButton } from "./styles";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accesstoken");
      setAccessToken(token);
    }
  }, []);

  const closeModal = () => {
    router.back();
  };

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleSave = async () => {
    const birth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // FormData 생성 및 데이터 추가
    const formData = new FormData();

    // JSON 데이터를 객체로 추가 (JSON.stringify 불필요)
    const jsonData = {
      name,
      introduce: bio,
      location,
      webSite: website,
      birth,
    };

    // JSON 데이터는 Blob 형태로 추가
    formData.append(
      "request",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    // 프로필 이미지 추가
    if (profileImage) {
      formData.append("image", profileImage);
    }

    console.log(formData);
    console.log(profileImage);

    try {
      // API 요청
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Profile updated successfully: ", response.data);
      alert("프로필이 성공적으로 수정되었습니다.");
      closeModal();
    } catch (error) {
      console.error("프로필 수정 요청에 실패했습니다: ", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Head>
          <CloseButton className="fill-white w-8 h-8" onClick={closeModal} />
          <Title>Edit profile</Title>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </Head>
        <BackgroundImage />
        <ProfileImage onImageChange={handleProfileImageChange} />
        <Form
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          location={location}
          setLocation={setLocation}
          website={website}
          setWebsite={setWebsite}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          year={year}
          setYear={setYear}
        />
      </ModalContent>
    </ModalOverlay>
  );
}
