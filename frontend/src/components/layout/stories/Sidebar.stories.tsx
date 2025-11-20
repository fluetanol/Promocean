import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '@components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '전체 사이드바 컴포넌트입니다. 헤더, 네비게이션 섹션, 푸터를 포함하며 토글 기능을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바입니다. 로그인 상태에 따라 다른 메뉴를 표시합니다.',
      },
    },
  },
};

// 전체 페이지 레이아웃
export const WithPageLayout: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-50">
          <Story />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-3xl font-bold mb-6">메인 컨텐츠 영역</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
                  <h3 className="font-semibold mb-2">카드 {i + 1}</h3>
                  <p className="text-sm text-gray-600">카드 설명...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 페이지 레이아웃 내에서의 사이드바입니다.',
      },
    },
  },
};

// 토글 기능 테스트
export const ToggleTest: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex min-h-screen bg-gray-50">
          <Story />
          <div className="flex-1 p-8 ml-64">
            <div className="max-w-4xl">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">
                  💡 토글 기능 테스트
                </h2>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• 사이드바 헤더의 토글 버튼(←)을 클릭해보세요</li>
                  <li>• 사이드바가 축소되면 아이콘만 표시됩니다</li>
                  <li>• 축소된 상태에서 로고를 클릭하면 다시 확장됩니다</li>
                  <li>• 메인 컨텐츠 영역이 자동으로 조정됩니다</li>
                </ul>
              </div>

              <h1 className="text-3xl font-bold mb-6">페이지 컨텐츠</h1>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="font-semibold mb-2">섹션 {i + 1}</h3>
                    <p className="text-gray-600">
                      사이드바가 축소/확장될 때 이 영역의 너비가 자동으로
                      조정됩니다.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '사이드바의 토글 기능을 테스트합니다.',
      },
    },
  },
};

// 다양한 페이지 시나리오
export const DifferentPageScenarios: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">커뮤니티 페이지</h3>
        <SidebarProvider>
          <div className="flex h-96 bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64 p-6">
              <div className="bg-primary text-white p-6 rounded-lg mb-4">
                <h2 className="text-2xl font-bold">커뮤니티</h2>
                <p>Promocean 커뮤니티 공간</p>
              </div>
              <div className="bg-white p-4 rounded border">게시물 목록...</div>
            </div>
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">마이 스페이스 페이지</h3>
        <SidebarProvider>
          <div className="flex h-96 bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64 p-6">
              <div className="bg-primary text-white p-6 rounded-lg mb-4">
                <h2 className="text-2xl font-bold">김개발 님의 스페이스</h2>
                <p>나만의 프롬프트 세계를 만들어요!</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-200 p-6 rounded-lg h-32"></div>
                <div className="bg-purple-200 p-6 rounded-lg h-32"></div>
                <div className="bg-green-200 p-6 rounded-lg h-32"></div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 페이지에서의 사이드바 사용 예시입니다.',
      },
    },
  },
};

// 로그인/로그아웃 상태
export const LoginStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">
          로그인 상태 (스페이스 메뉴 표시)
        </h3>
        <SidebarProvider>
          <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 ml-64 p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ✅ 로그인 상태에서는 "스페이스" 섹션이 표시됩니다
                </p>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '로그인 상태에 따른 사이드바 메뉴 변화를 보여줍니다.',
      },
    },
  },
};

// 실제 애플리케이션 레이아웃
export const RealApplicationLayout: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Story />
          <div className="flex-1 ml-64 bg-gray-50">
            {/* 헤더 */}
            <div className="bg-primary text-white px-8 py-6">
              <div className="w-20 h-20 bg-white/90 rounded-full mb-4"></div>
              <h1 className="text-3xl font-semibold">커뮤니티</h1>
              <p className="text-white/80 text-sm">Promocean 커뮤니티 공간</p>
            </div>

            {/* 컨텐츠 */}
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                {/* 필터 */}
                <div className="flex gap-2 mb-6">
                  <button className="px-4 py-2 bg-primary text-white rounded-md">
                    전체
                  </button>
                  <button className="px-4 py-2 bg-white border rounded-md">
                    개발
                  </button>
                  <button className="px-4 py-2 bg-white border rounded-md">
                    디자인
                  </button>
                </div>

                {/* 게시물 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
                    >
                      <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-400"></div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">게시물 제목 {i + 1}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          게시물 설명...
                        </p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <div className="flex gap-3">
                            <span>❤️ 42</span>
                            <span>💬 18</span>
                          </div>
                          <span>김개발</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-8">
                  <div className="join border rounded-lg">
                    <button className="join-item btn bg-white">«</button>
                    <button className="join-item btn bg-primary text-white">
                      1
                    </button>
                    <button className="join-item btn bg-white">2</button>
                    <button className="join-item btn bg-white">3</button>
                    <button className="join-item btn bg-white">»</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션의 전체 레이아웃을 시뮬레이션합니다.',
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">데스크톱 (확장)</h3>
        <SidebarProvider>
          <div className="flex h-64 bg-gray-50 border border-gray-200 rounded">
            <Sidebar />
            <div className="flex-1 ml-64 p-4">
              <p className="text-sm text-gray-600">
                데스크톱에서는 사이드바가 기본적으로 확장되어 있습니다.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">모바일 시뮬레이션</h3>
        <div className="max-w-md">
          <SidebarProvider>
            <div className="flex h-64 bg-gray-50 border border-gray-200 rounded">
              <div className="w-16 border-r bg-white p-2">
                <div className="text-xs text-center text-gray-500">
                  축소된 사이드바
                </div>
              </div>
              <div className="flex-1 p-4">
                <p className="text-sm text-gray-600">
                  모바일에서는 사이드바가 축소되어 표시됩니다.
                </p>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 사이드바 레이아웃입니다.',
      },
    },
  },
};
