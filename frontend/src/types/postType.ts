// 게시글 작성 데이터 타입
export interface PostFormData {
  // 메타 정보
  title: string;
  category: string;
  tags: string[]; // 배열로 변경

  // 에디터 콘텐츠
  usedPrompt: string; // 사용 프롬프트
  examplePrompt: string; // 예시 질문 프롬프트
  answerPrompt: string; // 답변 프롬프트

  // 플로팅 섹션 선택값
  selectedCategory: string; // 카테고리 (work, edu, dev, etc.)
  selectedPromptType: string; // 프롬프트 타입 (text, image)
}

// API 제출용 타입 (필요시 변환)
export interface PostSubmitData {
  title: string;
  category: string;
  tags: string[];
  content: {
    usedPrompt: string;
    examplePrompt: string;
    answerPrompt: string;
  };
  metadata: {
    category: string;
    promptType: string;
  };
  archiveFolder?: string; // 아카이브 폴더 (my-space, team-space용)
  teamName?: string; // 팀 이름 (team-space용)
}
