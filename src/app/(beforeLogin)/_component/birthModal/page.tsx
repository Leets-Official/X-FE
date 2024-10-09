"use client";

import { useState } from "react";

export default function BirthModal() {
  const [birth, setBirth] = useState({ month: "", day: "", year: "" });

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirth((prev) => ({ ...prev, month: e.target.value }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirth((prev) => ({ ...prev, day: e.target.value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirth((prev) => ({ ...prev, year: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("생년월일:", birth);
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>

      {/* 월 선택 */}
      <label className="mb-2 font-semibold">월</label>
      <select
        value={birth.month}
        onChange={handleMonthChange}
        className="mb-4 p-2 border rounded-lg"
      >
        <option value="">월 선택</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}월
          </option>
        ))}
      </select>

      {/* 일 선택 */}
      <label className="mb-2 font-semibold">일</label>
      <select
        value={birth.day}
        onChange={handleDayChange}
        className="mb-4 p-2 border rounded-lg"
      >
        <option value="">일 선택</option>
        {[...Array(31)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}일
          </option>
        ))}
      </select>

      {/* 년 선택 */}
      <label className="mb-2 font-semibold">년</label>
      <select
        value={birth.year}
        onChange={handleYearChange}
        className="mb-4 p-2 border rounded-lg"
      >
        <option value="">년 선택</option>
        {Array.from({ length: 100 }, (_, i) => {
          const currentYear = new Date().getFullYear();
          return (
            <option key={currentYear - i} value={currentYear - i}>
              {currentYear - i}년
            </option>
          );
        })}
      </select>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
      >
        회원가입 완료
      </button>
    </div>
  );
}
