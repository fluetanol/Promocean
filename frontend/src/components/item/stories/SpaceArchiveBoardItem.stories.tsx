import type { Meta, StoryObj } from '@storybook/react';
import SpaceArchiveBoardItem from '@components/item/SpaceArchiveBoardItem';

const meta: Meta<typeof SpaceArchiveBoardItem> = {
  title: 'Components/Item/SpaceArchiveBoardItem',
  component: SpaceArchiveBoardItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 아카이브 보드 아이템 컴포넌트입니다. 썸네일, 제목, 카테고리, 해시태그를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'number',
      description: '게시물 ID',
      table: {
        type: { summary: 'number' },
      },
    },
    title: {
      control: 'text',
      description: '게시물 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    category: {
      control: 'text',
      description: '카테고리명',
      table: {
        type: { summary: 'string' },
      },
    },
    hashtags: {
      control: 'object',
      description: '해시태그 배열',
      table: {
        type: { summary: 'string[]' },
      },
    },
    image: {
      control: 'text',
      description: '이미지 URL (선택)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveBoardItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    id: 1,
    title: 'React 19의 새로운 기능들',
    category: '개발',
    hashtags: ['react', 'frontend', 'javascript'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스페이스 아카이브 보드 아이템입니다.',
      },
    },
  },
};

// 이미지 없음
export const NoImage: Story = {
  args: {
    id: 2,
    title: 'TypeScript 타입 시스템 이해하기',
    category: '튜토리얼',
    hashtags: ['typescript', 'types', 'programming'],
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 경우 회색 배경이 표시됩니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: 3,
    title: 'Next.js와 TypeScript를 활용한 풀스택 웹 애플리케이션 개발 완벽 가이드',
    category: '튜토리얼',
    hashtags: ['nextjs', 'typescript', 'fullstack'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목의 경우 line-clamp-1로 1줄까지만 표시됩니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    id: 4,
    title: 'CSS 애니메이션 완벽 정복',
    category: '디자인',
    hashtags: ['css', 'animation', 'frontend', 'web', 'design', 'ui', 'ux', 'responsive'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '해시태그가 많은 경우 flex-wrap으로 자동 줄바꿈됩니다.',
      },
    },
  },
};

// 다양한 카테고리
export const DifferentCategories: Story = {
  render: () => (
    <div className="space-y-3 max-w-3xl">
      <SpaceArchiveBoardItem
        id={10}
        title="JavaScript ES2024 새로운 기능"
        category="개발"
        hashtags={['javascript', 'es2024']}
        image="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop"
      />
      <SpaceArchiveBoardItem
        id={11}
        title="효과적인 UI/UX 디자인 원칙"
        category="디자인"
        hashtags={['design', 'uiux']}
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
      />
      <SpaceArchiveBoardItem
        id={12}
        title="개발자를 위한 생산성 도구 추천"
        category="리뷰"
        hashtags={['tools', 'productivity']}
        image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      />
      <SpaceArchiveBoardItem
        id={13}
        title="Python으로 시작하는 머신러닝"
        category="AI/ML"
        hashtags={['python', 'machinelearning', 'ai']}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리의 아이템들을 리스트 형태로 표시합니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    id: 5,
    title: '마우스를 올려보세요!',
    category: '테스트',
    hashtags: ['hover', 'animation'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 shadow가 강화되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 최소 정보
export const MinimalInfo: Story = {
  args: {
    id: 6,
    title: 'Hello World',
    category: '일반',
    hashtags: ['hello'],
  },
  parameters: {
    docs: {
      description: {
        story: '최소한의 정보만 있는 아이템입니다.',
      },
    },
  },
};

// 리스트 뷰
export const ListView: Story = {
  render: () => (
    <div className="space-y-2 max-w-4xl">
      {[
        {
          id: 20,
          title: '웹 접근성 가이드라인',
          category: '웹 개발',
          hashtags: ['accessibility', 'web'],
          image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
        },
        {
          id: 21,
          title: 'GraphQL vs REST API',
          category: '백엔드',
          hashtags: ['graphql', 'rest', 'api'],
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
        },
        {
          id: 22,
          title: 'Docker 컨테이너 최적화',
          category: 'DevOps',
          hashtags: ['docker', 'container', 'devops'],
          image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop',
        },
        {
          id: 23,
          title: 'Git 브랜치 전략',
          category: '버전 관리',
          hashtags: ['git', 'branch', 'vcs'],
        },
        {
          id: 24,
          title: '테스트 주도 개발 (TDD)',
          category: '개발 방법론',
          hashtags: ['tdd', 'testing', 'agile'],
        },
      ].map((item) => (
        <SpaceArchiveBoardItem key={item.id} {...item} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 아이템을 리스트 형태로 표시하는 예시입니다.',
      },
    },
  },
};
