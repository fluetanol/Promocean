// frontend/src/utils/lexicalUtils.ts

/**
 * Lexical 에디터의 JSON 형식을 plain text로 변환
 * @param lexicalJsonString - Lexical 에디터에서 생성된 JSON 문자열
 * @returns 추출된 텍스트 내용
 */
export function extractTextFromLexical(lexicalJsonString: string): string {
  try {
    // JSON 문자열을 객체로 파싱
    const lexicalData = JSON.parse(lexicalJsonString);

    // 재귀적으로 텍스트를 추출
    const extractText = (node: any): string => {
      let text = '';

      // text 속성이 있으면 직접 텍스트 노드
      if (node.text) {
        text += node.text;
      }

      // children이 있으면 재귀적으로 처리
      if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
          text += extractText(child);
          // paragraph 사이에 줄바꿈 추가
          if (child.type === 'paragraph') {
            text += '\n';
          }
        }
      }

      return text;
    };

    // root부터 시작
    const extractedText = extractText(lexicalData.root);

    // 앞뒤 공백 제거 및 여러 줄바꿈을 2개로 제한
    return extractedText.trim().replace(/\n{3,}/g, '\n\n');

  } catch (error) {
    console.error('Failed to extract text from Lexical JSON:', error);
    return '';
  }
}

/**
 * Lexical 에디터의 JSON 형식을 마크다운으로 변환 (확장 가능)
 * @param lexicalJsonString - Lexical 에디터에서 생성된 JSON 문자열
 * @returns 마크다운 형식의 텍스트
 */
export function convertLexicalToMarkdown(lexicalJsonString: string): string {
  try {
    const lexicalData = JSON.parse(lexicalJsonString);

    const convertNode = (node: any): string => {
      let markdown = '';

      // 헤딩 처리
      if (node.type === 'heading' && node.tag) {
        const level = parseInt(node.tag.replace('h', ''));
        const prefix = '#'.repeat(level);
        const text = node.children?.map((child: any) => child.text || '').join('') || '';
        return `${prefix} ${text}\n\n`;
      }

      // 텍스트 노드 처리 (포맷팅 지원)
      if (node.text) {
        let text = node.text;
        if (node.format) {
          // bold
          if (node.format & 1) {
            text = `**${text}**`;
          }
          // italic
          if (node.format & 2) {
            text = `*${text}*`;
          }
          // strikethrough
          if (node.format & 4) {
            text = `~~${text}~~`;
          }
          // underline (마크다운은 underline 직접 지원 안함)
          if (node.format & 8) {
            text = `<u>${text}</u>`;
          }
          // code
          if (node.format & 16) {
            text = `\`${text}\``;
          }
        }
        markdown += text;
      }

      // 리스트 처리
      if (node.type === 'listitem') {
        const text = node.children?.map((child: any) => convertNode(child)).join('') || '';
        return `- ${text}\n`;
      }

      // 코드 블록 처리
      if (node.type === 'code') {
        const code = node.children?.map((child: any) => child.text || '').join('') || '';
        return `\`\`\`${node.language || ''}\n${code}\n\`\`\`\n\n`;
      }

      // 인용 처리
      if (node.type === 'quote') {
        const text = node.children?.map((child: any) => convertNode(child)).join('') || '';
        return `> ${text}\n\n`;
      }

      // 단락 처리
      if (node.type === 'paragraph') {
        const text = node.children?.map((child: any) => convertNode(child)).join('') || '';
        return `${text}\n\n`;
      }

      // children 재귀 처리
      if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
          markdown += convertNode(child);
        }
      }

      return markdown;
    };

    const markdown = convertNode(lexicalData.root);
    return markdown.trim();

  } catch (error) {
    console.error('Failed to convert Lexical to Markdown:', error);
    return '';
  }
}

/**
 * 여러 Lexical JSON 필드를 하나의 프롬프트로 결합
 * OpenAI API 호출 시 사용
 */
export function buildPromptFromLexical(
  usedPrompt: string,
  examplePrompt?: string
): { systemMessage: string; userMessage: string } {
  const systemText = extractTextFromLexical(usedPrompt);

  if (examplePrompt) {
    const userText = extractTextFromLexical(examplePrompt);
    return {
      systemMessage :systemText,
      userMessage: userText,
    }
  }
  
  return {
    systemMessage: systemText,
    userMessage: ''
  };
}