"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SingleSignOn() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [step, setStep] = useState(1);
  const [customId, setCustomId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = async () => {
    console.log(accessToken);

    const birth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    const formattedCustomId = `@${customId}`;

    {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PATCH_API_URL}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              birth: birth,
              customId: formattedCustomId,
            }),
          }
        );

        console.log(response);

        if (!response.ok) {
          throw new Error("정보를 전송하는데 실패하였습니다.");
        }
        return { success: true, message: "성공적으로 정보가 전송되었습니다." };
      } catch (error) {
        console.error("Error", error);
        return { success: false, message: "서버 요청 중 문제가 발생했습니다." };
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      {step === 1 && (
        <div className="w-96 bg-black text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">
            What&apos;s your birth date?
          </h3>
          <p className="text-sm mb-4">이 정보는 공개되지 않습니다.</p>

          <div className="flex justify-between space-x-4 mb-4">
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="appearance-none bg-black border border-gray-300 rounded p-2 text-center w-24"
              >
                <option value="" disabled>
                  월
                </option>
                {months.map((mo) => (
                  <option key={mo} value={mo}>
                    {mo}월
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="appearance-none bg-black border border-gray-300 rounded p-2 text-center w-24"
              >
                <option value="" disabled>
                  일
                </option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none bg-black border border-gray-300 rounded p-2 text-center w-24"
              >
                <option value="" disabled>
                  년
                </option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}년
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs mb-6 leading-5">
            가입하면 쿠키 사용을 포함해{" "}
            <a href="#" className="text-blue-400 underline">
              이용약관 및 개인정보 처리방침
            </a>
            에 동의하게 됩니다. X는 계정을 안전하게 보호하고 광고를 포함한 맞춤
            서비스를 제공하는 등 X 개인정보 처리방침에 명시된 목적을 위해 이메일
            주소 및 전화번호 등의 내 연락처 정보를 사용할 수 있습니다.{" "}
            <a href="#" className="text-blue-400 underline">
              자세히 알아보기
            </a>
            . 이메일 또는 전화번호를 제공하시면 다른 사람들이 이 정보로 내
            계정을 찾을 수 있게 됩니다. 해당 정보를 제공하지 않으시려면{" "}
            <a href="#" className="text-blue-400 underline">
              여기
            </a>
            에서 변경하세요.
          </p>

          <button
            onClick={handleNextStep}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            가입하기
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-96 bg-black text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">이름을 가르쳐 주시겠어요?</h3>
          <p className="text-sm mb-4 text-gray-400">
            @사용자 아이디는 고유한 나만의 아이디입니다. 나중에 언제든 바꿀 수
            있습니다.
          </p>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="@사용자 아이디"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              className="appearance-none bg-black border border-gray-300 rounded p-2 text-center w-full"
            />
          </div>

          <button
            onClick={() => {
              handleSubmit();
              router.push("/home");
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 mt-4 rounded"
          >
            설정하기
          </button>
        </div>
      )}
    </div>
  );
}