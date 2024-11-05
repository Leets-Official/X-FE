"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <StyledButton onClick={handleBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="3.5859999656677246 4.539999961853027 17.413999557495117 14.920001029968262"
        width={24}
        height={24}
      >
        <g>
          <path
            d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
            fill="white"
          ></path>
        </g>
      </svg>
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 34px;
  height: 34px;
  background-color: #000;
  border: none;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 2px;

  &:hover {
    background-color: #333;
  }
`;
