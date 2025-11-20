import type { Meta, StoryObj } from '@storybook/react';
import SidebarItem from '@components/item/SidebarItem';
import { SidebarProvider } from '@/contexts/SidebarContext';

const meta: Meta<typeof SidebarItem> = {
  title: 'Components/Item/SidebarItem',
  component: SidebarItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '사이드바 아이템 컴포넌트입니다. 아이콘, 제목, 링크 또는 클릭 이벤트를 처리할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <SidebarProvider>
          <div style={{ width: '200px' }}>
            <Story />
          </div>
        </SidebarProvider>
      );
    },
  ],
  argTypes: {
    icon: {
      control: 'text',
      description: '아이콘 (React 노드)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    title: {
      control: 'text',
      description: '사이드바 아이템 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    href: {
      control: 'text',
      description: '링크 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      description: '클릭 이벤트 핸들러 (href 대신 사용)',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

// 기본 링크 아이템
export const Default: Story = {
  args: {
    icon: '🏠',
    title: '홈',
    href: '/',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바 아이템입니다. 링크로 작동합니다.',
      },
    },
  },
};

// 클릭 이벤트 아이템
export const WithOnClick: Story = {
  args: {
    icon: '⚙️',
    title: '설정',
    onClick: () => alert('설정 클릭됨!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'onClick 이벤트를 사용하는 사이드바 아이템입니다. href 대신 버튼으로 렌더링됩니다.',
      },
    },
  },
};

// 다양한 아이콘과 메뉴
export const MenuItems: Story = {
  render: () => (
    <div className="w-64 bg-white p-2 space-y-1">
      <SidebarItem icon="🏠" title="홈" href="/" />
      <SidebarItem icon="📝" title="커뮤니티" href="/community" />
      <SidebarItem icon="🏆" title="대회" href="/contest" />
      <SidebarItem icon="📚" title="마이 스페이스" href="/my-space" />
      <SidebarItem icon="👥" title="팀 스페이스" href="/team-space" />
      <SidebarItem icon="⚙️" title="설정" onClick={() => console.log('설정 클릭')} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 메뉴 아이템들을 표시하는 사이드바입니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    icon: '🎨',
    title: '마우스를 올려보세요!',
    href: '/hover',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색과 텍스트 색상이 변경되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    icon: '📄',
    title: '아주 긴 사이드바 아이템 제목 테스트',
    href: '/long',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목을 가진 사이드바 아이템입니다.',
      },
    },
  },
};

// SVG 아이콘 사용 예시
export const WithSVGIcon: Story = {
  args: {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    title: 'SVG 아이콘',
    href: '/svg',
  },
  parameters: {
    docs: {
      description: {
        story: 'SVG 아이콘을 사용하는 사이드바 아이템입니다.',
      },
    },
  },
};

// 활성 상태 시뮬레이션
export const ActiveState: Story = {
  render: () => (
    <div className="w-64 bg-white p-2 space-y-1">
      <SidebarItem icon="🏠" title="홈" href="/" />
      <div className="bg-primary text-white rounded-md">
        <SidebarItem icon="📝" title="커뮤니티" href="/community" />
      </div>
      <SidebarItem icon="🏆" title="대회" href="/contest" />
      <SidebarItem icon="📚" title="마이 스페이스" href="/my-space" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '활성 상태의 메뉴 아이템을 시뮬레이션합니다. (커뮤니티가 활성 상태)',
      },
    },
  },
};
