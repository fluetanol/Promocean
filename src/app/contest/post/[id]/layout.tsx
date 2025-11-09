// frontend/src/app/contest/post/[id]/@modal/layout.tsx

/**
 * ContestPostLayout component
 * @description ContestPostLayout component is a contest post layout component that displays the contest post layout content with modal support
 * @returns {React.ReactNode}
 */
export default function ContestPostLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}