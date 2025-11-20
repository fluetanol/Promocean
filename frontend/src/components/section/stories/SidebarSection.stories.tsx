import type { Meta, StoryObj } from '@storybook/react';
import SidebarSection from '@components/section/SidebarSection';
import { SidebarProvider } from '@/contexts/SidebarContext';
import MagnifyingGlass from '@/components/icon/MagnifyingGlass';
import Trophy from '@/components/icon/Trophy';
import Megaphone from '@/components/icon/Megaphone';
import User from '@/components/icon/User';
import UserGroup from '@/components/icon/UserGroup';
import { SidebarItemProps } from '@/types/itemType';

const meta: Meta<typeof SidebarSection> = {
  title: 'Components/Section/SidebarSection',
  component: SidebarSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '사이드바의 각 섹션을 나타내는 컴포넌트입니다. 제목과 아이템 리스트를 포함합니다.',
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
  argTypes: {
    title: {
      description: '섹션 제목',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    sidebarList: {
      description: '사이드바 아이템 목록',
      table: {
        type: { summary: 'SidebarItemProps[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarSection>;

const communityItems: SidebarItemProps[] = [
  {
    icon: <MagnifyingGlass />,
    title: '커뮤니티',
    href: '/community',
  },
  {
    icon: <Trophy />,
    title: '프롬프트 대회',
    href: '/contest',
  },
  {
    icon: <Megaphone />,
    title: '공지사항',
    href: '/community',
  },
];

const spaceItems: SidebarItemProps[] = [
  {
    icon: <User />,
    title: '마이 스페이스',
    href: '/my-space',
  },
  {
    icon: <UserGroup />,
    title: '팀 스페이스',
    href: '/team-space',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    title: '게시판',
    sidebarList: communityItems,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 사이드바 섹션입니다.',
      },
    },
  },
};

// 스페이스 섹션
export const SpaceSection: Story = {
  args: {
    title: '스페이스',
    sidebarList: spaceItems,
  },
  parameters: {
    docs: {
      description: {
        story: '스페이스 메뉴를 표시하는 섹션입니다.',
      },
    },
  },
};

// 여러 섹션 함께
export const MultipleSections: Story = {
  render: () => (
    <SidebarProvider>
      <div className="w-64 bg-[#fdfdfc] p-4 border-r border-gray-200">
        <SidebarSection title="게시판" sidebarList={communityItems} />
        <SidebarSection title="스페이스" sidebarList={spaceItems} />
      </div>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 섹션이 함께 표시된 모습입니다.',
      },
    },
  },
};

// 사이드바 내에서
export const WithinSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <div className="fixed left-0 top-0 w-64 h-screen p-4 border-r border-gray-200 flex flex-col bg-[#fdfdfc]">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-primary mb-2">PromOcean</div>
          <p className="text-xs text-gray-500">프롬프트의 바다</p>
        </div>

        {/* 섹션들 */}
        <div className="flex-1">
          <SidebarSection title="게시판" sidebarList={communityItems} />
          <SidebarSection title="스페이스" sidebarList={spaceItems} />
        </div>

        {/* 푸터 */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 bg-primary rounded-full"></div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">김개발</p>
              <p className="text-xs text-gray-500 truncate">kim@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '전체 사이드바 컨텍스트 내에서의 섹션입니다.',
      },
    },
  },
};

// 적은 아이템
export const FewItems: Story = {
  args: {
    title: '설정',
    sidebarList: [
      {
        icon: <User />,
        title: '프로필',
        href: '/profile',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 아이템만 있는 섹션입니다.',
      },
    },
  },
};

// 많은 아이템
export const ManyItems: Story = {
  args: {
    title: '카테고리',
    sidebarList: Array.from({ length: 10 }, (_, i) => ({
      icon: <MagnifyingGlass />,
      title: `카테고리 ${i + 1}`,
      href: `/category/${i + 1}`,
    })),
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-[#fdfdfc] p-4 border-r border-gray-200 max-h-96 overflow-auto">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '많은 아이템이 있는 섹션입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 긴 제목
export const LongItemTitles: Story = {
  args: {
    title: '게시판',
    sidebarList: [
      {
        icon: <MagnifyingGlass />,
        title: '아주 긴 제목을 가진 메뉴 아이템 예시',
        href: '/long-title',
      },
      {
        icon: <Trophy />,
        title: '이것도 매우 긴 제목입니다',
        href: '/another-long',
      },
    ],
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-[#fdfdfc] p-4 border-r border-gray-200">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '긴 제목을 가진 아이템들입니다.',
      },
    },
  },
};

// 활성 상태
export const WithActiveItem: Story = {
  render: () => (
    <SidebarProvider>
      <div className="w-64 bg-[#fdfdfc] p-4 border-r border-gray-200">
        <div className="mb-6">
          <h2 className="text-lg font-semibold uppercase tracking-wider mb-3">
            게시판
          </h2>
          <div className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 bg-primary/10 text-primary rounded-lg"
            >
              <MagnifyingGlass />
              <span className="font-medium">커뮤니티</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trophy />
              <span>프롬프트 대회</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Megaphone />
              <span>공지사항</span>
            </a>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '첫 번째 아이템이 활성화된 상태입니다.',
      },
    },
  },
};

// 토글 상태 비교
export const ToggleComparison: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="text-sm font-semibold mb-4">확장 상태</h3>
        <SidebarProvider>
          <div className="w-64 bg-[#fdfdfc] p-4 border-r border-gray-200">
            <SidebarSection title="게시판" sidebarList={communityItems} />
          </div>
        </SidebarProvider>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">축소 상태 (제목 숨김)</h3>
        <div className="w-16 bg-[#fdfdfc] p-4 border-r border-gray-200">
          <div className="space-y-2">
            {communityItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
              >
                {item.icon}
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
        story: '확장/축소 상태의 비교입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    title: '게시판',
    sidebarList: communityItems,
  },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="w-64 bg-gray-800 p-4 border-r border-gray-700">
          <div className="[&_h2]:text-white [&_span]:text-gray-300 [&_svg]:text-gray-300">
            <Story />
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: '다크 모드 버전의 사이드바 섹션입니다.',
      },
    },
  },
};
