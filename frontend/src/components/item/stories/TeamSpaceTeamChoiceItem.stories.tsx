import type { Meta, StoryObj } from '@storybook/react';
import TeamSpaceTeamChoiceItem from '@components/item/TeamSpaceTeamChoiceItem';

const meta: Meta<typeof TeamSpaceTeamChoiceItem> = {
  title: 'Components/Item/TeamSpaceTeamChoiceItem',
  component: TeamSpaceTeamChoiceItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '팀 스페이스 선택 아이템 컴포넌트입니다. 팀 이미지, 제목, 설명을 표시하며, 호버 시 애니메이션 효과가 있습니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'text',
      description: '팀 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: '팀 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: '팀 설명',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceTeamChoiceItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    title: '프론트엔드 팀',
    description: 'React, Next.js, TypeScript를 활용한 웹 개발 팀입니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 팀 스페이스 선택 아이템입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop',
    title: '풀스택 웹 개발 및 DevOps 팀',
    description: '프론트엔드부터 백엔드, 인프라까지 전체 웹 개발 생태계를 다루는 팀입니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목의 경우 line-clamp-1로 1줄까지만 표시됩니다.',
      },
    },
  },
};

// 긴 설명
export const LongDescription: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    title: 'AI/ML 연구팀',
    description:
      '인공지능과 머신러닝을 연구하고 실제 프로덕트에 적용하는 팀입니다. 최신 AI 기술을 활용하여 혁신적인 솔루션을 개발하고 있습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 설명의 경우 line-clamp-2로 2줄까지만 표시됩니다.',
      },
    },
  },
};

// 짧은 내용
export const ShortContent: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    title: 'Design',
    description: 'UI/UX 디자인',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 제목과 설명을 가진 아이템입니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
    title: '마우스를 올려보세요!',
    description: '호버 시 이미지가 확대되고, 배경색이 변하며, 설명이 사라지는 애니메이션을 확인할 수 있습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '호버 시 이미지 영역 확대, 배경색 변경, 카드 상승 애니메이션, 설명 페이드아웃 효과를 확인할 수 있습니다.',
      },
    },
  },
};

// 다양한 팀 그리드
export const TeamGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        title="프론트엔드 팀"
        description="React, Next.js, TypeScript를 활용한 웹 개발 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop"
        title="백엔드 팀"
        description="Node.js, Express, NestJS를 활용한 서버 개발 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
        title="AI/ML 팀"
        description="인공지능과 머신러닝 연구 및 개발 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
        title="디자인 팀"
        description="UI/UX 디자인 및 브랜딩 전문 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
        title="모바일 팀"
        description="React Native, Flutter를 활용한 모바일 앱 개발 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"
        title="DevOps 팀"
        description="인프라 구축 및 CI/CD 파이프라인 관리 팀"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 팀을 그리드 레이아웃으로 표시하는 예시입니다.',
      },
    },
  },
};

// 카테고리별 팀
export const CategorizedTeams: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">개발팀</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
            title="프론트엔드"
            description="웹 UI/UX 개발"
          />
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop"
            title="백엔드"
            description="서버 및 API 개발"
          />
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
            title="모바일"
            description="iOS/Android 앱 개발"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">기획/디자인팀</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
            title="디자인"
            description="UI/UX 디자인"
          />
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
            title="기획"
            description="프로덕트 기획 및 전략"
          />
          <TeamSpaceTeamChoiceItem
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
            title="마케팅"
            description="마케팅 및 홍보"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '카테고리별로 그룹화된 팀 스페이스들입니다.',
      },
    },
  },
};

// 2열 레이아웃
export const TwoColumnLayout: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        title="프론트엔드 팀"
        description="React와 Next.js로 멋진 웹을 만들어요"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop"
        title="백엔드 팀"
        description="안정적이고 확장 가능한 서버를 구축해요"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
        title="AI/ML 팀"
        description="데이터로 미래를 예측하고 자동화해요"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
        title="디자인 팀"
        description="사용자 경험을 디자인해요"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '2열 그리드 레이아웃으로 표시하는 예시입니다.',
      },
    },
  },
};

// 단일 열 레이아웃
export const SingleColumnLayout: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        title="프론트엔드 팀"
        description="React, Next.js, TypeScript를 활용한 웹 개발"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop"
        title="백엔드 팀"
        description="Node.js, Express를 활용한 서버 개발"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
        title="AI/ML 팀"
        description="Python, TensorFlow를 활용한 AI 개발"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '단일 열 레이아웃으로 표시하는 예시입니다. 모바일 뷰에서 유용합니다.',
      },
    },
  },
};

// 다양한 이미지 스타일
export const DifferentImageStyles: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop"
        title="협업 중심 팀"
        description="활발한 소통과 협업으로 성장하는 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
        title="기술 혁신 팀"
        description="최신 기술을 빠르게 도입하고 실험하는 팀"
      />
      <TeamSpaceTeamChoiceItem
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
        title="스타트업 팀"
        description="빠른 속도로 프로덕트를 만들어가는 팀"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 이미지 스타일의 팀 카드들입니다.',
      },
    },
  },
};
