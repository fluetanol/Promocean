import type { Meta, StoryObj } from '@storybook/react';
import PostCardList from '@components/list/PostCardList';
import { PostCardItemProps } from '@/types/itemType';

const meta: Meta<typeof PostCardList> = {
  title: 'Components/List/PostCardList',
  component: PostCardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '프롬프트 카드 리스트 컴포넌트입니다. 반응형 그리드 레이아웃으로 카드를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostCardList>;

const mockPosts: PostCardItemProps[] = [
  {
    id: '1',
    title: 'ChatGPT 코딩 도우미 프롬프트',
    hashtags: ['ChatGPT', '코딩', '개발'],
    category: '개발',
    likeCount: 245,
    commentCount: 32,
    image: 'https://picsum.photos/seed/prompt1/400/300',
  },
  {
    id: '2',
    title: '블로그 글쓰기 프롬프트',
    hashtags: ['블로그', '글쓰기', 'SEO'],
    category: '콘텐츠',
    likeCount: 189,
    commentCount: 24,
    image: 'https://picsum.photos/seed/prompt2/400/300',
  },
  {
    id: '3',
    title: '마케팅 카피 생성 프롬프트',
    hashtags: ['마케팅', '카피', '광고'],
    category: '마케팅',
    likeCount: 321,
    commentCount: 45,
    image: 'https://picsum.photos/seed/prompt3/400/300',
  },
  {
    id: '4',
    title: 'UI/UX 디자인 리뷰 프롬프트',
    hashtags: ['디자인', 'UI', 'UX'],
    category: '디자인',
    likeCount: 156,
    commentCount: 18,
    image: 'https://picsum.photos/seed/prompt4/400/300',
  },
  {
    id: '5',
    title: '데이터 분석 프롬프트',
    hashtags: ['데이터', '분석', '인사이트'],
    category: '개발',
    likeCount: 278,
    commentCount: 29,
    image: 'https://picsum.photos/seed/prompt5/400/300',
  },
  {
    id: '6',
    title: '영어 번역 프롬프트',
    hashtags: ['번역', '영어', '언어'],
    category: '콘텐츠',
    likeCount: 412,
    commentCount: 56,
    image: 'https://picsum.photos/seed/prompt6/400/300',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    posts: mockPosts,
  },
};

// 적은 수의 카드
export const FewCards: Story = {
  args: {
    posts: mockPosts.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '카드가 3개만 있는 경우입니다.',
      },
    },
  },
};

// 많은 수의 카드
export const ManyCards: Story = {
  args: {
    posts: [
      ...mockPosts,
      ...mockPosts.map((post, index) => ({
        ...post,
        id: post.id + 100 + index,
        title: `${post.title} (추가)`,
      })),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '많은 카드가 있는 경우입니다. 그리드 레이아웃이 적용됩니다.',
      },
    },
  },
};

// 단일 카드
export const SingleCard: Story = {
  args: {
    posts: [mockPosts[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '카드가 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    posts: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">프롬프트가 없습니다</p>
          <p className="text-sm">첫 번째 프롬프트를 작성해보세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '카드가 없는 빈 상태입니다.',
      },
    },
  },
};

// 이미지 없는 카드
export const NoImage: Story = {
  args: {
    posts: mockPosts.map((post) => ({
      ...post,
      image: '',
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 카드들입니다.',
      },
    },
  },
};

// 인기 카드 (높은 좋아요)
export const PopularCards: Story = {
  args: {
    posts: mockPosts.map((post) => ({
      ...post,
      likeCount: Math.floor(Math.random() * 1000) + 500,
      commentCount: Math.floor(Math.random() * 100) + 50,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글이 많은 인기 카드들입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트
export const WithinRealPage: Story = {
  args: {
    posts: mockPosts,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">프롬프트 갤러리</h1>
            <p className="text-gray-600">다양한 AI 프롬프트를 찾아보세요</p>
          </div>

          {/* 필터 */}
          <div className="mb-6 flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg">전체</button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg">개발</button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg">디자인</button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg">마케팅</button>
            <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-lg">업무</button>
          </div>

          {/* 카드 리스트 */}
          <Story />

          {/* 페이지네이션 */}
          <div className="mt-8 flex justify-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg">이전</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg">2</button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg">3</button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg">다음</button>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 프롬프트 갤러리 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveTest: Story = {
  args: {
    posts: mockPosts,
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 p-4">
        <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-blue-800 text-sm font-semibold mb-2">반응형 테스트</p>
          <ul className="text-blue-700 text-xs space-y-1">
            <li>• 모바일: 1열</li>
            <li>• 태블릿(md): 2열</li>
            <li>• 데스크탑(lg): 3열</li>
            <li>• 와이드(xl): 4열</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '반응형 그리드 레이아웃을 테스트합니다. 화면 크기를 조절해보세요.',
      },
    },
  },
};

// 긴 제목
export const LongTitles: Story = {
  args: {
    posts: [
      {
        id: '101',
        title: '완벽한 ChatGPT 프롬프트 작성 가이드: 초보자부터 전문가까지 모두를 위한 종합 가이드',
        hashtags: ['ChatGPT', '가이드', '프롬프트', '초보자', '전문가'],
        category: '개발',
        likeCount: 567,
        commentCount: 89,
        image: 'https://picsum.photos/seed/long1/400/300',
      },
      {
        id: '102',
        title: '짧은 제목',
        hashtags: ['짧음'],
        category: '기타',
        likeCount: 45,
        commentCount: 6,
        image: 'https://picsum.photos/seed/long2/400/300',
      },
      {
        id: '103',
        title: '중간 길이의 프롬프트 제목입니다',
        hashtags: ['중간', '적당'],
        category: '기타',
        likeCount: 123,
        commentCount: 18,
        image: 'https://picsum.photos/seed/long3/400/300',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '제목의 길이가 다른 카드들입니다.',
      },
    },
  },
};
