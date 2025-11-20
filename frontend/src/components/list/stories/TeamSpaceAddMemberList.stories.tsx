import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TeamSpaceAddMemberList from '@components/list/TeamSpaceAddMemberList';
import { SpaceAddMemberItemProps } from '@components/item/SpaceAddMemberItem';

const meta: Meta<typeof TeamSpaceAddMemberList> = {
  title: 'Components/List/TeamSpaceAddMemberList',
  component: TeamSpaceAddMemberList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '팀 스페이스에 추가할 멤버를 검색하고 선택하는 리스트 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    searchSpaceMemberListState: {
      description: '검색된 멤버 목록',
      table: {
        type: { summary: 'SpaceAddMemberItemProps[]' },
      },
    },
    selectedMemberSetState: {
      description: '선택된 멤버의 이름 Set',
      table: {
        type: { summary: 'Set<string>' },
      },
    },
    setSelectedMemberSetState: {
      description: '선택된 멤버 Set을 업데이트하는 함수',
      table: {
        type: { summary: '(members: Set<string>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceAddMemberList>;

const mockMembers: SpaceAddMemberItemProps[] = [
  { name: '김철수', email: 'kim@example.com' },
  { name: '이영희', email: 'lee@example.com' },
  { name: '박민수', email: 'park@example.com' },
  { name: '정우성', email: 'jung@example.com' },
  { name: '한지민', email: 'han@example.com' },
];

// 기본 스토리
export const Default: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );

    return (
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="팀원 검색..."
          className="w-full border border-gray-300 rounded-[10px] p-3 mb-2"
          readOnly
        />
        <TeamSpaceAddMemberList
          searchSpaceMemberListState={mockMembers}
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 멤버 검색 목록입니다.',
      },
    },
  },
};

// 빈 목록
export const EmptyList: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );

    return (
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="팀원 검색..."
          className="w-full border border-gray-300 rounded-[10px] p-3 mb-2"
          readOnly
        />
        <div className="relative">
          <TeamSpaceAddMemberList
            searchSpaceMemberListState={[]}
            selectedMemberSetState={selectedMembers}
            setSelectedMemberSetState={setSelectedMembers}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <p className="text-gray-500 text-sm">검색 결과가 없습니다.</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '검색 결과가 없는 빈 목록입니다.',
      },
    },
  },
};

// 일부 선택된 상태
export const WithSelectedMembers: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set(['김철수', '이영희'])
    );

    return (
      <div className="relative w-[400px]">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            선택된 멤버: {selectedMembers.size}명
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedMembers).map((name) => (
              <span
                key={name}
                className="px-3 py-1 bg-primary text-white text-sm rounded-full"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="팀원 검색..."
          className="w-full border border-gray-300 rounded-[10px] p-3 mb-2"
          readOnly
        />
        <TeamSpaceAddMemberList
          searchSpaceMemberListState={mockMembers}
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '일부 멤버가 이미 선택된 상태입니다.',
      },
    },
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );

    const allMembers: SpaceAddMemberItemProps[] = [
      { name: '김철수', email: 'kim@example.com' },
      { name: '이영희', email: 'lee@example.com' },
      { name: '박민수', email: 'park@example.com' },
      { name: '정우성', email: 'jung@example.com' },
      { name: '한지민', email: 'han@example.com' },
      { name: '서강준', email: 'seo@example.com' },
      { name: '장미란', email: 'jang@example.com' },
      { name: '오세훈', email: 'oh@example.com' },
    ];

    const filteredMembers = searchQuery
      ? allMembers.filter(
          (member) =>
            member.name.includes(searchQuery) ||
            member.email.includes(searchQuery)
        )
      : allMembers;

    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">팀원 추가</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">선택된 멤버</label>
          {selectedMembers.size === 0 ? (
            <p className="text-sm text-gray-500">아직 선택된 멤버가 없습니다.</p>
          ) : (
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
              {Array.from(selectedMembers).map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            className="w-full border border-gray-300 rounded-[10px] p-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <TeamSpaceAddMemberList
              searchSpaceMemberListState={filteredMembers}
              selectedMemberSetState={selectedMembers}
              setSelectedMemberSetState={setSelectedMembers}
            />
          )}
        </div>

        {searchQuery && filteredMembers.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">검색 결과가 없습니다.</p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '검색과 선택이 가능한 인터랙티브 예시입니다.',
      },
    },
  },
};

// 많은 멤버
export const ManyMembers: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );

    const manyMembers: SpaceAddMemberItemProps[] = Array.from(
      { length: 20 },
      (_, i) => ({
        name: `멤버${i + 1}`,
        email: `member${i + 1}@example.com`,
      })
    );

    return (
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="팀원 검색..."
          className="w-full border border-gray-300 rounded-[10px] p-3 mb-2"
          readOnly
        />
        <TeamSpaceAddMemberList
          searchSpaceMemberListState={manyMembers}
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '많은 멤버가 있는 목록입니다. 스크롤이 가능합니다.',
      },
    },
  },
};

// 모달 내에서의 사용
export const WithinModal: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = searchQuery
      ? mockMembers.filter(
          (member) =>
            member.name.includes(searchQuery) ||
            member.email.includes(searchQuery)
        )
      : mockMembers;

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
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">팀원 추가</label>
            {selectedMembers.size > 0 && (
              <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-lg">
                {Array.from(selectedMembers).map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="팀원 이름 또는 이메일로 검색..."
                className="w-full border border-gray-300 rounded-[10px] p-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <TeamSpaceAddMemberList
                  searchSpaceMemberListState={filteredMembers}
                  selectedMemberSetState={selectedMembers}
                  setSelectedMemberSetState={setSelectedMembers}
                />
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
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
        story: '모달 내에서 사용되는 멤버 검색 목록입니다.',
      },
    },
  },
};

// 단일 멤버
export const SingleMember: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );

    return (
      <div className="relative w-[400px]">
        <input
          type="text"
          placeholder="팀원 검색..."
          className="w-full border border-gray-300 rounded-[10px] p-3 mb-2"
          readOnly
        />
        <TeamSpaceAddMemberList
          searchSpaceMemberListState={[mockMembers[0]]}
          selectedMemberSetState={selectedMembers}
          setSelectedMemberSetState={setSelectedMembers}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '한 명의 멤버만 검색된 목록입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
      new Set()
    );
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = searchQuery
      ? mockMembers.filter(
          (member) =>
            member.name.includes(searchQuery) ||
            member.email.includes(searchQuery)
        )
      : mockMembers;

    return (
      <div className="max-w-sm mx-auto bg-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">팀원 추가</h2>

        {selectedMembers.size > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">
              선택됨: {selectedMembers.size}명
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedMembers).map((name) => (
                <span
                  key={name}
                  className="px-2 py-1 bg-primary text-white text-xs rounded-full"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            placeholder="검색..."
            className="w-full border border-gray-300 rounded-lg p-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <TeamSpaceAddMemberList
              searchSpaceMemberListState={filteredMembers}
              selectedMemberSetState={selectedMembers}
              setSelectedMemberSetState={setSelectedMembers}
            />
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '모바일 환경에서의 멤버 검색 목록입니다.',
      },
    },
  },
};
