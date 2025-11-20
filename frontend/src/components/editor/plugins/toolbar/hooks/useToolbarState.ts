import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode } from '@lexical/list';
import { $isLinkNode } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';

export function useToolbarState() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      const node = selection.anchor.getNode();
      const parent = node.getParent();
      setIsLink($isLinkNode(parent) || $isLinkNode(node));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if (element.__type === 'heading') {
          const tag = (element as HeadingNode).getTag();
          setBlockType(tag);
        } else if (element.__type === 'quote') {
          setBlockType('quote');
        } else if (element.__type === 'code') {
          setBlockType('code');
        } else if (element.__type === 'listitem') {
          const parent = element.getParent();
          if (parent) {
            const listType = (parent as ListNode).getListType();
            if (listType === 'bullet') {
              setBlockType('ul');
            } else if (listType === 'number') {
              setBlockType('ol');
            } else if (listType === 'check') {
              setBlockType('check');
            }
          }
        } else {
          setBlockType('paragraph');
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, [editor, updateToolbar]);

  return {
    isBold,
    isItalic,
    isUnderline,
    isStrikethrough,
    isCode,
    isLink,
    blockType,
  };
}
