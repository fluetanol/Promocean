import type { Meta, StoryObj } from '@storybook/react';
import PostingFooter from '@components/layout/PostingFooter';

const meta: Meta<typeof PostingFooter> = {
  title: 'Components/Layout/PostingFooter',
  component: PostingFooter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시물 작성 푸터 컴포넌트입니다. 취소 및 작성 완료 버튼을 제공합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostingFooter>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 게시물 작성 푸터입니다.',
      },
    },
  },
};

// 게시물 작성 폼 내에서
export const WithinPostingForm: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">새 게시물 작성</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">제목</label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>개발</option>
              <option>디자인</option>
              <option>질문</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">내용</label>
            <textarea
              rows={8}
              placeholder="내용을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">해시태그</label>
            <input
              type="text"
              placeholder="#태그1 #태그2 #태그3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '실제 게시물 작성 폼 내에서의 푸터 위치입니다.',
      },
    },
  },
};

// 버튼 인터랙션 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 상호작용 테스트</p>
          <ul className="text-sm space-y-1">
            <li>• 취소 버튼을 클릭하면 이전 페이지로 돌아갑니다</li>
            <li>• 작성 완료 버튼을 클릭하면 게시물이 제출됩니다</li>
            <li>• 버튼에 마우스를 올려 호버 효과를 확인하세요</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '버튼의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 고정된 하단 푸터
export const StickyFooter: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">새 게시물 작성</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="제목"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <textarea
                rows={20}
                placeholder="내용을 입력하세요..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
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
        story: '페이지 하단에 고정된 푸터입니다. 스크롤해도 항상 보입니다.',
      },
    },
  },
};

// 다양한 너비에서
export const DifferentWidths: Story = {
  render: () => {
    const mockSubmit = () => console.log('Submit clicked');
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">전체 너비</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <PostingFooter onSubmit={mockSubmit} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">중간 너비 (768px)</h3>
          <div className="max-w-3xl bg-white p-4 rounded-lg border border-gray-200">
            <PostingFooter onSubmit={mockSubmit} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">좁은 너비 (모바일, 480px)</h3>
          <div className="max-w-md bg-white p-4 rounded-lg border border-gray-200">
            <PostingFooter onSubmit={mockSubmit} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 너비에서의 푸터 레이아웃입니다.',
      },
    },
  },
};

// 전체 페이지 시뮬레이션
export const FullPageSimulation: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold">새 게시물 작성</h1>
            <p className="text-gray-600 mt-2">커뮤니티에 공유할 내용을 작성해주세요</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">제목 *</label>
              <input
                type="text"
                placeholder="게시물 제목을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">카테고리 *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">카테고리를 선택하세요</option>
                <option value="dev">개발</option>
                <option value="design">디자인</option>
                <option value="qa">질문/답변</option>
                <option value="tip">팁/노하우</option>
                <option value="notice">공지사항</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">내용 *</label>
              <textarea
                rows={12}
                placeholder="게시물 내용을 작성하세요&#10;&#10;• Markdown 문법을 사용할 수 있습니다&#10;• 이미지는 드래그 앤 드롭으로 추가할 수 있습니다"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">해시태그</label>
              <input
                type="text"
                placeholder="#react #typescript #nextjs"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                공백 또는 쉼표로 구분하여 입력하세요
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">썸네일 이미지</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <p className="text-gray-600">클릭하거나 드래그하여 이미지 업로드</p>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG, GIF (최대 5MB)
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <PostingFooter onSubmit={() => console.log('Submit clicked')} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 게시물 작성 페이지의 전체 레이아웃입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">새 게시물</h2>
        </div>
        <div className="p-4 space-y-3">
          <input
            type="text"
            placeholder="제목"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
          />
          <textarea
            rows={6}
            placeholder="내용"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 게시물 작성 푸터입니다.',
      },
    },
  },
};
