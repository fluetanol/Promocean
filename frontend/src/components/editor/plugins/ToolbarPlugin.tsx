import { useToolbarState } from './toolbar/hooks/useToolbarState';
import { TextFormatToolbar } from './toolbar/components/TextFormatToolbar';
import { ListAndIndentToolbar } from './toolbar/components/ListAndIndentToolbar';
import { BlockTypeSelector } from './toolbar/components/BlockTypeSelector';

export function ToolbarPlugin({ title }: { title?: string }) {
  const { isBold, isItalic, isUnderline, isStrikethrough, isCode, blockType } =
    useToolbarState();

  return (
    <div className="sticky top-0 z-10 flex gap-2 px-2 py-2 items-center">
      {/* 한줄: 본문 크기 + 기본 텍스트 스타일 + 목록 + 들여쓰기 */}

      {title && <h3 className="text-lg font-medium text-gray-800 px-2">{title}</h3>}
      <div className="w-px h-6"/>
      <TextFormatToolbar
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
        isCode={isCode}
      />
      <div className="w-px h-6"/>
      <ListAndIndentToolbar blockType={blockType} />
      <div className="w-px h-6"/>
      <BlockTypeSelector blockType={blockType} />
    </div>
  );
}
