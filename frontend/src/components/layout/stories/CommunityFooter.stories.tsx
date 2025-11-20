import type { Meta, StoryObj } from '@storybook/react';
import CommunityFooter from '@components/layout/CommunityFooter';

const meta: Meta<typeof CommunityFooter> = {
  title: 'Components/Layout/CommunityFooter',
  component: CommunityFooter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 페이지네이션 푸터 컴포넌트입니다. 페이지 이동을 위한 번호 버튼과 이전/다음 버튼을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityFooter>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 페이지네이션 푸터입니다. 현재는 1번 페이지가 활성화되어 있습니다.',
      },
    },
  },
};

// 컨테이너 내에서
export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-4">커뮤니티 게시물 목록</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
              >
                <h3 className="font-semibold">게시물 제목 {i}</h3>
                <p className="text-sm text-gray-600">게시물 내용 미리보기...</p>
              </div>
            ))}
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '실제 커뮤니티 페이지에서 사용되는 것과 유사한 레이아웃입니다.',
      },
    },
  },
};

// 페이지 하단에 배치
export const AtBottomOfPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">커뮤니티</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <h3 className="font-semibold mb-2">게시물 {i + 1}</h3>
                  <p className="text-sm text-gray-600">게시물 설명...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '페이지 하단에 배치된 페이지네이션입니다.',
      },
    },
  },
};

// 버튼 상호작용 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 상호작용 테스트</p>
          <ul className="text-sm space-y-1">
            <li>• 페이지 번호 버튼을 클릭해보세요</li>
            <li>• 이전(«) 버튼과 다음(») 버튼을 클릭해보세요</li>
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
        story: '페이지네이션 버튼의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 다양한 배경에서
export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">흰색 배경</h3>
        <div className="bg-white p-4 rounded-lg">
          <CommunityFooter />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">회색 배경</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <CommunityFooter />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <CommunityFooter />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색에서의 페이지네이션 모습입니다.',
      },
    },
  },
};

// 모바일 반응형
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">모바일 뷰 (380px)</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 페이지네이션입니다.',
      },
    },
  },
};

// 전체 페이지 시뮬레이션
export const FullPageSimulation: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <header className="bg-primary text-white p-6 rounded-t-lg mb-6">
          <h1 className="text-3xl font-bold">커뮤니티</h1>
          <p className="text-white/80">Promocean 커뮤니티 공간</p>
        </header>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 truncate">
                      React 19의 새로운 기능들 {i + 1}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      React 19에서 추가된 새로운 기능들을 알아봅니다. Server
                      Components, Actions, 그리고 더 많은 것들...
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>👤 김개발</span>
                      <span>❤️ 42</span>
                      <span>💬 18</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CommunityFooter />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 커뮤니티 페이지의 전체 레이아웃 시뮬레이션입니다.',
      },
    },
  },
};
