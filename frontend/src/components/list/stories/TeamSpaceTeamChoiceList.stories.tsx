import type { Meta, StoryObj } from '@storybook/react';
import TeamSpaceTeamChoiceList from '@components/list/TeamSpaceTeamChoiceLlist';
import { TeamSpaceTeamChoiceItemProps } from '@components/item/TeamSpaceTeamChoiceItem';

const meta: Meta<typeof TeamSpaceTeamChoiceList> = {
  title: 'Components/List/TeamSpaceTeamChoiceList',
  component: TeamSpaceTeamChoiceList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '팀 스페이스 선택 리스트 컴포넌트입니다. 4열 그리드로 팀 카드를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamSpaceTeamChoiceList>;

const mockTeamList: TeamSpaceTeamChoiceItemProps[] = [
  {
    image: 'https://picsum.photos/seed/team1/200/200',
    title: '프론트엔드 팀',
    description: 'React와 Next.js 개발',
  },
  {
    image: 'https://picsum.photos/seed/team2/200/200',
    title: '백엔드 팀',
    description: 'Node.js와 Express',
  },
  {
    image: 'https://picsum.photos/seed/team3/200/200',
    title: 'UI/UX 디자인 팀',
    description: 'Figma 디자인 시스템',
  },
  {
    image: 'https://picsum.photos/seed/team4/200/200',
    title: 'AI 연구 팀',
    description: 'LLM 프롬프트 연구',
  },
  {
    image: 'https://picsum.photos/seed/team5/200/200',
    title: '마케팅 팀',
    description: '콘텐츠 & 그로스',
  },
  {
    image: 'https://picsum.photos/seed/team6/200/200',
    title: '데이터 분석 팀',
    description: '데이터 파이프라인',
  },
  {
    image: 'https://picsum.photos/seed/team7/200/200',
    title: '인프라 팀',
    description: 'DevOps & Cloud',
  },
  {
    image: 'https://picsum.photos/seed/team8/200/200',
    title: 'QA 팀',
    description: '품질 관리',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList,
  },
};

// 적은 팀
export const FewTeams: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList.slice(0, 4),
  },
  parameters: {
    docs: {
      description: {
        story: '팀이 4개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 팀
export const SingleTeam: Story = {
  args: {
    teamSpaceTeamChoiceList: [mockTeamList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '팀이 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    teamSpaceTeamChoiceList: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">가입된 팀이 없습니다</p>
          <p className="text-sm">새로운 팀을 만들거나 초대를 받아보세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '팀이 없는 빈 상태입니다.',
      },
    },
  },
};

// 많은 팀
export const ManyTeams: Story = {
  args: {
    teamSpaceTeamChoiceList: [
      ...mockTeamList,
      ...mockTeamList.map((team, index) => ({
        ...team,
        title: `${team.title} ${index + 9}`,
      })),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '많은 팀이 있는 경우입니다. 그리드 레이아웃이 적용됩니다.',
      },
    },
  },
};

// 이미지 없는 팀
export const NoImages: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList.map((team) => ({ ...team, image: undefined })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 팀 카드들입니다.',
      },
    },
  },
};

// 긴 제목과 설명
export const LongTitles: Story = {
  args: {
    teamSpaceTeamChoiceList: [
      {
        image: 'https://picsum.photos/seed/team1/200/200',
        title: '풀스택 웹 개발 프로젝트 팀',
        description: 'React, Next.js, Node.js, PostgreSQL을 활용한 전체 스택 개발',
      },
      {
        image: 'https://picsum.photos/seed/team2/200/200',
        title: 'AI',
        description: 'ML',
      },
      {
        image: 'https://picsum.photos/seed/team3/200/200',
        title: '디자인 시스템 구축 팀',
        description: 'Figma, Storybook, 컴포넌트 라이브러리 개발',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 설명의 길이가 다양한 팀 카드들입니다.',
      },
    },
  },
};

// 실제 팀 선택 페이지 컨텍스트
export const WithinTeamSelectionPage: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">팀 스페이스</h1>
            <p className="text-gray-600 text-lg">팀을 선택하여 협업을 시작하세요</p>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white border-b border-gray-200 py-4 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="팀 검색..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button className="ml-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
              + 새 팀 만들기
            </button>
          </div>
        </div>

        {/* 팀 리스트 */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="mb-4 px-8 flex justify-between items-center">
            <h2 className="text-xl font-bold">내 팀 ({mockTeamList.length})</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">
                전체
              </button>
              <button className="px-3 py-1 bg-white hover:bg-gray-100 rounded text-sm">
                최근 방문
              </button>
              <button className="px-3 py-1 bg-white hover:bg-gray-100 rounded text-sm">
                즐겨찾기
              </button>
            </div>
          </div>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 팀 선택 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 카테고리별 팀
export const CategorizedTeams: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList,
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto p-8 space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">개발 팀</h2>
          <TeamSpaceTeamChoiceList
            teamSpaceTeamChoiceList={mockTeamList.slice(0, 4)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">운영 팀</h2>
          <TeamSpaceTeamChoiceList
            teamSpaceTeamChoiceList={mockTeamList.slice(4, 8)}
          />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '카테고리별로 구분된 팀 리스트입니다.',
      },
    },
  },
};

// 호버 효과 테스트
export const HoverEffectTest: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-6">
          <p className="text-blue-800 font-semibold mb-2">인터랙션 테스트</p>
          <p className="text-blue-700 text-sm">
            각 팀 카드에 마우스를 올려보세요. 호버 효과와 클릭 애니메이션을 확인할 수 있습니다.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '팀 카드의 호버 효과를 테스트합니다.',
      },
    },
  },
};

// 컴팩트 뷰
export const CompactView: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamList.slice(0, 4),
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">빠른 팀 선택</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '좁은 공간에서의 컴팩트한 표시입니다.',
      },
    },
  },
};
