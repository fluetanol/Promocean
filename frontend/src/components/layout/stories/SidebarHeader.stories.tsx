import type { Meta, StoryObj } from '@storybook/react';
import SidebarHeader from '@components/layout/SidebarHeader';
import { SidebarProvider } from '@/contexts/SidebarContext';

const meta: Meta<typeof SidebarHeader> = {
  title: 'Components/Layout/SidebarHeader',
  component: SidebarHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '사이드바 헤더 컴포넌트입니다. PromOcean 로고와 사이드바 토글 버튼을 포함합니다.',
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
type Story = StoryObj<typeof SidebarHeader>;

// 기본 스토리 - 확장된 상태
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바 헤더입니다. 로고와 토글 버튼이 표시됩니다.',
      },
    },
  },
};

// 전체 사이드바 컨텍스트
export const WithinSidebar: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
          <Story />
          <div className="mt-8 space-y-2 text-sm text-gray-500">
            <p>← 토글 버튼을 클릭해보세요</p>
            <p>사이드바가 축소/확장됩니다</p>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 사이드바 내에서의 헤더입니다. 토글 기능을 테스트할 수 있습니다.',
      },
    },
  },
};

// 다양한 상태
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">확장된 상태</h3>
        <SidebarProvider>
          <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
            <SidebarHeader />
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">설명</h3>
        <p className="text-sm text-gray-600">
          사이드바가 확장되면 로고와 제목이 표시되고, 축소되면 로고만 표시됩니다.
          <br />
          토글 버튼을 클릭하여 사이드바를 축소/확장할 수 있습니다.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '사이드바 헤더의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

// 로고 호버 테스트
export const HoverTest: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
          <Story />
          <div className="mt-4 p-3 bg-blue-50 text-sm text-blue-800 rounded">
            💡 로고 영역에 마우스를 올려보세요!
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '로고와 토글 버튼의 호버 효과를 테스트합니다.',
      },
    },
  },
};

// 반응형 레이아웃
export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">데스크톱 (확장)</h3>
        <SidebarProvider>
          <div className="w-64 bg-white p-4 border border-gray-200 rounded-lg">
            <SidebarHeader />
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">모바일 (축소)</h3>
        <SidebarProvider>
          <div className="w-16 bg-white p-2 border border-gray-200 rounded-lg">
            <SidebarHeader />
          </div>
        </SidebarProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 사이드바 헤더 모습입니다.',
      },
    },
  },
};
