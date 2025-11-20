import type { Meta, StoryObj } from '@storybook/react';
import CommunityCommentSection from '@components/section/CommunityCommentSection';
import { CommunityCommentItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityCommentSection> = {
  title: 'Components/Section/CommunityCommentSection',
  component: CommunityCommentSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '댓글 목록과 댓글 작성 폼을 포함하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityCommentSection>;

const mockComments: CommunityCommentItemProps[] = [
  {
    profileUrl: '/images/profile1.jpg',
    author: '김철수',
    createdAt: '2시간 전',
    content: '정말 유용한 정보네요! 감사합니다.',
  },
  {
    profileUrl: '/images/profile2.jpg',
    author: '이영희',
    createdAt: '1시간 전',
    content: '이 방법을 사용해봤는데 정말 효과적이었어요.',
  },
];

export const Default: Story = {
  args: {
    communityCommentList: mockComments,
  },
};

export const ManyComments: Story = {
  args: {
    communityCommentList: Array.from({ length: 10 }, (_, i) => ({
      profileUrl: `/images/profile${(i % 5) + 1}.jpg`,
      author: `사용자${i + 1}`,
      createdAt: `${i + 1}시간 전`,
      content: `댓글 내용 ${i + 1}`,
    })),
  },
};

export const NoComments: Story = {
  args: {
    communityCommentList: [],
  },
};
