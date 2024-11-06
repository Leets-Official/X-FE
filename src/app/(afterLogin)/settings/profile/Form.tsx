import {
  InputLabel,
  InputField,
  TextareaField,
  DateSelectContainer,
  Select,
} from "./styles";

interface FormProps {
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  location: string;
  setLocation: (location: string) => void;
  website: string;
  setWebsite: (website: string) => void;
  month: string;
  setMonth: (month: string) => void;
  day: string;
  setDay: (day: string) => void;
  year: string;
  setYear: (year: string) => void;
}

export default function Form({
  name,
  setName,
  bio,
  setBio,
  location,
  setLocation,
  website,
  setWebsite,
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
}: FormProps) {
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

  return (
    <div>
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
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
        <Select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </DateSelectContainer>
    </div>
  );
}
