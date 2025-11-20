interface PinIconProps {
  className?: string;
}

export default function PinIcon({ className }: PinIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(45 12 12)">
        <path
          d="M16 12V4H17C17.55 4 18 3.55 18 3C18 2.45 17.55 2 17 2H7C6.45 2 6 2.45 6 3C6 3.55 6.45 4 7 4H8V12C8 12.55 7.55 13 7 13C6.45 13 6 13.45 6 14C6 14.55 6.45 15 7 15H11V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V15H17C17.55 15 18 14.55 18 14C18 13.45 17.55 13 17 13C16.45 13 16 12.55 16 12Z"
        />
      </g>
    </svg>
  );
}