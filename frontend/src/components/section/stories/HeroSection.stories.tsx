import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from '@components/section/HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Components/Section/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '메인 페이지의 히어로 섹션 컴포넌트입니다. 큰 제목, 설명, CTA 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 히어로 섹션입니다.',
      },
    },
  },
};

// 전체 랜딩 페이지 컨텍스트
export const WithinLandingPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />

        {/* 추가 섹션들 */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3">프롬프트 검색</h3>
              <p className="text-gray-600">
                수천 개의 프롬프트 중에서 원하는 것을 쉽게 찾으세요
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">아이디어 공유</h3>
              <p className="text-gray-600">
                커뮤니티와 함께 최고의 프롬프트를 만들어보세요
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">프롬프트 대회</h3>
              <p className="text-gray-600">
                경쟁을 통해 실력을 향상시키고 보상을 받으세요
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '전체 랜딩 페이지 내에서의 히어로 섹션입니다.',
      },
    },
  },
};

// 애니메이션 강조
export const AnimationHighlight: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="bg-blue-50 border border-blue-200 p-6 mb-4 mx-auto max-w-3xl">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🎨 애니메이션 요소
          </h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• 배경에 부드러운 그라데이션 효과</li>
            <li>• 떠다니는 원형 요소들이 펄스 애니메이션</li>
            <li>• 버튼 호버 시 그림자 변화</li>
            <li>• 부드러운 색상 전환</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '히어로 섹션의 애니메이션 효과를 강조합니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 히어로 섹션입니다.',
      },
    },
  },
};

// 태블릿 뷰
export const TabletView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-3xl mx-auto">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '태블릿 환경에서의 히어로 섹션입니다.',
      },
    },
  },
};

// 전체 페이지 시뮬레이션
export const FullPageSimulation: Story = {
  render: () => (
    <div className="min-h-screen">
      {/* 네비게이션 바 */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">PromOcean</div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-primary">
              커뮤니티
            </a>
            <a href="#" className="text-gray-600 hover:text-primary">
              대회
            </a>
            <a href="#" className="text-gray-600 hover:text-primary">
              마이 스페이스
            </a>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg">
              로그인
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
              회원가입
            </button>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 컨텐츠 섹션 */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">왜 PromOcean인가요?</h2>
            <p className="text-xl text-gray-600">
              최고의 AI 프롬프트 커뮤니티에서 경험해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">프롬프트 라이브러리</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                수천 개의 검증된 프롬프트를 탐색하고, 즐겨찾기하고, 자신만의
                컬렉션을 만드세요. 카테고리별로 분류된 프롬프트를 통해 원하는
                것을 빠르게 찾을 수 있습니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-80 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 PromOcean. All rights reserved.</p>
        </div>
      </footer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '전체 랜딩 페이지의 완전한 시뮬레이션입니다.',
      },
    },
  },
};

// 다양한 CTA 버튼 상태
export const ButtonStates: Story = {
  decorators: [
    (Story) => (
      <div>
        <div className="bg-yellow-50 border border-yellow-200 p-6 mb-4 mx-auto max-w-3xl">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">
            🎯 CTA 버튼 인터랙션
          </h3>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li>• "시작하기" 버튼에 마우스를 올려보세요</li>
            <li>• "둘러보기" 버튼에 마우스를 올려보세요</li>
            <li>• 버튼 클릭 시 미세한 피드백 효과</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'CTA 버튼의 다양한 상태와 인터랙션을 테스트합니다.',
      },
    },
  },
};

// 스크롤 컨텍스트
export const WithScrollContext: Story = {
  decorators: [
    (Story) => (
      <div className="h-screen overflow-auto">
        <Story />
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">아래로 스크롤해보세요</h2>
            <p className="text-xl text-gray-600">
              히어로 섹션에서 컨텐츠 섹션으로의 자연스러운 전환
            </p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '스크롤 가능한 페이지 내에서의 히어로 섹션입니다.',
      },
    },
  },
};

// 다크 배경 변형
export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-900">
        <div className="[&_div]:from-primary/20 [&_div]:via-gray-900 [&_div]:to-secondary/20 [&_h1]:text-white [&_p]:text-gray-300">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: '다크 모드 버전의 히어로 섹션입니다.',
      },
    },
  },
};

// 컴팩트 버전
export const CompactVersion: Story = {
  decorators: [
    (Story) => (
      <div className="[&_>div]:h-[350px] [&_h1]:text-5xl [&_p:first-of-type]:text-xl [&_p:last-of-type]:text-base [&_button]:py-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '높이가 축소된 컴팩트 버전의 히어로 섹션입니다.',
      },
    },
  },
};
