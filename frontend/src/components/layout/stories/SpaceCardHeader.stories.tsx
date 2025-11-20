import type { Meta, StoryObj } from '@storybook/react';
import SpaceCardHeader from '@components/layout/SpaceCardHeader';

const meta: Meta<typeof SpaceCardHeader> = {
  title: 'Components/Layout/SpaceCardHeader',
  component: SpaceCardHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '스페이스 카드 섹션 헤더 컴포넌트입니다. 아카이브 섹션의 제목을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '섹션 제목',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceCardHeader>;

// 기본 스토리
export const Default: Story = {
  args: {
    title: 'Pinned',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스페이스 카드 헤더입니다.',
      },
    },
  },
};

// 다양한 제목들
export const DifferentTitles: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <SpaceCardHeader title="Pinned" />
        <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
          고정된 아카이브 섹션
        </div>
      </div>

      <div>
        <SpaceCardHeader title="Recent" />
        <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
          최근 아카이브 섹션
        </div>
      </div>

      <div>
        <SpaceCardHeader title="AI Projects" />
        <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
          AI 프로젝트 섹션
        </div>
      </div>

      <div>
        <SpaceCardHeader title="Archive" />
        <div className="mt-4 p-4 bg-gray-50 rounded text-sm text-gray-600">
          보관된 아카이브 섹션
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 제목을 가진 섹션 헤더들입니다.',
      },
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    title: 'My Personal AI Project Collections',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목을 가진 헤더입니다.',
      },
    },
  },
};

// 짧은 제목
export const ShortTitle: Story = {
  args: {
    title: 'AI',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 제목을 가진 헤더입니다.',
      },
    },
  },
};

// 스페이스 페이지 컨텍스트
export const WithinSpacePage: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">마이 스페이스</h1>
        <p className="text-gray-600">나만의 프롬프트 세계를 만들어요!</p>
      </div>

      {/* Pinned Section */}
      <div className="mb-12">
        <SpaceCardHeader title="Pinned" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-blue-200 rounded-lg p-6 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <h3 className="font-semibold text-lg">AI 챗봇 {i + 1}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Section */}
      <div className="mb-12">
        <SpaceCardHeader title="Recent" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-purple-200 rounded-lg p-6 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <h3 className="font-semibold text-lg">프로젝트 {i + 1}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 스페이스 페이지 내에서의 헤더 사용 예시입니다.',
      },
    },
  },
};

// 다양한 너비
export const DifferentWidths: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">전체 너비</h3>
        <SpaceCardHeader title="Full Width Section" />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">중간 너비 (768px)</h3>
        <div className="max-w-3xl">
          <SpaceCardHeader title="Medium Width Section" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700">좁은 너비 (480px)</h3>
        <div className="max-w-md">
          <SpaceCardHeader title="Narrow Width" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 너비에서의 헤더 모습입니다.',
      },
    },
  },
};

// 카드 그리드와 함께
export const WithCardGrid: Story = {
  render: () => (
    <div className="max-w-6xl p-6">
      <SpaceCardHeader title="AI Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[
          { title: 'AI 챗봇', color: 'bg-blue-200' },
          { title: '이미지 생성', color: 'bg-purple-200' },
          { title: '음성 인식', color: 'bg-green-200' },
          { title: '텍스트 분석', color: 'bg-yellow-200' },
          { title: '데이터 시각화', color: 'bg-pink-200' },
          { title: '자동화 도구', color: 'bg-indigo-200' },
        ].map((project, i) => (
          <div
            key={i}
            className={`${project.color} rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer`}
          >
            <h3 className="font-semibold text-xl text-gray-900">{project.title}</h3>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '카드 그리드와 함께 사용되는 헤더입니다.',
      },
    },
  },
};

// 한글/영문 제목
export const KoreanAndEnglishTitles: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <SpaceCardHeader title="고정된 아카이브" />
        <div className="mt-2 text-sm text-gray-500">한글 제목</div>
      </div>

      <div>
        <SpaceCardHeader title="Pinned Archives" />
        <div className="mt-2 text-sm text-gray-500">영문 제목</div>
      </div>

      <div>
        <SpaceCardHeader title="최근 프로젝트 (Recent Projects)" />
        <div className="mt-2 text-sm text-gray-500">한글+영문 제목</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '한글과 영문 제목을 사용한 헤더들입니다.',
      },
    },
  },
};
