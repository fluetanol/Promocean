/**
 * 이미지 URL 유틸리티 함수
 * @description fileUrl이 없을 때 기본 이미지를 반환하는 함수
 */

/**
 * 게시글 이미지 URL을 반환합니다.
 * fileUrl이 없거나 빈 문자열인 경우 postId 기반 기본 이미지를 반환합니다.
 * 
 * @param fileUrl - 게시글 이미지 URL (null 또는 string)
 * @param postId - 게시글 ID (기본 이미지 선택에 사용)
 * @returns 이미지 URL
 */
export function getPostImageUrl(fileUrl: string | null | undefined, postId: number): string {
  if (fileUrl && fileUrl.trim() !== "") {
    return fileUrl;
  }
  return `/assets/img_random${postId % 21}.png`;
}

/**
 * 대회 이미지 URL을 반환합니다.
 * fileUrl이 없거나 빈 문자열인 경우 contestId 기반 기본 이미지를 반환합니다.
 * 
 * @param fileUrl - 대회 이미지 URL (null 또는 string)
 * @param contestId - 대회 ID (기본 이미지 선택에 사용)
 * @returns 이미지 URL
 */
export function getContestImageUrl(fileUrl: string | null | undefined, contestId: number): string {
  if (fileUrl && fileUrl.trim() !== "") {
    return fileUrl;
  }
  return `/assets/img_random${contestId % 21}.png`;
}

