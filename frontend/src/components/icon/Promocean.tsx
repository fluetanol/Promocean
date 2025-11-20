// frontend/src/components/icon/Promocean.tsx

export default function Promocean() {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 파란 배경 */}
      <rect width="36" height="36" rx="8" fill="#0094FF" />

      {/* 달 모양 */}
      <circle cx="18" cy="18" r="9" fill="#7FD3FF" />
      <circle cx="21" cy="16" r="7" fill="#0094FF" />

      {/* 파도 곡선 */}
      <path
        d="M12 22C14 23.5 16 23.5 18 22C20 20.5 22 20.5 24 22"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}