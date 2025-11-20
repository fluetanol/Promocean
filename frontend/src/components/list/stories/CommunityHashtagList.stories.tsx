import type { Meta, StoryObj } from '@storybook/react';
import CommunityHashtagList from '@components/list/CommunityHashtagList';
import { HashtagItemProps } from '@/types/itemType';

const meta: Meta<typeof CommunityHashtagList> = {
  title: 'Components/List/CommunityHashtagList',
  component: CommunityHashtagList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '해시태그 목록을 표시하는 리스트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hashtagList: {
      description: '해시태그 아이템 배열',
      table: {
        type: { summary: 'HashtagItemProps[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityHashtagList>;

const mockHashtags: HashtagItemProps[] = [
  { tag: 'AI' },
  { tag: '프롬프트' },
  { tag: 'ChatGPT' },
  { tag: '개발' },
  { tag: '머신러닝' },
];

// 기본 스토리
export const Default: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 해시태그 목록입니다.',
      },
    },
  },
};

// 빈 목록
export const EmptyList: Story = {
  args: {
    hashtagList: [],
  },
  render: (args) => (
    <div>
      <CommunityHashtagList {...args} />
      <p className="text-gray-500 text-sm mt-4">해시태그가 없습니다.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '해시태그가 없는 빈 목록입니다.',
      },
    },
  },
};

// 단일 해시태그
export const SingleHashtag: Story = {
  args: {
    hashtagList: [{ tag: 'AI' }],
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 해시태그만 있는 목록입니다.',
      },
    },
  },
};

// 적은 수의 해시태그
export const FewHashtags: Story = {
  args: {
    hashtagList: [{ tag: 'AI' }, { tag: '프롬프트' }, { tag: 'ChatGPT' }],
  },
  parameters: {
    docs: {
      description: {
        story: '3개의 해시태그가 있는 목록입니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    hashtagList: [
      { tag: 'AI' },
      { tag: '프롬프트' },
      { tag: 'ChatGPT' },
      { tag: '개발' },
      { tag: '머신러닝' },
      { tag: '딥러닝' },
      { tag: '자연어처리' },
      { tag: 'Python' },
      { tag: 'JavaScript' },
      { tag: 'React' },
      { tag: 'TypeScript' },
      { tag: 'NextJS' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '많은 해시태그가 있는 목록입니다. 자동으로 줄바꿈됩니다.',
      },
    },
  },
};

// 긴 이름의 해시태그
export const LongHashtagNames: Story = {
  args: {
    hashtagList: [
      { tag: 'ArtificialIntelligence' },
      { tag: 'PromptEngineering' },
      { tag: 'MachineLearningAlgorithm' },
      { tag: 'DeepLearning' },
      { tag: 'NaturalLanguageProcessing' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이름을 가진 해시태그 목록입니다.',
      },
    },
  },
};

// 게시물 내에서의 사용
export const WithinPost: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full"></div>
          <div>
            <h3 className="font-semibold">홍길동</h3>
            <p className="text-sm text-gray-500">2시간 전</p>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3">AI 프롬프트 작성 팁</h2>
        <p className="text-gray-700 mb-4">
          효과적인 AI 프롬프트를 작성하는 방법에 대해 공유합니다. 명확하고
          구체적인 지시사항을 제공하는 것이 중요합니다.
        </p>
        <div className="mb-4">
          <Story />
        </div>
        <div className="flex gap-4 text-sm text-gray-600 pt-4 border-t">
          <span>👍 24</span>
          <span>💬 12</span>
          <span>🔖 8</span>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '게시물 내에서 사용되는 해시태그 목록입니다.',
      },
    },
  },
};

// 검색 결과 페이지
export const SearchResultsPage: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">인기 해시태그</h2>
            <Story />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">관련 게시물</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                  <h4 className="font-semibold mb-2">게시물 제목 {i}</h4>
                  <p className="text-sm text-gray-600">게시물 내용 미리보기...</p>
                </div>
              ))}
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
        story: '검색 결과 페이지에서 인기 해시태그를 표시합니다.',
      },
    },
  },
};

// 사이드바에서의 사용
export const InSidebar: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen bg-gray-50">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">커뮤니티 게시판</h1>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold mb-2">게시물 {i}</h3>
                  <p className="text-gray-600 text-sm">게시물 내용...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사이드바 */}
        <div className="w-80 bg-white shadow-lg p-6">
          <h3 className="font-semibold mb-4">인기 태그</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '사이드바에서 인기 태그를 표시합니다.',
      },
    },
  },
};

// 태그 클라우드 스타일
export const TagCloud: Story = {
  args: {
    hashtagList: [
      { tag: 'AI' },
      { tag: '프롬프트' },
      { tag: 'ChatGPT' },
      { tag: '개발' },
      { tag: '머신러닝' },
      { tag: '딥러닝' },
      { tag: '자연어처리' },
      { tag: 'Python' },
      { tag: 'JavaScript' },
      { tag: 'React' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">태그 클라우드</h2>
        <div className="flex justify-center">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '태그 클라우드 스타일로 표시된 해시태그 목록입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">관련 태그</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 해시태그 목록입니다.',
      },
    },
  },
};

// 다크 모드
export const DarkMode: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">인기 태그</h3>
          <Story />
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
        story: '다크 모드 환경에서의 해시태그 목록입니다.',
      },
    },
  },
};

// 트렌딩 해시태그
export const TrendingHashtags: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">🔥 트렌딩</h3>
          <span className="text-sm text-gray-500">실시간</span>
        </div>
        <Story />
        <button className="w-full mt-4 py-2 text-sm text-primary hover:text-blue-600 font-medium">
          더 보기
        </button>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '실시간 트렌딩 해시태그를 표시합니다.',
      },
    },
  },
};

// 카테고리별 해시태그
export const CategorizedHashtags: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">카테고리별 인기 태그</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-primary">🤖 AI & 머신러닝</h3>
          <CommunityHashtagList
            hashtagList={[
              { tag: 'AI' },
              { tag: '머신러닝' },
              { tag: '딥러닝' },
              { tag: 'ChatGPT' },
            ]}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-green-600">💻 개발</h3>
          <CommunityHashtagList
            hashtagList={[
              { tag: 'JavaScript' },
              { tag: 'React' },
              { tag: 'Python' },
              { tag: 'TypeScript' },
            ]}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-purple-600">✍️ 프롬프트</h3>
          <CommunityHashtagList
            hashtagList={[
              { tag: '프롬프트' },
              { tag: '프롬프트엔지니어링' },
              { tag: '작성팁' },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '카테고리별로 구분된 해시태그 목록입니다.',
      },
    },
  },
};

// 필터 칩 스타일
export const FilterChips: Story = {
  args: {
    hashtagList: mockHashtags,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">필터</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            초기화
          </button>
        </div>
        <Story />
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            선택된 태그로 필터링된 결과: 42개
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '필터로 사용되는 해시태그 목록입니다.',
      },
    },
  },
};
