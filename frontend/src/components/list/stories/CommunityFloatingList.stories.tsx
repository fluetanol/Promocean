import type { Meta, StoryObj } from '@storybook/react';
import CommunityFloatingList from '@components/list/CommunityFloatingList';
import { CommunityFloatingItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityFloatingList> = {
  title: 'Components/List/CommunityFloatingList',
  component: CommunityFloatingList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '커뮤니티 인기글 리스트 컴포넌트입니다. 우측 플로팅 영역에 표시됩니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityFloatingList>;

const mockPopularPosts: CommunityFloatingItemProps[] = [
  {
    id: '1',
    title: 'ChatGPT 프롬프트 작성 팁 모음',
    hashtags: ['ChatGPT', '프롬프트', '팁'],
    image: 'https://picsum.photos/seed/popular1/400/300',
    likeCount: 245,
    commentCount: 32,
  },
  {
    id: '2',
    title: '효율적인 업무 자동화 프롬프트',
    hashtags: ['자동화', '업무', '효율'],
    image: 'https://picsum.photos/seed/popular2/400/300',
    likeCount: 189,
    commentCount: 24,
  },
  {
    id: '3',
    title: 'UI/UX 디자인을 위한 프롬프트',
    hashtags: ['디자인', 'UI', 'UX'],
    image: 'https://picsum.photos/seed/popular3/400/300',
    likeCount: 156,
    commentCount: 18,
  },
  {
    id: '4',
    title: '데이터 분석 프롬프트 가이드',
    hashtags: ['데이터', '분석', '가이드'],
    image: 'https://picsum.photos/seed/popular4/400/300',
    likeCount: 234,
    commentCount: 29,
  },
  {
    id: '5',
    title: '창의적인 콘텐츠 제작 프롬프트',
    hashtags: ['콘텐츠', '창의성'],
    image: 'https://picsum.photos/seed/popular5/400/300',
    likeCount: 198,
    commentCount: 21,
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    popularPosts: mockPopularPosts,
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">인기 게시글</h3>
        <Story />
      </div>
    ),
  ],
};

// 적은 수의 게시글
export const FewPosts: Story = {
  args: {
    popularPosts: mockPopularPosts.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">인기 게시글</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '게시글이 3개만 있는 경우입니다.',
      },
    },
  },
};

// 많은 수의 게시글
export const ManyPosts: Story = {
  args: {
    popularPosts: [
      ...mockPopularPosts,
      {
        id: '6',
        title: '프롬프트 엔지니어링 기초',
        hashtags: ['프롬프트', '엔지니어링'],
        image: 'https://picsum.photos/seed/popular6/400/300',
        likeCount: 178,
        commentCount: 15,
      },
      {
        id: '7',
        title: 'AI 이미지 생성 프롬프트 작성법',
        hashtags: ['AI', '이미지생성'],
        image: 'https://picsum.photos/seed/popular7/400/300',
        likeCount: 145,
        commentCount: 12,
      },
      {
        id: '8',
        title: '마케팅 문구 생성 프롬프트',
        hashtags: ['마케팅', '문구'],
        image: 'https://picsum.photos/seed/popular8/400/300',
        likeCount: 132,
        commentCount: 11,
      },
      {
        id: '9',
        title: '코드 리뷰 자동화 프롬프트',
        hashtags: ['코드리뷰', '자동화'],
        image: 'https://picsum.photos/seed/popular9/400/300',
        likeCount: 167,
        commentCount: 14,
      },
      {
        id: '10',
        title: '스토리텔링을 위한 AI 프롬프트',
        hashtags: ['스토리텔링', 'AI'],
        image: 'https://picsum.photos/seed/popular10/400/300',
        likeCount: 156,
        commentCount: 13,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg max-h-[600px] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 sticky top-0 bg-white">인기 게시글 TOP 10</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '10개의 인기 게시글이 표시됩니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitles: Story = {
  args: {
    popularPosts: [
      {
        id: '101',
        title: '완벽한 ChatGPT 프롬프트를 작성하는 방법: 초보자부터 전문가까지 모두를 위한 종합 가이드',
        hashtags: ['ChatGPT', '가이드', '완벽'],
        image: 'https://picsum.photos/seed/long1/400/300',
        likeCount: 456,
        commentCount: 67,
      },
      {
        id: '102',
        title: '업무 효율을 200% 높이는 생산성 향상 프롬프트 컬렉션 - 실무에서 바로 활용 가능',
        hashtags: ['생산성', '업무효율'],
        image: 'https://picsum.photos/seed/long2/400/300',
        likeCount: 389,
        commentCount: 45,
      },
      {
        id: '103',
        title: 'UI/UX 디자이너를 위한 AI 활용 가이드: Figma부터 프로토타입까지',
        hashtags: ['디자인', 'Figma', 'AI'],
        image: 'https://picsum.photos/seed/long3/400/300',
        likeCount: 267,
        commentCount: 34,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">인기 게시글</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '긴 제목이 어떻게 표시되는지 확인합니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    popularPosts: [],
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">인기 게시글</h3>
        <Story />
        <div className="text-center py-8 text-gray-500 text-sm">
          아직 인기 게시글이 없습니다
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '게시글이 없는 빈 상태입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트
export const WithinRealPage: Story = {
  args: {
    popularPosts: mockPopularPosts,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* 메인 콘텐츠 영역 */}
          <div className="col-span-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">커뮤니티 게시판</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold mb-2">게시글 제목 {i}</h3>
                    <p className="text-sm text-gray-600">게시글 내용 미리보기...</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 플로팅 영역 */}
          <div className="col-span-4">
            <div className="sticky top-6 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">🔥 인기 게시글</h3>
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 커뮤니티 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    popularPosts: mockPopularPosts,
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white">인기 게시글</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '다크 모드 배경에서의 표시입니다.',
      },
    },
  },
};

// 컴팩트 뷰
export const CompactView: Story = {
  args: {
    popularPosts: mockPopularPosts,
  },
  decorators: [
    (Story) => (
      <div className="w-64 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-3 text-gray-800">TOP 5</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '좁은 공간에서의 컴팩트한 표시입니다.',
      },
    },
  },
};
