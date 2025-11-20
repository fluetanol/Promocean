import type { Meta, StoryObj } from '@storybook/react';
import TeamSpaceChoiceSection from '@components/section/TeamSpaceChoiceSection';
import { TeamSpaceTeamChoiceItemProps } from '@components/item/TeamSpaceTeamChoiceItem';

const meta: Meta<typeof TeamSpaceChoiceSection> = {
  title: 'Components/Section/TeamSpaceChoiceSection',
  component: TeamSpaceChoiceSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '팀 스페이스 선택 섹션 컴포넌트로 팀 스페이스 목록과 추가 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamSpaceChoiceSection>;

const mockTeamSpaces: TeamSpaceTeamChoiceItemProps[] = [
  {
    image: '/images/space1.jpg',
    title: '개발팀',
    description: '개발 관련 프로젝트',
  },
  {
    image: '/images/space2.jpg',
    title: '디자인팀',
    description: '디자인 작업 공유',
  },
];

export const Default: Story = {
  args: {
    teamSpaceTeamChoiceList: mockTeamSpaces,
  },
};

export const EmptyState: Story = {
  args: {
    teamSpaceTeamChoiceList: [],
  },
};
