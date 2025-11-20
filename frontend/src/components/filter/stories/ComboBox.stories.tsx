import type { Meta, StoryObj } from '@storybook/react';
import ComboBox from '@components/filter/ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'Components/Filter/ComboBox',
  component: ComboBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '검색 필터 콤보박스 컴포넌트입니다. 제목, 작성자, 내용 중 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 콤보박스입니다. 클릭하여 드롭다운을 열 수 있습니다.',
      },
    },
  },
};

// 검색바와 함께 사용
export const WithSearchBar: Story = {
  decorators: [
    (Story) => (
      <div className="flex items-center gap-2">
        <Story />
        <input
          type="text"
          placeholder="검색어 입력"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="px-6 py-2 bg-primary text-white rounded-md hover:brightness-110">
          검색
        </button>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '검색바와 함께 사용되는 콤보박스입니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded">
          <p className="text-sm font-semibold mb-2">💡 상호작용 테스트</p>
          <ul className="text-sm space-y-1">
            <li>• 콤보박스를 클릭하여 옵션을 확인하세요</li>
            <li>• 제목, 작성자, 내용 중 선택할 수 있습니다</li>
            <li>• 선택한 옵션은 primary 색상으로 표시됩니다</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '콤보박스의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 전체 검색 폼
export const FullSearchForm: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">게시물 검색</h3>
        <div className="flex items-center gap-2">
          <Story />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-8 py-2 bg-primary text-white rounded-md hover:brightness-110 transition-all">
              검색
            </button>
          </div>
        </div>

        {/* 검색 결과 예시 */}
        <div className="mt-6 space-y-3">
          <div className="text-sm text-gray-600">검색 결과 예시:</div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <h4 className="font-semibold mb-1">검색된 게시물 {i}</h4>
              <p className="text-sm text-gray-600">게시물 내용 미리보기...</p>
            </div>
          ))}
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 검색 폼 내에서의 콤보박스입니다.',
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
          <ComboBox />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">회색 배경</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <ComboBox />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <ComboBox />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색에서의 콤보박스 모습입니다.',
      },
    },
  },
};

// 커뮤니티 페이지에서 사용
export const InCommunityPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-6">
          <h1 className="text-3xl font-semibold">커뮤니티</h1>
          <p className="text-white/80 text-sm">Promocean 커뮤니티 공간</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {/* 검색 영역 */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <div className="flex items-center gap-2">
              <Story />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button className="px-8 py-2 bg-primary text-white rounded-md">
                검색
              </button>
            </div>
          </div>

          {/* 게시물 그리드 */}
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
        story: '실제 커뮤니티 페이지에서 사용되는 콤보박스입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-semibold mb-3">검색</h3>
        <div className="space-y-2">
          <Story />
          <input
            type="text"
            placeholder="검색어 입력"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
          />
          <button className="w-full px-4 py-2 bg-primary text-white rounded-md text-sm">
            검색
          </button>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 콤보박스입니다.',
      },
    },
  },
};

// 열린 상태 시뮬레이션
export const OpenStateSimulation: Story = {
  decorators: [
    (Story) => (
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded text-sm">
          ℹ️ 콤보박스를 클릭하여 드롭다운이 열리는 것을 확인하세요
        </div>
        <Story />
        <div className="mt-20 text-sm text-gray-500">
          드롭다운이 열리면 이 영역 위에 표시됩니다
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '콤보박스의 드롭다운이 열린 상태를 시뮬레이션합니다.',
      },
    },
  },
};
