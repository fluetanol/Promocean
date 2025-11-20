import type { Meta, StoryObj } from '@storybook/react';
import MySpaceArchiveFilterSection from '@components/section/MySpaceArchiveFilterSection';

const meta: Meta<typeof MySpaceArchiveFilterSection> = {
  title: 'Components/Section/MySpaceArchiveFilterSection',
  component: MySpaceArchiveFilterSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '마이 스페이스 아카이브의 필터 섹션으로 검색과 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MySpaceArchiveFilterSection>;

export const SearchMode: Story = {
  args: {
    buttonMode: 'search',
  },
};

export const WriteMode: Story = {
  args: {
    buttonMode: 'write',
  },
};
