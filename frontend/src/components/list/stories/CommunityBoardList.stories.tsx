import type { Meta, StoryObj } from '@storybook/react';
import CommunityBoardList from '@components/list/CommunityBoardList';
import { CommunityBoardItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityBoardList> = {
  title: 'Components/List/CommunityBoardList',
  component: CommunityBoardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 게시판 리스트 컴포넌트입니다. 게시글 목록을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityBoardList>;

const mockCommunityBoardList: CommunityBoardItemProps[] = [
  {
    id: '1',
    title: 'ChatGPT로 업무 효율 10배 높이는 방법',
    hashtags: ['ChatGPT', '업무효율', '생산성'],
    category: '업무',
    likeCount: 89,
    commentCount: 23,
    image: 'https://picsum.photos/seed/community1/400/300',
    userName: '프롬프트마스터',
    userImage: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    title: 'React 컴포넌트 설계 패턴 정리',
    hashtags: ['React', '컴포넌트', '설계패턴'],
    category: '개발',
    likeCount: 67,
    commentCount: 15,
    image: 'https://picsum.photos/seed/community2/400/300',
    userName: '개발자김',
    userImage: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    title: 'UI/UX 디자인 트렌드 2024',
    hashtags: ['디자인', 'UI', 'UX', '트렌드'],
    category: '디자인',
    likeCount: 45,
    commentCount: 8,
    image: 'https://picsum.photos/seed/community3/400/300',
    userName: '디자이너이',
    userImage: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    title: '프롬프트 엔지니어링 기초부터 실전까지',
    hashtags: ['프롬프트', 'AI', '엔지니어링'],
    category: '개발',
    likeCount: 123,
    commentCount: 34,
    image: 'https://picsum.photos/seed/community4/400/300',
    userName: 'AI전문가',
    userImage: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    title: 'Storybook으로 디자인 시스템 구축하기',
    hashtags: ['Storybook', '디자인시스템', '프론트엔드'],
    category: '개발',
    likeCount: 32,
    commentCount: 7,
    image: 'https://picsum.photos/seed/community5/400/300',
    userName: '프론트엔드박',
    userImage: 'https://i.pravatar.cc/150?img=5',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    communityBoardList: mockCommunityBoardList,
  },
};

// 적은 수의 게시글
export const FewPosts: Story = {
  args: {
    communityBoardList: mockCommunityBoardList.slice(0, 2),
  },
  parameters: {
    docs: {
      description: {
        story: '게시글이 2개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 게시글
export const SinglePost: Story = {
  args: {
    communityBoardList: [mockCommunityBoardList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '게시글이 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    communityBoardList: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">게시글이 없습니다</p>
          <p className="text-sm">첫 번째 게시글을 작성해보세요!</p>
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

// 많은 좋아요와 댓글
export const HighEngagement: Story = {
  args: {
    communityBoardList: [
      {
        ...mockCommunityBoardList[0],
        likeCount: 892,
        commentCount: 156,
      },
      {
        ...mockCommunityBoardList[1],
        likeCount: 534,
        commentCount: 89,
      },
      {
        ...mockCommunityBoardList[2],
        likeCount: 423,
        commentCount: 67,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요와 댓글이 많은 인기 게시글들입니다.',
      },
    },
  },
};

// 긴 제목과 해시태그
export const LongContent: Story = {
  args: {
    communityBoardList: [
      {
        id: '101',
        title: 'ChatGPT, Claude, Gemini를 활용한 최신 AI 프롬프트 엔지니어링 기법: 실무에서 바로 활용 가능한 완벽 가이드',
        hashtags: ['ChatGPT', 'Claude', 'Gemini', 'AI', '프롬프트', '엔지니어링', 'LLM'],
        category: '개발',
        likeCount: 178,
        commentCount: 45,
        image: 'https://picsum.photos/seed/community101/400/300',
        userName: 'AI전문가프롬프트마스터',
        userImage: 'https://i.pravatar.cc/150?img=10',
      },
      {
        id: '102',
        title: '단축 제목',
        hashtags: ['짧음'],
        category: '기타',
        likeCount: 5,
        commentCount: 2,
        image: 'https://picsum.photos/seed/community102/400/300',
        userName: '작성자',
        userImage: 'https://i.pravatar.cc/150?img=11',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 해시태그가 긴 게시글이 어떻게 표시되는지 확인합니다.',
      },
    },
  },
};

// 다양한 카테고리
export const DifferentCategories: Story = {
  args: {
    communityBoardList: [
      { ...mockCommunityBoardList[0], category: '업무' },
      { ...mockCommunityBoardList[1], category: '개발' },
      { ...mockCommunityBoardList[2], category: '디자인' },
      { ...mockCommunityBoardList[3], category: '마케팅' },
      { ...mockCommunityBoardList[4], category: '기타' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리의 게시글이 섞여 있는 경우입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트
export const WithinRealPage: Story = {
  args: {
    communityBoardList: mockCommunityBoardList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">커뮤니티</h1>
            <p className="text-gray-600">프롬프트와 AI에 관한 모든 이야기를 나눠보세요</p>
          </div>

          {/* 필터 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg">전체</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">업무</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">개발</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">디자인</button>
          </div>

          {/* 게시글 리스트 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Story />
          </div>

          {/* 페이지네이션 */}
          <div className="mt-6 flex justify-center gap-2">
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
        story: '실제 커뮤니티 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 반응형 레이아웃
export const ResponsiveLayout: Story = {
  args: {
    communityBoardList: mockCommunityBoardList.slice(0, 3),
  },
  decorators: [
    (Story) => (
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">최신 게시글</h2>
            <Story />
          </div>

          {/* 사이드바 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4">인기 태그</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                #프롬프트
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                #ChatGPT
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                #개발
              </span>
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
        story: '반응형 그리드 레이아웃에서의 표시입니다.',
      },
    },
  },
};
