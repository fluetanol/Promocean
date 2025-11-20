import type { Meta, StoryObj } from '@storybook/react';
import ContestCardSection from '@components/section/ContestCardSection';
import { ContestCardItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestCardSection> = {
  title: 'Components/Section/ContestCardSection',
  component: ContestCardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프롬프트 대회 카드 목록을 표시하는 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestCardSection>;

const mockContests: ContestCardItemProps[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: `프롬프트 대회 ${i + 1}`,
  image: `https://images.unsplash.com/photo-${1633356122544 + i}?w=800&h=600&fit=crop`,
  participantCount: Math.floor(Math.random() * 500),
  deadline: `${i + 1}`,
  status: (['SCHEDULED', 'ONGOING', 'VOTING', 'FINISHED'] as const)[i % 4],
  tags: ['AI', '프롬프트', 'ChatGPT'],
  startDate: '2025.01.15',
}));

export const Default: Story = {
  args: {
    contestCardList: mockContests,
  },
};
