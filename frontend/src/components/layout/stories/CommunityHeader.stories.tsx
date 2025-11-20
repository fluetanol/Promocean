import type { Meta, StoryObj } from '@storybook/react';
import CommunityHeader from '@components/layout/CommunityHeader';

const meta: Meta<typeof CommunityHeader> = {
  title: 'Components/Layout/CommunityHeader',
  component: CommunityHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '커뮤니티 페이지 헤더 컴포넌트입니다. 페이지 제목과 설명을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityHeader>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 커뮤니티 헤더입니다.',
      },
    },
  },
};

// 전체 페이지 레이아웃
export const WithPageLayout: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">게시물 {i + 1}</h3>
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
        story: '전체 페이지 레이아웃 내에서의 헤더입니다.',
      },
    },
  },
};

// 다른 헤더들과 비교
export const HeaderComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">커뮤니티 헤더</h3>
        <CommunityHeader />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 px-4">설명</h3>
        <div className="px-4 text-sm text-gray-600">
          <p>• Primary 색상 배경</p>
          <p>• 원형 아이콘 영역 (로고나 이미지 배치용)</p>
          <p>• 제목과 부제목 표시</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '커뮤니티 헤더의 구조와 스타일을 설명합니다.',
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
        <CommunityHeader />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">태블릿 뷰 (시뮬레이션)</h3>
        <div className="max-w-3xl">
          <CommunityHeader />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">모바일 뷰 (시뮬레이션)</h3>
        <div className="max-w-md">
          <CommunityHeader />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 헤더 모습입니다.',
      },
    },
  },
};

// 스크롤 테스트
export const WithScrollContent: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen flex flex-col bg-gray-50">
        <Story />
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">인기 게시물</h2>
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold mb-2">
                    React 19의 새로운 기능들 {i + 1}
                  </h3>
                  <p className="text-sm text-gray-600">
                    React 19에서 추가된 새로운 기능들을 알아봅니다...
                  </p>
                  <div className="flex gap-4 mt-3 text-xs text-gray-500">
                    <span>❤️ 42</span>
                    <span>💬 18</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크롤 가능한 컨텐츠와 함께 있는 헤더입니다.',
      },
    },
  },
};

// 실제 커뮤니티 페이지 시뮬레이션
export const FullCommunityPage: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <CommunityHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* 필터 및 정렬 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-md">
              전체
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              개발
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              디자인
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              질문
            </button>
          </div>

          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>최신순</option>
            <option>인기순</option>
            <option>댓글많은순</option>
          </select>
        </div>

        {/* 게시물 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-400"></div>
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    개발
                  </span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  TypeScript 5.0의 새로운 기능 완벽 정리
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  TypeScript 5.0에서 추가된 주요 기능들과 개선사항을
                  살펴봅니다...
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
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
    docs: {
      description: {
        story: '실제 커뮤니티 페이지의 전체 레이아웃 시뮬레이션입니다.',
      },
    },
  },
};
