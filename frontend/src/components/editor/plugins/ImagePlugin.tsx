import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, LexicalCommand, createCommand } from 'lexical';
import { $createImageNode } from '../nodes/ImageNode';

export const INSERT_IMAGE_COMMAND: LexicalCommand<{
  src: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
}> = createCommand();

export function ImagePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const { src, altText, width, height, caption } = payload;
        const imageNode = $createImageNode(src, altText, width, height, caption);
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertNodes([imageNode]);
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
