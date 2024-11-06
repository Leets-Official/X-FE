"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import CloseButton from "../../../../../public/closeButton.svg";
import { useState, useRef } from "react";
import Photo from "../../../../../public/photo.svg";

export default function EidtProfile() {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const imageRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const birth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  const handleSave = () => {
    console.log("Saved:", { name, bio, location, website, birth });
    closeModal();
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Head>
          <CloseButton className="fill-white w-8 h-8" onClick={closeModal} />
          <Title>Edit profile</Title>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </Head>

        <BackgroundImageSection>
          <BackgroundImage>
            <img src="/backgroundImage.jpg" alt="Background" />
            <Photo className="photo-icon" onClick={onClickButton} />
          </BackgroundImage>
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            style={{ display: "none" }}
          />
        </BackgroundImageSection>

        <ProfileImageSection>
          <ProfileImage>
            <img src="/default_profile_img.svg" alt="Profile" />
            <Photo className="photo-icon" onClick={onClickButton} />
          </ProfileImage>
          <input type="file" ref={imageRef} style={{ display: "none" }} />
        </ProfileImageSection>
        <Form>
          <InputLabel>Name</InputLabel>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          <InputLabel>Bio</InputLabel>
          <TextareaField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
          />

          <InputField
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />

          <InputField
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />
          <InputLabel>Birth date</InputLabel>
          <DateSelectContainer>
            <Select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>
            <Select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
            <Select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </DateSelectContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #000;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  color: white;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 25px;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
`;

const BackgroundImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 5px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-icon {
    position: absolute;
    fill: white;
    top: 10px;
    right: 10px;
    padding: 3px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: black;
      opacity: 0.5;
      border-radius: 50%;
    }
  }
`;

const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-bottom: 20px;
  margin-top: -17%;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  margin-bottom: 8px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-icon {
    position: absolute;
    padding: 3px;
    fill: white;
    top: 22px;
    left: 26px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: black;
      border-radius: 50%;
      opacity: 0.5;
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #71767b;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #121212;
  color: white;

  &::placeholder {
    color: #71767b;
  }
`;

const TextareaField = styled.textarea`
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #121212;
  color: white;
  resize: none;
  height: 60px;

  &::placeholder {
    color: #71767b;
  }
`;

const SaveButton = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 35%;
  cursor: pointer;

  &:hover {
    background-color: #71767b;
  }
`;

const DateSelectContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Select = styled.select`
  padding: 10px;
  background-color: #121212;
  color: white;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 14px;
  width: 100vw;
  justify-content: space-between;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;
