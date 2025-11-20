import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CommentForm from '@components/form/CommentForm';

const meta: Meta<typeof CommentForm> = {
  title: 'Components/Form/CommentForm',
  component: CommentForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '댓글 작성 폼 컴포넌트입니다. 텍스트 영역과 제출 버튼을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 댓글 작성 폼입니다.',
      },
    },
  },
};

// 게시물 하단에 배치된 경우
export const WithinPostPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          {/* 가상의 게시물 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full"></div>
              <div>
                <h3 className="font-semibold">홍길동</h3>
                <p className="text-sm text-gray-500">2시간 전</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">AI 프롬프트 작성 팁</h2>
            <p className="text-gray-700 mb-4">
              효과적인 AI 프롬프트를 작성하는 방법에 대해 공유합니다.
              명확하고 구체적인 지시사항을 제공하는 것이 중요합니다...
            </p>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">댓글 3개</h3>

            {/* 기존 댓글들 */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3 pb-4 border-b">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-sm">김철수</p>
                  <p className="text-gray-700 text-sm">정말 유용한 정보네요! 감사합니다.</p>
                  <p className="text-xs text-gray-500 mt-1">1시간 전</p>
                </div>
              </div>
              <div className="flex gap-3 pb-4 border-b">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-sm">이영희</p>
                  <p className="text-gray-700 text-sm">이 방법을 사용해봤는데 정말 효과적이었어요.</p>
                  <p className="text-xs text-gray-500 mt-1">30분 전</p>
                </div>
              </div>
            </div>

            {/* 댓글 작성 폼 */}
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '게시물 하단에 배치된 댓글 작성 폼입니다.',
      },
    },
  },
};

// 인터랙티브 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">💡 인터랙션 테스트</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• 텍스트를 입력해보세요</li>
            <li>• 비어있을 때 버튼이 비활성화됩니다</li>
            <li>• 텍스트를 입력하면 버튼이 활성화됩니다</li>
            <li>• 제출하면 입력 내용이 초기화됩니다</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '폼의 상호작용을 테스트할 수 있습니다.',
      },
    },
  },
};

// 포커스 상태
export const FocusedState: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold mb-2">포커스 효과</p>
          <p className="text-xs text-gray-600">
            텍스트 영역을 클릭하면 파란색 링이 표시됩니다
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '텍스트 영역의 포커스 상태를 확인합니다.',
      },
    },
  },
};

// 비활성화 상태
export const DisabledState: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold mb-2">비활성화 상태</p>
          <p className="text-xs text-gray-600">
            아무것도 입력하지 않으면 버튼이 비활성화되어 클릭할 수 없습니다
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '입력이 없을 때 버튼이 비활성화된 상태입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-3">댓글 작성</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 댓글 작성 폼입니다.',
      },
    },
  },
};

// 대화형 댓글 섹션
export const InteractiveCommentSection: Story = {
  render: () => {
    const [comments, setComments] = useState([
      { id: 1, author: '김철수', content: '정말 유용한 정보네요!', time: '2시간 전' },
      { id: 2, author: '이영희', content: '이 방법 효과적이에요.', time: '1시간 전' },
    ]);

    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">댓글 {comments.length}개</h3>

          {/* 댓글 목록 */}
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold">
                  {comment.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-xs text-gray-500">{comment.time}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 댓글 작성 폼 */}
          <CommentForm />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '댓글 목록과 함께 사용되는 대화형 예시입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">댓글 작성</h3>
          <div className="[&_textarea]:bg-gray-700 [&_textarea]:text-white [&_textarea]:border-gray-600 [&_textarea]:placeholder-gray-400">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: '다크 모드 환경에서의 댓글 작성 폼입니다.',
      },
    },
  },
};

// 답글 작성 폼
export const ReplyForm: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* 원본 댓글 */}
          <div className="flex gap-3 mb-4 pb-4 border-b">
            <div className="w-10 h-10 bg-primary rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm">김철수</p>
                <p className="text-xs text-gray-500">1시간 전</p>
              </div>
              <p className="text-gray-700 text-sm">정말 유용한 정보네요!</p>
            </div>
          </div>

          {/* 답글 작성 영역 */}
          <div className="ml-12">
            <p className="text-sm text-gray-600 mb-2 font-medium">답글 작성</p>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '댓글에 대한 답글을 작성하는 폼입니다.',
      },
    },
  },
};

// 커뮤니티 가이드라인 포함
export const WithGuidelines: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 p-4 bg-blue-50 border-l-4 border-primary rounded">
            <p className="text-sm font-semibold text-blue-900 mb-2">💬 댓글 작성 가이드</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• 존중과 배려를 담아 댓글을 작성해주세요</li>
              <li>• 욕설, 비방, 광고는 삭제될 수 있습니다</li>
              <li>• 건설적인 의견 교환을 환영합니다</li>
            </ul>
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '커뮤니티 가이드라인과 함께 표시되는 댓글 작성 폼입니다.',
      },
    },
  },
};

// 문자 수 제한 표시 (향상된 버전)
export const WithCharacterCount: Story = {
  render: () => {
    const [comment, setComment] = useState('');
    const maxLength = 500;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-6 pb-6 border-gray-200">
          <form className="space-y-3">
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                rows={4}
                maxLength={maxLength}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 text-sm"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {comment.length} / {maxLength}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                  title="이미지 추가"
                >
                  📷
                </button>
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                  title="이모지 추가"
                >
                  😊
                </button>
              </div>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="px-6 py-2 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '문자 수 제한과 추가 기능 버튼이 있는 향상된 댓글 작성 폼입니다.',
      },
    },
  },
};

// 간단한 레이아웃
export const SimpleLayout: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '최소한의 스타일링으로 표시된 댓글 작성 폼입니다.',
      },
    },
  },
};
