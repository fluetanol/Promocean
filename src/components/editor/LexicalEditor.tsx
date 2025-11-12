'use client';

import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { CUSTOM_TRANSFORMERS } from './utils/markdownTransformers';


/**
 * LexicalEditorProps 인터페이스
 * @interface LexicalEditorProps
 * @property {(content: string) => void} onChange - 내용 변경 시 호출되는 함수
 * @property {string} [title] - 에디터 상단 툴바에 표시될 제목
 * @property {string} [placeholder] - 에디터의 플레이스홀더 텍스트
 */
interface LexicalEditorProps {
  onChange: (content: string) => void;
  title?: string;
  placeholder?: string;
  isSubmitButton?: boolean;
  handleSubmit?: () => void;
  isLoading?: boolean;
  value?: string; // Lexical JSON 문자열
}

function EditorErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


/**
 * LexicalEditor 컴포넌트
 * @param param0 - LexicalEditorProps의 분해 할당
 * @property onChange: (content: string) => void - 내용 변경 시 호출되는 함수
 * @property title?: string - 에디터 상단 툴바에 표시될 제목
 * @property placeholder?: string - 에디터의 플레이스홀더 텍스트
 * @returns JSX.Element
 */
// 외부에서 에디터 상태를 업데이트하는 플러그인
function UpdateEditorPlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();
  const prevValueRef = React.useRef<string | undefined>(undefined);

  React.useEffect(() => {
    // value가 없으면 아무것도 하지 않음
    if (!value) return;

    // 이전 값과 같으면 업데이트하지 않음 (onChange로 인한 업데이트 방지)
    if (prevValueRef.current === value) {
      return;
    }

    // 현재 에디터 상태와 비교
    const currentEditorState = JSON.stringify(editor.getEditorState().toJSON());

    // 현재 에디터 상태와 동일하면 업데이트하지 않음 (포커스 유지)
    if (currentEditorState === value) {
      prevValueRef.current = value;
      return;
    }

    // 외부에서 값이 변경된 경우에만 업데이트
    try {
      const editorState = editor.parseEditorState(value);
      editor.setEditorState(editorState);
      prevValueRef.current = value;
    } catch (error) {
      console.error('Failed to parse editor state:', error);
    }
  }, [value, editor]);

  return null;
}

export default function LexicalEditor({
  onChange,
  title,
  placeholder = '내용을 입력하세요...',
  isSubmitButton,
  handleSubmit,
  isLoading = false,
  value,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'PromoceanEditor',
    nodes: [
      HeadingNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      ListNode,
      ListItemNode,
      HorizontalRuleNode,
    ],
    theme: {
      paragraph: 'mb-2 text-gray-900 leading-relaxed',
      quote: 'border-l-4 border-blue-400 pl-4 italic text-gray-700 my-3 py-2 bg-blue-50',
      heading: {
        h1: 'text-4xl font-bold mb-4 mt-6 text-gray-900',
        h2: 'text-3xl font-bold mb-3 mt-5 text-gray-900',
        h3: 'text-2xl font-bold mb-2 mt-4 text-gray-900',
        h4: 'text-xl font-semibold mb-2 mt-3 text-gray-900',
        h5: 'text-lg font-semibold mb-1 mt-2 text-gray-900',
        h6: 'text-base font-semibold mb-1 mt-2 text-gray-900',
      },
      list: {
        nested: {
          listitem: 'list-none',
        },
        ol: 'list-decimal ml-5 my-2',
        ul: 'list-disc ml-5 my-2',
        listitem: 'mb-1 pl-1',
        checklist: 'list-none ml-0 my-2',
      },
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        code: 'bg-blue-50 px-2 py-0.5 text-sm rounded text-blue-600 font-medium',
        hashtag: 'bg-blue-50 px-2 py-0.5 text-sm rounded text-blue-600 font-medium',
      },
      code: 'bg-gray-900 text-gray-100 p-4 rounded-lg my-3 font-mono text-sm overflow-x-auto block [&_*]:text-gray-100',
    },
    onError: (error: Error) => {
      console.error('Lexical Error:', error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const htmlString = editorState.toJSON();
      onChange(JSON.stringify(htmlString));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded-lg overflow-hidden border-[2px] border-[#f9fafb] focus-within:border-[2px] focus-within:border-primary outline-none transition-colors duration-100">
        <ToolbarPlugin title={title}/>
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="w-full min-h-[350px] max-h-[400px] overflow-y-auto px-4 py-4 outline-none prose prose-sm max-w-none" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={EditorErrorBoundary}
          />
          {isSubmitButton && (
          <button
            type="button"
            className="absolute right-5 bottom-5
            w-14 h-14 bg-primary rounded-full text-white
            hover:bg-primary/70
            active:bg-primary/90
            transition-colors duration-200
            disabled:bg-gray-400 disabled:cursor-not-allowed
            flex items-center justify-center
            "
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              '테스트'
            )}
          </button>
          )}
        </div>

        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <TabIndentationPlugin />
        <MarkdownShortcutPlugin transformers={CUSTOM_TRANSFORMERS} />
        <OnChangePlugin onChange={handleChange} />
        <UpdateEditorPlugin value={value} />
      </div>
    </LexicalComposer>
  );
}
