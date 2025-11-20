import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TeamSpaceTeamChoiceLabelList from '@components/list/TeamSpaceTeamChoiceLabelList';

const meta: Meta<typeof TeamSpaceTeamChoiceLabelList> = {
  title: 'Components/List/TeamSpaceTeamChoiceLabelList',
  component: TeamSpaceTeamChoiceLabelList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '선택된 팀 멤버를 라벨 형태로 표시하는 리스트 컴포넌트입니다. 각 라벨을 클릭하여 제거할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelNameList: {
      description: '라벨로 표시할 이름 목록',
      table: {
        type: { summary: 'string[]' },
      },
    },
    selectedMemberSetState: {
      description: '선택된 멤버의 Set (선택적)',
      table: {
        type: { summary: 'Set<string>' },
      },
    },
    setSelectedMemberSetState: {
      description: '선택된 멤버 Set을 업데이트하는 함수 (선택적)',
      table: {
        type: { summary: '(members: Set<string>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceTeamChoiceLabelList>;

// 기본 스토리
export const Default: Story = {
  args: {
    labelNameList: ['kim@example.com', 'lee@example.com', 'park@example.com'],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 라벨 목록입니다.',
      },
    },
  },
};

// 빈 목록
export const EmptyList: Story = {
  args: {
    labelNameList: [],
  },
  render: (args) => (
    <div>
      <TeamSpaceTeamChoiceLabelList {...args} />
      <p className="text-gray-500 text-sm mt-2">선택된 멤버가 없습니다.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '선택된 멤버가 없는 빈 목록입니다.',
      },
    },
  },
};

// 단일 라벨
export const SingleLabel: Story = {
  args: {
    labelNameList: ['kim@example.com'],
  },
  parameters: {
    docs: {
      description: {
        story: '하나의 라벨만 있는 목록입니다.',
      },
    },
  },
};

// 적은 수의 라벨
export const FewLabels: Story = {
  args: {
    labelNameList: ['김철수', '이영희'],
  },
  parameters: {
    docs: {
      description: {
        story: '2개의 라벨이 있는 목록입니다.',
      },
    },
  },
};

// 많은 라벨
export const ManyLabels: Story = {
  args: {
    labelNameList: [
      'kim@example.com',
      'lee@example.com',
      'park@example.com',
      'jung@example.com',
      'han@example.com',
      'seo@example.com',
      'jang@example.com',
      'oh@example.com',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '많은 라벨이 있는 목록입니다. 2줄로 제한되며 나머지는 숨겨집니다.',
      },
    },
  },
};

// 인터랙티브 - 제거 가능
export const InteractiveWithRemove: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set(['kim@example.com', 'lee@example.com', 'park@example.com'])
    );

    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">선택된 팀원</h3>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            총 {selectedMembers.size}명 선택됨
          </p>
          <p className="text-xs text-gray-500">
            라벨을 클릭하면 제거할 수 있습니다
          </p>
        </div>
        {selectedMembers.size > 0 ? (
          <TeamSpaceTeamChoiceLabelList
            labelNameList={Array.from(selectedMembers)}
            selectedMemberSetState={selectedMembers}
            setSelectedMemberSetState={setSelectedMembers}
          />
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            선택된 멤버가 없습니다.
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '라벨을 클릭하여 제거할 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 긴 이름의 라벨
export const LongNames: Story = {
  args: {
    labelNameList: [
      'very.long.email.address@example.com',
      'another.long.email@company.com',
      'user.with.many.dots@domain.com',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '긴 이메일 주소가 있는 라벨 목록입니다.',
      },
    },
  },
};

// 모달 내에서의 사용
export const WithinModal: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set(['김철수', '이영희', '박민수'])
    );
    const [spaceName, setSpaceName] = useState('');

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">팀 스페이스 생성</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              스페이스 이름
            </label>
            <input
              type="text"
              placeholder="스페이스 이름을 입력하세요"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              선택된 팀원 ({selectedMembers.size}명)
            </label>
            <div className="border border-gray-300 rounded-lg p-3 min-h-[60px]">
              {selectedMembers.size > 0 ? (
                <TeamSpaceTeamChoiceLabelList
                  labelNameList={Array.from(selectedMembers)}
                  selectedMemberSetState={selectedMembers}
                  setSelectedMemberSetState={setSelectedMembers}
                />
              ) : (
                <p className="text-gray-400 text-sm">선택된 팀원이 없습니다</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="팀원 이름 또는 이메일로 검색..."
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300">
              취소
            </button>
            <button className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-600">
              생성하기
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '팀 스페이스 생성 모달 내에서 사용되는 라벨 목록입니다.',
      },
    },
  },
};

