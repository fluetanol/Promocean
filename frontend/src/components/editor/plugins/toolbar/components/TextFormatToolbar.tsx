import { useToolbarActions } from '../hooks/useToolbarActions';

interface TextFormatToolbarProps {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
}

export function TextFormatToolbar({
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  isCode,
}: TextFormatToolbarProps) {
  const { formatText } = useToolbarActions();

  return (
    <>
      <button
        onClick={() => formatText('bold')}
        className={`px-2.5 py-1.5 rounded text-sm font-semibold transition-colors ${
          isBold ? 'bg-blue-500 text-white' : ' text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Bold (Ctrl+B)"
      >
        B
      </button>
      <button
        onClick={() => formatText('italic')}
        className={`px-2.5 py-1.5 rounded text-sm italic transition-colors ${
          isItalic ? 'bg-blue-500 text-white' : ' text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Italic (Ctrl+I)"
      >
        I
      </button>
      <button
        onClick={() => formatText('underline')}
        className={`px-2.5 py-1.5 rounded text-sm underline transition-colors ${
          isUnderline ? 'bg-blue-500 text-white' : ' text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Underline (Ctrl+U)"
      >
        U
      </button>
      <button
        onClick={() => formatText('strikethrough')}
        className={`px-2.5 py-1.5 rounded text-sm line-through transition-colors ${
          isStrikethrough ? 'bg-blue-500 text-white' : ' text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Strikethrough"
      >
        S
      </button>
      <button
        onClick={() => formatText('code')}
        className={`px-2.5 py-1.5 rounded text-sm font-mono transition-colors ${
          isCode ? 'bg-blue-500 text-white' : ' text-gray-700 hover:bg-gray-200'
        }`}
        type="button"
        title="Inline Code"
      >
        {`</>`}
      </button>
    </>
  );
}
