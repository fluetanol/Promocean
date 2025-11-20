import type { Meta, StoryObj } from '@storybook/react';
import SpaceAddMemberItem from '@components/item/SpaceAddMemberItem';

const meta: Meta<typeof SpaceAddMemberItem> = {
  title: 'Components/Item/SpaceAddMemberItem',
  component: SpaceAddMemberItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스에 멤버를 추가할 때 사용하는 아이템 컴포넌트입니다. 멤버의 이름과 이메일을 표시하며, 클릭 시 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '멤버 이름',
      table: {
        type: { summary: 'string' },
      },
    },
    email: {
      control: 'text',
      description: '멤버 이메일',
      table: {
        type: { summary: 'string' },
      },
    },
    handleMemberClick: {
      description: '멤버 클릭 시 호출되는 콜백 함수',
      table: {
        type: { summary: '(memberName: string) => void' },
      },
    },
  },
  args: {
    handleMemberClick: (name: string) => console.log(`Clicked: ${name}`),
  },
};

export default meta;
type Story = StoryObj<typeof SpaceAddMemberItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    name: '김개발',
    email: 'kim.dev@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 멤버 추가 아이템입니다.',
      },
    },
  },
};

// 긴 이름
export const LongName: Story = {
  args: {
    name: '아주긴이름을가진개발자',
    email: 'long.name.developer@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이름을 가진 멤버입니다.',
      },
    },
  },
};

// 짧은 이름
export const ShortName: Story = {
  args: {
    name: '김',
    email: 'kim@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 이름을 가진 멤버입니다.',
      },
    },
  },
};

// 긴 이메일
export const LongEmail: Story = {
  args: {
    name: '박개발',
    email: 'very.long.email.address.for.testing@example.company.com',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이메일 주소를 가진 멤버입니다.',
      },
    },
  },
};

// 영어 이름
export const EnglishName: Story = {
  args: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: '영어 이름을 가진 멤버입니다.',
      },
    },
  },
};

// 멤버 리스트
export const MemberList: Story = {
  render: () => (
    <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">멤버 추가</h3>
      </div>
      <div className="bg-white">
        <SpaceAddMemberItem
          name="김개발"
          email="kim.dev@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="박프론트"
          email="park.front@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="이백엔드"
          email="lee.backend@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="최디자이너"
          email="choi.designer@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="정풀스택"
          email="jung.fullstack@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 멤버를 리스트로 표시하는 예시입니다.',
      },
    },
  },
};

// 호버 상태 테스트
export const HoverTest: Story = {
  args: {
    name: '마우스올려보세요',
    email: 'hover@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: '마우스를 올리면 배경색이 변경됩니다.',
      },
    },
  },
};

// 클릭 이벤트 테스트
export const ClickTest: Story = {
  args: {
    name: '클릭해보세요',
    email: 'click@example.com',
    handleMemberClick: (name) => alert(`${name}님을 선택했습니다!`),
  },
  parameters: {
    docs: {
      description: {
        story: '클릭하면 알림이 표시됩니다.',
      },
    },
  },
};

// 다양한 도메인 이메일
export const VariousDomains: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <SpaceAddMemberItem
        name="Gmail 사용자"
        email="user@gmail.com"
        handleMemberClick={(name) => console.log(`Selected: ${name}`)}
      />
      <SpaceAddMemberItem
        name="네이버 사용자"
        email="user@naver.com"
        handleMemberClick={(name) => console.log(`Selected: ${name}`)}
      />
      <SpaceAddMemberItem
        name="회사 메일 사용자"
        email="user@company.co.kr"
        handleMemberClick={(name) => console.log(`Selected: ${name}`)}
      />
      <SpaceAddMemberItem
        name="카카오 사용자"
        email="user@kakao.com"
        handleMemberClick={(name) => console.log(`Selected: ${name}`)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 도메인의 이메일 주소를 가진 멤버들입니다.',
      },
    },
  },
};

// 검색 결과 예시
export const SearchResult: Story = {
  render: () => (
    <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="멤버 검색..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue="김"
        />
      </div>
      <div className="bg-white">
        <SpaceAddMemberItem
          name="김개발"
          email="kim.dev@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="김프론트"
          email="kim.front@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="김백엔드"
          email="kim.backend@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
      </div>
      <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 border-t border-gray-200">
        3명의 검색 결과
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '검색 결과로 표시되는 멤버 리스트 예시입니다.',
      },
    },
  },
};

// 팀 멤버 선택 모달
export const TeamMemberModal: Story = {
  render: () => (
    <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-white px-6 py-4">
        <h2 className="text-xl font-bold">팀 멤버 추가</h2>
        <p className="text-sm text-white/80 mt-1">추가할 멤버를 선택하세요</p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="max-h-80 overflow-y-auto">
        <SpaceAddMemberItem
          name="김개발"
          email="kim.dev@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="박프론트"
          email="park.front@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="이백엔드"
          email="lee.backend@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="최디자이너"
          email="choi.designer@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="정풀스택"
          email="jung.fullstack@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
        <SpaceAddMemberItem
          name="한데브옵스"
          email="han.devops@example.com"
          handleMemberClick={(name) => console.log(`Selected: ${name}`)}
        />
      </div>

      <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
        <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          취소
        </button>
        <button className="px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90">
          추가하기
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '팀 멤버 추가 모달의 전체 예시입니다.',
      },
    },
  },
};

// 빈 상태
export const Empty: Story = {
  render: () => (
    <div className="max-w-md border border-gray-200 rounded-lg p-8 text-center">
      <div className="text-gray-400 text-5xl mb-4">👥</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">멤버가 없습니다</h3>
      <p className="text-sm text-gray-500">검색 결과가 없습니다.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '멤버가 없을 때의 빈 상태입니다.',
      },
    },
  },
};

// 단일 멤버
export const SingleMember: Story = {
  render: () => (
    <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden">
      <SpaceAddMemberItem
        name="김개발"
        email="kim.dev@example.com"
        handleMemberClick={(name) => console.log(`Selected: ${name}`)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '단일 멤버만 표시되는 경우입니다.',
      },
    },
  },
};