// 이름과 이메일 혼합
export const MixedNamesAndEmails: Story = {
  args: {
    labelNameList: [
      '김철수',
      'lee@example.com',
      '박민수',
      'jung@example.com',
      '한지민',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '이름과 이메일이 혼합된 라벨 목록입니다.',
      },
    },
  },
};

// 오버플로우 테스트
export const OverflowTest: Story = {
  args: {
    labelNameList: Array.from({ length: 15 }, (_, i) => `member${i + 1}@example.com`),
  },
  decorators: [
    (Story) => (
      <div className="w-[400px] bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-semibold mb-2">선택된 멤버 (15명)</h3>
        <p className="text-xs text-gray-500 mb-3">
          2줄까지만 표시되며 나머지는 숨겨집니다
        </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '많은 라벨로 오버플로우가 발생하는 경우입니다. line-clamp-2로 2줄까지만 표시됩니다.',
      },
    },
  },
};

// 폼 내에서의 사용
export const WithinForm: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set(['김철수', '이영희'])
    );

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">프로젝트 생성</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              프로젝트 이름 *
            </label>
            <input
              type="text"
              placeholder="프로젝트 이름을 입력하세요"
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">설명</label>
            <textarea
              placeholder="프로젝트 설명을 입력하세요"
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              팀 멤버 ({selectedMembers.size}명)
            </label>
            <div className="border border-gray-300 rounded-lg p-3 min-h-[80px] mb-2">
              {selectedMembers.size > 0 ? (
                <TeamSpaceTeamChoiceLabelList
                  labelNameList={Array.from(selectedMembers)}
                  selectedMemberSetState={selectedMembers}
                  setSelectedMemberSetState={setSelectedMembers}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-sm">
                    멤버를 추가해주세요
                  </p>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="멤버 검색..."
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '프로젝트 생성 폼 내에서 사용되는 라벨 목록입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set(['김철수', '이영희', '박민수', '정우성'])
    );

    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">팀 생성</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">팀 이름</label>
          <input
            type="text"
            placeholder="팀 이름"
            className="w-full border border-gray-300 rounded-lg p-3"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            멤버 ({selectedMembers.size}명)
          </label>
          <div className="border border-gray-300 rounded-lg p-3 min-h-[60px]">
            <TeamSpaceTeamChoiceLabelList
              labelNameList={Array.from(selectedMembers)}
              selectedMemberSetState={selectedMembers}
              setSelectedMemberSetState={setSelectedMembers}
            />
          </div>
        </div>

        <button className="w-full px-4 py-3 bg-primary text-white rounded-lg">
          생성
        </button>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '모바일 환경에서의 라벨 목록입니다.',
      },
    },
  },
};

// 읽기 전용 (제거 불가)
export const ReadOnly: Story = {
  args: {
    labelNameList: ['김철수', '이영희', '박민수'],
    // selectedMemberSetState와 setSelectedMemberSetState를 전달하지 않음
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">프로젝트 멤버</h3>
        <p className="text-sm text-gray-600 mb-3">
          이 프로젝트에 참여 중인 멤버입니다.
        </p>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '읽기 전용 모드로, 라벨을 클릭해도 제거되지 않습니다.',
      },
    },
  },
};
