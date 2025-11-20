import type { Meta, StoryObj } from '@storybook/react';
import CommunityCommentList from '@components/list/CommunityCommentList';
import { CommunityCommentItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityCommentList> = {
  title: 'Components/List/CommunityCommentList',
  component: CommunityCommentList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 댓글 목록을 표시하는 리스트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    communityCommentList: {
      description: '댓글 아이템 배열',
      table: {
        type: { summary: 'CommunityCommentItemProps[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityCommentList>;

const mockComments: CommunityCommentItemProps[] = [
  {
    author: '김철수',
    createdAt: '2024-06-01T10:00:00Z',
    profileUrl: '/images/profile1.jpg',
    content: '정말 유용한 정보네요! 감사합니다.',
  },
  {
    author: '이영희',
    createdAt: '2024-06-01T11:30:00Z',
    profileUrl: '/images/profile2.jpg',
    content: '이 방법으로 문제를 해결했어요. 큰 도움이 되었습니다!',
  },
  {
    author: '박민수',
    createdAt: '2024-06-01T12:00:00Z',
    profileUrl: '/images/profile3.jpg',
    content: '추가로 질문이 있는데요, 이 경우에는 어떻게 하면 좋을까요?',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    communityCommentList: mockComments,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 댓글 목록입니다.',
      },
    },
  },
};

// 빈 목록
export const EmptyList: Story = {
  args: {
    communityCommentList: [],
  },
  render: (args) => (
    <div>
      <CommunityCommentList {...args} />
      <div className="text-center py-8 text-gray-500">
        <p>아직 댓글이 없습니다.</p>
        <p className="text-sm mt-2">첫 댓글을 작성해보세요!</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '댓글이 없는 빈 목록입니다.',
      },
    },
  },
};

// 단일 댓글
export const SingleComment: Story = {
  args: {
    communityCommentList: [mockComments[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 댓글만 있는 목록입니다.',
      },
    },
  },
};

// 많은 댓글
export const ManyComments: Story = {
  args: {
    communityCommentList: [
      ...mockComments,
      {
        author: '최지우',
        createdAt: '2024-06-01T12:30:00Z',
        profileUrl: '/images/profile4.jpg',
        content: '좋은 정보 감사합니다! 많은 도움이 되었어요.',
      },
      {
        author: '한지민',
        createdAt: '2024-06-01T13:00:00Z',
        profileUrl: '/images/profile5.jpg',
        content: '이 글을 읽고 바로 적용해봤는데 효과가 좋네요!',
      },
      {
        author: '서강준',
        createdAt: '2024-06-01T13:30:00Z',
        profileUrl: '/images/profile6.jpg',
        content: '추가로 궁금한 점이 있는데, 답변 부탁드려요.',
      },
      {
        author: '장미란',
        createdAt: '2024-06-01T14:00:00Z',
        profileUrl: '/images/profile7.jpg',
        content: '정말 유익한 글이네요. 앞으로도 좋은 글 부탁드립니다!',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '여러 댓글이 있는 목록입니다.',
      },
    },
  },
};

// 게시물 페이지 컨텍스트
export const WithinPostPage: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          {/* 게시물 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full"></div>
              <div>
                <h3 className="font-semibold">홍길동</h3>
                <p className="text-sm text-gray-500">3시간 전</p>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3">AI 프롬프트 작성 가이드</h2>
            <p className="text-gray-700 mb-4">
              효과적인 AI 프롬프트를 작성하는 방법에 대해 공유합니다...
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>👍 24</span>
              <span>💬 {mockComments.length}</span>
              <span>🔖 12</span>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              댓글 {mockComments.length}개
            </h3>
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '게시물 페이지에서 사용되는 댓글 목록입니다.',
      },
    },
  },
};

// 긴 댓글 포함
export const WithLongComments: Story = {
  args: {
    communityCommentList: [
      {
        author: '김철수',
        createdAt: '2024-06-01T10:00:00Z',
        profileUrl: '/images/profile1.jpg',
        content:
          '정말 유용한 정보네요! 감사합니다. 특히 프롬프트 작성 팁이 큰 도움이 되었습니다. 앞으로도 좋은 글 부탁드려요! 추가로, 프롬프트를 작성할 때 주의해야 할 점이나 자주 하는 실수에 대해서도 다뤄주시면 좋을 것 같아요. 예를 들어, 너무 모호한 질문을 피하는 방법이나, 구체적인 예시를 포함하는 것이 왜 중요한지 등에 대해 설명해주시면 더욱 유익할 것 같습니다. 다시 한 번 좋은 정보 공유해주셔서 감사합니다!',
      },
      mockComments[1],
      mockComments[2],
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용의 댓글이 포함된 목록입니다.',
      },
    },
  },
};

// 좋아요 많은 댓글
export const HighlyLikedComments: Story = {
  args: {
    communityCommentList: [
      {
        author: '인기 댓글 작성자',
        createdAt: '2024-05-31T12:00:00Z',
        profileUrl: '/images/profile1.jpg',
        content: '정말 유용한 정보입니다! 모두에게 추천합니다.',
      },
      {

        author: '베스트 댓글러',
        createdAt: '2024-05-31T12:30:00Z',
        profileUrl: '/images/profile2.jpg',
        content: '이 방법으로 문제를 해결했어요. 감사합니다!',
      },
      ...mockComments,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '좋아요가 많은 인기 댓글들입니다.',
      },
    },
  },
};

// 스크롤 가능한 목록
export const ScrollableList: Story = {
  args: {
    communityCommentList: Array.from({ length: 20 }, (_, i) => ({
      author: `사용자${i + 1}`,
      createdAt: `2024-06-01T${Math.floor(Math.random() * 24)}:00:00Z`,
      profileUrl: `/images/profile${(i % 7) + 1}.jpg`,
      content: `댓글 내용 ${i + 1}: ${
        i % 3 === 0
          ? '좋은 정보 감사합니다!'
          : i % 3 === 1
          ? '정말 유용한 글이네요.'
          : '궁금한 점이 있는데요...'
      }`,
      likes: Math.floor(Math.random() * 50),
      isLiked: Math.random() > 0.5,
    })),
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">댓글 20개</h3>
        <div className="max-h-[500px] overflow-y-auto">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크롤이 필요한 많은 댓글 목록입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-3">댓글 {mockComments.length}</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 댓글 목록입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">댓글</h3>
          <div className="[&_*]:text-white">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: '다크 모드 환경에서의 댓글 목록입니다.',
      },
    },
  },
};

// 댓글 작성 폼과 함께
export const WithCommentForm: Story = {
  args: {
    communityCommentList: mockComments,
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">
          댓글 {mockComments.length}개
        </h3>

        {/* 댓글 작성 폼 */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <textarea
            placeholder="댓글을 입력하세요..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-end mt-2">
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">
              댓글 작성
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '댓글 작성 폼과 함께 표시되는 댓글 목록입니다.',
      },
    },
  },
};
