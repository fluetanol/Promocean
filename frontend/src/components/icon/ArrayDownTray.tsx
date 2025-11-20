// frontend/src/components/icon/ArrayDownTray.tsx

/**
 * ArrayDownTray icon
 * @description ArrayDownTray icon is a array down tray icon component that displays the array down tray icon
 * @returns {React.ReactNode}
 */
export default function ArrayDownTray({ className = "size-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  )
}