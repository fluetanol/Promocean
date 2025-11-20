import type { Meta, StoryObj } from '@storybook/react';
import PostingWriteSection from '@components/section/PostingWriteSection';

const meta: Meta<typeof PostingWriteSection> = {
  title: 'Components/Section/PostingWriteSection',
  component: PostingWriteSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시글 본문을 작성하는 텍스트 영역 섹션입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostingWriteSection>;

export const Default: Story = {};

export const InPostingContext: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">게시글 작성</h1>
        <Story />
      </div>
    ),
  ],
};
