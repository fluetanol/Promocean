import type { Meta, StoryObj } from '@storybook/react';
import SidebarFooter from '@components/layout/SidebarFooter';
import { SidebarProvider } from '@/contexts/SidebarContext';

const meta: Meta<typeof SidebarFooter> = {
  title: 'Components/Layout/SidebarFooter',
  component: SidebarFooter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '사이드바 푸터 컴포넌트입니다. 로그인 상태에 따라 마이페이지, 설정, 로그아웃/로그인 버튼을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarFooter>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바 푸터입니다. 인증 상태에 따라 다른 메뉴를 표시합니다.',
      },
    },
  },
};

// 로그인 상태 시뮬레이션
export const LoggedInState: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="mb-4 p-3 bg-green-50 text-green-800 text-sm rounded">
            ✅ 로그인 상태
          </div>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '로그인 상태일 때 마이페이지, 설정, 로그아웃 메뉴가 표시됩니다.',
      },
    },
  },
};

// 로그아웃 상태 시뮬레이션
export const LoggedOutState: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="mb-4 p-3 bg-gray-50 text-gray-800 text-sm rounded">
            ℹ️ 로그아웃 상태
          </div>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '로그아웃 상태일 때 로그인 메뉴만 표시됩니다.',
      },
    },
  },
};

// 전체 사이드바 컨텍스트
export const WithinFullSidebar: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold">PromOcean</h1>
          </div>

          <div className="flex-1">
            <div className="space-y-2 mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">게시판</h3>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">커뮤니티</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">프롬프트 대회</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">공지사항</div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">스페이스</h3>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">마이 스페이스</div>
              <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">팀 스페이스</div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <Story />
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 사이드바 내에서의 푸터 위치를 보여줍니다.',
      },
    },
  },
};

// 프로필 이미지 있는 경우
export const WithProfileImage: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 text-sm rounded">
            👤 프로필 이미지가 있는 사용자
          </div>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '사용자 프로필 이미지가 있을 때의 모습입니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded">
            <p className="font-semibold mb-2">💡 상호작용 테스트</p>
            <ul className="text-xs space-y-1">
              <li>• 각 메뉴 항목에 마우스를 올려보세요</li>
              <li>• 로그아웃 버튼을 클릭해보세요</li>
            </ul>
          </div>
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '사이드바 푸터의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 다양한 닉네임 길이
export const DifferentNicknameLengths: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">짧은 닉네임</h3>
        <SidebarProvider>
          <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
            <SidebarFooter />
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">긴 닉네임 (시뮬레이션)</h3>
        <SidebarProvider>
          <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
            <div className="p-3 bg-gray-50 text-sm rounded mb-2">
              긴 닉네임은 자동으로 줄바꿈되거나 말줄임표로 처리됩니다
            </div>
            <SidebarFooter />
          </div>
        </SidebarProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 길이의 닉네임을 가진 사용자의 사이드바 푸터입니다.',
      },
    },
  },
};
