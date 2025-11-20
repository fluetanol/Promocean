import type { Meta, StoryObj } from '@storybook/react';
import SpaceScrapBoardItem from '@components/item/SpaceScrapBoardItem';

const meta: Meta<typeof SpaceScrapBoardItem> = {
  title: 'Components/Item/SpaceScrapBoardItem',
  component: SpaceScrapBoardItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 스크랩 보드 아이템 컴포넌트입니다. 썸네일, 제목, 카테고리, 해시태그, 좋아요, 댓글 수, 유저 정보를 표시합니다.',
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
      description: '썸네일 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    userImage: {
      control: 'text',
      description: '유저 프로필 이미지 URL',
      table: {
        type: { summary: 'string' },
      },
    },
    userName: {
      control: 'text',
      description: '유저 이름',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceScrapBoardItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    id: '1',
    title: 'React 19의 새로운 기능들',
    hashtags: ['react', 'frontend', 'javascript'],
    category: '개발',
    likeCount: 42,
    commentCount: 18,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    userImage: 'https://i.pravatar.cc/150?img=1',
    userName: '김개발',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스페이스 스크랩 보드 아이템입니다.',
      },
    },
  },
};

// 썸네일 이미지 없음
export const NoThumbnail: Story = {
  args: {
    id: '2',
    title: 'TypeScript 타입 시스템 이해하기',
    hashtags: ['typescript', 'types', 'programming'],
    category: '튜토리얼',
    likeCount: 89,
    commentCount: 23,
    userImage: 'https://i.pravatar.cc/150?img=2',
    userName: '이타입',
  },
  parameters: {
    docs: {
      description: {
        story: '썸네일 이미지가 없는 경우 회색 배경이 표시됩니다.',
      },
    },
  },
};

// 유저 프로필 이미지 없음
export const NoUserImage: Story = {
  args: {
    id: '3',
    title: 'Next.js 서버 컴포넌트 활용하기',
    hashtags: ['nextjs', 'react', 'server-components'],
    category: '개발',
    likeCount: 128,
    commentCount: 45,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    userName: '박넥스트',
  },
  parameters: {
    docs: {
      description: {
        story: '유저 프로필 이미지가 없는 경우 기본 이모지가 표시됩니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    id: '4',
    title: 'TypeScript와 React를 활용한 대규모 프론트엔드 애플리케이션 아키텍처 설계 가이드',
    hashtags: ['typescript', 'react', 'architecture'],
    category: '아키텍처',
    likeCount: 256,
    commentCount: 78,
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
    userImage: 'https://i.pravatar.cc/150?img=3',
    userName: '최아키텍트',
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
    id: '5',
    title: 'CSS 애니메이션 완벽 정복',
    hashtags: ['css', 'animation', 'frontend', 'web', 'design', 'ui', 'ux', 'responsive'],
    category: '디자인',
    likeCount: 189,
    commentCount: 56,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    userImage: 'https://i.pravatar.cc/150?img=4',
    userName: '정디자이너',
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
    id: '6',
    title: '2025년 웹 개발 트렌드 총정리',
    hashtags: ['webdev', 'trends', '2025'],
    category: '트렌드',
    likeCount: 1234,
    commentCount: 567,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    userImage: 'https://i.pravatar.cc/150?img=5',
    userName: '강트렌드',
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글 수가 많은 인기 게시물입니다.',
      },
    },
  },
};

// 리스트 뷰
export const ListView: Story = {
  render: () => (
    <div className="space-y-3 max-w-4xl">
      <SpaceScrapBoardItem
        id="10"
        title="JavaScript ES2024 새로운 기능"
        hashtags={['javascript', 'es2024']}
        category="개발"
        likeCount={45}
        commentCount={12}
        image="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop"
        userImage="https://i.pravatar.cc/150?img=10"
        userName="김자바"
      />
      <SpaceScrapBoardItem
        id="11"
        title="효과적인 UI/UX 디자인 원칙"
        hashtags={['design', 'uiux']}
        category="디자인"
        likeCount={67}
        commentCount={8}
        image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
        userImage="https://i.pravatar.cc/150?img=11"
        userName="이디자인"
      />
      <SpaceScrapBoardItem
        id="12"
        title="개발자를 위한 생산성 도구 추천"
        hashtags={['tools', 'productivity']}
        category="리뷰"
        likeCount={89}
        commentCount={34}
        image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop"
        userName="박도구"
      />
      <SpaceScrapBoardItem
        id="13"
        title="Python으로 시작하는 머신러닝"
        hashtags={['python', 'machinelearning', 'ai']}
        category="AI/ML"
        likeCount={156}
        commentCount={67}
        image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"
        userImage="https://i.pravatar.cc/150?img=12"
        userName="최파이썬"
      />
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

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    id: '7',
    title: '마우스를 올려보세요!',
    hashtags: ['hover', 'animation'],
    category: '테스트',
    likeCount: 10,
    commentCount: 5,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    userImage: 'https://i.pravatar.cc/150?img=6',
    userName: '테스터',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 shadow가 강화되고, 좋아요/댓글 아이콘 색상이 변경되는 호버 애니메이션을 확인할 수 있습니다.',
      },
    },
  },
};

// 최소 정보
export const MinimalInfo: Story = {
  args: {
    id: '8',
    title: 'Hello World',
    hashtags: ['hello'],
    category: '일반',
    likeCount: 0,
    commentCount: 0,
    userName: '초보자',
  },
  parameters: {
    docs: {
      description: {
        story: '최소한의 정보만 있는 게시물입니다.',
      },
    },
  },
};
