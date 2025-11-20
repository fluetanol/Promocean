import type { Meta, StoryObj } from '@storybook/react';
import SidebarList from '@components/list/SidebarList';
import { SidebarItemProps } from '@/types/itemType';
import { Home, Users, Trophy, BookOpen, Settings } from 'lucide-react';

const meta: Meta<typeof SidebarList> = {
  title: 'Components/List/SidebarList',
  component: SidebarList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사이드바 네비게이션 메뉴 리스트 컴포넌트입니다. 아이콘과 제목으로 구성된 메뉴 항목들을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarList>;

/*
hint
 * @description 커뮤니티 게시판 아이템 타입
export interface CommunityBoardItemProps {
  id: string
  title: string
  hashtags: string[]
  category: string
  likeCount: number
  commentCount: number
  image: string
  userImage?: string;    // 작성자 프로필 이미지
  userName: string;          // 작성자 이름
}



*/

/*

/**
 * SidebarItemProps interface
 * @description 사이드바에서 표시되는 아이템 타입

export interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  href?: string
  onClick?: () => void
}

*/


const mockSidebarList: SidebarItemProps[] = [
  {
    icon: null,
    title: '홈',
    href: '/',
  },
  {
    icon: null,
    title: '커뮤니티',
    href: '/community',
  },
  {
    icon: null,
    title: '콘테스트',
    href: '/contest',
  },
  {
    icon: null,
    title: '내 스페이스',
    href: '/space',
  },
  {
    icon: null,
    title: '설정',
    href: '/settings',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-white p-4 rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
};

// 확장된 사이드바
export const Expanded: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-primary p-6 rounded-xl shadow-xl">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">PromOcean</h2>
          <p className="text-white/70 text-sm">AI 프롬프트 플랫폼</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '헤더와 함께 표시되는 확장된 사이드바입니다.',
      },
    },
  },
};

// 축소된 사이드바
export const Collapsed: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-16 bg-primary p-2 rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '아이콘만 보이는 축소된 사이드바입니다.',
      },
    },
  },
};

// 적은 메뉴
export const FewItems: Story = {
  args: {
    sidebarList: mockSidebarList.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-white p-4 rounded-lg shadow-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '메뉴 항목이 적은 경우입니다.',
      },
    },
  },
};

// 많은 메뉴
export const ManyItems: Story = {
  args: {
    sidebarList: [
      ...mockSidebarList,
      {
        icon: null,
        title: '팀 스페이스',
        href: '/team-space',
      },
      {
        icon: null,
        title: '아카이브',
        href: '/archive',
      },
      {
        icon: null,
        title: '리더보드',
        href: '/leaderboard',
      },
      {
        icon: null,
        title: '프로필',
        href: '/profile',
      },
      {
        icon: null,
        title: '알림',
        href: '/notifications',
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-white p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '많은 메뉴 항목이 있는 경우입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-gray-900 p-4 rounded-lg shadow-xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '다크 모드 배경의 사이드바입니다.',
      },
    },
  },
};

// 실제 레이아웃 컨텍스트
export const WithinRealLayout: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen bg-gray-50">
        {/* 사이드바 */}
        <div className="w-64 bg-primary flex flex-col shadow-xl">
          {/* 헤더 */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">P</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">PromOcean</h2>
              </div>
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex-1 p-4">
            <Story />
          </div>

          {/* 푸터 */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              <div>
                <p className="text-white text-sm font-medium">사용자</p>
                <p className="text-white/60 text-xs">user@example.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">대시보드</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold mb-2">카드 {i}</h3>
                  <p className="text-gray-600 text-sm">카드 내용...</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 레이아웃에서의 사이드바 사용 예시입니다.',
      },
    },
  },
};

// 호버 효과
export const WithHoverEffect: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-primary p-4 rounded-xl shadow-xl">
        <div className="mb-4 p-3 bg-white/10 rounded-lg text-white text-xs">
          <p className="font-semibold mb-1">💡 인터랙션 테스트</p>
          <p>메뉴 항목에 마우스를 올려보세요</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '호버 효과를 테스트할 수 있습니다.',
      },
    },
  },
};

// 활성 메뉴 강조
export const WithActiveState: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-primary p-4 rounded-xl shadow-xl">
        <div className="mb-4 p-3 bg-blue-500 rounded-lg">
          <p className="text-white text-sm font-medium">
            현재 페이지: 커뮤니티
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '현재 활성화된 메뉴를 강조하여 표시합니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  args: {
    sidebarList: mockSidebarList,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto">
        <div className="bg-primary p-4 rounded-t-xl">
          <h2 className="text-white font-bold text-lg mb-4">메뉴</h2>
          <Story />
        </div>
        <div className="bg-gray-100 p-4 rounded-b-xl">
          <button className="w-full bg-white text-gray-700 py-2 rounded-lg hover:bg-gray-50">
            메뉴 닫기
          </button>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 사이드바 메뉴입니다.',
      },
    },
  },
};
