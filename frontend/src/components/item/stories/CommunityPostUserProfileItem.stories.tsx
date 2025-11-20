import type { Meta, StoryObj } from '@storybook/react';
import CommunityPostUserProfileItem from '@components/item/CommunityPostUserProfileItem';

const meta: Meta<typeof CommunityPostUserProfileItem> = {
  title: 'Components/Item/CommunityPostUserProfileItem',
  component: CommunityPostUserProfileItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 게시글의 작성자 프로필 아이템 컴포넌트입니다. 프로필 이미지, 작성자 이름, 작성 날짜를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    profileUrl: {
      control: 'text',
      description: '프로필 이미지 URL (선택사항)',
      table: {
        type: { summary: 'string | undefined' },
      },
    },
    author: {
      control: 'text',
      description: '작성자 이름',
      table: {
        type: { summary: 'string' },
      },
    },
    createdAt: {
      control: 'text',
      description: '작성 날짜 및 시간 (ISO 8601 형식)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityPostUserProfileItem>;

// 기본 스토리
export const Default: Story = {
  args: {
    profileUrl: undefined,
    author: '김개발',
    createdAt: new Date().toISOString(),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 사용자 프로필 아이템입니다. 프로필 이미지가 없는 경우 기본 아이콘이 표시됩니다.',
      },
    },
  },
};

// 프로필 이미지가 있는 경우
export const WithProfileImage: Story = {
  args: {
    profileUrl: 'https://via.placeholder.com/40',
    author: '박프론트',
    createdAt: '2025-01-15T14:30:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '프로필 이미지가 있는 사용자 프로필 아이템입니다.',
      },
    },
  },
};

// 긴 이름
export const LongName: Story = {
  args: {
    profileUrl: undefined,
    author: '아주긴이름을가진개발자',
    createdAt: '2025-01-14T09:15:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 이름을 가진 사용자 프로필 아이템입니다.',
      },
    },
  },
};

// 짧은 이름
export const ShortName: Story = {
  args: {
    profileUrl: 'https://via.placeholder.com/40',
    author: '김',
    createdAt: '2025-01-16T16:45:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 이름을 가진 사용자 프로필 아이템입니다.',
      },
    },
  },
};

// 최근 작성
export const RecentPost: Story = {
  args: {
    profileUrl: 'https://via.placeholder.com/40',
    author: '신입개발자',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5분 전
  },
  parameters: {
    docs: {
      description: {
        story: '최근에 작성된 게시글의 프로필입니다.',
      },
    },
  },
};

// 오래된 게시글
export const OldPost: Story = {
  args: {
    profileUrl: undefined,
    author: '시니어개발자',
    createdAt: '2024-03-15T10:00:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '오래 전에 작성된 게시글의 프로필입니다.',
      },
    },
  },
};

// 다양한 프로필 리스트
export const ProfileList: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <CommunityPostUserProfileItem
        profileUrl="https://via.placeholder.com/40"
        author="김개발"
        createdAt="2025-01-15T10:30:00Z"
      />
      <CommunityPostUserProfileItem
        profileUrl={undefined}
        author="박프론트"
        createdAt="2025-01-15T11:20:00Z"
      />
      <CommunityPostUserProfileItem
        profileUrl="https://via.placeholder.com/40"
        author="이백엔드"
        createdAt="2025-01-15T12:15:00Z"
      />
      <CommunityPostUserProfileItem
        profileUrl={undefined}
        author="최디자이너"
        createdAt="2025-01-15T13:00:00Z"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 사용자 프로필들을 리스트로 표시합니다.',
      },
    },
  },
};

// 게시글 헤더 예시
export const PostHeader: Story = {
  render: () => (
    <div className="max-w-3xl p-6 bg-white border border-gray-200 rounded-lg">
      <CommunityPostUserProfileItem
        profileUrl="https://via.placeholder.com/40"
        author="김개발"
        createdAt="2025-01-15T14:30:00Z"
      />
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
        React Hooks 완벽 가이드
      </h1>
      <p className="text-gray-600">
        React Hooks를 사용하면 함수형 컴포넌트에서도 상태 관리와 생명주기 기능을 사용할 수 있습니다.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '게시글 헤더에서 사용되는 예시입니다.',
      },
    },
  },
};

// 게시글 카드 예시
export const PostCard: Story = {
  render: () => (
    <div className="max-w-3xl bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <CommunityPostUserProfileItem
          profileUrl="https://via.placeholder.com/40"
          author="박프론트"
          createdAt="2025-01-15T10:30:00Z"
        />
        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
          Frontend
        </span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">
        TypeScript 타입 추론 완벽 정리
      </h2>

      <p className="text-gray-600 mb-4">
        TypeScript의 타입 추론 시스템에 대해 알아봅시다. 제네릭, 유틸리티 타입, 조건부 타입 등...
      </p>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>👁️ 1,234</span>
        <span>💬 42</span>
        <span>👍 89</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '전체 게시글 카드에서 프로필이 사용되는 예시입니다.',
      },
    },
  },
};

// 다양한 시간 포맷
export const DifferentTimes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-xs text-gray-500 mb-2">방금 전</p>
        <CommunityPostUserProfileItem
          profileUrl="https://via.placeholder.com/40"
          author="방금작성"
          createdAt={new Date(Date.now() - 1000 * 30).toISOString()}
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">5분 전</p>
        <CommunityPostUserProfileItem
          profileUrl={undefined}
          author="5분전작성"
          createdAt={new Date(Date.now() - 1000 * 60 * 5).toISOString()}
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">1시간 전</p>
        <CommunityPostUserProfileItem
          profileUrl="https://via.placeholder.com/40"
          author="1시간전작성"
          createdAt={new Date(Date.now() - 1000 * 60 * 60).toISOString()}
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">어제</p>
        <CommunityPostUserProfileItem
          profileUrl={undefined}
          author="어제작성"
          createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()}
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">1주일 전</p>
        <CommunityPostUserProfileItem
          profileUrl="https://via.placeholder.com/40"
          author="1주일전작성"
          createdAt={new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 시간대의 게시글 프로필을 표시합니다.',
      },
    },
  },
};

// 영어 이름
export const EnglishName: Story = {
  args: {
    profileUrl: 'https://via.placeholder.com/40',
    author: 'John Doe',
    createdAt: '2025-01-15T14:30:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '영어 이름을 가진 사용자 프로필입니다.',
      },
    },
  },
};

// 숫자가 포함된 이름
export const NameWithNumber: Story = {
  args: {
    profileUrl: undefined,
    author: 'Developer123',
    createdAt: '2025-01-15T14:30:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '숫자가 포함된 사용자명입니다.',
      },
    },
  },
};

// 특수문자가 포함된 이름
export const NameWithSpecialChars: Story = {
  args: {
    profileUrl: 'https://via.placeholder.com/40',
    author: 'Dev_Master_2024',
    createdAt: '2025-01-15T14:30:00Z',
  },
  parameters: {
    docs: {
      description: {
        story: '특수문자가 포함된 사용자명입니다.',
      },
    },
  },
};
