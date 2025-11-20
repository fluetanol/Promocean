import type { Meta, StoryObj } from '@storybook/react';
import ContestHeroSection from '@components/section/ContestHeroSection';

const meta: Meta<typeof ContestHeroSection> = {
  title: 'Components/Section/ContestHeroSection',
  component: ContestHeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프롬프트 대회 페이지의 히어로 섹션 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestHeroSection>;

export const Default: Story = {};
