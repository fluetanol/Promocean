import type { Meta, StoryObj } from '@storybook/react';
import PostingFloatingList from '@components/list/PostingFloatingList';
import { PostingFloatingItemProps } from '@/types/itemType';
import { useState } from 'react';
import { Globe, Lock, Users } from 'lucide-react';

const meta: Meta<typeof PostingFloatingList> = {
  title: 'Components/List/PostingFloatingList',
  component: PostingFloatingList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '게시글 작성 시 우측 플로팅 영역의 옵션 리스트 컴포넌트입니다. 라디오 버튼 형태로 옵션을 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PostingFloatingList>;

const mockVisibilityItems: PostingFloatingItemProps[] = [
  {
    id: '1',
    icon: <Globe className="w-5 h-5" />,
    value: 'public',
    label: '전체 공개',
    checked: true,
  },
  {
    id: '2',
    icon: <Lock className="w-5 h-5" />,
    value: 'private',
    label: '비공개',
    checked: false,
  },
  {
    id: '3',
    icon: <Users className="w-5 h-5" />,
    value: 'followers',
    label: '팔로워 공개',
    checked: false,
  },
];

const mockCategoryItems: PostingFloatingItemProps[] = [
  {
    id: '1',
    icon: <span className="text-lg">💻</span>,
    value: 'development',
    label: '개발',
    checked: true,
  },
  {
    id: '2',
    icon: <span className="text-lg">🎨</span>,
    value: 'design',
    label: '디자인',
    checked: false,
  },
  {
    id: '3',
    icon: <span className="text-lg">💼</span>,
    value: 'business',
    label: '업무',
    checked: false,
  },
  {
    id: '4',
    icon: <span className="text-lg">📢</span>,
    value: 'marketing',
    label: '마케팅',
    checked: false,
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    items: mockVisibilityItems,
    name: 'visibility',
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">공개 범위</h3>
        <Story />
      </div>
    ),
  ],
};

// 인터랙티브 예제
export const Interactive: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('public');

    return (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">공개 범위 선택</h3>
        <p className="text-sm text-gray-600 mb-4">
          선택된 값: <span className="font-mono font-bold">{selectedValue}</span>
        </p>
        <PostingFloatingList
          items={mockVisibilityItems}
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
          name="visibility"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '선택 상태가 변경되는 인터랙티브 예제입니다.',
      },
    },
  },
};

// 카테고리 선택
export const CategorySelection: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState('development');

    return (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">카테고리 선택</h3>
        <PostingFloatingList
          items={mockCategoryItems}
          selectedValue={selectedCategory}
          onSelect={setSelectedCategory}
          name="category"
        />
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            선택된 카테고리: <span className="font-bold">{selectedCategory}</span>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '카테고리 선택 옵션 리스트입니다.',
      },
    },
  },
};

// 적은 옵션
export const FewOptions: Story = {
  args: {
    items: mockVisibilityItems.slice(0, 2),
    name: 'visibility',
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">공개 설정</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '옵션이 2개만 있는 경우입니다.',
      },
    },
  },
};

// 많은 옵션
export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    const manyItems: PostingFloatingItemProps[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      icon: <span className="text-lg">{i + 1}</span>,
      value: `option${i + 1}`,
      label: `옵션 ${i + 1}`,
      checked: i === 0,
    }));

    return (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4 sticky top-0 bg-white">많은 옵션</h3>
        <PostingFloatingList
          items={manyItems}
          selectedValue={selected}
          onSelect={setSelected}
          name="manyOptions"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '8개의 옵션이 있는 경우입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 실제 게시글 작성 페이지 컨텍스트
export const WithinPostingPage: Story = {
  render: () => {
    const [visibility, setVisibility] = useState('public');
    const [category, setCategory] = useState('development');

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* 메인 작성 영역 */}
          <div className="col-span-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6">프롬프트 작성</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">내용</label>
                  <textarea
                    rows={10}
                    placeholder="내용을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 플로팅 옵션 영역 */}
          <div className="col-span-4 space-y-4">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">공개 범위</h3>
                <PostingFloatingList
                  items={mockVisibilityItems}
                  selectedValue={visibility}
                  onSelect={setVisibility}
                  name="visibility"
                />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">카테고리</h3>
                <PostingFloatingList
                  items={mockCategoryItems}
                  selectedValue={category}
                  onSelect={setCategory}
                  name="category"
                />
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 font-medium">
                게시하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 게시글 작성 페이지에서의 사용 예시입니다.',
      },
    },
  },
};

// 긴 라벨
export const LongLabels: Story = {
  render: () => {
    const [selected, setSelected] = useState('detailed');

    const itemsWithLongLabels: PostingFloatingItemProps[] = [
      {
        id: '1',
        icon: <span className="text-lg">📝</span>,
        value: 'simple',
        label: '간단',
        checked: false,
      },
      {
        id: '2',
        icon: <span className="text-lg">📋</span>,
        value: 'detailed',
        label: '매우 상세한 옵션 레이블입니다',
        checked: true,
      },
      {
        id: '3',
        icon: <span className="text-lg">📚</span>,
        value: 'comprehensive',
        label: '종합적인 기능을 모두 포함하는 옵션',
        checked: false,
      },
    ];

    return (
      <div className="w-80 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">긴 라벨 테스트</h3>
        <PostingFloatingList
          items={itemsWithLongLabels}
          selectedValue={selected}
          onSelect={setSelected}
          name="longLabels"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '라벨이 긴 경우의 표시를 확인합니다.',
      },
    },
  },
};

// 다크 배경
export const DarkBackground: Story = {
  args: {
    items: mockVisibilityItems,
    name: 'visibility',
  },
  decorators: [
    (Story) => (
      <div className="w-80 bg-gray-800 p-6 rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-white">공개 범위</h3>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '다크 배경에서의 표시입니다.',
      },
    },
  },
};
