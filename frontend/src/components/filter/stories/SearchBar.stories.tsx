import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '@components/filter/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Filter/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '검색 바 컴포넌트입니다. 키워드를 입력하고 검색할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 검색 바입니다.',
      },
    },
  },
};

// 커뮤니티 페이지에서
export const InCommunityPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">커뮤니티</h1>
              <p className="text-white/80 text-sm">Promocean 커뮤니티 공간</p>
            </div>
            <Story />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-3"></div>
                <h3 className="font-semibold mb-2">게시물 {i + 1}</h3>
                <p className="text-sm text-gray-600">게시물 내용...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '커뮤니티 페이지 헤더에 배치된 검색 바입니다.',
      },
    },
  },
};

// 중앙 배치
export const CenteredLayout: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">검색</h1>
        <Story />
        <p className="mt-4 text-sm text-gray-600">검색어를 입력하고 Enter를 누르세요</p>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '페이지 중앙에 배치된 검색 바입니다.',
      },
    },
  },
};

// 검색 페이지 레이아웃
export const SearchPageLayout: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold mb-6">프롬프트 검색</h2>
            <div className="flex gap-3">
              <Story />
              <button className="px-8 py-2 bg-primary text-white rounded-full hover:brightness-110 font-semibold">
                검색
              </button>
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">검색 결과</h3>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer"
              >
                <h4 className="font-semibold mb-2">검색된 프롬프트 {i}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  검색어와 일치하는 프롬프트 내용...
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>❤️ {20 + i * 5}</span>
                  <span>💬 {8 + i * 2}</span>
                  <span>작성자: 김개발</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '검색 페이지 레이아웃에서의 검색 바입니다.',
      },
    },
  },
};

// 네비게이션 바에 배치
export const InNavigationBar: Story = {
  decorators: [
    (Story) => (
      <div>
        <nav className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-primary">PromOcean</h1>
              <div className="flex gap-6">
                <a href="#" className="text-gray-700 hover:text-primary">
                  커뮤니티
                </a>
                <a href="#" className="text-gray-700 hover:text-primary">
                  대회
                </a>
                <a href="#" className="text-gray-700 hover:text-primary">
                  마이 스페이스
                </a>
              </div>
            </div>
            <Story />
          </div>
        </nav>

        <div className="p-8 bg-gray-50">
          <p className="text-center text-gray-600">페이지 컨텐츠</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '네비게이션 바에 배치된 검색 바입니다.',
      },
    },
  },
};

// 다양한 너비
export const DifferentWidths: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">기본 너비 (w-72)</h3>
        <SearchBar />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">전체 너비 시뮬레이션</h3>
        <div className="w-full">
          <form className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-full bg-white focus-within:ring-2 focus-within:ring-primary">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="검색어 입력"
              className="flex-grow text-sm bg-transparent focus:outline-none"
            />
          </form>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-700">좁은 너비 (w-48)</h3>
        <div className="w-48">
          <SearchBar />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 너비에서의 검색 바입니다.',
      },
    },
  },
};

// 포커스 상태
export const FocusState: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 포커스 테스트</p>
          <p className="text-sm">검색창을 클릭하여 포커스 링(ring)을 확인하세요</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '검색 바의 포커스 상태를 테스트합니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold mb-3">검색</h2>
          <Story />
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-gray-50 rounded">
              <h4 className="text-sm font-semibold">검색 결과 {i}</h4>
              <p className="text-xs text-gray-600 mt-1">내용...</p>
            </div>
          ))}
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 검색 바입니다.',
      },
    },
  },
};

// 검색 제안 기능 시뮬레이션
export const WithSuggestions: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-50 rounded-lg">
        <div className="relative">
          <Story />
          {/* 검색 제안 드롭다운 (시뮬레이션) */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2">인기 검색어</div>
              {['React 프롬프트', 'AI 이미지 생성', 'TypeScript 가이드'].map(
                (suggestion, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '검색 제안 기능이 있는 검색 바 시뮬레이션입니다.',
      },
    },
  },
};
