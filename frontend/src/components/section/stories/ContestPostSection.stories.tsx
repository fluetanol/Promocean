import type { Meta, StoryObj } from '@storybook/react';
import ContestPostSection from '@components/section/ContestPostSection';
import { ContestPostItemProps, LeaderboardItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestPostSection> = {
  title: 'Components/Section/ContestPostSection',
  component: ContestPostSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대회 게시물 섹션 컴포넌트로 상세 내용과 리더보드를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestPostSection>;

const mockPost: ContestPostItemProps = {
  contestId: 1,
  author: '관리자',
  profileUrl: '/images/profile.jpg',
  title: 'AI 프롬프트 대회',
  content: '대회 상세 내용입니다...',
  type: '프롬프트',
  status: 'ONGOING',
  startAt: '2025-01-15',
  endAt: '2025-02-15',
  voteEndAt: '2025-02-20',
  createdAt: '2025-01-10',
  updatedAt: '2025-01-10',
};

const mockLeaderboard: LeaderboardItemProps[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  nickName: `참가자${i + 1}`,
  voteCount: 1000 - i * 50,
  lastSubmit: '2025-01-15',
}));

export const Default: Story = {
  args: {
    contestPostData: mockPost,
    leaderboardList: mockLeaderboard,
  },
};
