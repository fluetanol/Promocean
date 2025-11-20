import { useToolbarActions } from '../hooks/useToolbarActions';

interface BlockTypeSelectorProps {
  blockType: string;
}

export function BlockTypeSelector({ blockType }: BlockTypeSelectorProps) {
  const { formatParagraph, formatHeading, formatQuote, formatCodeBlock } = useToolbarActions();

  const handleBlockTypeChange = (value: string) => {
    if (value === 'paragraph') formatParagraph();
    else if (value === 'h1') formatHeading('h1');
    else if (value === 'h2') formatHeading('h2');
    else if (value === 'h3') formatHeading('h3');
    else if (value === 'h4') formatHeading('h4');
    else if (value === 'h5') formatHeading('h5');
    else if (value === 'h6') formatHeading('h6');
    else if (value === 'quote') formatQuote();
    else if (value === 'code') formatCodeBlock();
  };

  return (
    <select
      value={blockType}
      onChange={(e) => handleBlockTypeChange(e.target.value)}
      className="px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
    >
      <option value="paragraph">본문</option>
      <option value="h1">제목 1</option>
      <option value="h2">제목 2</option>
      <option value="h3">제목 3</option>
      <option value="h4">제목 4</option>
      <option value="h5">제목 5</option>
      <option value="h6">제목 6</option>
      <option value="quote">인용구</option>
      <option value="code">코드 블록</option>
    </select>
  );
}
