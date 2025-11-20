import type { Meta, StoryObj } from '@storybook/react';
import TeamSpaceTeamChoiceLabelItem from '@components/item/TeamSpaceTeamChoiceLabelItem';
import { useState } from 'react';

const meta: Meta<typeof TeamSpaceTeamChoiceLabelItem> = {
  title: 'Components/Item/TeamSpaceTeamChoiceLabelItem',
  component: TeamSpaceTeamChoiceLabelItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '팀 스페이스에서 선택된 멤버를 표시하는 라벨 아이템 컴포넌트입니다. 삭제 버튼을 통해 선택을 해제할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelName: {
      control: 'text',
      description: '표시할 라벨 이름 (멤버명)',
      table: {
        type: { summary: 'string' },
      },
    },
    selectedMemberSetState: {
      description: '선택된 멤버 Set',
      table: {
        type: { summary: 'Set<string> | undefined' },
      },
    },
    setSelectedMemberSetState: {
      description: '선택된 멤버 Set을 업데이트하는 함수',
      table: {
        type: { summary: '(members: Set<string>) => void | undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceTeamChoiceLabelItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    labelName: '김개발',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 팀 선택 라벨 아이템입니다.',
      },
    },
  },
};

// 긴 이름
export const LongName: Story = {
  args: {
    labelName: '아주긴이름을가진개발자',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이름을 가진 라벨입니다.',
      },
    },
  },
};

// 짧은 이름
export const ShortName: Story = {
  args: {
    labelName: '김',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 이름을 가진 라벨입니다.',
      },
    },
  },
};

// 영어 이름
export const EnglishName: Story = {
  args: {
    labelName: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: '영어 이름을 가진 라벨입니다.',
      },
    },
  },
};

// 삭제 기능이 있는 예시
export const WithDeleteFunction: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(new Set(['김개발']));

    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          선택된 멤버: {selectedMembers.size}명
        </p>
        <TeamSpaceTeamChoiceLabelItem
          labelName="김개발"
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
        <p className="text-xs text-gray-500">
          X 버튼을 클릭하면 멤버가 제거됩니다.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '삭제 기능이 작동하는 라벨입니다. X 버튼을 클릭하면 Set에서 제거됩니다.',
      },
    },
  },
};

// 여러 라벨 리스트
export const MultipleLabels: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(
      new Set(['김개발', '박프론트', '이백엔드', '최디자이너'])
    );

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">선택된 팀 멤버</h3>
          <span className="text-sm text-gray-500">{selectedMembers.size}명</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from(selectedMembers).map((member) => (
            <TeamSpaceTeamChoiceLabelItem
              key={member}
              labelName={member}
              selectedMemberSetState={selectedMembers}
              setSelectedMemberSetState={setSelectedMembers}
            />
          ))}
        </div>
        {selectedMembers.size === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            선택된 멤버가 없습니다.
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '여러 라벨을 표시하고 각각 삭제할 수 있는 예시입니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    labelName: '마우스올려보세요',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색이 변경됩니다.',
      },
    },
  },
};

// 팀 멤버 선택 UI
export const TeamMemberSelection: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(
      new Set(['김개발', '박프론트'])
    );

    const availableMembers = [
      '김개발',
      '박프론트',
      '이백엔드',
      '최디자이너',
      '정풀스택',
    ];

    const addMember = (member: string) => {
      const newSet = new Set(selectedMembers);
      newSet.add(member);
      setSelectedMembers(newSet);
    };

    return (
      <div className="max-w-md space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">팀 멤버 추가</h3>
          <div className="flex flex-wrap gap-2">
            {availableMembers
              .filter((member) => !selectedMembers.has(member))
              .map((member) => (
                <button
                  key={member}
                  onClick={() => addMember(member)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  + {member}
                </button>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            선택된 멤버 ({selectedMembers.size}명)
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedMembers).map((member) => (
              <TeamSpaceTeamChoiceLabelItem
                key={member}
                labelName={member}
                selectedMemberSetState={selectedMembers}
                setSelectedMemberSetState={setSelectedMembers}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '팀 멤버를 추가하고 제거할 수 있는 전체 UI 예시입니다.',
      },
    },
  },
};

// 많은 멤버
export const ManyMembers: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(
      new Set([
        '김개발',
        '박프론트',
        '이백엔드',
        '최디자이너',
        '정풀스택',
        '한데브옵스',
        '송기획',
        '윤마케터',
        '장테스터',
        '임PM',
      ])
    );

    return (
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">대규모 팀</h3>
          <span className="text-sm text-gray-500">{selectedMembers.size}명</span>
        </div>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
          {Array.from(selectedMembers).map((member) => (
            <TeamSpaceTeamChoiceLabelItem
              key={member}
              labelName={member}
              selectedMemberSetState={selectedMembers}
              setSelectedMemberSetState={setSelectedMembers}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '많은 멤버가 선택된 경우의 예시입니다.',
      },
    },
  },
};

// 모달에서 사용
export const InModal: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(
      new Set(['김개발', '박프론트', '이백엔드'])
    );

    return (
      <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary text-white px-6 py-4">
          <h2 className="text-xl font-bold">팀 생성</h2>
          <p className="text-sm text-white/80 mt-1">팀 멤버를 선택하세요</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              팀 이름
            </label>
            <input
              type="text"
              placeholder="팀 이름을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              선택된 멤버 ({selectedMembers.size}명)
            </label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-gray-200 rounded-md bg-gray-50">
              {selectedMembers.size === 0 ? (
                <span className="text-sm text-gray-400">
                  선택된 멤버가 없습니다
                </span>
              ) : (
                Array.from(selectedMembers).map((member) => (
                  <TeamSpaceTeamChoiceLabelItem
                    key={member}
                    labelName={member}
                    selectedMemberSetState={selectedMembers}
                    setSelectedMemberSetState={setSelectedMembers}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            취소
          </button>
          <button className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90">
            생성하기
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '팀 생성 모달에서 사용되는 예시입니다.',
      },
    },
  },
};

// 단일 멤버
export const SingleMember: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(new Set(['김개발']));

    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600">선택된 멤버: {selectedMembers.size}명</p>
        <TeamSpaceTeamChoiceLabelItem
          labelName="김개발"
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '단일 멤버만 선택된 경우입니다.',
      },
    },
  },
};

// 컴팩트 레이아웃
export const CompactLayout: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(
      new Set(['김개발', '박프론트', '이백엔드'])
    );

    return (
      <div className="max-w-sm">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">팀 멤버</h4>
          <div className="flex flex-wrap gap-1.5">
            {Array.from(selectedMembers).map((member) => (
              <TeamSpaceTeamChoiceLabelItem
                key={member}
                labelName={member}
                selectedMemberSetState={selectedMembers}
                setSelectedMemberSetState={setSelectedMembers}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '컴팩트한 레이아웃에서 사용되는 예시입니다.',
      },
    },
  },
};

// 상태 없이 사용 (읽기 전용)
export const ReadOnly: Story = {
  args: {
    labelName: '김개발',
    selectedMemberSetState: undefined,
    setSelectedMemberSetState: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: '삭제 기능 없이 읽기 전용으로 표시되는 라벨입니다.',
      },
    },
  },
};
