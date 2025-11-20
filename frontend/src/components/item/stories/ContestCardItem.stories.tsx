import type { Meta, StoryObj } from '@storybook/react';
import ContestCardItem from '@components/item/ContestCardItem';

const meta: Meta<typeof ContestCardItem> = {
  title: 'Components/Item/ContestCardItem',
  component: ContestCardItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '대회 카드 아이템 컴포넌트입니다. 대회 이미지, 제목, 참가자 수, 상태, 태그, 시작일을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '대회 ID',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: '대회 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      control: 'text',
      description: '대회 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    participantCount: {
      control: 'number',
      description: '참가자 수',
      table: {
        type: { summary: 'number' },
      },
    },
    deadline: {
      control: 'number',
      description: '마감까지 남은 일수',
      table: {
        type: { summary: 'number' },
      },
    },
    status: {
      control: 'select',
      options: ['SCHEDULED', 'ONGOING', 'VOTING', 'FINISHED'],
      description: '대회 상태',
      table: {
        type: { summary: 'SCHEDULED | ONGOING | VOTING | FINISHED' },
      },
    },
    tags: {
      control: 'object',
      description: '태그 배열',
      table: {
        type: { summary: 'string[]' },
      },
    },
    startDate: {
      control: 'text',
      description: '시작 날짜',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContestCardItem>;

// 기본 스토리 - 진행중
export const Default: Story = {
  args: {
    id: '1',
    title: 'React 컴포넌트 챌린지',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    participantCount: 156,
    deadline: '7',
    status: 'ONGOING',
    tags: ['react', 'frontend', 'ui'],
    startDate: '2025.01.15',
  },
  parameters: {
    docs: {
      description: {
        story: '진행중인 대회 카드입니다.',
      },
    },
  },
};

// 개최전
export const Scheduled: Story = {
  args: {
    id: '2',
    title: 'TypeScript 코딩 대회',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    participantCount: 45,
    status: 'SCHEDULED',
    tags: ['typescript', 'coding', 'algorithm'],
    startDate: '2025.02.01',
  },
  parameters: {
    docs: {
      description: {
        story: '개최 예정인 대회 카드입니다.',
      },
    },
  },
};

// 투표중
export const Voting: Story = {
  args: {
    id: '3',
    title: 'UI/UX 디자인 챌린지',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
    participantCount: 234,
    status: 'VOTING',
    tags: ['design', 'ui', 'ux', 'figma'],
    startDate: '2025.01.01',
  },
  parameters: {
    docs: {
      description: {
        story: '투표 중인 대회 카드입니다.',
      },
    },
  },
};

// 종료
export const Finished: Story = {
  args: {
    id: '4',
    title: '풀스택 웹 개발 대회',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    participantCount: 312,
    status: 'FINISHED',
    tags: ['fullstack', 'web', 'nodejs', 'react'],
    startDate: '2024.12.15',
  },
  parameters: {
    docs: {
      description: {
        story: '종료된 대회 카드입니다.',
      },
    },
  },
};

// 마감 임박
export const DeadlineSoon: Story = {
  args: {
    id: '5',
    title: '알고리즘 챌린지',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    participantCount: 567,
    deadline: '1',
    status: 'ONGOING',
    tags: ['algorithm', 'coding', 'problem-solving'],
    startDate: '2025.01.10',
  },
  parameters: {
    docs: {
      description: {
        story: '마감이 임박한 대회 카드입니다. (D-1)',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: '6',
    title: 'Next.js와 TypeScript를 활용한 대규모 프론트엔드 애플리케이션 개발 챌린지',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
    participantCount: 89,
    deadline: '14',
    status: 'ONGOING',
    tags: ['nextjs', 'typescript'],
    startDate: '2025.01.08',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목의 경우 line-clamp-2로 2줄까지만 표시됩니다.',
      },
    },
  },
};

// 많은 참가자
export const ManyParticipants: Story = {
  args: {
    id: '7',
    title: '웹 접근성 개선 대회',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    participantCount: 2500,
    deadline: '30',
    status: 'ONGOING',
    tags: ['accessibility', 'web', 'a11y'],
    startDate: '2025.01.01',
  },
  parameters: {
    docs: {
      description: {
        story: '많은 참가자가 있는 인기 대회입니다.',
      },
    },
  },
};

// 많은 태그
export const ManyTags: Story = {
  args: {
    id: '8',
    title: '모바일 앱 개발 대회',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop',
    participantCount: 178,
    deadline: '21',
    status: 'ONGOING',
    tags: ['mobile', 'react-native', 'flutter', 'ios', 'android', 'app'],
    startDate: '2025.01.05',
  },
  parameters: {
    docs: {
      description: {
        story: '태그가 많은 경우 flex-wrap으로 자동 줄바꿈됩니다.',
      },
    },
  },
};

// 그리드 레이아웃
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ContestCardItem
        id="10"
        title="React 컴포넌트 챌린지"
        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
        participantCount={156}
        deadline="7"
        status="ONGOING"
        tags={['react', 'frontend']}
        startDate="2025.01.15"
      />
      <ContestCardItem
        id="11"
        title="TypeScript 코딩 대회"
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
        participantCount={45}
        status="SCHEDULED"
        tags={['typescript', 'coding']}
        startDate="2025.02.01"
      />
      <ContestCardItem
        id="12"
        title="UI/UX 디자인 챌린지"
        image="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop"
        participantCount={234}
        status="VOTING"
        tags={['design', 'ui']}
        startDate="2025.01.01"
      />
      <ContestCardItem
        id="13"
        title="풀스택 웹 개발 대회"
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
        participantCount={312}
        status="FINISHED"
        tags={['fullstack', 'web']}
        startDate="2024.12.15"
      />
      <ContestCardItem
        id="14"
        title="알고리즘 챌린지"
        image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
        participantCount={567}
        deadline="1"
        status="ONGOING"
        tags={['algorithm', 'coding']}
        startDate="2025.01.10"
      />
      <ContestCardItem
        id="15"
        title="웹 접근성 개선 대회"
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
        participantCount={2500}
        deadline="30"
        status="ONGOING"
        tags={['accessibility', 'web']}
        startDate="2025.01.01"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 대회 카드를 그리드 레이아웃으로 표시합니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    id: '9',
    title: '마우스를 올려보세요!',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    participantCount: 100,
    deadline: '10',
    status: 'ONGOING',
    tags: ['hover', 'test'],
    startDate: '2025.01.12',
  },
  parameters: {
    docs: {
      description: {
        story: '카드에 마우스를 올리면 shadow, border, 이미지 확대 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};
