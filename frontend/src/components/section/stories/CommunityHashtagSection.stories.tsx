import type { Meta, StoryObj } from '@storybook/react';
import CommunityHashtagSection from '@components/section/CommunityHashtagSection';
import { HashtagItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityHashtagSection> = {
  title: 'Components/Section/CommunityHashtagSection',
  component: CommunityHashtagSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '해시태그 목록을 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityHashtagSection>;

const mockHashtags: HashtagItemProps[] = [
  { tag: 'AI' },
  { tag: '프롬프트' },
  { tag: 'ChatGPT' },
];

export const Default: Story = {
  args: {
    hashtagList: mockHashtags,
  },
};

export const ManyHashtags: Story = {
  args: {
    hashtagList: Array.from({ length: 10 }, (_, i) => ({ tag: `태그${i + 1}` })),
  },
};
