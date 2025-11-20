import type { Meta, StoryObj } from '@storybook/react';
import LeaderboardItem from '@components/item/LeaderboardItem';

const meta: Meta<typeof LeaderboardItem> = {
  title: 'Components/Item/LeaderboardItem',
  component: LeaderboardItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '리더보드 아이템 컴포넌트입니다. 순위, 닉네임, 투표 수, 마지막 제출 시간을 테이블 행으로 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              순위
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              닉네임
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              투표 수
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              마지막 제출
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <Story />
        </tbody>
      </table>
    ),
  ],
  argTypes: {
    rank: {
      control: 'number',
      description: '순위',
      table: {
        type: { summary: 'number' },
      },
    },
    nickName: {
      control: 'text',
      description: '닉네임',
      table: {
        type: { summary: 'string' },
      },
    },
    voteCount: {
      control: 'number',
      description: '투표 수',
      table: {
        type: { summary: 'number' },
      },
    },
    lastSubmit: {
      control: 'text',
      description: '마지막 제출 시간',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LeaderboardItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    rank: 1,
    nickName: '김개발',
    voteCount: 1250,
    lastSubmit: '2025-01-15 14:30',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 리더보드 아이템입니다.',
      },
    },
  },
};

// 1위
export const FirstPlace: Story = {
  args: {
    rank: 1,
    nickName: '최고개발자',
    voteCount: 5000,
    lastSubmit: '2025-01-15 18:45',
  },
  parameters: {
    docs: {
      description: {
        story: '1위 리더보드 아이템입니다.',
      },
    },
  },
};

// 높은 투표 수
export const HighVoteCount: Story = {
  args: {
    rank: 2,
    nickName: '인기왕',
    voteCount: 123456,
    lastSubmit: '2025-01-14 09:20',
  },
  parameters: {
    docs: {
      description: {
        story: '높은 투표 수를 가진 아이템입니다. 숫자는 자동으로 천 단위 구분 기호로 포맷됩니다.',
      },
    },
  },
};

// 긴 닉네임
export const LongNickname: Story = {
  args: {
    rank: 10,
    nickName: '아주긴닉네임을가진개발자123',
    voteCount: 850,
    lastSubmit: '2025-01-13 16:00',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 닉네임을 가진 리더보드 아이템입니다.',
      },
    },
  },
};

// 0 투표
export const ZeroVotes: Story = {
  args: {
    rank: 100,
    nickName: '신규유저',
    voteCount: 0,
    lastSubmit: '2025-01-15 10:00',
  },
  parameters: {
    docs: {
      description: {
        story: '투표 수가 0인 리더보드 아이템입니다.',
      },
    },
  },
};

// 전체 리더보드 테이블
export const FullLeaderboard: Story = {
  render: () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            순위
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            닉네임
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            투표 수
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            마지막 제출
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <LeaderboardItem rank={1} nickName="최고개발자" voteCount={5000} lastSubmit="2025-01-15 18:45" />
        <LeaderboardItem rank={2} nickName="인기왕" voteCount={4500} lastSubmit="2025-01-15 17:30" />
        <LeaderboardItem rank={3} nickName="실력자" voteCount={4200} lastSubmit="2025-01-15 16:20" />
        <LeaderboardItem rank={4} nickName="열정개발자" voteCount={3800} lastSubmit="2025-01-15 15:10" />
        <LeaderboardItem rank={5} nickName="코딩마스터" voteCount={3500} lastSubmit="2025-01-15 14:50" />
        <LeaderboardItem rank={6} nickName="알고리즘킹" voteCount={3200} lastSubmit="2025-01-15 13:40" />
        <LeaderboardItem rank={7} nickName="프론트엔드" voteCount={3000} lastSubmit="2025-01-15 12:30" />
        <LeaderboardItem rank={8} nickName="백엔드" voteCount={2800} lastSubmit="2025-01-15 11:20" />
        <LeaderboardItem rank={9} nickName="풀스택" voteCount={2600} lastSubmit="2025-01-15 10:10" />
        <LeaderboardItem rank={10} nickName="데브옵스" voteCount={2400} lastSubmit="2025-01-15 09:00" />
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: '전체 리더보드 테이블의 예시입니다. 상위 10명을 표시합니다.',
      },
    },
  },
  decorators: [],
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    rank: 5,
    nickName: '마우스를올려보세요',
    voteCount: 2500,
    lastSubmit: '2025-01-15 12:00',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색이 변경되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// Top 3
export const Top3: Story = {
  render: () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            순위
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            닉네임
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            투표 수
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            마지막 제출
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="bg-yellow-50">
          <LeaderboardItem rank={1} nickName="🥇 1등" voteCount={10000} lastSubmit="2025-01-15 20:00" />
        </tr>
        <tr className="bg-gray-50">
          <LeaderboardItem rank={2} nickName="🥈 2등" voteCount={8500} lastSubmit="2025-01-15 19:30" />
        </tr>
        <tr className="bg-orange-50">
          <LeaderboardItem rank={3} nickName="🥉 3등" voteCount={7200} lastSubmit="2025-01-15 19:00" />
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Top 3를 강조한 리더보드입니다. 각 순위에 배경색을 추가했습니다.',
      },
    },
  },
  decorators: [],
};

// 다양한 시간 형식
export const DifferentTimeFormats: Story = {
  render: () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            순위
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            닉네임
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            투표 수
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            마지막 제출
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <LeaderboardItem rank={1} nickName="유저1" voteCount={1000} lastSubmit="방금 전" />
        <LeaderboardItem rank={2} nickName="유저2" voteCount={900} lastSubmit="5분 전" />
        <LeaderboardItem rank={3} nickName="유저3" voteCount={800} lastSubmit="1시간 전" />
        <LeaderboardItem rank={4} nickName="유저4" voteCount={700} lastSubmit="오늘 10:30" />
        <LeaderboardItem rank={5} nickName="유저5" voteCount={600} lastSubmit="2025-01-14" />
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 시간 형식을 사용하는 리더보드 예시입니다.',
      },
    },
  },
  decorators: [],
};
