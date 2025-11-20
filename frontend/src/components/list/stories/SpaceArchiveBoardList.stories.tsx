import type { Meta, StoryObj } from '@storybook/react';
import SpaceArchiveBoardList from '@components/list/SpaceArchiveBoardList';
import { SpaceArchiveBoardItemProps } from '@components/item/SpaceArchiveBoardItem';

const meta: Meta<typeof SpaceArchiveBoardList> = {
  title: 'Components/List/SpaceArchiveBoardList',
  component: SpaceArchiveBoardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 아카이브 게시판 리스트 컴포넌트입니다. 아카이브 내의 프롬프트 목록을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveBoardList>;

const mockArchiveBoardList: SpaceArchiveBoardItemProps[] = [
  {
    id: 1,
    category: '개발',
    title: 'React 컴포넌트 생성 프롬프트',
    hashtags: ['React', '컴포넌트', 'TypeScript'],
    image: 'https://picsum.photos/seed/archive1/400/300',
  },
  {
    id: 2,
    category: '디자인',
    title: 'Figma 디자인 시스템',
    hashtags: ['Figma', '디자인시스템', 'UI'],
    image: 'https://picsum.photos/seed/archive2/400/300',
  },
  {
    id: 3,
    category: '개발',
    title: 'API 문서 자동 생성',
    hashtags: ['API', '문서', '자동화'],
    image: 'https://picsum.photos/seed/archive3/400/300',
  },
  {
    id: 4,
    category: '업무',
    title: '회의록 자동 정리',
    hashtags: ['회의', '정리', '업무'],
    image: 'https://picsum.photos/seed/archive4/400/300',
  },
  {
    id: 5,
    category: '개발',
    title: '코드 리팩토링 가이드',
    hashtags: ['리팩토링', '코드품질', '개발'],
    image: 'https://picsum.photos/seed/archive5/400/300',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    mySpaceBoardList: mockArchiveBoardList,
  },
};

// 적은 아이템
export const FewItems: Story = {
  args: {
    mySpaceBoardList: mockArchiveBoardList.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '아이템이 3개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 아이템
export const SingleItem: Story = {
  args: {
    mySpaceBoardList: [mockArchiveBoardList[0]],
  },
  parameters: {
    docs: {
      description: {
        story: '아이템이 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    mySpaceBoardList: [],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">프롬프트가 없습니다</p>
          <p className="text-sm">첫 번째 프롬프트를 추가해보세요!</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '아이템이 없는 빈 상태입니다.',
      },
    },
  },
};

// 이미지 없는 아이템
export const NoImages: Story = {
  args: {
    mySpaceBoardList: mockArchiveBoardList.map((item) => ({ ...item, image: undefined })),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 아이템들입니다.',
      },
    },
  },
};

// 많은 해시태그
export const ManyHashtags: Story = {
  args: {
    mySpaceBoardList: [
      {
        ...mockArchiveBoardList[0],
        hashtags: [
          'React',
          'TypeScript',
          'Next.js',
          'TailwindCSS',
          'Storybook',
          'ESLint',
          'Prettier',
        ],
      },
      ...mockArchiveBoardList.slice(1, 3),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '해시태그가 많은 아이템입니다.',
      },
    },
  },
};

// 다양한 카테고리
export const DifferentCategories: Story = {
  args: {
    mySpaceBoardList: [
      { ...mockArchiveBoardList[0], category: '개발' },
      { ...mockArchiveBoardList[1], category: '디자인' },
      { ...mockArchiveBoardList[2], category: '업무' },
      { ...mockArchiveBoardList[3], category: '마케팅' },
      { ...mockArchiveBoardList[4], category: '기타' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리의 아이템들입니다.',
      },
    },
  },
};

// 실제 아카이브 페이지 컨텍스트
export const WithinArchivePage: Story = {
  args: {
    mySpaceBoardList: mockArchiveBoardList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 py-6 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <button className="text-gray-600 hover:text-gray-900">← 뒤로</button>
              <h1 className="text-3xl font-bold">개발 프롬프트</h1>
            </div>
            <p className="text-gray-600">개발 관련 프롬프트 모음입니다</p>
          </div>
        </div>

        {/* 필터 및 정렬 */}
        <div className="bg-white border-b border-gray-200 py-4 px-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                전체
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                개발
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">
                디자인
              </button>
            </div>

            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
              <option>최신순</option>
              <option>오래된순</option>
              <option>이름순</option>
            </select>
          </div>
        </div>

        {/* 리스트 */}
        <div className="max-w-6xl mx-auto py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600">총 {mockArchiveBoardList.length}개</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                + 프롬프트 추가
              </button>
            </div>
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
        story: '실제 아카이브 상세 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitles: Story = {
  args: {
    mySpaceBoardList: [
      {
        ...mockArchiveBoardList[0],
        title: '완벽한 React 컴포넌트를 생성하기 위한 상세한 프롬프트 가이드와 예제 모음',
      },
      {
        ...mockArchiveBoardList[1],
        title: '짧은 제목',
      },
      {
        ...mockArchiveBoardList[2],
        title: '중간 길이의 프롬프트 제목입니다',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '제목 길이가 다양한 아이템들입니다.',
      },
    },
  },
};
