import type { Meta, StoryObj } from '@storybook/react';
import ContestCardList from '@components/list/ContestCardList';
import { ContestCardItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestCardList> = {
  title: 'Components/List/ContestCardList',
  component: ContestCardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '콘테스트 카드 리스트 컴포넌트입니다. 반응형 그리드 레이아웃으로 콘테스트 카드를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestCardList>;

const mockContestCards: ContestCardItemProps[] = [
  {
    id: '1',
    title: 'AI 프롬프트 챌린지',
    image: 'https://picsum.photos/seed/contest1/400/300',
    status: 'ONGOING',
    startDate: '2024-01-15',
    deadline: '2024-02-15',
    participantCount: 245,
    tags: ['AI', '프롬프트', '챌린지'],
  },
  {
    id: '2',
    title: '크리에이티브 콘텐츠 공모전',
    image: 'https://picsum.photos/seed/contest2/400/300',
    status: 'ONGOING',
    startDate: '2024-01-20',
    deadline: '2024-02-20',
    participantCount: 189,
    tags: ['콘텐츠', '크리에이티브'],
  },
  {
    id: '3',
    title: '코딩 챌린지',
    image: 'https://picsum.photos/seed/contest3/400/300',
    status: 'VOTING',
    startDate: '2024-01-10',
    deadline: '2024-01-25',
    participantCount: 412,
    tags: ['코딩', '알고리즘'],
  },
  {
    id: '4',
    title: 'UI/UX 디자인 공모전',
    image: 'https://picsum.photos/seed/contest4/400/300',
    status: 'SCHEDULED',
    startDate: '2024-02-01',
    deadline: '2024-03-01',
    participantCount: 0,
    tags: ['디자인', 'UI', 'UX'],
  },
  {
    id: '5',
    title: '마케팅 캠페인 공모전',
    image: 'https://picsum.photos/seed/contest5/400/300',
    status: 'FINISHED',
    startDate: '2023-12-01',
    deadline: '2024-01-01',
    participantCount: 567,
    tags: ['마케팅', '캠페인'],
  },
  {
    id: '6',
    title: '데이터 분석 경진대회',
    image: 'https://picsum.photos/seed/contest6/400/300',
    status: 'ONGOING',
    startDate: '2024-01-15',
    deadline: '2024-02-28',
    participantCount: 321,
    tags: ['데이터', '분석'],
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    contestCards: mockContestCards,
  },
};

// 진행중인 콘테스트만
export const OngoingOnly: Story = {
  args: {
    contestCards: mockContestCards.filter((card) => card.status === 'ONGOING'),
  },
  parameters: {
    docs: {
      description: {
        story: '진행중인 콘테스트만 표시합니다.',
      },
    },
  },
};

// 적은 콘테스트
export const FewContests: Story = {
  args: {
    contestCards: mockContestCards.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '콘테스트가 3개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 콘테스트
export const SingleContest: Story = {
  args: {
    contestCards: [mockContestCards[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '콘테스트가 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    contestCards: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">진행중인 콘테스트가 없습니다</p>
          <p className="text-sm">새로운 콘테스트를 기다려주세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '콘테스트가 없는 빈 상태입니다.',
      },
    },
  },
};

// 많은 참가자
export const HighParticipation: Story = {
  args: {
    contestCards: mockContestCards.map((card) => ({
      ...card,
      participantCount: Math.floor(Math.random() * 5000) + 1000,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '참가자가 많은 인기 콘테스트들입니다.',
      },
    },
  },
};

// 많은 태그
export const ManyTags: Story = {
  args: {
    contestCards: [
      { ...mockContestCards[0], tags: ['AI', '프롬프트', '챌린지', 'GPT', '머신러닝'] },
      { ...mockContestCards[1], tags: ['콘텐츠', '크리에이티브', '디자인'] },
      { ...mockContestCards[2], tags: ['코딩', '알고리즘', 'Python', 'JavaScript'] },
      { ...mockContestCards[3], tags: ['디자인', 'UI', 'UX', 'Figma'] },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '태그가 많은 콘테스트들입니다.',
      },
    },
  },
};

// 다양한 상태
export const DifferentStatuses: Story = {
  args: {
    contestCards: [
      { ...mockContestCards[0], status: 'ONGOING' },
      { ...mockContestCards[1], status: 'VOTING' },
      { ...mockContestCards[2], status: 'SCHEDULED' },
      { ...mockContestCards[3], status: 'FINISHED' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 콘테스트들입니다.',
      },
    },
  },
};

// 실제 콘테스트 페이지 컨텍스트
export const WithinContestPage: Story = {
  args: {
    contestCards: mockContestCards,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-16 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">콘테스트</h1>
            <p className="text-white/90 text-xl mb-8">
              다양한 대회에 참여하고 실력을 겨뤄보세요
            </p>
            <div className="flex gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                <p className="text-white/80 text-sm">진행중</p>
                <p className="text-3xl font-bold">
                  {mockContestCards.filter((c) => c.status === 'ONGOING').length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl">
                <p className="text-white/80 text-sm">총 참가자</p>
                <p className="text-3xl font-bold">
                  {mockContestCards.reduce((sum, c) => sum + c.participantCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white border-b border-gray-200 py-4 px-8">
          <div className="max-w-7xl mx-auto flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">전체</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              진행중
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              예정
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              종료
            </button>
          </div>
        </div>

        {/* 콘테스트 리스트 */}
        <div className="max-w-7xl mx-auto py-8 px-8">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 콘테스트 목록 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveTest: Story = {
  args: {
    contestCards: mockContestCards,
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-4">
        <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-blue-800 text-sm font-semibold mb-2">반응형 테스트</p>
          <ul className="text-blue-700 text-xs space-y-1">
            <li>• 모바일: 1열</li>
            <li>• 태블릿(md): 2열</li>
            <li>• 데스크탑(lg): 3열</li>
            <li>• 와이드(xl): 4열</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '반응형 그리드 레이아웃을 테스트합니다. 화면 크기를 조절해보세요.',
      },
    },
  },
};

// 이미지 없는 카드
export const NoImages: Story = {
  args: {
    contestCards: mockContestCards.map((card) => ({ ...card, image: '' })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 콘테스트 카드들입니다.',
      },
    },
  },
};
