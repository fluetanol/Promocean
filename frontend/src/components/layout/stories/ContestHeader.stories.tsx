import type { Meta, StoryObj } from '@storybook/react';
import ContestHeader from '@components/layout/ContestHeader';

const meta: Meta<typeof ContestHeader> = {
  title: 'Components/Layout/ContestHeader',
  component: ContestHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프롬프트 대회 페이지 헤더 컴포넌트입니다. 대회 페이지의 제목과 설명을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContestHeader>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 대회 헤더입니다.',
      },
    },
  },
};

// 전체 페이지 레이아웃
export const WithPageLayout: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded font-semibold">
                      진행중
                    </span>
                    <span className="text-xs text-gray-500">D-{7 - i}</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI 이미지 생성 대회 {i + 1}</h3>
                  <p className="text-sm text-gray-600 mb-3">참가자 {156 + i * 20}명</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded">AI</span>
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded">이미지</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 대회 페이지 레이아웃 내에서의 헤더입니다.',
      },
    },
  },
};

// 실제 대회 페이지 시뮬레이션
export const FullContestPage: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      <ContestHeader />

      <div className="max-w-7xl mx-auto p-6">
        {/* 탭 네비게이션 */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button className="px-4 py-2 border-b-2 border-primary text-primary font-semibold">
            전체 대회
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            진행중
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            종료됨
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
            내 참가 대회
          </button>
        </div>

        {/* 대회 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { status: '진행중', deadline: 7, color: 'from-blue-400 to-cyan-400' },
            { status: '개최예정', deadline: 14, color: 'from-purple-400 to-pink-400' },
            { status: '진행중', deadline: 3, color: 'from-green-400 to-teal-400' },
            { status: '투표중', deadline: 5, color: 'from-orange-400 to-red-400' },
            { status: '진행중', deadline: 10, color: 'from-indigo-400 to-purple-400' },
            { status: '종료', deadline: 0, color: 'from-gray-400 to-gray-500' },
          ].map((contest, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className={`w-full h-48 bg-gradient-to-br ${contest.color} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded ${
                      contest.status === '진행중'
                        ? 'bg-green-100 text-green-800'
                        : contest.status === '개최예정'
                        ? 'bg-blue-100 text-blue-800'
                        : contest.status === '투표중'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {contest.status}
                  </span>
                  {contest.deadline > 0 && (
                    <span className="text-sm font-semibold text-primary">
                      D-{contest.deadline}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {
                    [
                      'React 컴포넌트 챌린지',
                      'AI 프롬프트 엔지니어링',
                      'UI/UX 디자인 대회',
                      '알고리즘 코딩 챌린지',
                      '풀스택 웹 개발',
                      '웹 접근성 개선',
                    ][i]
                  }
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  참가자 {156 + i * 50}명 • 시작일: 2025.01.{15 + i}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {['react', 'ai', 'design', 'algorithm', 'fullstack', 'a11y'][i]}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {
                      [
                        'frontend',
                        'prompt',
                        'ui',
                        'coding',
                        'backend',
                        'accessibility',
                      ][i]
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 대회 페이지의 전체 레이아웃 시뮬레이션입니다.',
      },
    },
  },
};
