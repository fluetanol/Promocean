/**
 * categoryConvert utility
 * @description 카테고리 문자열을 API에서 사용하는 숫자 코드로 변환하는 유틸리티 함수입니다.
 */

/**
 * 카테고리 문자열을 API 코드로 변환
 * @param category - 카테고리 문자열 ('work', 'dev', 'design', 'job', 'edu', 'life', 'etc')
 * @returns API에서 사용하는 카테고리 코드 ('100', '200', '300', '400', '500', '600', '700') 또는 원본 값
 */
export function convertCategoryToApiCode(category: string | undefined): string | undefined {
  if (!category) return undefined;

  const categoryMap: Record<string, string> = {
    'work': '100',
    'dev': '200',
    'design': '300',
    'job': '400',
    'edu': '500',
    'life': '600',
    'etc': '700',
  };

  // TODO : undefined 삭제 예정
  // 개발 단계에서 정해지지 않은 카테고리가 입력되어 undefined가 반환되는 경우가 있으므로 undefined를 반환
  return categoryMap[category] || undefined;
}
