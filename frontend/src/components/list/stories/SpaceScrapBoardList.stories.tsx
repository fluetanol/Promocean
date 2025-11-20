import type { Meta, StoryObj } from '@storybook/react';
import SpaceScrapBoardList from '@components/list/SpaceScrapBoardList';
import { SpaceScrapBoardItemProps } from '@components/item/SpaceScrapBoardItem';

const meta: Meta<typeof SpaceScrapBoardList> = {
  title: 'Components/List/SpaceScrapBoardList',
  component: SpaceScrapBoardList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '스페이스 스크랩 게시판 리스트 컴포넌트입니다. 카드 그리드 형태로 스크랩한 게시글 목록을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceScrapBoardList>;

const mockScrapList: SpaceScrapBoardItemProps[] = [
  {
    id: '1',
    title: 'ChatGPT 프롬프트 모음집',
    userName: '프롬프트마스터',
    userImage: 'https://i.pravatar.cc/150?img=1',
    category: '개발',
    commentCount: 15,
    hashtags: ['ChatGPT', '프롬프트', 'AI'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    likeCount: 234,
  },
  {
    id: '2',
    title: 'UI 디자인 프롬프트',
    userName: '디자이너김',
    userImage: 'https://i.pravatar.cc/150?img=2',
    category: '디자인',
    commentCount: 8,
    hashtags: ['UI', 'UX', '디자인'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    likeCount: 189,
  },
  {
    id: '3',
    title: '업무 자동화 프롬프트',
    userName: '효율왕',
    userImage: 'https://i.pravatar.cc/150?img=3',
    category: '업무',
    commentCount: 23,
    hashtags: ['자동화', '업무', '생산성'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    likeCount: 412,
  },
  {
    id: '4',
    title: '마케팅 카피 생성기',
    userName: '마케터이',
    userImage: 'https://i.pravatar.cc/150?img=4',
    category: '마케팅',
    commentCount: 12,
    hashtags: ['마케팅', '카피', '광고'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    likeCount: 156,
  },
  {
    id: '5',
    title: '코드 리뷰 프롬프트',
    userName: '개발자박',
    userImage: 'https://i.pravatar.cc/150?img=5',
    category: '개발',
    commentCount: 19,
    hashtags: ['코드리뷰', '개발', '프로그래밍'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    likeCount: 287,
  },
  {
    id: '6',
    title: 'Next.js 서버 컴포넌트 활용하기',
    userName: '박넥스트',
    userImage: 'https://i.pravatar.cc/150?img=6',
    category: '개발',
    commentCount: 34,
    hashtags: ['nextjs', 'react', 'server'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    likeCount: 567,
  },
  {
    id: '7',
    title: 'TypeScript 타입 시스템 완벽 가이드',
    userName: '타입마스터',
    userImage: 'https://i.pravatar.cc/150?img=7',
    category: '개발',
    commentCount: 45,
    hashtags: ['typescript', 'types', 'javascript'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    likeCount: 678,
  },
  {
    id: '8',
    title: 'Figma 플러그인 개발 입문',
    userName: '디자인개발자',
    userImage: 'https://i.pravatar.cc/150?img=8',
    category: '디자인',
    commentCount: 28,
    hashtags: ['figma', 'plugin', 'design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    likeCount: 345,
  },
  {
    id: '9',
    title: 'Docker 컨테이너 최적화 기법',
    userName: '인프라왕',
    userImage: 'https://i.pravatar.cc/150?img=9',
    category: '인프라',
    commentCount: 52,
    hashtags: ['docker', 'devops', 'container'],
    image: 'https://images.unsplash.com/photo-1605745341075-2e1f00f83ff0?w=400&h=300&fit=crop',
    likeCount: 789,
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    itemList: mockScrapList,
  },
};

// 적은 스크랩
export const FewScraps: Story = {
  args: {
    itemList: mockScrapList.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: '스크랩이 2개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 스크랩
export const SingleScrap: Story = {
  args: {
    itemList: [mockScrapList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '스크랩이 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    itemList: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">스크랩한 게시글이 없습니다</p>
          <p className="text-sm">마음에 드는 게시글을 스크랩해보세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크랩이 없는 빈 상태입니다.',
      },
    },
  },
};

// 이미지 없는 스크랩
export const NoImages: Story = {
  args: {
    itemList: mockScrapList.map((item) => ({ ...item, image: '' })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 스크랩들입니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    itemList: [
      {
        ...mockScrapList[0],
        hashtags: [
          'ChatGPT',
          '프롬프트',
          'AI',
          '개발',
          '자동화',
          '효율',
          '생산성',
          'GPT-4',
        ],
      },
      ...mockScrapList.slice(1, 3),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '해시태그가 많은 게시글입니다.',
      },
    },
  },
};

// 인기 스크랩
export const PopularScraps: Story = {
  args: {
    itemList: mockScrapList.map((item) => ({
      ...item,
      likeCount: Math.floor(Math.random() * 1000) + 500,
      commentCount: Math.floor(Math.random() * 100) + 50,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글이 많은 인기 스크랩들입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트 (그리드 뷰)
export const WithinMySpacePage: Story = {
  args: {
    itemList: mockScrapList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 py-6 px-8">
          <h1 className="text-3xl font-bold">내 스페이스</h1>
          <p className="text-gray-600 mt-2">스크랩한 게시글을 카드 형태로 관리하세요</p>
        </div>

        {/* 탭 */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex gap-4">
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">아카이브</button>
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium">
              스크랩
            </button>
          </div>
        </div>

        {/* 필터 */}
        <div className="bg-white border-b border-gray-200 py-4 px-8">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">전체</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              개발
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              디자인
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
              마케팅
            </button>
          </div>
        </div>

        {/* 그리드 리스트 */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 마이 스페이스 페이지의 스크랩 탭에서의 사용 예시입니다. 카드 그리드 형태로 표시됩니다.',
      },
    },
  },
};
