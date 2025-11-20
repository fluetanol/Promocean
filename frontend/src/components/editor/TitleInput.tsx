interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TitleInput({
  value,
  onChange,
  placeholder = '제목을 입력하세요',
}: TitleInputProps) {
  return (
    <div className="relative w-full px-2 py-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="peer w-full text-5xl font-semibold border-none outline-none placeholder:text-gray-300"
      />
      <span
        className="absolute bottom-0 left-0 h-[2.5px] w-0 bg-primary transition-all duration-300 peer-focus:w-full peer-focus:translate-x-2"
      ></span>
    </div>

  );
}
