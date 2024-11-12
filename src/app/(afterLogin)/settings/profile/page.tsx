"use client";

import { useRouter } from "next/navigation";
import CloseButton from "../../../../../public/closeButton.svg";
import { useState } from "react";
import BackgroundImage from "./BackgroundImage";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import { ModalOverlay, ModalContent, Head, Title, SaveButton } from "./styles";
import axios from "axios";

export default function EditProfile() {
  const router = useRouter();

  const accessToken = localStorage.getItem("accesstoken");

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

    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        name,
        introduce: bio,
        location,
        webSite: website,
        birth,
      })
    );

    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
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
