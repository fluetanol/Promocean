import type { Meta, StoryObj } from '@storybook/react';
import SpaceHeader from '@components/layout/SpaceHeader';

const meta: Meta<typeof SpaceHeader> = {
  title: 'Components/Layout/SpaceHeader',
  component: SpaceHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '스페이스 페이지 헤더 컴포넌트입니다. 사용자의 닉네임을 포함한 제목과 설명을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    nickname: {
      control: 'text',
      description: '사용자 닉네임',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceHeader>;

// 기본 스토리
export const Default: Story = {
  args: {
    nickname: '김개발',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스페이스 헤더입니다.',
      },
    },
  },
};

// 다양한 닉네임
export const DifferentNicknames: Story = {
  render: () => (
    <div className="space-y-4">
      <SpaceHeader nickname="김개발" />
      <SpaceHeader nickname="이디자이너" />
      <SpaceHeader nickname="박프론트엔드" />
      <SpaceHeader nickname="최풀스택개발자" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 닉네임을 가진 사용자들의 헤더입니다.',
      },
    },
  },
};

// 짧은 닉네임
export const ShortNickname: Story = {
  args: {
    nickname: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 닉네임을 가진 사용자의 헤더입니다.',
      },
    },
  },
};

// 긴 닉네임
export const LongNickname: Story = {
  args: {
    nickname: '아주긴닉네임을가진사용자',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 닉네임을 가진 사용자의 헤더입니다.',
      },
    },
  },
};

// 영문 닉네임
export const EnglishNickname: Story = {
  args: {
    nickname: 'JohnDoe',
  },
  parameters: {
    docs: {
      description: {
        story: '영문 닉네임을 가진 사용자의 헤더입니다.',
      },
    },
  },
};

// 전체 페이지 레이아웃
export const WithPageLayout: Story = {
  args: {
    nickname: '김개발',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-6xl mx-auto p-8">
          {/* Pinned Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg mb-6">
              Pinned
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-blue-200 rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-xl">AI 챗봇 {i + 1}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Section */}
          <div>
            <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg mb-6">
              Recent
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-purple-200 rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-xl">프로젝트 {i + 1}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 스페이스 페이지 레이아웃 내에서의 헤더입니다.',
      },
    },
  },
};

// 실제 마이 스페이스 페이지 시뮬레이션
export const FullMySpacePage: Story = {
  args: {
    nickname: '김개발',
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50">
      <SpaceHeader {...args} />

      <div className="max-w-7xl mx-auto p-6">
        {/* 통계 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-primary mb-2">24</div>
            <div className="text-sm text-gray-600">총 프롬프트</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-sm text-gray-600">공개 프롬프트</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-sm text-gray-600">받은 좋아요</div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-sm text-gray-600">참여중인 대회</div>
          </div>
        </div>

        {/* Pinned Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg">
              Pinned
            </h2>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-110">
              + 추가
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI 챗봇', color: 'bg-blue-200' },
              { title: '이미지 생성', color: 'bg-purple-200' },
              { title: '음성 인식', color: 'bg-green-200' },
              { title: '텍스트 분석', color: 'bg-yellow-200' },
            ].map((project, i) => (
              <div
                key={i}
                className={`${project.color} rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer group`}
              >
                <h3 className="font-semibold text-xl group-hover:scale-110 transition-transform">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg mb-6">
            Recent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl p-6 h-48 flex flex-col justify-center hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <h3 className="font-semibold text-xl">프로젝트 {i + 1}</h3>
                <p className="text-sm text-gray-700 mt-2">최근 수정: 2일 전</p>
              </div>
            ))}
          </div>
        </div>

        {/* Archive Section */}
        <div>
          <h2 className="text-4xl font-medium pb-2 border-b-2 border-black rounded-b-lg mb-6">
            Archive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-lg mb-2">보관된 프로젝트 {i + 1}</h3>
                <p className="text-sm text-gray-600">
                  이 프로젝트는 보관 처리되었습니다.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded">AI</span>
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                    프롬프트
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 마이 스페이스 페이지의 전체 레이아웃 시뮬레이션입니다.',
      },
    },
  },
};

// 반응형 테스트
export const ResponsiveTest: Story = {
  args: {
    nickname: '김개발',
  },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">데스크톱 뷰</h3>
        <SpaceHeader {...args} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">태블릿 뷰 (시뮬레이션)</h3>
        <div className="max-w-3xl">
          <SpaceHeader {...args} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 px-4">모바일 뷰 (시뮬레이션)</h3>
        <div className="max-w-md">
          <SpaceHeader {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서의 헤더 모습입니다.',
      },
    },
  },
};
