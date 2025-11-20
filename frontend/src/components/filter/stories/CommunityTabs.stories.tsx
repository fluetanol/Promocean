import type { Meta, StoryObj } from '@storybook/react';
import CommunityTabs from '@components/filter/CommunityTabs';

const meta: Meta<typeof CommunityTabs> = {
  title: 'Components/Filter/CommunityTabs',
  component: CommunityTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '커뮤니티 카테고리 탭 컴포넌트입니다. 전체, 업무, 개발, 디자인 등 다양한 카테고리를 선택할 수 있습니다.',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/community',
        query: { tab: 'all' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityTabs>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 커뮤니티 탭입니다. 현재 선택된 탭은 primary 색상으로 표시됩니다.',
      },
    },
  },
};

// 커뮤니티 페이지 컨텍스트
export const WithinCommunityPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-primary text-white px-8 py-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/90 rounded-full mr-6"></div>
            <div>
              <h1 className="text-3xl font-semibold">커뮤니티</h1>
              <p className="text-white/80 text-sm">Promocean 커뮤니티 공간</p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <Story />

        {/* 컨텐츠 */}
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
                <h3 className="font-semibold mb-2">게시물 제목 {i + 1}</h3>
                <p className="text-sm text-gray-600">게시물 내용 미리보기...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '커뮤니티 페이지 내에서의 탭 사용 예시입니다.',
      },
    },
  },
};

// 다양한 카테고리 시뮬레이션
export const DifferentCategories: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-8">전체 카테고리 보기</h3>
        <CommunityTabs />
        <div className="px-8 mt-4 text-sm text-gray-600">
          <p>카테고리 목록:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>전체 - 모든 게시물</li>
            <li>업무 - 업무 관련 프롬프트</li>
            <li>개발 - 개발/프로그래밍 관련</li>
            <li>디자인 - 디자인/창작 관련</li>
            <li>교육 - 교육/학습 관련</li>
            <li>마케팅 - 마케팅/광고 관련</li>
            <li>창작 - 창작/예술 관련</li>
            <li>데이터 - 데이터 분석 관련</li>
            <li>생활 - 일상/생활 관련</li>
            <li>AI - AI/머신러닝 관련</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 카테고리를 보여주는 탭입니다.',
      },
    },
  },
};

// 스크롤 테스트
export const ScrollTest: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <div className="bg-primary text-white px-8 py-6">
          <h1 className="text-3xl font-semibold">커뮤니티</h1>
        </div>
        <div className="sticky top-0 z-10 shadow-sm">
          <Story />
        </div>
        <div className="max-w-7xl mx-auto p-8">
          <div className="space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="font-semibold mb-2">게시물 {i + 1}</h3>
                <p className="text-gray-600">
                  스크롤하면 탭이 상단에 고정되어 표시됩니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크롤 시 상단에 고정되는 sticky 탭입니다.',
      },
    },
  },
};

// 호버 효과 테스트
export const HoverTest: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="mb-4 px-8 py-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 호버 효과 테스트</p>
          <p className="text-sm">각 탭에 마우스를 올려 색상 변화를 확인하세요</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '탭의 호버 효과를 테스트합니다.',
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveTest: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">데스크톱 뷰</h3>
        <CommunityTabs />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">태블릿 뷰 (시뮬레이션)</h3>
        <div className="max-w-3xl">
          <CommunityTabs />
        </div>
        <p className="px-4 mt-2 text-sm text-gray-600">
          좁은 화면에서는 탭이 넘칠 수 있습니다. 스크롤하여 확인하세요.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">모바일 뷰 (시뮬레이션)</h3>
        <div className="max-w-sm overflow-x-auto">
          <CommunityTabs />
        </div>
        <p className="px-4 mt-2 text-sm text-gray-600">
          모바일에서는 가로 스크롤이 가능합니다.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 탭 모습입니다.',
      },
    },
  },
};

// 실제 사용 시나리오
export const RealUsageScenario: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white px-8 py-6">
        <h1 className="text-3xl font-semibold mb-2">커뮤니티</h1>
        <p className="text-white/80">Promocean 커뮤니티 공간</p>
      </div>

      <CommunityTabs />

      <div className="max-w-7xl mx-auto p-6">
        {/* 필터 및 검색 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              최신순
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              인기순
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="검색..."
              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="px-6 py-2 bg-primary text-white rounded-md text-sm">
              검색
            </button>
          </div>
        </div>

        {/* 게시물 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-400 group-hover:scale-105 transition-transform"></div>
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    개발
                  </span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  React 19의 새로운 기능들을 알아보자
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  React 19에서 추가된 주요 기능들과 개선사항...
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex gap-3">
                    <span>❤️ {42 + i * 5}</span>
                    <span>💬 {18 + i * 2}</span>
                  </div>
                  <span>김개발</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 커뮤니티 페이지의 전체 레이아웃입니다.',
      },
    },
  },
};
