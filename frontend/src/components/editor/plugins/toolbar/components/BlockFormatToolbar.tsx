import { useToolbarActions } from '../hooks/useToolbarActions';

interface BlockFormatToolbarProps {
  blockType: string;
}

export function BlockFormatToolbar({ blockType }: BlockFormatToolbarProps) {
  const {
    formatParagraph,
    formatHeading,
    formatQuote,
    formatCodeBlock,
    formatBulletList,
    formatNumberedList,
    formatCheckList,
    removeList,
    handleOutdent,
    handleIndent,
    formatAlignment,
  } = useToolbarActions();

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

  const handleListClick = (listType: 'ul' | 'ol' | 'check') => {
    if (blockType === listType) {
      removeList();
    } else {
      if (listType === 'ul') formatBulletList();
      else if (listType === 'ol') formatNumberedList();
      else if (listType === 'check') formatCheckList();
    }
  };

  return (
    <div className="flex gap-1 items-center flex-wrap">
      <select
        value={blockType}
        onChange={(e) => handleBlockTypeChange(e.target.value)}
        className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => handleListClick('ul')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'ul' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Bullet List"
      >
        • 목록
      </button>
      <button
        onClick={() => handleListClick('ol')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'ol' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Numbered List"
      >
        1. 목록
      </button>
      <button
        onClick={() => handleListClick('check')}
        className={`px-2.5 py-1.5 rounded text-sm transition-colors ${
          blockType === 'check' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Check List"
      >
        ☑ 체크
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={handleOutdent}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Outdent"
      >
        ←
      </button>
      <button
        onClick={handleIndent}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Indent"
      >
        →
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <button
        onClick={() => formatAlignment('left')}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Align Left"
      >
        ⫣
      </button>
      <button
        onClick={() => formatAlignment('center')}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Align Center"
      >
        ⫤
      </button>
      <button
        onClick={() => formatAlignment('right')}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Align Right"
      >
        ⫥
      </button>
      <button
        onClick={() => formatAlignment('justify')}
        className="px-2.5 py-1.5 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        type="button"
        title="Justify"
      >
        ⫦
      </button>
    </div>
  );
}
