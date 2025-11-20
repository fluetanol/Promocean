// frontend/src/types/postEnum.ts

/**
 * 카테고리 enum
 */
export enum PostCategory {
  WORK = 100,      // 업무
  DEV = 200,       // 개발
  DESIGN = 300,    // 디자인/창작
  JOB = 400,       // 취업
  EDU = 500,       // 교육
  LIFE = 600,      // 일상
  ETC = 700,       // 기타
}

/**
 * 프롬프트 타입 enum
 */
export enum PromptType {
  TEXT = 1,   // 텍스트
  IMAGE = 2,  // 이미지
}

/**
 * 카테고리 문자열을 enum 값으로 변환
 */
export const categoryStringToEnum = (category: string): PostCategory => {
  const mapping: Record<string, PostCategory> = {
    'work': PostCategory.WORK,
    'dev': PostCategory.DEV,
    'design': PostCategory.DESIGN,
    'job': PostCategory.JOB,
    'edu': PostCategory.EDU,
    'life': PostCategory.LIFE,
    'etc': PostCategory.ETC,
  };

  return mapping[category] || PostCategory.ETC;
};

/**
 * 프롬프트 타입 문자열을 enum 값으로 변환
 */
export const promptTypeStringToEnum = (promptType: string): PromptType => {
  return promptType === 'text' ? PromptType.TEXT : PromptType.IMAGE;
};

/**
 * 카테고리 enum을 한글 라벨로 변환
 */
export const categoryEnumToLabel = (category: PostCategory): string => {
  const mapping: Record<PostCategory, string> = {
    [PostCategory.WORK]: '업무',
    [PostCategory.DEV]: '개발',
    [PostCategory.DESIGN]: '디자인/창작',
    [PostCategory.JOB]: '취업',
    [PostCategory.EDU]: '교육',
    [PostCategory.LIFE]: '일상',
    [PostCategory.ETC]: '기타',
  };

  return mapping[category] || '기타';
};
