import type { Meta, StoryObj } from '@storybook/react';
import PostCardItem from '@components/item/PostCardItem';

const meta: Meta<typeof PostCardItem> = {
  title: 'Components/Item/PostCardItem',
  component: PostCardItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시물 카드 아이템 컴포넌트입니다. 이미지, 제목, 해시태그, 카테고리, 좋아요 및 댓글 수를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '게시물 ID',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: '게시물 제목',
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
    category: {
      control: 'text',
      description: '카테고리명',
      table: {
        type: { summary: 'string' },
      },
    },
    likeCount: {
      control: 'number',
      description: '좋아요 수',
      table: {
        type: { summary: 'number' },
      },
    },
    commentCount: {
      control: 'number',
      description: '댓글 수',
      table: {
        type: { summary: 'number' },
      },
    },
    image: {
      control: 'text',
      description: '이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostCardItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    id: '1',
    title: 'Next.js 15와 React 19로 시작하는 모던 웹 개발',
    hashtags: ['nextjs', 'react', 'typescript', 'webdev'],
    category: '개발',
    likeCount: 42,
    commentCount: 18,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 게시물 카드 아이템입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: '2',
    title: 'TypeScript와 Zustand를 활용한 상태 관리 완벽 가이드: 실전 예제와 함께 배우는 현대적인 상태 관리 패턴',
    hashtags: ['typescript', 'zustand', 'statemanagement'],
    category: '튜토리얼',
    likeCount: 128,
    commentCount: 45,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목의 경우 line-clamp-2로 2줄까지만 표시됩니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    id: '3',
    title: 'Tailwind CSS 디자인 시스템 구축하기',
    hashtags: ['tailwind', 'css', 'design', 'ui', 'ux', 'frontend', 'responsive', 'mobile'],
    category: '디자인',
    likeCount: 89,
    commentCount: 23,
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

// 인기 게시물
export const PopularPost: Story = {
  args: {
    id: '4',
    title: '2025년 프론트엔드 트렌드 총정리',
    hashtags: ['frontend', 'trends', '2025'],
    category: '트렌드',
    likeCount: 1234,
    commentCount: 567,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글 수가 많은 인기 게시물입니다.',
      },
    },
  },
};

// 최소 정보
export const MinimalInfo: Story = {
  args: {
    id: '5',
    title: 'Hello World',
    hashtags: ['hello'],
    category: '일반',
    likeCount: 0,
    commentCount: 0,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '최소한의 정보만 있는 게시물입니다.',
      },
    },
  },
};

// 다양한 카테고리
export const DifferentCategories: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <PostCardItem
        id="10"
        title="JavaScript ES2024 새로운 기능들"
        hashtags={['javascript', 'es2024']}
        category="개발"
        likeCount={45}
        commentCount={12}
        image="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop"
      />
      <PostCardItem
        id="11"
        title="효과적인 UI/UX 디자인 원칙"
        hashtags={['design', 'uiux']}
        category="디자인"
        likeCount={67}
        commentCount={8}
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
      />
      <PostCardItem
        id="12"
        title="개발자를 위한 생산성 도구 추천"
        hashtags={['tools', 'productivity']}
        category="리뷰"
        likeCount={89}
        commentCount={34}
        image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리의 게시물들을 그리드 레이아웃으로 표시합니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    id: '6',
    title: '마우스를 올려보세요!',
    hashtags: ['hover', 'animation', 'interaction'],
    category: '테스트',
    likeCount: 10,
    commentCount: 5,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: '카드에 마우스를 올리면 shadow와 border 색상이 변경되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 이미지 없음
export const NoImage: Story = {
  args: {
    id: '7',
    title: '이미지가 없는 게시물',
    hashtags: ['text-only', 'content'],
    category: '일반',
    likeCount: 15,
    commentCount: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 경우 회색 배경이 표시됩니다.',
      },
    },
  },
};

// 다크 모드 대응 (선택적)
export const FullLayoutExample: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">인기 게시물</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCardItem
            id="20"
            title="React Server Components 완벽 가이드"
            hashtags={['react', 'rsc', 'nextjs']}
            category="개발"
            likeCount={523}
            commentCount={89}
            image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
          />
          <PostCardItem
            id="21"
            title="Tailwind CSS 실전 활용법"
            hashtags={['tailwind', 'css', 'styling']}
            category="디자인"
            likeCount={412}
            commentCount={67}
            image="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop"
          />
          <PostCardItem
            id="22"
            title="TypeScript 5.0 새로운 기능"
            hashtags={['typescript', 'javascript']}
            category="개발"
            likeCount={689}
            commentCount={123}
            image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
          />
          <PostCardItem
            id="23"
            title="모던 웹 성능 최적화"
            hashtags={['performance', 'optimization', 'web']}
            category="튜토리얼"
            likeCount={356}
            commentCount={45}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
          />
          <PostCardItem
            id="24"
            title="Zustand vs Redux 비교분석"
            hashtags={['zustand', 'redux', 'state']}
            category="리뷰"
            likeCount={278}
            commentCount={34}
            image="https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=600&fit=crop"
          />
          <PostCardItem
            id="25"
            title="웹 접근성 체크리스트"
            hashtags={['a11y', 'accessibility', 'web']}
            category="가이드"
            likeCount={445}
            commentCount={56}
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 페이지에서 사용되는 것과 유사한 전체 레이아웃 예시입니다.',
      },
    },
  },
};
