// frontend/src/components/icon/Heart.tsx

/**
 * Heart icon
 * @description 좋아요 버튼에서 사용되는 컴포넌트입니다.
 * @returns {React.ReactNode}
 */
export default function Heart({ className = "size-6 fill-none stroke-gray-500" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -4.5 32 32"
      strokeWidth={1.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}