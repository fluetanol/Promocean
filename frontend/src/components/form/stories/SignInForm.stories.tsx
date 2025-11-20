import type { Meta, StoryObj } from '@storybook/react';
import SignInForm from '@components/form/SignInForm';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/Form/SignInForm',
  component: SignInForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로그인 폼 컴포넌트입니다. 이메일과 비밀번호를 입력받아 로그인을 처리합니다.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 로그인 폼입니다.',
      },
    },
  },
};

// 로그인 페이지 컨텍스트
export const WithinLoginPage: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* 로고 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-primary text-3xl font-bold">P</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">PromOcean</h1>
            <p className="text-white/90 text-lg">프롬프트의 바다로 떠나보세요</p>
          </div>

          {/* 폼 */}
          <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <Story />
          </div>

          {/* 추가 링크 */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-sm">
              계정이 없으신가요?{' '}
              <a href="#" className="text-white font-semibold hover:underline">
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 로그인 페이지에서의 폼 사용 예시입니다.',
      },
    },
  },
};

// 인터랙션 테스트
export const InteractionTest: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-white/10 rounded-lg text-white text-sm">
          <p className="font-semibold mb-2">💡 인터랙션 테스트</p>
          <ul className="space-y-1 text-xs">
            <li>• 이메일과 비밀번호를 입력해보세요</li>
            <li>• 입력 필드 포커스 효과를 확인하세요</li>
            <li>• 로그인 버튼을 클릭해보세요 (콘솔 확인)</li>
          </ul>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '폼의 상호작용을 테스트합니다.',
      },
    },
  },
};

// 입력 필드 포커스 상태
export const FocusedState: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold mb-2 text-blue-900">포커스 효과</p>
          <p className="text-blue-800 text-xs">
            입력 필드를 클릭하면 파란색 링이 표시됩니다
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 포커스 상태를 확인합니다.',
      },
    },
  },
};

// 다양한 배경에서
export const OnDifferentBackgrounds: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary 배경 (기본)</h3>
        <div className="bg-primary p-8 rounded-2xl inline-block">
          <SignInForm />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">그라데이션 배경</h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-2xl inline-block">
          <SignInForm />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">어두운 배경</h3>
        <div className="bg-gray-900 p-8 rounded-2xl inline-block">
          <SignInForm />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 배경에서의 로그인 폼입니다.',
      },
    },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-sm mx-auto bg-gradient-to-br from-primary to-blue-600 p-6 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">PromOcean</h1>
          <p className="text-white/80 text-sm">프롬프트의 바다</p>
        </div>
        <div className="bg-primary/50 backdrop-blur-sm p-6 rounded-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '모바일 환경에서의 로그인 폼입니다.',
      },
    },
  },
};

// 전체 인증 플로우
export const FullAuthenticationFlow: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 브랜딩 */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <span className="text-primary text-5xl font-bold">P</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3">PromOcean</h1>
          <p className="text-white/90 text-xl">AI 프롬프트 플랫폼</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
          <SignInForm />
        </div>

        {/* 소셜 로그인 */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/80">또는</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center mt-8">
          <p className="text-white/80">
            계정이 없으신가요?{' '}
            <a href="#" className="text-white font-bold hover:underline">
              회원가입
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60 text-sm">
          <p>© 2025 PromOcean. All rights reserved.</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '완전한 로그인 페이지 레이아웃입니다.',
      },
    },
  },
};

// 에러 상태 시뮬레이션
export const WithErrorMessage: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary p-8 rounded-2xl min-w-[400px]">
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-800 text-sm font-semibold">
            ⚠️ 이메일 또는 비밀번호가 올바르지 않습니다.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '로그인 실패 시 에러 메시지가 표시된 상태입니다.',
      },
    },
  },
};
