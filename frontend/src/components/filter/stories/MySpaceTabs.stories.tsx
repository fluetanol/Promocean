import type { Meta, StoryObj } from '@storybook/react';
import MySpaceTabs from '@components/filter/MySpaceTabs';

const meta: Meta<typeof MySpaceTabs> = {
  title: 'Components/Filter/MySpaceTabs',
  component: MySpaceTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '마이 스페이스 탭 컴포넌트입니다. 아카이브와 스크랩 탭을 제공합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/my-space/archive',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MySpaceTabs>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 마이 스페이스 탭입니다.',
      },
    },
  },
};

// 마이 스페이스 페이지 컨텍스트
export const WithinMySpacePage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-primary text-white px-8 py-6">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/90 rounded-full mr-6"></div>
            <div>
              <h1 className="text-3xl font-semibold">김개발 님의 스페이스</h1>
              <p className="text-white/80 text-sm">나만의 프롬프트 세계를 만들어요!</p>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <Story />

        {/* 컨텐츠 */}
        <div className="max-w-7xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-blue-200 rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-xl">프로젝트 {i + 1}</h3>
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
        story: '마이 스페이스 페이지 내에서의 탭 사용 예시입니다.',
      },
    },
  },
};

// 아카이브 탭 활성화
export const ArchiveTabActive: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-2">
          <h1 className="text-3xl font-semibold">마이 스페이스</h1>
        </div>
        <Story />
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">아카이브</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-purple-200 rounded-xl p-6 h-40 flex items-center justify-center"
              >
                <h3 className="font-semibold">아카이브 {i + 1}</h3>
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
        story: '아카이브 탭이 활성화된 상태입니다.',
      },
    },
  },
};

// 스크랩 탭 시뮬레이션
export const ScrapTabSimulation: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-50">
        <div className="bg-primary text-white px-8 py-6 mb-2">
          <h1 className="text-3xl font-semibold">마이 스페이스</h1>
        </div>
        <Story />
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">스크랩한 게시물</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      스크랩한 프롬프트 {i + 1}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      프롬프트 내용 미리보기...
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>❤️ {42 + i * 10}</span>
                      <span>💬 {18 + i * 3}</span>
                      <span>작성자: 김개발</span>
                    </div>
                  </div>
                </div>
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
        story: '스크랩 탭이 활성화된 상태를 시뮬레이션합니다.',
      },
    },
  },
};

// 전체 마이 스페이스 레이아웃
export const FullMySpaceLayout: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-primary text-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/90 rounded-full mr-6 flex items-center justify-center text-primary text-2xl font-bold">
              K
            </div>
            <div>
              <h1 className="text-3xl font-semibold">김개발 님의 스페이스</h1>
              <p className="text-white/80 text-sm">
                나만의 프롬프트 세계를 만들어요!
              </p>
            </div>
          </div>
          <button className="px-6 py-2 bg-white text-primary rounded-lg hover:bg-white/90 font-semibold">
            + 새 프롬프트
          </button>
        </div>
      </div>

      {/* 탭 */}
      <MySpaceTabs />

      {/* 통계 */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">24</div>
            <div className="text-sm text-gray-600">총 프롬프트</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-sm text-gray-600">공개 프롬프트</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-sm text-gray-600">받은 좋아요</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">42</div>
            <div className="text-sm text-gray-600">스크랩</div>
          </div>
        </div>

        {/* 아카이브 섹션 */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg">
              Pinned
            </h2>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110">
              + 추가
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI 챗봇', color: 'bg-blue-200' },
              { title: '이미지 생성', color: 'bg-purple-200' },
              { title: '음성 인식', color: 'bg-green-200' },
              { title: '텍스트 분석', color: 'bg-yellow-200' },
            ].map((project, i) => (
              <div
                key={i}
                className={`${project.color} rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer`}
              >
                <h3 className="font-semibold text-xl">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recent 섹션 */}
        <div>
          <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg mb-6">
            Recent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-xl">프로젝트 {i + 1}</h3>
                <p className="text-sm text-gray-700 mt-2">2일 전</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 마이 스페이스 페이지의 전체 레이아웃입니다.',
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

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-primary text-white p-4">
          <h2 className="font-semibold">마이 스페이스</h2>
        </div>
        <Story />
        <div className="p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-sm">프로젝트 {i}</h4>
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
        story: '모바일 환경에서의 마이 스페이스 탭입니다.',
      },
    },
  },
};
