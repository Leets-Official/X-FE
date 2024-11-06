"use client";

import { useRouter } from "next/navigation";
import CloseButton from "../../../../../public/closeButton.svg";
import { useState } from "react";
import BackgroundImage from "./BackgroundImage";
import ProfileImage from "./ProfileImage";
import Form from "./Form";
import { ModalOverlay, ModalContent, Head, Title, SaveButton } from "./styles";

export default function EditProfile() {
  const router = useRouter();

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

  const handleSave = () => {
    const birth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    console.log("Saved:", { name, bio, location, website, birth });
    closeModal();
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
        <ProfileImage />
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
