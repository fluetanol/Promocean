import type { Meta, StoryObj } from '@storybook/react';
import CommunityLikeShareSection from '@components/section/CommunityLikeShareSection';

const meta: Meta<typeof CommunityLikeShareSection> = {
  title: 'Components/Section/CommunityLikeShareSection',
  component: CommunityLikeShareSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '좋아요, 복사, 저장 버튼을 포함하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityLikeShareSection>;

export const Default: Story = {
  args: {
    likeCount: 42,
  },
};

export const HighLikes: Story = {
  args: {
    likeCount: 1523,
  },
};

export const NoLikes: Story = {
  args: {
    likeCount: 0,
  },
};
