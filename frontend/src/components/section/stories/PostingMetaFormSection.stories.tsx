import type { Meta, StoryObj } from '@storybook/react';
import PostingMetaFormSection from '@components/section/PostingMetaFormSection';

const meta: Meta<typeof PostingMetaFormSection> = {
  title: 'Components/Section/PostingMetaFormSection',
  component: PostingMetaFormSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시글의 메타 정보(제목, 카테고리, 태그)를 입력하는 폼 섹션입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostingMetaFormSection>;

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
