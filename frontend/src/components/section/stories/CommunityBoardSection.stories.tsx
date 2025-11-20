import type { Meta, StoryObj } from '@storybook/react';
import CommunityBoardSection from '@components/section/CommunityBoardSection';
import { CommunityBoardItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityBoardSection> = {
  title: 'Components/Section/CommunityBoardSection',
  component: CommunityBoardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '커뮤니티 게시판 섹션으로 필터와 게시물 목록을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityBoardSection>;

const mockBoards: CommunityBoardItemProps[] = Array.from({ length: 9 }, (_, i) => ({
  id: `${i + 1}`,
  image: `https://images.unsplash.com/photo-${1633356122544 + i}?w=800&h=600&fit=crop`,
  category: ['AI', '개발', '디자인'][i % 3],
  title: `게시물 제목 ${i + 1}`,
  hashtags: ['react', 'typescript', 'nextjs'],
  userName: `작성자${i + 1}`,
  userImage: `https://i.pravatar.cc/150?img=${i + 1}`,
  likeCount: Math.floor(Math.random() * 100),
  commentCount: Math.floor(Math.random() * 50),
}));

export const Default: Story = {
  args: {
    communityBoardList: mockBoards,
  },
};

export const FewItems: Story = {
  args: {
    communityBoardList: mockBoards.slice(0, 3),
  },
};
