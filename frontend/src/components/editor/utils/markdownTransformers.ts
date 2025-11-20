import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
  ElementTransformer,
  TextMatchTransformer,
  LINK,
} from '@lexical/markdown';
import { CodeNode, $createCodeNode } from '@lexical/code';
import {
  HorizontalRuleNode,
  $createHorizontalRuleNode,
} from '@lexical/react/LexicalHorizontalRuleNode';
import { $createParagraphNode, $createTextNode, TextNode, $isTextNode } from 'lexical';

const HR: ElementTransformer = {
  dependencies: [HorizontalRuleNode],
  export: (node) => {
    return node.getType() === 'horizontalrule' ? '***' : null;
  },
  regExp: /^(---|\*\*\*|___)\s?$/,
  replace: (parentNode, _1, _2, isImport) => {
    const line = $createHorizontalRuleNode();

    if (isImport || parentNode.getNextSibling() != null) {
      parentNode.replace(line);
    } else {
      parentNode.insertBefore(line);
    }

    // 구분선 뒤에 새 문단 추가하여 커서 위치 설정
    const paragraph = $createParagraphNode();
    line.insertAfter(paragraph);
    paragraph.select();
  },
  type: 'element',
};

const CODE_BLOCK: ElementTransformer = {
  dependencies: [CodeNode],
  export: (node) => {
    if (node.getType() !== 'code') {
      return null;
    }
    const textContent = node.getTextContent();
    return '```\n' + textContent + '\n```';
  },
  regExp: /^```(\w+)?\s/,
  replace: (parentNode, _1, match) => {
    const codeNode = $createCodeNode(match ? match[1] : undefined);
    parentNode.replace(codeNode);
    // 코드 블럭 내부로 포커스 이동
    codeNode.select(0, 0);
  },
  type: 'element',
};

// 해시태그 transformer
const HASHTAG: TextMatchTransformer = {
  dependencies: [TextNode],
  export: (node) => {
    if (!$isTextNode(node) || !node.hasFormat('code')) {
      return null;
    }
    const text = node.getTextContent();
    if (text.startsWith('#')) {
      return text;
    }
    return null;
  },
  importRegExp: /#[\w가-힣]+/,
  regExp: /#[\w가-힣]+$/,
  replace: (textNode, match) => {
    const hashtagText = match[0];
    const hashtagNode = $createTextNode(hashtagText);
    hashtagNode.setFormat('code'); // 'code' format을 사용하여 해시태그 스타일 적용
    textNode.replace(hashtagNode);
  },
  trigger: ' ',
  type: 'text-match',
};

// 링크 transformer를 제외한 transformers
const filteredTextMatchTransformers = TEXT_MATCH_TRANSFORMERS.filter(
  (transformer) => transformer !== LINK
);

export const CUSTOM_TRANSFORMERS = [
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...filteredTextMatchTransformers,
  HASHTAG,
  HR,
  CODE_BLOCK,
  CHECK_LIST,
];
