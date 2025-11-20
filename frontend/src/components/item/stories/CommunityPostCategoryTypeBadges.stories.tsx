import type { Meta, StoryObj } from '@storybook/react';
import CommunityPostCategoryTypeBadges from '@components/item/CommunityPostCategoryTypeBadges';

const meta: Meta<typeof CommunityPostCategoryTypeBadges> = {
  title: 'Components/Item/CommunityPostCategoryTypeBadges',
  component: CommunityPostCategoryTypeBadges,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '커뮤니티 게시글의 카테고리와 타입을 표시하는 배지 컴포넌트입니다. 태그 아이콘과 함께 카테고리와 타입을 뱃지 형태로 보여줍니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'text',
      description: '게시글 카테고리',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'text',
      description: '게시글 타입',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommunityPostCategoryTypeBadges>;

// 기본 스토리
export const Default: Story = {
  args: {
    category: 'Frontend',
    type: '질문',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 카테고리와 타입 배지입니다.',
      },
    },
  },
};

// Frontend 카테고리
export const Frontend: Story = {
  args: {
    category: 'Frontend',
    type: '튜토리얼',
  },
  parameters: {
    docs: {
      description: {
        story: 'Frontend 카테고리의 튜토리얼 타입입니다.',
      },
    },
  },
};

// Backend 카테고리
export const Backend: Story = {
  args: {
    category: 'Backend',
    type: '질문',
  },
  parameters: {
    docs: {
      description: {
        story: 'Backend 카테고리의 질문 타입입니다.',
      },
    },
  },
};

// 다양한 카테고리와 타입
export const Various: Story = {
  render: () => (
    <div className="space-y-4">
      <CommunityPostCategoryTypeBadges category="Frontend" type="질문" />
      <CommunityPostCategoryTypeBadges category="Backend" type="튜토리얼" />
      <CommunityPostCategoryTypeBadges category="DevOps" type="팁" />
      <CommunityPostCategoryTypeBadges category="Design" type="공유" />
      <CommunityPostCategoryTypeBadges category="Mobile" type="버그" />
      <CommunityPostCategoryTypeBadges category="Database" type="토론" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 카테고리와 타입 조합을 보여줍니다.',
      },
    },
  },
};

// 긴 카테고리명
export const LongCategory: Story = {
  args: {
    category: 'Full Stack Development',
    type: '질문',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 카테고리명을 가진 배지입니다.',
      },
    },
  },
};

// 긴 타입명
export const LongType: Story = {
  args: {
    category: 'Frontend',
    type: '코드리뷰 요청',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 타입명을 가진 배지입니다.',
      },
    },
  },
};

// 게시글 헤더 예시
export const PostHeader: Story = {
  render: () => (
    <div className="max-w-3xl p-6 bg-white border border-gray-200 rounded-lg">
      <CommunityPostCategoryTypeBadges category="Frontend" type="질문" />
      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
        React Hooks의 useEffect 사용법이 궁금합니다
      </h1>
      <p className="text-gray-600">
        useEffect의 의존성 배열을 어떻게 관리해야 할까요?
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

// 모바일 카테고리
export const Mobile: Story = {
  render: () => (
    <div className="space-y-4">
      <CommunityPostCategoryTypeBadges category="iOS" type="질문" />
      <CommunityPostCategoryTypeBadges category="Android" type="튜토리얼" />
      <CommunityPostCategoryTypeBadges category="React Native" type="팁" />
      <CommunityPostCategoryTypeBadges category="Flutter" type="공유" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모바일 관련 카테고리들입니다.',
      },
    },
  },
};

// 인프라 카테고리
export const Infrastructure: Story = {
  render: () => (
    <div className="space-y-4">
      <CommunityPostCategoryTypeBadges category="AWS" type="팁" />
      <CommunityPostCategoryTypeBadges category="Docker" type="튜토리얼" />
      <CommunityPostCategoryTypeBadges category="Kubernetes" type="질문" />
      <CommunityPostCategoryTypeBadges category="CI/CD" type="공유" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '인프라 관련 카테고리들입니다.',
      },
    },
  },
};

// 언어 카테고리
export const Languages: Story = {
  render: () => (
    <div className="space-y-4">
      <CommunityPostCategoryTypeBadges category="JavaScript" type="질문" />
      <CommunityPostCategoryTypeBadges category="TypeScript" type="튜토리얼" />
      <CommunityPostCategoryTypeBadges category="Python" type="팁" />
      <CommunityPostCategoryTypeBadges category="Java" type="토론" />
      <CommunityPostCategoryTypeBadges category="Go" type="공유" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '프로그래밍 언어 관련 카테고리들입니다.',
      },
    },
  },
};

// 게시글 타입 변형
export const PostTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <CommunityPostCategoryTypeBadges category="Frontend" type="질문" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="답변" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="튜토리얼" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="팁" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="공유" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="토론" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="버그리포트" />
      <CommunityPostCategoryTypeBadges category="Frontend" type="코드리뷰" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '같은 카테고리에서 다양한 타입을 보여줍니다.',
      },
    },
  },
};

// 전체 게시글 카드 예시
export const FullPostCard: Story = {
  render: () => (
    <div className="max-w-3xl">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <CommunityPostCategoryTypeBadges category="Frontend" type="질문" />

        <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">
          Next.js 13 App Router 사용 시 주의사항
        </h2>

        <p className="text-gray-600 mb-4">
          Next.js 13의 새로운 App Router를 사용하면서 겪은 문제들과 해결 방법을 공유합니다.
          특히 서버 컴포넌트와 클라이언트 컴포넌트를 구분하는 부분에서...
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>👁️ 1,234</span>
            <span>💬 42</span>
            <span>👍 89</span>
          </div>
          <span>2025년 1월 15일</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '전체 게시글 카드에서 배지가 사용되는 예시입니다.',
      },
    },
  },
};

// 짧은 텍스트
export const Short: Story = {
  args: {
    category: 'AI',
    type: '팁',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 텍스트를 가진 배지입니다.',
      },
    },
  },
};
