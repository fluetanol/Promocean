import type { Meta, StoryObj } from '@storybook/react';
import CommunityFloatingItem from '@components/item/CommunityFloatingItem';

const meta: Meta<typeof CommunityFloatingItem> = {
  title: 'Components/Item/CommunityFloatingItem',
  component: CommunityFloatingItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 플로팅 아이템 컴포넌트입니다. 커뮤니티 게시물의 이미지, 제목, 해시태그, 좋아요 및 댓글 수를 표시합니다.',
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
    image: {
      control: 'text',
      description: '이미지 URL',
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
  },
};

export default meta;
type Story = StoryObj<typeof CommunityFloatingItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    id: '1',
    title: 'React 19의 새로운 기능들',
    hashtags: ['react', 'frontend', 'javascript'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    likeCount: 42,
    commentCount: 18,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 커뮤니티 플로팅 아이템입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: '2',
    title: 'TypeScript와 Next.js를 활용한 풀스택 웹 애플리케이션 개발 완벽 가이드',
    hashtags: ['typescript', 'nextjs', 'fullstack'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    likeCount: 128,
    commentCount: 45,
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
    title: 'CSS 애니메이션 완벽 정복하기',
    hashtags: ['css', 'animation', 'frontend', 'web', 'design', 'ui', 'ux'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
    likeCount: 89,
    commentCount: 23,
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
    title: '2025년 웹 개발 트렌드 총정리',
    hashtags: ['webdev', 'trends', '2025'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    likeCount: 1234,
    commentCount: 567,
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
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
    likeCount: 0,
    commentCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '최소한의 정보만 있는 게시물입니다.',
      },
    },
  },
};

// 다양한 게시물 그리드
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CommunityFloatingItem
        id="10"
        title="JavaScript ES2024 새로운 기능"
        hashtags={['javascript', 'es2024']}
        image="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop"
        likeCount={45}
        commentCount={12}
      />
      <CommunityFloatingItem
        id="11"
        title="반응형 웹 디자인 베스트 프랙티스"
        hashtags={['responsive', 'design']}
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
        likeCount={67}
        commentCount={8}
      />
      <CommunityFloatingItem
        id="12"
        title="개발자를 위한 생산성 도구 추천"
        hashtags={['tools', 'productivity']}
        image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
        likeCount={89}
        commentCount={34}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 게시물들을 그리드 레이아웃으로 표시합니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    id: '6',
    title: '마우스를 올려보세요!',
    hashtags: ['hover', 'animation'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    likeCount: 10,
    commentCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '카드에 마우스를 올리면 shadow, border, 이미지 확대 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};
