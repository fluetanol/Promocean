import type { Meta, StoryObj } from '@storybook/react';
import SpaceArchiveList from '@components/list/SpaceArchiveList';
import { SpaceArchiveData } from '@/app/my-space/page';

const meta: Meta<typeof SpaceArchiveList> = {
  title: 'Components/List/SpaceArchiveList',
  component: SpaceArchiveList,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '마이 스페이스의 아카이브 리스트 컴포넌트입니다. 프롬프트 컬렉션을 카드 형태로 표시하며, 추가 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpaceArchiveList>;

const mockArchiveList: SpaceArchiveData[] = [
  {
    title: '개발 프롬프트',
    bgColor: '#3b82f6',
    isPinned: true,
  },
  {
    title: '디자인 아이디어',
    bgColor: '#8b5cf6',
    isPinned: false,
  },
  {
    title: '업무 자동화',
    bgColor: '#10b981',
    isPinned: false,
  },
  {
    title: '마케팅 카피',
    bgColor: '#f59e0b',
    isPinned: false,
  },
];

// 기본 스토리 (일반 리스트)
export const Default: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: mockArchiveList,
    pinnedItemListState: mockArchiveList.filter(item => item.isPinned),
  },

  parameters: {
    docs: {
      description: {
        story: '기본 아카이브 리스트입니다. 추가 버튼(+)이 포함되어 있습니다.',
      },
    },
  },
};

// 고정 리스트 (모든 프롬프트 버튼 포함)
export const PinnedList: Story = {
  args: {
    isPinnedList: true,
    archiveItemListState: mockArchiveList,
    pinnedItemListState: mockArchiveList.filter(item => item.isPinned),

  },
  parameters: {
    docs: {
      description: {
        story: '고정된 리스트로 "모든 프롬프트" 버튼이 표시됩니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: [],
    pinnedItemListState: [],
  },
  parameters: {
    docs: {
      description: {
        story: '아카이브가 없는 빈 상태입니다. 추가 버튼만 표시됩니다.',
      },
    },
  },
};

// 단일 아카이브
export const SingleArchive: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: [{ title: '단일 아카이브', bgColor: '#3b82f6', isPinned: false }],
    pinnedItemListState: [],  
  },
  parameters: {
    docs: {
      description: {
        story: '아카이브가 1개만 있는 경우입니다.',
      },
    },
  },
};

// 많은 아카이브
export const ManyArchives: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: Array.from({ length: 20 }, (_, i) => ({
      title: `아카이브 ${i + 1}`,
      bgColor: '#3b82f6',
      isPinned: false,
    })),
    pinnedItemListState: [],
  },
  parameters: {
    docs: {
      description: {
        story: '많은 아카이브가 있는 경우입니다. 가로 스크롤이 필요할 수 있습니다.',
      },
    },
  },
};

// 다양한 색상
export const DifferentColors: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState  : [
      { title: '빨강', bgColor: '#ef4444', isPinned: false },
      { title: '주황', bgColor: '#f97316', isPinned: false },
      { title: '노랑', bgColor: '#eab308', isPinned: false },
      { title: '초록', bgColor: '#22c55e', isPinned: false },
      { title: '파랑', bgColor: '#3b82f6', isPinned: false },
      { title: '남색', bgColor: '#6366f1', isPinned: false },
      { title: '보라', bgColor: '#a855f7', isPinned: false },
      { title: '분홍', bgColor: '#ec4899', isPinned: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 배경 색상의 아카이브들입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitles: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: [
      { title: '매우 긴 아카이브 제목 예제입니다', bgColor: '#3b82f6', isPinned: false },
      { title: '짧은 제목', bgColor: '#8b5cf6', isPinned: false },
      { title: '중간 길이 제목', bgColor: '#10b981', isPinned: false },
      { 
        title: '이것은 정말 매우 긴 제목입니다 테스트용',
        bgColor: '#f59e0b',
        isPinned: false,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '제목 길이가 다양한 아카이브들입니다.',
      },
    },
  },
};

// 실제 페이지 컨텍스트
export const WithinMySpacePage: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: mockArchiveList,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-200 py-6 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">내 스페이스</h1>
            <p className="text-gray-600 mt-2">나만의 프롬프트 컬렉션을 관리하세요</p>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="max-w-7xl mx-auto flex gap-4">
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium">
              아카이브
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">스크랩</button>
          </div>
        </div>

        {/* 섹션 */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 px-8">📌 고정된 아카이브</h2>
            <SpaceArchiveList
              isPinnedList={true}
              isTeamSpace={false}
              archiveItemListState={mockArchiveList.slice(0, 2)}
              pinnedItemListState={mockArchiveList.filter(item => item.isPinned)}
              setArchiveItemListState={() => {}}
              setPinnedItemListState={() => {}}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 px-8">최근 아카이브</h2>
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
        story: '실제 마이 스페이스 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 호버 효과 테스트
export const HoverEffectTest: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: mockArchiveList,
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <div className="bg-white p-6 rounded-xl shadow-md mb-4">
          <p className="text-sm text-gray-600">
            💡 각 카드에 마우스를 올려보세요. 약간 위로 올라가고 그림자가 변경됩니다.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '호버 효과를 테스트할 수 있습니다.',
      },
    },
  },
};

// 모달 인터랙션 테스트
export const ModalInteractionTest: Story = {
  args: {
    isPinnedList: false,
    archiveItemListState: mockArchiveList.slice(0, 2),
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-4">
          <p className="text-blue-800 font-semibold mb-2">인터랙션 테스트</p>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• 추가 버튼(+)을 클릭하면 모달이 열립니다</li>
            <li>• 모달 외부를 클릭하거나 닫기 버튼으로 닫을 수 있습니다</li>
            <li>• 각 아카이브 카드를 클릭해보세요</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '추가 버튼 클릭 시 모달이 열리는 인터랙션을 테스트합니다.',
      },
    },
  },
};
