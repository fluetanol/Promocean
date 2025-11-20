import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TeamSpaceAddModal from '@components/modal/TeamSpaceAddModal';
import { TeamSpaceTeamChoiceItemProps } from '@components/item/TeamSpaceTeamChoiceItem';

const meta: Meta<typeof TeamSpaceAddModal> = {
  title: 'Components/Modal/TeamSpaceAddModal',
  component: TeamSpaceAddModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '팀 스페이스를 생성하기 위한 모달 컴포넌트입니다. 팀 이름 입력과 멤버 추가 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isModalState: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
      table: {
        type: { summary: 'boolean' },
      },
    },
    setIsModalState: {
      action: 'closed',
      description: '모달 상태를 변경하는 함수',
      table: {
        type: { summary: '(state: boolean) => void' },
      },
    },
    teamSpaceTeamChoiceList: {
      description: '팀 스페이스 선택 목록',
      table: {
        type: { summary: 'TeamSpaceTeamChoiceItemProps[]' },
      },
    },
    setTeamSpaceTeamChoiceList: {
      description: '팀 스페이스 목록을 업데이트하는 함수',
      table: {
        type: { summary: '(list: TeamSpaceTeamChoiceItemProps[]) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceAddModal>;

// 인터랙티브 래퍼 컴포넌트
function InteractiveWrapper() {
  const [isModalState, setIsModalState] = useState(true);
  const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([
    {
      image: '/images/default_space_image.png',
      title: '개발팀',
      description: '개발 관련 프로젝트를 관리합니다.',
    },
    {
      image: '/images/default_space_image.png',
      title: '디자인팀',
      description: '디자인 작업을 공유합니다.',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">현재 팀 스페이스 목록</h2>
          <div className="space-y-3">
            {teamSpaceList.map((team, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <h3 className="font-bold text-lg">{team.title}</h3>
                <p className="text-gray-600 text-sm">{team.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsModalState(true)}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          팀 스페이스 생성
        </button>
      </div>

      {isModalState && (
        <TeamSpaceAddModal
          isModalState={isModalState}
          setIsModalState={setIsModalState}
          teamSpaceTeamChoiceList={teamSpaceList}
          setTeamSpaceTeamChoiceList={setTeamSpaceList}
        />
      )}
    </div>
  );
}

// 기본 스토리
export const Default: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(true);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([]);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <TeamSpaceAddModal
          isModalState={isModalState}
          setIsModalState={setIsModalState}
          teamSpaceTeamChoiceList={teamSpaceList}
          setTeamSpaceTeamChoiceList={setTeamSpaceList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 팀 스페이스 생성 모달입니다.',
      },
    },
  },
};

// 인터랙티브 스토리
export const Interactive: Story = {
  render: () => <InteractiveWrapper />,
  parameters: {
    docs: {
      description: {
        story: '팀 스페이스를 생성하고 목록에 추가할 수 있는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 멤버 검색 테스트
export const MemberSearchTest: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(true);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([]);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center mb-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold mb-3">멤버 검색 테스트</h2>
            <p className="text-sm text-gray-600">
              모달 내에서 팀원의 이름 또는 이메일을 검색해보세요.
            </p>
            <p className="text-sm text-gray-600">
              예시: "홍길동", "hong@example.com"
            </p>
          </div>
        </div>
        <TeamSpaceAddModal
          isModalState={isModalState}
          setIsModalState={setIsModalState}
          teamSpaceTeamChoiceList={teamSpaceList}
          setTeamSpaceTeamChoiceList={setTeamSpaceList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '멤버 검색 기능을 테스트할 수 있습니다. 검색 필드에 이름이나 이메일을 입력하면 필터링된 결과가 표시됩니다.',
      },
    },
  },
};

// 유효성 검사 테스트
export const ValidationTest: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(true);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([]);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 max-w-md">
            <h2 className="text-xl font-bold mb-3">유효성 검사 테스트</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 팀 스페이스 이름을 비워두고 생성하기 버튼을 클릭하면 에러 메시지가 표시됩니다.</li>
              <li>• 이름을 입력하면 에러 메시지가 사라집니다.</li>
            </ul>
          </div>
          <TeamSpaceAddModal
            isModalState={isModalState}
            setIsModalState={setIsModalState}
            teamSpaceTeamChoiceList={teamSpaceList}
            setTeamSpaceTeamChoiceList={setTeamSpaceList}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '팀 스페이스 이름 입력 필드의 유효성 검사를 테스트할 수 있습니다.',
      },
    },
  },
};

// 닫힘 상태
export const Closed: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(false);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([]);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">모달이 닫혀있습니다.</p>
          <button
            onClick={() => setIsModalState(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            모달 열기
          </button>
        </div>
        <TeamSpaceAddModal
          isModalState={isModalState}
          setIsModalState={setIsModalState}
          teamSpaceTeamChoiceList={teamSpaceList}
          setTeamSpaceTeamChoiceList={setTeamSpaceList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '닫힌 상태의 모달입니다. 버튼을 클릭하여 열 수 있습니다.',
      },
    },
  },
};

// 애니메이션 테스트
export const AnimationTest: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(false);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([]);

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-3">애니메이션 테스트</h2>
            <p className="text-sm text-gray-600 mb-4">
              모달의 열림/닫힘 애니메이션을 확인할 수 있습니다.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsModalState(true)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                열기
              </button>
              <button
                onClick={() => setIsModalState(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
        <TeamSpaceAddModal
          isModalState={isModalState}
          setIsModalState={setIsModalState}
          teamSpaceTeamChoiceList={teamSpaceList}
          setTeamSpaceTeamChoiceList={setTeamSpaceList}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모달의 열림/닫힘 애니메이션을 테스트할 수 있습니다.',
      },
    },
  },
};

// 기존 팀 스페이스가 있는 경우
export const WithExistingTeams: Story = {
  render: () => {
    const [isModalState, setIsModalState] = useState(true);
    const [teamSpaceList, setTeamSpaceList] = useState<TeamSpaceTeamChoiceItemProps[]>([
      {
        image: '/images/default_space_image.png',
        title: 'Frontend Team',
        description: 'React, Vue, Angular 개발',
      },
      {
        image: '/images/default_space_image.png',
        title: 'Backend Team',
        description: 'Node.js, Spring 개발',
      },
      {
        image: '/images/default_space_image.png',
        title: 'DevOps Team',
        description: 'CI/CD, 인프라 관리',
      },
    ]);

    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">
              현재 팀 스페이스: {teamSpaceList.length}개
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamSpaceList.map((team, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={team.image}
                      alt={team.title}
                      className="w-12 h-12 rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect fill="%23ddd" width="48" height="48"/%3E%3C/svg%3E';
                      }}
                    />
                    <h3 className="font-bold">{team.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{team.description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsModalState(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            새 팀 스페이스 추가
          </button>
        </div>

        {isModalState && (
          <TeamSpaceAddModal
            isModalState={isModalState}
            setIsModalState={setIsModalState}
            teamSpaceTeamChoiceList={teamSpaceList}
            setTeamSpaceTeamChoiceList={setTeamSpaceList}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '이미 여러 팀 스페이스가 존재하는 상황에서 새로운 팀을 추가하는 시나리오입니다.',
      },
    },
  },
};
