import type { Meta, StoryObj } from '@storybook/react';
import LeaderboardList from '@components/list/LeaderboardList';
import { LeaderboardItemProps } from '@/types/itemType';

const meta: Meta<typeof LeaderboardList> = {
  title: 'Components/List/LeaderboardList',
  component: LeaderboardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '리더보드 테이블 컴포넌트입니다. 콘테스트 참여자들의 순위와 투표 수를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LeaderboardList>;

const mockLeaderboardList: LeaderboardItemProps[] = [
  {
    rank: 1,
    nickName: '프롬프트마스터',
    voteCount: 1523,
    lastSubmit: '2024-01-15 14:30',
  },
  {
    rank: 2,
    nickName: 'AI전문가',
    voteCount: 1287,
    lastSubmit: '2024-01-15 13:45',
  },
  {
    rank: 3,
    nickName: '개발왕',
    voteCount: 1156,
    lastSubmit: '2024-01-15 12:20',
  },
  {
    rank: 4,
    nickName: '코딩천재',
    voteCount: 945,
    lastSubmit: '2024-01-15 11:10',
  },
  {
    rank: 5,
    nickName: '프롬프트러',
    voteCount: 823,
    lastSubmit: '2024-01-15 10:05',
  },
  {
    rank: 6,
    nickName: '디자이너김',
    voteCount: 756,
    lastSubmit: '2024-01-14 18:30',
  },
  {
    rank: 7,
    nickName: '마케터이',
    voteCount: 689,
    lastSubmit: '2024-01-14 16:45',
  },
  {
    rank: 8,
    nickName: '개발자박',
    voteCount: 612,
    lastSubmit: '2024-01-14 15:20',
  },
  {
    rank: 9,
    nickName: '효율왕',
    voteCount: 567,
    lastSubmit: '2024-01-14 14:10',
  },
  {
    rank: 10,
    nickName: '작가정',
    voteCount: 523,
    lastSubmit: '2024-01-14 12:30',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    leaderboardList: mockLeaderboardList,
  },
};

// 상위 3명
export const TopThree: Story = {
  args: {
    leaderboardList: mockLeaderboardList.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '상위 3명만 표시합니다.',
      },
    },
  },
};

// 상위 5명
export const TopFive: Story = {
  args: {
    leaderboardList: mockLeaderboardList.slice(0, 5),
  },
  parameters: {
    docs: {
      description: {
        story: '상위 5명을 표시합니다.',
      },
    },
  },
};

// 빈 리더보드
export const EmptyLeaderboard: Story = {
  args: {
    leaderboardList: [],
  },
  parameters: {
    docs: {
      description: {
        story: '데이터가 없는 빈 리더보드입니다. "리더보드 데이터가 없습니다" 메시지가 표시됩니다.',
      },
    },
  },
};

// 단일 참가자
export const SingleParticipant: Story = {
  args: {
    leaderboardList: [mockLeaderboardList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '참가자가 1명만 있는 경우입니다.',
      },
    },
  },
};

// 많은 참가자
export const ManyParticipants: Story = {
  args: {
    leaderboardList: [
      ...mockLeaderboardList,
      ...Array.from({ length: 15 }, (_, i) => ({
        rank: i + 11,
        nickName: `참가자${i + 11}`,
        voteCount: 500 - i * 20,
        lastSubmit: '2024-01-14 10:00',
      })),
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-h-[600px] overflow-y-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '많은 참가자가 있는 경우입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 높은 투표 수
export const HighVoteCounts: Story = {
  args: {
    leaderboardList: mockLeaderboardList.map((item, index) => ({
      ...item,
      voteCount: 10000 - index * 500,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '투표 수가 매우 높은 경우입니다.',
      },
    },
  },
};

// 실제 콘테스트 페이지 컨텍스트
export const WithinContestPage: Story = {
  args: {
    leaderboardList: mockLeaderboardList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-12 px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-3">AI 프롬프트 챌린지</h1>
            <p className="text-white/90 text-lg mb-6">최고의 프롬프트를 만들어보세요!</p>
            <div className="flex gap-8">
              <div>
                <p className="text-white/70 text-sm">참가자</p>
                <p className="text-2xl font-bold">{mockLeaderboardList.length}명</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">마감일</p>
                <p className="text-2xl font-bold">D-7</p>
              </div>
              <div>
                <p className="text-white/70 text-sm">총 상금</p>
                <p className="text-2xl font-bold">$5,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="max-w-6xl mx-auto flex gap-4">
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">상세정보</button>
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium">
              리더보드
            </button>
          </div>
        </div>

        {/* 리더보드 */}
        <div className="max-w-6xl mx-auto py-8 px-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">순위표</h2>
              <button className="text-sm text-primary hover:underline">새로고침</button>
            </div>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 콘테스트 페이지에서의 리더보드 사용 예시입니다.',
      },
    },
  },
};

// 긴 닉네임
export const LongNicknames: Story = {
  args: {
    leaderboardList: [
      {
        rank: 1,
        nickName: '프롬프트_엔지니어링_마스터_2024',
        voteCount: 1523,
        lastSubmit: '2024-01-15 14:30',
      },
      {
        rank: 2,
        nickName: '짧은닉네임',
        voteCount: 1287,
        lastSubmit: '2024-01-15 13:45',
      },
      {
        rank: 3,
        nickName: 'AI_프롬프트_전문가',
        voteCount: 1156,
        lastSubmit: '2024-01-15 12:20',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '닉네임이 긴 경우의 표시입니다.',
      },
    },
  },
};

// 메달 표시 (상위 3명)
export const WithMedals: Story = {
  args: {
    leaderboardList: mockLeaderboardList.slice(0, 5),
  },
  decorators: [
    (Story) => (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">🏆 리더보드</h2>
          <p className="text-sm text-gray-600">상위 3명에게는 특별한 배지가 주어집니다</p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '상위 3명에게 메달을 표시하는 컨텍스트입니다.',
      },
    },
  },
};
