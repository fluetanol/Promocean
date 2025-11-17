// frontend/src/app/contest/[contestId]/layout.tsx

/**
 * ContestPostLayout component
 * @description 대회 상세 페이지 레이아웃 렌더링. 대회 수정, 공지사항, 산출물 모달이 표시될 수 있습니다.
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