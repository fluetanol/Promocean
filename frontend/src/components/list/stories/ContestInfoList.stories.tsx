import type { Meta, StoryObj } from '@storybook/react';
import ContestInfoList from '@components/list/ContestInfoList';
import { ContestInfoItemProps } from '@/types/itemType';

const meta: Meta<typeof ContestInfoList> = {
  title: 'Components/List/ContestInfoList',
  component: ContestInfoList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '콘테스트 정보 리스트 컴포넌트입니다. 제목과 내용으로 구성된 정보 항목들을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestInfoList>;

const mockTitles = ['주제', '기간', '참가 자격', '시상 내역', '제출 방법'];

const mockItems: ContestInfoItemProps[] = [
  {
    content: 'ChatGPT를 활용한 업무 효율화 프롬프트',
  },
  {
    content: '2024년 1월 15일 ~ 2월 15일 (한 달간)',
  },
  {
    content: '누구나 참여 가능합니다. 회원가입만 하시면 됩니다.',
  },
  {
    content: '1등: 상금 $2,000 + 트로피\n2등: 상금 $1,000\n3등: 상금 $500\n참가상: 특별 배지',
  },
  {
    content: '작성한 프롬프트를 제출 버튼을 눌러 제출하세요. 수정은 마감일 전까지 가능합니다.',
  },
];

// 기본 스토리
export const Default: Story = {
  args: {
    titles: mockTitles,
    items: mockItems,
  },
};

// 적은 정보
export const FewItems: Story = {
  args: {
    titles: mockTitles.slice(0, 3),
    items: mockItems.slice(0, 3),
  },
  parameters: {
    docs: {
      description: {
        story: '정보가 3개만 있는 경우입니다.',
      },
    },
  },
};

// 단일 정보
export const SingleItem: Story = {
  args: {
    titles: ['주제'],
    items: [{ content: 'AI 프롬프트 작성 챌린지' }],
  },
  parameters: {
    docs: {
      description: {
        story: '정보가 1개만 있는 경우입니다.',
      },
    },
  },
};

// 빈 리스트
export const EmptyList: Story = {
  args: {
    titles: [],
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '데이터가 없는 빈 상태입니다. "데이터가 없습니다" 메시지가 표시됩니다.',
      },
    },
  },
};

// 긴 내용
export const LongContent: Story = {
  args: {
    titles: ['설명', '상세 규칙', '주의사항'],
    items: [
      {
        content:
          '이 콘테스트는 AI 프롬프트 엔지니어링의 중요성을 알리고, 실무에서 바로 활용할 수 있는 고품질 프롬프트를 발굴하기 위해 기획되었습니다. 참가자들은 자신만의 창의적인 프롬프트를 작성하여 제출할 수 있으며, 다른 참가자들의 투표를 통해 순위가 결정됩니다.',
      },
      {
        content:
          '1. 제출한 프롬프트는 공개되며 누구나 볼 수 있습니다.\n2. 타인의 프롬프트를 복사하거나 표절하는 행위는 금지됩니다.\n3. 한 사람당 최대 3개까지 제출 가능합니다.\n4. 부적절한 내용이 포함된 프롬프트는 삭제될 수 있습니다.\n5. 투표는 하루에 한 번씩 가능합니다.',
      },
      {
        content:
          '제출 전 프롬프트를 충분히 테스트해보시기 바랍니다. 제출 후에도 마감일 전까지는 수정이 가능하니 걱정하지 마세요. 궁금한 점이 있으시면 FAQ를 참고하시거나 운영진에게 문의해주세요.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '내용이 긴 정보들입니다. 줄바꿈도 포함됩니다.',
      },
    },
  },
};

// 실제 콘테스트 페이지 컨텍스트
export const WithinContestPage: Story = {
  args: {
    titles: mockTitles,
    items: mockItems,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white py-12 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
              진행중
            </div>
            <h1 className="text-4xl font-bold mb-3">AI 프롬프트 챌린지 2024</h1>
            <p className="text-white/90 text-lg mb-6">
              최고의 프롬프트를 만들고 보상을 받으세요
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100">
                지금 참여하기
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20">
                자세히 보기
              </button>
            </div>
          </div>
        </div>

        {/* 탭 */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="max-w-5xl mx-auto flex gap-4">
            <button className="px-4 py-3 border-b-2 border-primary text-primary font-medium">
              상세정보
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">리더보드</button>
          </div>
        </div>

        {/* 콘테스트 정보 */}
        <div className="max-w-5xl mx-auto py-8 px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">콘테스트 정보</h2>
            <Story />
          </div>

          {/* 추가 정보 */}
          <div className="mt-6 bg-blue-50 border border-blue-200 p-6 rounded-xl">
            <h3 className="font-semibold text-blue-900 mb-2">💡 참여 팁</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• 명확하고 구체적인 프롬프트를 작성하세요</li>
              <li>• 다양한 예시를 포함하면 좋습니다</li>
              <li>• 다른 참가자들의 프롬프트를 참고해보세요</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 콘테스트 페이지에서의 정보 표시 예시입니다.',
      },
    },
  },
};

// 간단한 레이아웃
export const SimpleLayout: Story = {
  args: {
    titles: mockTitles,
    items: mockItems,
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4">상세 정보</h3>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '간단한 레이아웃의 정보 표시입니다.',
      },
    },
  },
};

// 컴팩트 뷰
export const CompactView: Story = {
  args: {
    titles: ['주제', '기간', '참가비'],
    items: [
      { content: 'AI 프롬프트 챌린지' },
      { content: '2024.01.15 ~ 02.15' },
      { content: '무료' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '간결한 정보만 표시하는 컴팩트 뷰입니다.',
      },
    },
  },
};
