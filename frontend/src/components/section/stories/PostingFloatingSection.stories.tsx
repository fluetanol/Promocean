import type { Meta, StoryObj } from '@storybook/react';
import PostingFloatingSection from '@components/section/PostingFloatingSection';
import { PostingFloatingItemProps } from '@/types/itemType';

const meta: Meta<typeof PostingFloatingSection> = {
  title: 'Components/Section/PostingFloatingSection',
  component: PostingFloatingSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시글 작성 시 사용하는 플로팅 섹션 컴포넌트입니다. 접기/펼치기 기능을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostingFloatingSection>;

const mockItems: PostingFloatingItemProps[] = [
  { id: '1', icon: <span className="text-lg">💻</span>, label: '옵션 1', value: 'option1' },
  { id: '2', icon: <span className="text-lg">🎨</span>, label: '옵션 2', value: 'option2' },
  { id: '3', icon: <span className="text-lg">📝</span>, label: '옵션 3', value: 'option3' },
];

export const Default: Story = {
  args: {
    title: '카테고리 선택',
    items: mockItems,
    name: 'category',
  },
};

export const WithSelection: Story = {
  args: {
    title: '카테고리 선택',
    items: mockItems,
    selectedValue: 'option2',
    name: 'category',
  },
};
