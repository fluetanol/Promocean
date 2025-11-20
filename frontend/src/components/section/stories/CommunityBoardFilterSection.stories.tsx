import type { Meta, StoryObj } from '@storybook/react';
import CommunityBoardFilterSection from '@components/section/CommunityBoardFilterSection';

const meta: Meta<typeof CommunityBoardFilterSection> = {
  title: 'Components/Section/CommunityBoardFilterSection',
  component: CommunityBoardFilterSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 게시판의 필터 섹션으로 검색, 정렬, 글쓰기 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityBoardFilterSection>;

export const Default: Story = {};

export const InBoardContext: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">커뮤니티 게시판</h2>
        <Story />
      </div>
    ),
  ],
};
