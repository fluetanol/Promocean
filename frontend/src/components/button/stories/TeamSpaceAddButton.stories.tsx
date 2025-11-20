import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TeamSpaceAddButton from '@components/button/TeamSpaceAddButton';

const meta: Meta<typeof TeamSpaceAddButton> = {
  title: 'Components/Button/TeamSpaceAddButton',
  component: TeamSpaceAddButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '팀 스페이스 추가 버튼 컴포넌트입니다. 클릭 시 모달을 열거나 닫는 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isModalRef: {
      description: '모달의 열림/닫힘 상태',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    setIsModalRef: {
      description: '모달 상태를 변경하는 함수',
      table: {
        type: { summary: '(value: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSpaceAddButton>;

// 기본 스토리
export const Default: Story = {
  args: {
    isModalRef: false,
    setIsModalRef: (value) => console.log('Modal state:', value),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 팀 생성 버튼입니다.',
      },
    },
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            💡 인터랙티브 예시
          </p>
          <p className="text-sm text-blue-800">
            버튼을 클릭하면 모달 상태가 변경됩니다: {isModalOpen ? '열림' : '닫힘'}
          </p>
        </div>
        <TeamSpaceAddButton
          isModalRef={isModalOpen}
          setIsModalRef={setIsModalOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 클릭 시 상태가 변경되는 인터랙티브 예시입니다.',
      },
    },
  },
};

// 버튼 상태 비교
export const ButtonStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">기본 상태</h3>
        <TeamSpaceAddButton isModalRef={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">호버 상태 (마우스 올려보기)</h3>
        <TeamSpaceAddButton isModalRef={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">모달 열림 상태</h3>
        <TeamSpaceAddButton isModalRef={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태를 비교합니다.',
      },
    },
  },
};

// 팀 스페이스 페이지 컨텍스트
export const WithinTeamSpacePage: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 영역 */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">팀 스페이스</h1>
              <p className="text-gray-600">팀과 함께 프로젝트를 관리하세요</p>
            </div>
            <TeamSpaceAddButton
              isModalRef={isModalOpen}
              setIsModalRef={setIsModalOpen}
            />
          </div>

          {/* 팀 스페이스 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">팀 {i}</h3>
                <p className="text-gray-600 text-sm">팀 설명...</p>
              </div>
            ))}
          </div>

          {/* 모달 시뮬레이션 */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">팀 스페이스 생성</h2>
                <p className="text-gray-600 mb-6">
                  새로운 팀 스페이스를 생성합니다.
                </p>
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-4 py-2 bg-gray-200 rounded-lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    취소
                  </button>
                  <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg">
                    생성
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '팀 스페이스 페이지 내에서 사용되는 버튼입니다.',
      },
    },
  },
};

// 다양한 배경에서
export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">흰색 배경</h3>
        <div className="bg-white p-6 rounded-lg border">
          <TeamSpaceAddButton isModalRef={false} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">회색 배경</h3>
        <div className="bg-gray-100 p-6 rounded-lg">
          <TeamSpaceAddButton isModalRef={false} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="[&_button]:text-white [&_button:hover]:text-primary">
            <TeamSpaceAddButton isModalRef={false} />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경색에서의 버튼 모습입니다.',
      },
    },
  },
};

// 헤더 영역에서
export const InHeaderSection: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">팀 스페이스</h1>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                3개
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="검색..."
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <TeamSpaceAddButton
                isModalRef={isModalOpen}
                setIsModalRef={setIsModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '헤더 영역에서 검색 바와 함께 사용되는 버튼입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="max-w-sm mx-auto bg-gray-50 min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">팀 스페이스</h1>
          <TeamSpaceAddButton
            isModalRef={isModalOpen}
            setIsModalRef={setIsModalOpen}
          />
        </div>

        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full"></div>
                <div>
                  <h3 className="font-semibold">팀 {i}</h3>
                  <p className="text-sm text-gray-600">팀원 5명</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '모바일 환경에서의 버튼입니다.',
      },
    },
  },
};

// 비활성화 상태 시뮬레이션
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">활성 상태</h3>
        <TeamSpaceAddButton isModalRef={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">비활성 상태 (시뮬레이션)</h3>
        <div className="opacity-50 cursor-not-allowed">
          <TeamSpaceAddButton isModalRef={false} />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          권한이 없거나 제한이 있을 때의 상태
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '활성/비활성 상태를 비교합니다.',
      },
    },
  },
};

// 로딩 상태 시뮬레이션
export const LoadingState: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">일반 상태</h3>
        <TeamSpaceAddButton isModalRef={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">로딩 상태 (시뮬레이션)</h3>
        <button className="flex flex-row gap-1 font-medium text-2xl text-gray-400 cursor-wait">
          <svg
            className="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          생성 중...
        </button>
        <p className="text-xs text-gray-500 mt-2">
          팀 생성 중일 때의 상태
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '로딩 상태를 시뮬레이션합니다.',
      },
    },
  },
};

// 아이콘 크기 변형
export const IconSizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">기본 크기</h3>
        <TeamSpaceAddButton isModalRef={false} />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">작은 크기</h3>
        <button className="flex flex-row gap-1 font-medium text-base hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          팀 생성
        </button>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">큰 크기</h3>
        <button className="flex flex-row gap-1 font-medium text-3xl hover:text-primary transition-colors">
          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          팀 생성
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기로 버튼을 표시합니다.',
      },
    },
  },
};
